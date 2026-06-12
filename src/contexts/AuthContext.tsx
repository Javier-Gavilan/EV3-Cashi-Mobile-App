import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import * as SecureStore from "expo-secure-store";

import { apiRequest } from "@/src/services/apiService";

interface AuthContextData {
    token: string | null;

    loading: boolean;

    login: (
        email: string,
        password: string
    ) => Promise<void>;

    register: (
        email: string,
        password: string
    ) => Promise<void>;

    logout: () => Promise<void>;
}

const AuthContext =
    createContext<AuthContextData>(
        {} as AuthContextData
    );

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [token, setToken] =
        useState<string | null>(null);

    const [loading, setLoading] =
        useState(true);

    async function loadToken() {
        try {
            const storedToken =
                await SecureStore.getItemAsync(
                    "token"
                );

            if (storedToken) {
                setToken(storedToken);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function login(
        email: string,
        password: string
    ) {
        const response = await apiRequest<{
            token: string;
        }>("/auth/login", {
            method: "POST",

            body: JSON.stringify({
                email,
                password,
            }),
        });

        await SecureStore.setItemAsync(
            "token",
            response.token
        );

        setToken(response.token);
    }

    async function register(
        email: string,
        password: string
    ) {
        const response = await apiRequest<{
            token: string;
        }>("/auth/register", {
            method: "POST",

            body: JSON.stringify({
                email,
                password,
            }),
        });

        await SecureStore.setItemAsync(
            "token",
            response.token
        );

        setToken(response.token);
    }

    async function logout() {
        await SecureStore.deleteItemAsync(
            "token"
        );

        setToken(null);
    }

    useEffect(() => {
        loadToken();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}