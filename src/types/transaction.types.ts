export type TransactionType =
  | "income"
  | "expense";

export interface Transaction {
  id: number;
  amount: number;
  type: TransactionType;
  description: string;
  date: string;
  categoryId: number;
  receiptUrl?: string;
  latitude?: number;
  longitude?: number;
}