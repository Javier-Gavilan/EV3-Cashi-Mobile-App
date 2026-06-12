import { apiRequest } from "@/src/services/apiService";

import {
    Transaction,
} from "@/src/types/transaction.types";

interface TransactionPayload {
    amount: number;
    type: "income" | "expense";
    description: string;
    categoryId: number;
    receiptUrl?: string;
    latitude?: number;
    longitude?: number;
}

interface BalanceResponse {
    income: number;
    expense: number;
    balance: number;
}

export async function getTransactions(
    token: string
) {
    return apiRequest<Transaction[]>(
        "/transactions",
        {
            token,
        }
    );
}

export async function getTransactionById(
    id: number,
    token: string
) {
    return apiRequest<Transaction>(
        `/transactions/${id}`,
        {
            token,
        }
    );
}

export async function createTransaction(
    data: TransactionPayload,
    token: string
) {
    return apiRequest<Transaction>(
        "/transactions",
        {
            method: "POST",
            token,
            body: data,
        }
    );
}

export async function updateTransaction(
    id: number,
    data: TransactionPayload,
    token: string
) {
    return apiRequest<Transaction>(
        `/transactions/${id}`,
        {
            method: "PATCH",
            token,
            body: data,
        }
    );
}

export async function deleteTransaction(
    id: number,
    token: string
) {
    return apiRequest<void>(
        `/transactions/${id}`,
        {
            method: "DELETE",
            token,
        }
    );
}

export async function getBalance(
    token: string
) {
    return apiRequest<BalanceResponse>(
        "/transactions/balance",
        {
            token,
        }
    );
}

export async function uploadTransactionImage(
    imageUri: string,
    token: string
) {
    const formData = new FormData();

    formData.append(
        "file",
        {
            uri: imageUri,
            name: "receipt.jpg",
            type: "image/jpeg",
        } as any
    );

    return apiRequest<{
        imageUrl: string;
    }>(
        "/transactions/upload",
        {
            method: "POST",
            token,
            body: formData,
            isFormData: true,
        }
    );
}