import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import * as SecureStore from "expo-secure-store";

interface AuthContextData {
    token: string | null;

    loading: boolean;

    signIn: (token: string) => Promise<void>;

    signOut: () => Promise<void>;
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

    async function signIn(
        newToken: string
    ) {
        await SecureStore.setItemAsync(
            "token",
            newToken
        );

        setToken(newToken);
    }

    async function signOut() {
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
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}