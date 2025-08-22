import { api } from "./api";
import type { User } from "@/types/user";

type AuthPayload = { email: string; password: string };

export async function register(payload: AuthPayload): Promise<User> {
    const { data } = await api.post<User>("/auth/register", payload);
    return data;
}
export async function login(payload: AuthPayload): Promise<User> {
    const { data } = await api.post<User>("/auth/login", payload);
    return data;
}
export async function logout(): Promise<void> {
    await api.post("/auth/logout");
}
export async function getSession(): Promise<User | null> {

    const res = await api.get("/auth/session").catch(() => null);
    if (!res) return null;
    return (res.data as User) ?? null;
}
export async function getMe(): Promise<User> {
    const { data } = await api.get<User>("/users/me");
    return data;
}
export async function updateMe(payload: Partial<User>): Promise<User> {
    const { data } = await api.patch<User>("/users/me", payload);
    return data;
}