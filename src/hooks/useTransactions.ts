import { useEffect, useMemo, useState } from "react";

import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "@/src/storage/transactionStorage";

import {
  Transaction,
  TransactionType,
} from "@/src/types/transaction.types";

interface TransactionData {
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

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTransactions() {
    try {
      const data = await getTransactions();

      setTransactions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function addTransaction(
    data: TransactionData
  ) {
    await createTransaction(data);

    await loadTransactions();
  }

  async function editTransaction(
    id: string,
    data: TransactionData
  ) {
    await updateTransaction(id, data);

    await loadTransactions();
  }

  async function removeTransaction(id: string) {
    await deleteTransaction(id);

    await loadTransactions();
  }

  const totalIncome = useMemo(() => {
    return transactions
      .filter(
        (transaction) =>
          transaction.type === "income"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter(
        (transaction) =>
          transaction.type === "expense"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );
  }, [transactions]);

  const balance = useMemo(() => {
    return totalIncome - totalExpense;
  }, [totalIncome, totalExpense]);

  useEffect(() => {
    loadTransactions();
  }, []);

  return {
    transactions,

    loading,

    totalIncome,
    totalExpense,
    balance,

    addTransaction,
    editTransaction,
    removeTransaction,

    loadTransactions,
  };
}