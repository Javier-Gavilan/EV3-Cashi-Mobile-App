import { useState } from "react";

import * as ImagePicker from "expo-image-picker";

export function useImagePicker() {
  const [imageUri, setImageUri] =
    useState<string>("");

  const [error, setError] =
    useState<string>("");

  async function takePhoto() {
    setError("");

    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      setError(
        "Se necesita permiso para usar la cámara"
      );

      return;
    }

    const result =
      await ImagePicker.launchCameraAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        quality: 0.7,
      });

    if (!result.canceled) {
      setImageUri(
        result.assets[0].uri
      );
    }
  }

  async function pickImage() {
    setError("");

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      setError(
        "Se necesita permiso para acceder a la galería"
      );

      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        quality: 0.7,
      });

    if (!result.canceled) {
      setImageUri(
        result.assets[0].uri
      );
    }
  }

  return {
    imageUri,
    error,
    setImageUri,
    takePhoto,
    pickImage,
  };
}