import {
    useEffect,
    useState,
} from "react";

import {
    transactionSchema,
} from "@/src/schemas/transaction.schema";

import {
    useTransactions,
} from "@/src/hooks/useTransactions";

import {
    TransactionType,
} from "@/src/types/transaction.types";

import {
    getTransactionById,
    uploadTransactionImage,
} from "@/src/services/transactionService";

import {
    useAuth,
} from "@/src/contexts/AuthContext";

interface UseTransactionFormProps {
    id: string;

    onSuccess: () => void;
}

export function useTransactionForm({
    id,
    onSuccess,
}: UseTransactionFormProps) {
    const isEditing =
        id !== "new";

    const { token } =
        useAuth();

    const {
        addTransaction,
        editTransaction,
    } = useTransactions();

    const [amount, setAmount] =
        useState("");

    const [type, setType] =
        useState<TransactionType>(
            "expense"
        );

    const [
        description,
        setDescription,
    ] = useState("");

    const [categoryId, setCategoryId] =
        useState<number | null>(null);

    const [
        photoUri,
        setPhotoUri,
    ] = useState("");

    const [
        location,
        setLocation,
    ] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    const [error, setError] =
        useState("");

    async function loadTransaction() {
        if (
            !isEditing ||
            !token
        ) {
            return;
        }

        try {
            const transaction =
                await getTransactionById(
                    Number(id),
                    token
                );

            if (transaction) {
                setAmount(
                    transaction.amount.toString()
                );

                setType(
                    transaction.type
                );

                setDescription(
                    transaction.description
                );

                setCategoryId(
                    transaction.categoryId
                );

                setPhotoUri(
                    transaction.receiptUrl ??
                    ""
                );

                setLocation(
                    transaction.latitude != null &&
                    transaction.longitude != null
                        ? {
                            latitude:
                                transaction.latitude,
                            longitude:
                                transaction.longitude,
                        }
                        : null
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadTransaction();
    }, [token]);

    async function handleSubmit() {
        const parsedAmount =
            Number(amount);

        const parsedCategoryId =
            Number(categoryId);

        const result =
            transactionSchema.safeParse({
                amount: parsedAmount,
                type,
                description,
                categoryId:
                    parsedCategoryId,
            });

        if (!result.success) {
            setError(
                result.error.issues[0]
                    .message
            );

            return;
        }

        try {
            setError("");

            let uploadedPhotoUrl:
                | string
                | undefined =
                undefined;

            if (
                photoUri !== "" &&
                token
            ) {
                if (
                    photoUri.startsWith(
                        "file://"
                    )
                ) {
                    const uploadResponse =
                        await uploadTransactionImage(
                            photoUri,
                            token
                        );

                    uploadedPhotoUrl =
                        uploadResponse.imageUrl;
                } else {
                    uploadedPhotoUrl =
                        photoUri;
                }
            }

            const transactionData = {
                amount: parsedAmount,
                type,
                description,
                categoryId:
                    parsedCategoryId,
                date:
                    new Date().toISOString(),
                ...(uploadedPhotoUrl && {
                    receiptUrl:
                        uploadedPhotoUrl,
                }),
                ...(location && {
                    latitude:
                        location.latitude,
                    longitude:
                        location.longitude,
                }),
            };

            if (isEditing) {
                await editTransaction(
                    Number(id),
                    transactionData
                );
            } else {
                await addTransaction(
                    transactionData
                );
            }

            onSuccess();
        } catch (error) {
            if (
                error instanceof Error
            ) {
                setError(
                    error.message
                );
            } else {
                setError(
                    "Error al guardar"
                );
            }
        }
    }

    return {
        amount,
        setAmount,

        type,
        setType,

        description,
        setDescription,

        categoryId,
        setCategoryId,

        photoUri,
        setPhotoUri,

        location,
        setLocation,

        error,

        isEditing,

        handleSubmit,
    };
}