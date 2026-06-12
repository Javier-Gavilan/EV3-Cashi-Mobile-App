import { Text } from "@/components/Themed";

import {
  useRouter,
} from "expo-router";

import {
  useState,
} from "react";

import {
  Pressable,
  StyleSheet,
  TextInput
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  login,
} from "@/src/services/authService";

import {
  useAuth,
} from "@/src/contexts/AuthContext";

export default function LoginScreen() {
  const router = useRouter();

  const { signIn } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      setError("");

      const response =
        await login({
          email,
          password,
        });

      await signIn(
        response.token
      );

      router.replace("/(tabs)");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Error al iniciar sesión"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Login
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

      <Pressable
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading
            ? "Cargando..."
            : "Iniciar sesión"}
        </Text>
      </Pressable>

      <Pressable
        onPress={() =>
          router.push("/register")
        }
      >
        <Text style={styles.link}>
          Crear cuenta
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    padding: 20,
  },

  title: {
    fontSize: 28,

    fontWeight: "bold",

    marginBottom: 30,

    textAlign: "center",
  },

  input: {
    borderWidth: 1,

    borderColor: "#ccc",

    borderRadius: 8,

    padding: 12,

    marginBottom: 15,

    backgroundColor: "#fff",
  },

  button: {
    backgroundColor: "#22c55e",

    padding: 14,

    borderRadius: 8,

    alignItems: "center",

    marginTop: 10,
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
    marginTop: 20,

    textAlign: "center",

    color: "#2563eb",

    fontWeight: "bold",
  },
});