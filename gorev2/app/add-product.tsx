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
    sku: "",
    stockAmount: "",
    price1: "",
    currency: {
      id: 1,
      label: "TL",
    },
    taxIncluded: 1 as 0 | 1,
    tax: 18,
    stockTypeLabel: "Piece" as const,
    status: 1 as 0 | 1,
  });

  const handleSubmit = async () => {
    try {
      if (
        !productData.name ||
        !productData.sku ||
        !productData.stockAmount ||
        !productData.price1
      ) {
        Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
        return;
      }

      await createProduct({
        ...productData,
        stockAmount: Number(productData.stockAmount),
        price1: Number(productData.price1),
      }).unwrap();

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
          <ThemedText style={styles.label}>SKU</ThemedText>
          <TextInput
            style={styles.input}
            value={productData.sku}
            onChangeText={(text) =>
              setProductData((prev) => ({ ...prev, sku: text }))
            }
            placeholder="Stok kodunu girin"
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
