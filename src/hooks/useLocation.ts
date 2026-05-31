import { useState } from "react";

import * as Location from "expo-location";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export function useLocation() {
  const [location, setLocation] =
    useState<Coordinates | null>(null);

  const [error, setError] =
    useState("");

  async function getCurrentLocation() {
    setError("");

    const permission =
      await Location.requestForegroundPermissionsAsync();

    if (!permission.granted) {
      setError(
        "Se necesita permiso para acceder a la ubicación"
      );

      return;
    }

    try {
      const position =
        await Location.getCurrentPositionAsync({
          accuracy:
            Location.Accuracy.High,
        });

      setLocation({
        latitude:
          position.coords.latitude,

        longitude:
          position.coords.longitude,
      });
    } catch {
      setError(
        "No fue posible obtener la ubicación"
      );
    }
  }

  return {
    location,
    error,
    getCurrentLocation,
    setLocation,
  };
}