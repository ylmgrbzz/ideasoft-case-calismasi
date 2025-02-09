import {
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  View,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect } from "react";
import {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
} from "../src/store/services/api";
import { router } from "expo-router";
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

export default function HomeScreen() {
  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#ffffff");
      StatusBar.setTranslucent(true);
    }
  }, []);

  const { data: products, isLoading: productsLoading } = useGetProductsQuery({
    limit: 20,
    page: 1,
  });
  const { data: product, isLoading: productLoading } =
    useGetProductByIdQuery(617);
  const { data: searchResults, isLoading: searchLoading } =
    useSearchProductsQuery({ q: "Zara", limit: 20, page: 1 });

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
        <ThemedText style={styles.productPrice}>{item.price1} TL</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );

  if (productsLoading || productLoading || searchLoading) {
    return (
      <View style={styles.container}>
        <StatusBar />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <ThemedText style={styles.headerTitle}>İdeaSoft Store</ThemedText>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => router.push("/search")}
            >
              <Ionicons name="search" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6200ee" />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>İdeaSoft Store</ThemedText>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => router.push("/search")}
          >
            <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<View style={styles.listHeader} />}
          columnWrapperStyle={styles.columnWrapper}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a1a1a",
    letterSpacing: 0.5,
  },
  searchButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productList: {
    padding: CARD_MARGIN,
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
});
