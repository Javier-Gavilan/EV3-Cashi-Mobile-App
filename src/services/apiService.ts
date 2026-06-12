const BASE_URL = "https://cashi-api-un4v.onrender.com";

interface RequestOptions {
    method?: string;
    token?: string;
    body?: unknown;
    isFormData?: boolean;
}

export async function apiRequest<T>(
    endpoint: string,
    options?: RequestOptions
): Promise<T> {
    const {
        method = "GET",
        token,
        body,
        isFormData = false,
    } = options || {};

    try {
        const response = await fetch(
            `${BASE_URL}${endpoint}`,
            {
                method,

                headers: {
                    ...(token && {
                        Authorization: `Bearer ${token}`,
                    }),

                    ...(!isFormData && {
                        "Content-Type":
                            "application/json",
                    }),
                },

                body: body
                    ? isFormData
                        ? (body as BodyInit)
                        : JSON.stringify(body)
                    : undefined,
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data?.error ||
                "Error del servidor"
            );
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            if (
                error.message.includes("Network")
            ) {
                throw new Error(
                    "Error de conexión"
                );
            }

            throw error;
        }

        throw new Error(
            "Error de conexión"
        );
    }
}