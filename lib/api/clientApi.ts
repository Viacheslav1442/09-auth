import { api } from "./api";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";

type AuthPayload = { email: string; password: string };

// ---------------- AUTH ----------------

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

// ---------------- USER ----------------

export async function getMe(): Promise<User> {
    const { data } = await api.get<User>("/users/me");
    return data;
}

export async function updateMe(payload: Partial<User>): Promise<User> {
    const { data } = await api.patch<User>("/users/me", payload);
    return data;
}

// ---------------- NOTES ----------------

export async function fetchNotes(params?: {
    search?: string;
    page?: number;
    perPage?: number;
    tag?: string;
}): Promise<{ notes: Note[]; total: number }> {
    const { data } = await api.get("/notes", { params });
    return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
    const { data } = await api.get<Note>(`/notes/${id}`);
    return data;
}

export async function createNote(payload: Partial<Note>): Promise<Note> {
    const { data } = await api.post<Note>("/notes", payload);
    return data;
}

export async function deleteNote(id: string): Promise<void> {
    await api.delete(`/notes/${id}`);
}
