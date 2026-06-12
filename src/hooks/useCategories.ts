import {
  useEffect,
  useState,
} from "react";

import {
  Category,
} from "@/src/types/category.types";

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/src/services/categoryService";

import {
  useAuth,
} from "@/src/contexts/AuthContext";

export function useCategories() {
  const { token } = useAuth();

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadCategories() {
    if (!token) return;

    try {
      setLoading(true);

      const data =
        await getCategories(token);

      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function addCategory(
    name: string
  ) {
    if (!token) return;

    await createCategory(
      name,
      token
    );

    await loadCategories();
  }

  async function editCategory(
    id: number,
    name: string
  ) {
    if (!token) return;

    await updateCategory(
      id,
      name,
      token
    );

    await loadCategories();
  }

  async function removeCategory(
    id: number
  ) {
    if (!token) return;

    await deleteCategory(
      id,
      token
    );
    await loadCategories();
  }

  useEffect(() => {
    loadCategories();
  }, [token]);

  return {
    categories,
    loading,
    loadCategories,
    addCategory,
    editCategory,
    removeCategory,
  };
}