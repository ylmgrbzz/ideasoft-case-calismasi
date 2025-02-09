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
  const { data: products, isLoading: productsLoading } = useGetProductsQuery({
    limit: 20,
    page: 1,
  });
  const { data: product, isLoading: productLoading } =
    useGetProductByIdQuery(617);
  const { data: searchResults, isLoading: searchLoading } =
    useSearchProductsQuery({ q: "Zara", limit: 20, page: 1 });

  useEffect(() => {
    if (products) {
      console.log("Ürünler:", JSON.stringify(products, null, 2));
    }
    if (product) {
      console.log("Ürün Detayı:", JSON.stringify(product, null, 2));
    }
    if (searchResults) {
      console.log("Arama Sonuçları:", JSON.stringify(searchResults, null, 2));
    }
  }, [products, product, searchResults]);

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/product/${item.id}` as any)}
    >
      <Image
        source={getProductImage(item.name)}
        style={styles.productImage}
        resizeMode="cover"
      />
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
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>İdeaSoft Store</ThemedText>
          <TouchableOpacity onPress={() => router.push("/search")}>
            <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e91e63" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>İdeaSoft Store</ThemedText>
        <TouchableOpacity onPress={() => router.push("/search")}>
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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productList: {
    padding: 8,
  },
  listHeader: {
    height: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 180,
    backgroundColor: "#f9f9f9",
  },
  productInfo: {
    padding: 12,
    backgroundColor: "#fff",
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e91e63",
  },
});
