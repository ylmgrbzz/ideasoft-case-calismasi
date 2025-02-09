import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
  SafeAreaView,
  Alert,
  RefreshControl,
  Image,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "@/store/services/api";
import { Category } from "@/types/category";
import { useState, useCallback } from "react";

const getCategoryImage = (categoryName: string) => {
  switch (categoryName) {
    case "Giyim":
      return require("../assets/images/zaratshirt.jpg");
    case "Kozmetik":
      return require("../assets/images/vestelakıllısaat.jpg");
    case "Teknoloji":
      return require("../assets/images/iphone13.jpg");
    case "Ayakkabi":
      return require("../assets/images/pumasnekader.jpeg");
    default:
      return require("../assets/images/pumasnekader.jpeg");
  }
};

export default function CategoriesScreen() {
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useGetCategoriesQuery();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleDeleteCategory = async (id: number, name: string) => {
    Alert.alert(
      "Kategoriyi Sil",
      `"${name}" kategorisini silmek istediğinize emin misiniz?`,
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Sil",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCategory(id).unwrap();
              Alert.alert(
                "Başarılı",
                `"${name}" kategorisi başarıyla silindi.`
              );
              refetch(); // Listeyi yenile
            } catch (error) {
              console.error("Silme hatası:", error);
              Alert.alert(
                "Hata",
                "Kategori silinirken bir hata oluştu. Lütfen tekrar deneyin."
              );
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Category }) => (
    <View style={styles.categoryCard}>
      <View style={styles.categoryIcon}>
        <Image
          source={getCategoryImage(item.name)}
          style={styles.categoryImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.categoryInfo}>
        <View style={styles.categoryHeader}>
          <ThemedText style={styles.categoryName} numberOfLines={1}>
            {item.name}
          </ThemedText>
          <View style={styles.statusContainer}>
            <ThemedText
              style={[
                styles.statusText,
                { color: item.status === 1 ? "#059669" : "#dc2626" },
              ]}
            >
              {item.status === 1 ? "Aktif" : "Pasif"}
            </ThemedText>
          </View>
        </View>

        <View style={styles.categoryDetails}>
          <ThemedText style={styles.sortOrder}>
            Sıra: {item.sortOrder}
          </ThemedText>
          {item.hasChildren === 1 && (
            <ThemedText style={styles.hasChildren}>
              Alt Kategoriler Var
            </ThemedText>
          )}
        </View>

        <View style={styles.categoryMeta}>
          <ThemedText style={styles.distributorCode}>
            {item.distributorCode ? `Kod: ${item.distributorCode}` : ""}
          </ThemedText>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => {}}
        >
          <MaterialCommunityIcons name="pencil" size={20} color="#4338ca" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.deleteButton,
            isDeleting && styles.disabledButton,
          ]}
          onPress={() => handleDeleteCategory(item.id, item.name)}
          disabled={isDeleting}
        >
          <MaterialCommunityIcons
            name="delete"
            size={20}
            color={isDeleting ? "#9ca3af" : "#dc2626"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4338ca" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <MaterialCommunityIcons name="alert-circle" size={48} color="#dc2626" />
        <ThemedText style={styles.errorText}>
          Kategoriler yüklenirken bir hata oluştu
        </ThemedText>
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <ThemedText style={styles.retryText}>Tekrar Dene</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Kategoriler",
          headerTitleStyle: styles.headerTitle,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.replace("/")}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#1e293b"
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.addButton} onPress={() => {}}>
              <MaterialCommunityIcons name="plus" size={24} color="#ffffff" />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="shape-outline"
              size={64}
              color="#94a3b8"
            />
            <ThemedText style={styles.emptyText}>
              Henüz hiç kategori eklenmemiş
            </ThemedText>
          </View>
        )}
      />
    </SafeAreaView>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  categoryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: 12,
  },
  categoryIcon: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f1f5f9",
  },
  categoryImage: {
    width: "100%",
    height: "100%",
  },
  categoryInfo: {
    flex: 1,
    gap: 4,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    flex: 1,
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#f1f5f9",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  categoryDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sortOrder: {
    fontSize: 13,
    color: "#64748b",
  },
  hasChildren: {
    fontSize: 13,
    color: "#4338ca",
  },
  categoryMeta: {
    flexDirection: "row",
    gap: 12,
  },
  distributorCode: {
    fontSize: 12,
    color: "#94a3b8",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  editButton: {
    borderColor: "#4338ca",
    backgroundColor: "#eef2ff",
  },
  deleteButton: {
    borderColor: "#dc2626",
    backgroundColor: "#fef2f2",
  },
  addButton: {
    backgroundColor: "#4338ca",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#94a3b8",
    marginTop: 12,
  },
  errorText: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 12,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#4338ca",
  },
  retryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
  },
  backButton: {
    padding: 8,
  },
  disabledButton: {
    opacity: 0.5,
    borderColor: "#9ca3af",
    backgroundColor: "#f3f4f6",
  },
});
