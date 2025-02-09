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
import { useCreateCategoryMutation } from "@/store/services/api";

export default function AddCategoryScreen() {
  const router = useRouter();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const [categoryData, setCategoryData] = useState({
    name: "",
    sortOrder: "0",
  });

  const handleSubmit = async () => {
    try {
      if (!categoryData.name) {
        Alert.alert("Hata", "Lütfen kategori adını girin.");
        return;
      }

      // Slug oluştur
      const slug = categoryData.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      const categoryToCreate = {
        name: categoryData.name,
        slug: slug,
        sortOrder: Number(categoryData.sortOrder),
        status: 1 as 0 | 1,
        displayShowcaseContent: 1 as 0 | 1,
        showcaseContentDisplayType: 1 as 1 | 2 | 3,
        displayShowcaseFooterContent: 1 as 0 | 1,
        showcaseContentId: null,
        showcaseFooterContentId: null,
        metaKeywords: "",
        showcaseFooterContentDisplayType: 1 as 1 | 2 | 3,
        isCombine: 0 as 0 | 1,
        isSearchable: 1 as 0 | 1,
      };

      await createCategory(categoryToCreate).unwrap();

      Alert.alert("Başarılı", "Kategori başarıyla eklendi.", [
        {
          text: "Tamam",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Hata", "Kategori eklenirken bir hata oluştu.");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Kategori Ekle",
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

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Kategori Adı</ThemedText>
            <TextInput
              style={styles.input}
              value={categoryData.name}
              onChangeText={(text) =>
                setCategoryData((prev) => ({ ...prev, name: text }))
              }
              placeholder="Kategori adını girin"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Sıralama</ThemedText>
            <TextInput
              style={styles.input}
              value={categoryData.sortOrder}
              onChangeText={(text) =>
                setCategoryData((prev) => ({ ...prev, sortOrder: text }))
              }
              keyboardType="numeric"
              placeholder="Sıralama değerini girin"
              placeholderTextColor="#94a3b8"
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
              <ThemedText style={styles.submitButtonText}>
                Kategori Ekle
              </ThemedText>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
