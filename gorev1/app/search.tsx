import {
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSearchProductsQuery } from "../src/store/services/api";
import { router, Stack } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { Product } from "../src/store/types/product";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - CARD_MARGIN * 6) / 2;

const getProductImage = (productName: string) => {
  switch (productName) {
    case "Zara Sleeve T-Shirt":
      return require("../assets/images/zaratshirt.jpg");
    case "Nivea Nemlendirici":
      return require("../assets/images/niveanemlendirici.jpg");
    case "VESTEL Akıllı Saat":
      return require("../assets/images/vestelakıllısaat.jpg");
    case "PUMA Sneaker":
      return require("../assets/images/pumasnekader.jpeg");
    case "Apple iPhone 13":
      return require("../assets/images/iphone13.jpg");
    case "Zara Triko Kazak":
      return require("../assets/images/zaratrikokazak.jpg");
    default:
      return require("../assets/images/zaratshirt.jpg");
  }
};

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: products, isLoading } = useSearchProductsQuery(
    { search: debouncedQuery, limit: 20, page: 1 },
    { skip: !debouncedQuery }
  );

  useEffect(() => {
    if (!debouncedQuery) {
      setProducts([]);
    }
  }, [debouncedQuery]);

  const [localProducts, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products) {
      setProducts(products);
    }
  }, [products]);

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#ffffff");
      StatusBar.setTranslucent(true);
    }
  }, []);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setDebouncedQuery("");
  }, []);

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/product/${item.id}` as any)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={getProductImage(item.name)}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>
      <ThemedView style={styles.productInfo}>
        <ThemedText style={styles.productName} numberOfLines={2}>
          {item.name}
        </ThemedText>
        <ThemedText style={styles.productPrice}>
          {item.price1.toFixed(2)} TL
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: "#ffffff" },
        }}
      />
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Ürün ara..."
                value={searchQuery}
                onChangeText={handleSearch}
                placeholderTextColor="#666"
                returnKeyType="search"
              />
              {searchQuery ? (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={clearSearch}
                >
                  <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
              ) : (
                <Ionicons
                  name="search"
                  size={20}
                  color="#666"
                  style={styles.searchIcon}
                />
              )}
            </View>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#6200ee" />
            </View>
          ) : (
            <FlatList
              data={localProducts}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={[
                styles.productList,
                !localProducts?.length && styles.emptyList,
              ]}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={<View style={styles.listHeader} />}
              columnWrapperStyle={styles.columnWrapper}
              ListEmptyComponent={
                debouncedQuery ? (
                  <View style={styles.emptyContainer}>
                    <Ionicons name="search-outline" size={48} color="#666" />
                    <ThemedText style={styles.noResults}>
                      "{debouncedQuery}" için sonuç bulunamadı
                    </ThemedText>
                    <ThemedText style={styles.noResultsSubtext}>
                      Farklı bir arama yapmayı deneyin
                    </ThemedText>
                  </View>
                ) : (
                  <View style={styles.emptyContainer}>
                    <Ionicons name="search-outline" size={48} color="#666" />
                    <ThemedText style={styles.noResults}>
                      Ürün aramak için yazın
                    </ThemedText>
                  </View>
                )
              }
            />
          )}
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
    paddingRight: 8,
  },
  searchIcon: {
    marginLeft: 8,
  },
  clearButton: {
    padding: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productList: {
    padding: CARD_MARGIN,
    flexGrow: 0,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginHorizontal: CARD_MARGIN,
  },
  listHeader: {
    height: CARD_MARGIN,
  },
  productCard: {
    width: CARD_WIDTH,
    marginBottom: CARD_MARGIN * 2,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: CARD_WIDTH * 1.2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productInfo: {
    padding: 12,
    backgroundColor: "#fff",
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#1a1a1a",
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6200ee",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
    flex: 0,
  },
  noResults: {
    fontSize: 16,
    color: "#333",
    marginTop: 16,
    textAlign: "center",
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  emptyList: {
    flexGrow: 0,
    height: "auto",
  },
});
