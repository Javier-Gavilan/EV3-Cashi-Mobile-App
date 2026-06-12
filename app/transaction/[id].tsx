import { useLocalSearchParams, useRouter } from "expo-router";

import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import { Picker } from "@react-native-picker/picker";

import { useTransactionForm } from "@/src/hooks/useTransactionForm";

import { useCategories } from "@/src/hooks/useCategories";

import { useFocusEffect } from "@react-navigation/native";

import { useCallback, useEffect } from "react";

import { useImagePicker } from "@/src/hooks/useImagePicker";
import { useLocation } from "@/src/hooks/useLocation";

export default function TransactionFormScreen() {
    const router = useRouter();

    const { id } = useLocalSearchParams<{
        id: string;
    }>();

    const {
        amount,
        setAmount,

        type,
        setType,

        description,
        setDescription,

        categoryId,
        setCategoryId,

        photoUri,
        setPhotoUri,

        location,
        setLocation,

        error,

        isEditing,

        handleSubmit,
    } = useTransactionForm({
        id,
        onSuccess: () => router.back(),
    });

    const { categories, loadCategories } =
        useCategories();

    const {
        imageUri,
        takePhoto,
        pickImage,
        error: imageError,
    } = useImagePicker();

    const {
        location: currentLocation,
        getCurrentLocation,
        error: locationError,
    } = useLocation();

    useFocusEffect(
        useCallback(() => {
            loadCategories();
        }, [])
    );

    useEffect(() => {
        if (imageUri) {
            setPhotoUri(imageUri);
        }
    }, [imageUri]);

    useEffect(() => {
        if (currentLocation) {
            setLocation(currentLocation);
        }
    }, [currentLocation]);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : undefined
                }
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.title}>
                        {isEditing
                            ? "Detalles de la Transacción"
                            : "Nueva Transacción"}
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Descripción"
                        value={description}
                        onChangeText={setDescription}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Monto"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={type}
                            onValueChange={setType}
                        >
                            <Picker.Item
                                label="Egreso"
                                value="expense"
                            />

                            <Picker.Item
                                label="Ingreso"
                                value="income"
                            />
                        </Picker>
                    </View>

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={categoryId}
                            onValueChange={(value) =>
                                setCategoryId(
                                    value ? Number(value) : null
                                )
                            }
                        >
                            <Picker.Item
                                label="Seleccione categoría"
                                value={null}
                            />

                            {categories.map((category) => (
                                <Picker.Item
                                    key={category.id}
                                    label={category.name}
                                    value={category.id}
                                />
                            ))}
                        </Picker>
                    </View>

                    <Pressable
                        style={styles.secondaryButton}
                        onPress={takePhoto}
                    >
                        <Text style={styles.buttonText}>
                            Tomar Foto
                        </Text>
                    </Pressable>

                    <Pressable
                        style={styles.secondaryButton}
                        onPress={pickImage}
                    >
                        <Text style={styles.buttonText}>
                            Elegir de Galería
                        </Text>
                    </Pressable>

                    {photoUri !== "" && (
                        <Image
                            source={{ uri: photoUri }}
                            style={styles.preview}
                        />
                    )}

                    <Pressable
                        style={styles.secondaryButton}
                        onPress={getCurrentLocation}
                    >
                        <Text style={styles.buttonText}>
                            Obtener Ubicación
                        </Text>
                    </Pressable>

                    {location && (
                        <View style={styles.locationBox}>
                            <Text>
                                Latitud: {location.latitude}
                            </Text>

                            <Text>
                                Longitud: {location.longitude}
                            </Text>
                        </View>
                    )}

                    {error !== "" && (
                        <Text style={styles.error}>
                            {error}
                        </Text>
                    )}

                    {imageError !== "" && (
                        <Text style={styles.error}>
                            {imageError}
                        </Text>
                    )}

                    {locationError !== "" && (
                        <Text style={styles.error}>
                            {locationError}
                        </Text>
                    )}

                    <Pressable
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>
                            Guardar
                        </Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    scrollContent: {
        padding: 16,
        paddingBottom: 60,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        backgroundColor: "#fff",
    },

    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 12,
        overflow: "hidden",
        backgroundColor: "#fff",
    },

    error: {
        color: "red",
        marginBottom: 12,
    },

    button: {
        backgroundColor: "#22c55e",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },

    secondaryButton: {
        backgroundColor: "#3b82f6",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 12,
    },

    preview: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginBottom: 12,
    },

    locationBox: {
        marginBottom: 12,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});