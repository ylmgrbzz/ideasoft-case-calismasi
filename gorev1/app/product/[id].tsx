import { StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGetProductByIdQuery } from "../../src/store/services/api";
import { useLocalSearchParams } from "expo-router";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: product, isLoading } = useGetProductByIdQuery(parseInt(id));

  if (isLoading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (!product) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.errorText}>Ürün bulunamadı</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: product.images[0]?.filename }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <ThemedView style={styles.contentContainer}>
        <ThemedText style={styles.productName}>{product.name}</ThemedText>
        <ThemedText style={styles.price}>{product.price1} TL</ThemedText>

        {product.brand && (
          <ThemedText style={styles.brand}>
            Marka: {product.brand.name}
          </ThemedText>
        )}

        <ThemedText style={styles.stock}>
          Stok Durumu: {product.stockAmount > 0 ? "Stokta var" : "Stokta yok"}
        </ThemedText>

        {product.details.map((detail) => (
          <ThemedText key={detail.id} style={styles.description}>
            {detail.details}
          </ThemedText>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 300,
  },
  contentContainer: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e91e63",
    marginBottom: 16,
  },
  brand: {
    fontSize: 16,
    marginBottom: 8,
  },
  stock: {
    fontSize: 16,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
