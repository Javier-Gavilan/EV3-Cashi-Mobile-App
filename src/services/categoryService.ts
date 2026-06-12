import { apiRequest } from "@/src/services/apiService";

import {
    Category,
} from "@/src/types/category.types";

export async function getCategories(
    token: string
) {
    return apiRequest<Category[]>(
        "/categories",
        {
            token,
        }
    );
}

export async function getCategoryById(
    id: number,
    token: string
) {
    return apiRequest<Category>(
        `/categories/${id}`,
        {
            token,
        }
    );
}

export async function createCategory(
    name: string,
    token: string
) {
    return apiRequest<Category>(
        "/categories",
        {
            method: "POST",
            token,
            body: {
                name,
            },
        }
    );
}

export async function updateCategory(
    id: number,
    name: string,
    token: string
) {
    return apiRequest<Category>(
        `/categories/${id}`,
        {
            method: "PATCH",
            token,
            body: {
                name,
            },
        }
    );
}

export async function deleteCategory(
    id: number,
    token: string
) {
    return apiRequest<void>(
        `/categories/${id}`,
        {
            method: "DELETE",
            token,
        }
    );
}