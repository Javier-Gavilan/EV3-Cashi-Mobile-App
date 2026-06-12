import FontAwesome from "@expo/vector-icons/FontAwesome";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useFonts } from "expo-font";

import {
  Stack
} from "expo-router";

import * as SplashScreen from "expo-splash-screen";

import {
  useEffect,
} from "react";

import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";

import {
  AuthProvider,
  useAuth,
} from "@/src/contexts/AuthContext";

export {
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require(
      "../assets/fonts/SpaceMono-Regular.ttf"
    ),

    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const {
    token,
    loading,
  } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <ThemeProvider
      value={
        colorScheme === "dark"
          ? DarkTheme
          : DefaultTheme
      }
    >
      {!token ? (
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      ) : (
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="transaction/[id]"
            options={{
              title: "Transacción",
            }}
          />

          <Stack.Screen
            name="category/[id]"
            options={{
              title: "Categoría",
            }}
          />

          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
            }}
          />
        </Stack>
      )}
    </ThemeProvider>
  );
}