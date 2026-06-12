import { apiRequest } from "./api";

import {
    AuthCredentials,
    AuthResponse,
} from "@/src/types/auth.types";

export async function login(
    credentials: AuthCredentials
) {
    return apiRequest<AuthResponse>(
        "/auth/login",
        {
            method: "POST",
            body: credentials,
        }
    );
}

export async function register(
    credentials: AuthCredentials
) {
    return apiRequest<AuthResponse>(
        "/auth/register",
        {
            method: "POST",
            body: credentials,
        }
    );
}