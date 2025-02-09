import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router, Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";

interface MenuCardProps {
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
}

const MenuCard = ({ title, description, icon, onPress }: MenuCardProps) => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#4f46e5" : "#4338ca";

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: "#ffffff",
          borderColor: colorScheme === "dark" ? "#e5e7eb" : "#e2e8f0",
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.cardContent}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colorScheme === "dark" ? "#eef2ff" : "#f1f5f9" },
          ]}
        >
          <MaterialCommunityIcons name={icon} size={32} color={iconColor} />
        </View>
        <View style={styles.cardText}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            {title}
          </ThemedText>
          <ThemedText style={styles.cardDescription}>{description}</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = "#f8fafc";

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
          <ThemedView style={[styles.container, { backgroundColor }]}>
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <ThemedText type="title" style={styles.title}>
                  Yönetim Paneli
                </ThemedText>
                <ThemedText style={styles.subtitle}>
                  Ürün ve kategori yönetimini buradan yapabilirsiniz
                </ThemedText>
              </View>
            </View>

            <View style={styles.content}>
              <MenuCard
                title="Ürünler"
                description="Ürün listesi, ekleme, düzenleme ve silme işlemleri"
                icon="package-variant-closed"
                onPress={() => router.replace("./products")}
              />

              <MenuCard
                title="Kategoriler"
                description="Kategori listesi, ekleme, düzenleme ve silme işlemleri"
                icon="shape"
                onPress={() => router.replace("./categories")}
              />
            </View>
          </ThemedView>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: Platform.OS === "ios" ? 10 : 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    paddingHorizontal: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    lineHeight: 24,
    color: "#475569",
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#1e293b",
  },
  cardDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
    color: "#475569",
  },
});
