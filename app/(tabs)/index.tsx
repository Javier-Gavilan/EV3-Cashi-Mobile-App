import { useCallback } from "react";

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { EmptyState } from "@/src/components/EmptyState";

import { useFocusEffect } from "@react-navigation/native";

import { useRouter } from "expo-router";

import { useTransactions } from "@/src/hooks/useTransactions";

import { useCategories } from "@/src/hooks/useCategories";

export default function TransactionsScreen() {
  const router = useRouter();

  const {
    transactions,
    removeTransaction,
    loadTransactions,
  } = useTransactions();

  const { categories } = useCategories();

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  function getCategoryName(
    categoryId: string
  ) {
    const category = categories.find(
      (item) => item.id === categoryId
    );

    return category?.name ?? "Sin categoría";
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.addButton}
        onPress={() =>
          router.push({
            pathname:
              "/transaction/[id]",
            params: { id: "new" },
          })
        }
      >
        <Text style={styles.addButtonText}>
          Nueva Transacción
        </Text>
      </Pressable>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <EmptyState
            message="No hay transacciones registradas"
          />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.description}>
              {item.description}
            </Text>

            <Text>
              Categoría:{" "}
              {getCategoryName(item.categoryId)}
            </Text>

            <Text>
              Tipo:{" "}
              {item.type === "income"
                ? "Ingreso"
                : "Egreso"}
            </Text>

            <Text>
              Monto: ${item.amount}
            </Text>

            <View style={styles.actions}>
              <Pressable
                style={styles.editButton}
                onPress={() =>
                  router.push({
                    pathname:
                      "/transaction/[id]",
                    params: {
                      id: item.id,
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>
                  Detalles
                </Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() =>
                  removeTransaction(item.id)
                }
              >
                <Text style={styles.buttonText}>
                  Eliminar
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  addButton: {
    backgroundColor: "#22c55e",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },

  description: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  editButton: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 6,
  },

  deleteButton: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});