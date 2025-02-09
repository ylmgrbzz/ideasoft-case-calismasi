import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect } from "react";
import {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
} from "../src/store/services/api";

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

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>
        {productsLoading || productLoading || searchLoading
          ? "Yükleniyor..."
          : "Veriler konsola yazdırıldı"}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
