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
import { useLocalSearchParams, router, Stack } from "expo-router";
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderSpecification = (label: string, value: any) => {
    if (!value) return null;
    return (
      <View style={styles.specRow}>
        <ThemedText style={styles.specLabel}>{label}</ThemedText>
        <ThemedText style={styles.specValue}>{value}</ThemedText>
      </View>
    );
  };

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
            <ThemedText style={styles.headerTitle}>Ürün Detayı</ThemedText>
            <View style={{ width: 40 }} />
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#6200ee" />
            </View>
          ) : !product ? (
            <View style={styles.errorContainer}>
              <ThemedText style={styles.errorText}>Ürün bulunamadı</ThemedText>
            </View>
          ) : (
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

              <View style={styles.contentContainer}>
                <View style={styles.headerSection}>
                  <ThemedText style={styles.productName}>
                    {product.name}
                  </ThemedText>
                  <ThemedText style={styles.fullName}>
                    {product.fullName}
                  </ThemedText>
                  <View style={styles.priceContainer}>
                    <ThemedText style={styles.price}>
                      {product.price1.toFixed(2)} {product.currency.label}
                    </ThemedText>
                    {product.discount > 0 && (
                      <View style={styles.discountBadge}>
                        <ThemedText style={styles.discountText}>
                          %{product.discount} İndirim
                        </ThemedText>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={styles.stockInfo}>
                    <Ionicons
                      name={
                        product.stockAmount > 0
                          ? "checkmark-circle"
                          : "close-circle"
                      }
                      size={20}
                      color={product.stockAmount > 0 ? "#4CAF50" : "#F44336"}
                    />
                    <ThemedText
                      style={[
                        styles.stockText,
                        {
                          color:
                            product.stockAmount > 0 ? "#4CAF50" : "#F44336",
                        },
                      ]}
                    >
                      {product.stockAmount > 0 ? "Stokta var" : "Stokta yok"}
                    </ThemedText>
                  </View>
                  {product.productToCategories?.map((cat) => (
                    <View key={cat.id} style={styles.categoryBadge}>
                      <ThemedText style={styles.categoryText}>
                        {cat.category.name}
                      </ThemedText>
                    </View>
                  ))}
                </View>

                <View style={styles.section}>
                  <ThemedText style={styles.sectionTitle}>
                    Ürün Özellikleri
                  </ThemedText>
                  <View style={styles.specificationContainer}>
                    {renderSpecification("SKU", product.sku)}
                    {renderSpecification("Barkod", product.barcode)}
                    {renderSpecification("Garanti", `${product.warranty} Ay`)}
                    {renderSpecification(
                      "Stok Miktarı",
                      `${product.stockAmount} ${product.stockTypeLabel}`
                    )}
                    {renderSpecification("KDV", `%${product.tax}`)}
                    {renderSpecification(
                      "Ağırlık",
                      product.volumetricWeight > 0
                        ? `${product.volumetricWeight} kg`
                        : "-"
                    )}
                    {renderSpecification(
                      "Eklenme Tarihi",
                      formatDate(product.createdAt)
                    )}
                    {renderSpecification(
                      "Güncellenme Tarihi",
                      formatDate(product.updatedAt)
                    )}
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={styles.shippingInfo}>
                    <Ionicons name="car-outline" size={24} color="#666" />
                    <ThemedText style={styles.shippingText}>
                      {product.customShippingDisabled
                        ? "Standart Kargo"
                        : `Özel Kargo Ücreti: ${product.customShippingCost} TL`}
                    </ThemedText>
                  </View>
                </View>

                {product.details && product.details.length > 0 && (
                  <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>
                      Ürün Açıklaması
                    </ThemedText>
                    {product.details.map((detail) => (
                      <ThemedText key={detail.id} style={styles.description}>
                        {detail.details}
                      </ThemedText>
                    ))}
                  </View>
                )}
              </View>
            </ScrollView>
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
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
  headerSection: {
    marginBottom: 20,
  },
  fullName: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  discountBadge: {
    backgroundColor: "#FFE0E0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  discountText: {
    color: "#E41E31",
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  stockInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  stockText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  categoryBadge: {
    backgroundColor: "#E8F0FE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginTop: 8,
  },
  categoryText: {
    color: "#1967D2",
    fontSize: 14,
    fontWeight: "500",
  },
  specificationContainer: {
    backgroundColor: "#FAFAFA",
    borderRadius: 8,
    padding: 12,
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  specLabel: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  specValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 2,
    textAlign: "right",
  },
  shippingInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
  },
  shippingText: {
    marginLeft: 12,
    fontSize: 14,
    color: "#666",
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#444",
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
  errorText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
});
