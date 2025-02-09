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
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/store/services/api";

export default function AddCategoryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isEdited = params.isEdited === "true";
  const categoryId = params.categoryId ? Number(params.categoryId) : null;

  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const [name, setName] = useState((params.categoryName as string) || "");

  const handleSubmit = async () => {
    try {
      if (!name) {
        Alert.alert("Hata", "Lütfen kategori adını girin.");
        return;
      }

      if (isEdited && categoryId) {
        await updateCategory({
          id: categoryId,
          category: {
            id: categoryId,
            name,
            slug: name
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "-")
              .replace(/-+/g, "-")
              .replace(/^-|-$/g, ""),
            sortOrder: 1,
            status: 1 as 0 | 1,
            displayShowcaseContent: 0 as 0 | 1 | 2,
            showcaseContentDisplayType: 2 as 1 | 2 | 3,
            displayShowcaseFooterContent: 0 as 0 | 1 | 2,
            showcaseFooterContentDisplayType: 1 as 1 | 2 | 3,
            hasChildren: 0 as 0 | 1,
            isCombine: 1 as 0 | 1,
            isSearchable: 1 as 0 | 1,
            distributor: null,
            distributorCode: null,
            percent: 0,
            imageFile: null,
            showcaseContent: null,
            showcaseFooterContent: null,
            pageTitle: null,
            metaDescription: null,
            metaKeywords: null,
            canonicalUrl: null,
            parent: null,
            children: [],
            imageUrl: null,
            seoSetting: null,
            createdAt: new Date().toISOString(),
          },
        }).unwrap();

        Alert.alert("Başarılı", "Kategori başarıyla güncellendi.", [
          {
            text: "Tamam",
            onPress: () => router.back(),
          },
        ]);
      } else {
        // Slug oluştur
        const slug = name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");

        const categoryToCreate = {
          name,
          slug,
          sortOrder: 1,
          status: 1 as 0 | 1,
          displayShowcaseContent: 0 as 0 | 1 | 2,
          showcaseContentDisplayType: 2 as 1 | 2 | 3,
          displayShowcaseFooterContent: 0 as 0 | 1 | 2,
          showcaseFooterContentDisplayType: 1 as 1 | 2 | 3,
          hasChildren: 0 as 0 | 1,
          isCombine: 1 as 0 | 1,
          isSearchable: 1 as 0 | 1,
        };

        await createCategory(categoryToCreate).unwrap();

        Alert.alert("Başarılı", "Kategori başarıyla eklendi.", [
          {
            text: "Tamam",
            onPress: () => router.back(),
          },
        ]);
      }
    } catch (error) {
      Alert.alert(
        "Hata",
        isEdited
          ? "Kategori güncellenirken bir hata oluştu."
          : "Kategori eklenirken bir hata oluştu."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: isEdited ? "Kategori Düzenle" : "Kategori Ekle",
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
              value={name}
              onChangeText={setName}
              placeholder="Kategori adını girin"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              (isCreating || isUpdating) && styles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={isCreating || isUpdating}
          >
            {isCreating || isUpdating ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <ThemedText style={styles.submitButtonText}>
                {isEdited ? "Kategori Güncelle" : "Kategori Ekle"}
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
