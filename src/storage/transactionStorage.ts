import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGE_KEYS } from "@/src/constants/storageKeys";

import {
  Transaction,
  TransactionType,
} from "@/src/types/transaction.types";

export async function getTransactions(): Promise<Transaction[]> {
  const data = await AsyncStorage.getItem(
    STORAGE_KEYS.TRANSACTIONS
  );

  return data ? JSON.parse(data) : [];
}

export async function saveTransactions(
  transactions: Transaction[]
): Promise<void> {
  await AsyncStorage.setItem(
    STORAGE_KEYS.TRANSACTIONS,
    JSON.stringify(transactions)
  );
}

interface CreateTransactionData {
  amount: number;
  type: TransactionType;
  description: string;
  categoryId: string;

  photoUri?: string;

  location?: {
    latitude: number;
    longitude: number;
  };
}

export async function createTransaction(
  data: CreateTransactionData
): Promise<Transaction> {
  const transactions = await getTransactions();

  const newTransaction: Transaction = {
    id: Date.now().toString(),
    amount: data.amount,
    type: data.type,
    description: data.description,
    date: new Date().toISOString(),
    categoryId: data.categoryId,
    photoUri: data.photoUri,
    location: data.location,
  };

  const updatedTransactions = [
    ...transactions,
    newTransaction,
  ];

  await saveTransactions(updatedTransactions);

  return newTransaction;
}

export async function updateTransaction(
  id: string,
  data: CreateTransactionData
): Promise<void> {
  const transactions = await getTransactions();

  const updatedTransactions = transactions.map(
    (transaction) =>
      transaction.id === id
        ? {
          ...transaction,
          ...data,
        }
        : transaction
  );

  await saveTransactions(updatedTransactions);
}

export async function deleteTransaction(
  id: string
): Promise<void> {
  const transactions = await getTransactions();

  const updatedTransactions = transactions.filter(
    (transaction) => transaction.id !== id
  );

  await saveTransactions(updatedTransactions);
}

export async function getTransactionById(
  id: string
): Promise<Transaction | undefined> {
  const transactions = await getTransactions();

  return transactions.find(
    (transaction) => transaction.id === id
  );
}