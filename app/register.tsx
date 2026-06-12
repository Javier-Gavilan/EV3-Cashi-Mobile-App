import { Text } from "@/components/Themed";

import { useRouter } from "expo-router";

import { useState } from "react";

import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/src/contexts/AuthContext";

export default function RegisterScreen() {
    const router = useRouter();

    const { register } = useAuth();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    async function handleRegister() {
        try {
            setLoading(true);

            setError("");

            await register(email, password);

            router.replace("/(tabs)");
        } catch (err: any) {
            setError(
                err.message ||
                "Error al registrarse"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>
                    Registro
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {error !== "" && (
                    <Text style={styles.error}>
                        {error}
                    </Text>
                )}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading
                            ? "Cargando..."
                            : "Registrarse"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        router.back()
                    }
                >
                    <Text style={styles.link}>
                        Ya tengo cuenta
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },

    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 24,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        backgroundColor: "#fff",
    },

    button: {
        backgroundColor: "#22c55e",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 8,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },

    error: {
        color: "red",
        marginBottom: 12,
        textAlign: "center",
    },

    link: {
        textAlign: "center",
        marginTop: 16,
        color: "#3b82f6",
        fontWeight: "bold",
    },
});