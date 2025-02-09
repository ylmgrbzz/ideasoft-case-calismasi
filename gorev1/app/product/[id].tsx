import {
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGetProductByIdQuery } from "../../src/store/services/api";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";

const { width } = Dimensions.get("window");

const getProductImage = (productName: string) => {
  switch (productName) {
    case "Zara Sleeve T-Shirt":
      return require("../../assets/images/zaratshirt.jpg");
    case "Nivea Nemlendirici":
      return require("../../assets/images/niveanemlendirici.jpg");
    case "VESTEL Akıllı Saat":
      return require("../../assets/images/vestelakıllısaat.jpg");
    case "PUMA Sneaker":
      return require("../../assets/images/pumasnekader.jpeg");
    case "Apple iPhone 13":
      return require("../../assets/images/iphone13.jpg");
    case "Zara Triko Kazak":
      return require("../../assets/images/zaratrikokazak.jpg");
    default:
      return require("../../assets/images/zaratshirt.jpg");
  }
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: product, isLoading } = useGetProductByIdQuery(parseInt(id));

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#ffffff");
      StatusBar.setTranslucent(true);
    }
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <ThemedText style={styles.headerTitle}>Ürün Detayı</ThemedText>
            <View style={{ width: 40 }} />
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6200ee" />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <StatusBar />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <ThemedText style={styles.headerTitle}>Ürün Detayı</ThemedText>
            <View style={{ width: 40 }} />
          </View>
          <ThemedView style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>Ürün bulunamadı</ThemedText>
          </ThemedView>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Ürün Detayı</ThemedText>
          <View style={{ width: 40 }} />
        </View>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.imageContainer}>
            <Image
              source={getProductImage(product.name)}
              style={styles.productImage}
              resizeMode="cover"
            />
          </View>
          <ThemedView style={styles.contentContainer}>
            <ThemedText style={styles.productName}>{product.name}</ThemedText>
            <ThemedText style={styles.price}>{product.price1} TL</ThemedText>

            {product.brand && (
              <ThemedText style={styles.brand}>
                Marka: {product.brand.name}
              </ThemedText>
            )}

            <ThemedText style={styles.stock}>
              Stok Durumu:{" "}
              {product.stockAmount > 0 ? "Stokta var" : "Stokta yok"}
            </ThemedText>

            {product.details.map((detail) => (
              <ThemedText key={detail.id} style={styles.description}>
                {detail.details}
              </ThemedText>
            ))}
          </ThemedView>
        </ScrollView>
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
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    letterSpacing: 0.5,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: width,
    height: width,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productName: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1a1a1a",
    letterSpacing: 0.5,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: "#6200ee",
    marginBottom: 20,
  },
  brand: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  stock: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
    marginBottom: 12,
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
});
