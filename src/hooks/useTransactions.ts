import {
  useEffect,
  useState,
} from "react";

import {
  Transaction,
  TransactionType,
} from "@/src/types/transaction.types";

import {
  createTransaction,
  deleteTransaction,
  getBalance,
  getTransactions,
  updateTransaction,
} from "@/src/services/transactionService";

import {
  useAuth,
} from "@/src/contexts/AuthContext";

interface TransactionData {
  amount: number;
  type: TransactionType;
  description: string;
  categoryId: number;
  photoUrl?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export function useTransactions() {
  const { token } = useAuth();

  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [balance, setBalance] =
    useState(0);

  const [totalIncome, setTotalIncome] =
    useState(0);

  const [totalExpense, setTotalExpense] =
    useState(0);

  async function loadTransactions() {
    if (!token) return;

    try {
      setLoading(true);

      const data =
        await getTransactions(token);

      setTransactions(data);

      const balanceData =
        await getBalance(token);

      setBalance(
        balanceData.balance
      );

      setTotalIncome(
        balanceData.income
      );

      setTotalExpense(
        balanceData.expense
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function addTransaction(
    data: TransactionData
  ) {
    if (!token) return;

    await createTransaction(
      data,
      token
    );

    await loadTransactions();
  }

  async function editTransaction(
    id: number,
    data: TransactionData
  ) {
    if (!token) return;

    await updateTransaction(
      id,
      data,
      token
    );

    await loadTransactions();
  }

  async function removeTransaction(
    id: number
  ) {
    if (!token) return;

    await deleteTransaction(
      id,
      token
    );

    await loadTransactions();
  }

  useEffect(() => {
    loadTransactions();
  }, [token]);

  return {
    transactions,
    loading,
    balance,
    totalIncome,
    totalExpense,
    addTransaction,
    editTransaction,
    removeTransaction,
    loadTransactions,
  };
}