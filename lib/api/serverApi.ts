import { api } from "./api";
import type { User } from "@/types/user";


export async function getMeServer(cookieHeader?: string): Promise<User> {
    const { data } = await api.get<User>("/users/me", {
        headers: { Cookie: cookieHeader ?? "" },
    });
    return data;
}

export async function getSessionServer(cookieHeader?: string): Promise<User | null> {
    const res = await api.get("/auth/session", {
        headers: { Cookie: cookieHeader ?? "" },
    }).catch(() => null);
    if (!res) return null;
    return (res.data as User) ?? null;
}
