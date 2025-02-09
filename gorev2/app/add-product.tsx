import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useCreateProductMutation } from "@/store/services/api";

export default function AddProductScreen() {
  const router = useRouter();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [productData, setProductData] = useState({
    name: "",
    fullName: "",
    stockAmount: "",
    price1: "",
  });

  const handleSubmit = async () => {
    try {
      if (
        !productData.name ||
        !productData.fullName ||
        !productData.stockAmount ||
        !productData.price1
      ) {
        Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
        return;
      }

      // Slug oluştur
      const slug = productData.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      // Benzersiz SKU oluştur - timestamp ekleyerek benzersizliği artırıyoruz
      const timestamp = new Date().getTime();
      const randomStr = Math.random().toString(36).substring(7);
      const sku = `${timestamp}-${randomStr}`;

      const productToCreate = {
        name: productData.name,
        fullName: productData.fullName,
        slug: slug,
        sku: sku,
        stockAmount: Number(productData.stockAmount),
        price1: Number(productData.price1),
        currency: {
          id: 3,
          label: "TL",
          abbr: "TL",
        },
        discount: 0.0,
        discountType: 1,
        moneyOrderDiscount: 0.0,
        buyingPrice: 0.0,
        taxIncluded: 1,
        tax: 20,
        warranty: 24,
        volumetricWeight: 0.0,
        stockTypeLabel: "Piece",
        customShippingDisabled: 1,
        customShippingCost: 0.0,
        hasGift: 0,
        status: 1,
        hasOption: 0,
        installmentThreshold: "0",
        categoryShowcaseStatus: 0,
        categories: [
          {
            id: 490,
            name: "Giyim",
            sortOrder: 1,
            tree: "Giyim",
          },
        ],
      };

      await createProduct(productToCreate).unwrap();

      Alert.alert("Başarılı", "Ürün başarıyla eklendi.", [
        {
          text: "Tamam",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Hata", "Ürün eklenirken bir hata oluştu.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Ürün Ekle",
          headerTitleStyle: styles.headerTitle,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#1e293b"
              />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Ürün Adı</ThemedText>
          <TextInput
            style={styles.input}
            value={productData.name}
            onChangeText={(text) =>
              setProductData((prev) => ({ ...prev, name: text }))
            }
            placeholder="Ürün adını girin"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Tam Adı</ThemedText>
          <TextInput
            style={styles.input}
            value={productData.fullName}
            onChangeText={(text) =>
              setProductData((prev) => ({ ...prev, fullName: text }))
            }
            placeholder="Ürünün tam adını girin"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Stok Miktarı</ThemedText>
          <TextInput
            style={styles.input}
            value={productData.stockAmount}
            onChangeText={(text) =>
              setProductData((prev) => ({ ...prev, stockAmount: text }))
            }
            keyboardType="numeric"
            placeholder="Stok miktarını girin"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Fiyat (TL)</ThemedText>
          <TextInput
            style={styles.input}
            value={productData.price1}
            onChangeText={(text) =>
              setProductData((prev) => ({ ...prev, price1: text }))
            }
            keyboardType="numeric"
            placeholder="Fiyat girin"
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isLoading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <ThemedText style={styles.submitButtonText}>Ürün Ekle</ThemedText>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1e293b",
  },
  backButton: {
    padding: 8,
  },
  form: {
    padding: 16,
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#475569",
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1e293b",
  },
  submitButton: {
    backgroundColor: "#4338ca",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
