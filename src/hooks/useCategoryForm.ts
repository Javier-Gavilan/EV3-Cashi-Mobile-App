import {
  useEffect,
  useState,
} from "react";

import {
  categorySchema,
} from "@/src/schemas/category.schema";

import {
  useCategories,
} from "@/src/hooks/useCategories";

import {
  getCategoryById,
} from "@/src/services/categoryService";

import {
  useAuth,
} from "@/src/contexts/AuthContext";

interface UseCategoryFormProps {
  id: string;
  onSuccess: () => void;
}

export function useCategoryForm({
  id,
  onSuccess,
}: UseCategoryFormProps) {
  const isEditing = id !== "new";

  const { token } = useAuth();

  const {
    addCategory,
    editCategory,
  } = useCategories();

  const [name, setName] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function loadCategory() {
    if (!isEditing || !token) return;

    try {
      setLoading(true);

      const category =
        await getCategoryById(
          Number(id),
          token
        );

      setName(category.name);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategory();
  }, [token]);

  async function handleSubmit() {
    const result =
      categorySchema.safeParse({
        name,
      });

    if (!result.success) {
      setError(
        result.error.issues[0].message
      );

      return;
    }

    setError("");

    if (isEditing) {
      await editCategory(
        Number(id),
        name
      );
    } else {
      await addCategory(name);
    }

    onSuccess();
  }

  return {
    name,
    setName,
    error,
    loading,
    isEditing,
    handleSubmit,
  };
}