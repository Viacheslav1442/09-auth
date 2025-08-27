"use server";

import axios from "axios";
import { cookies } from "next/headers";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";


// ----- Типи -----
export interface FetchNotesResponse {
    notes: Note[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}

// ----- Axios -----
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
    headers: { "Content-Type": "application/json" },
});

// ----- Користувачі -----
export async function getCurrentUserServer(): Promise<User | null> {
    try {
        const cookieStore = await cookies();
        const cookieStr = cookieStore.getAll().map(({ name, value }) => `${name}=${value}`).join("; ");

        const response = await api.get<User>("/users/me", { headers: { Cookie: cookieStr } });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 401) return null;
        throw error;
    }
}

export async function updateUserProfileServer(data: Partial<User>): Promise<User> {
    const cookieStore = await cookies();
    const cookieStr = cookieStore.getAll().map(({ name, value }) => `${name}=${value}`).join("; ");

    const response = await api.patch<User>("/users/me", data, { headers: { Cookie: cookieStr } });
    return response.data;
}

// ----- Сесії ----
export const checkSessionServer = async (): Promise<boolean> => {
    const cookieStore = await cookies();
    const { data } = await api.get('/auth/session', { headers: { Cookie: cookieStore.toString(), }, });
    return data.success;
};
// ----- Нотатки -----
export async function getNotesServer(): Promise<Note[]> {
    const cookieStore = await cookies();
    const cookieStr = cookieStore.getAll().map(({ name, value }) => `${name}=${value}`).join("; ");

    const response = await api.get<Note[]>("/notes", { headers: { Cookie: cookieStr } });
    return response.data;
}

export async function getNotesWithPaginationServer(
    page = 1,
    search = "",
    tag = "",
    perPage = 12
): Promise<FetchNotesResponse> {
    const cookieStore = await cookies();
    const cookieStr = cookieStore.getAll().map(({ name, value }) => `${name}=${value}`).join("; ");

    const params: Record<string, string | number> = { page, perPage };
    if (search) params.search = search;
    if (tag) params.tag = tag;

    const response = await api.get<Note[]>("/notes", { params, headers: { Cookie: cookieStr } });

    let total = response.data.length;
    let totalPages = 1;
    const totalCountHeader = response.headers["x-total-count"] ?? response.headers["X-Total-Count"];
    if (totalCountHeader) {
        const n = parseInt(totalCountHeader as string, 10);
        if (!isNaN(n)) {
            total = n;
            totalPages = Math.max(1, Math.ceil(n / perPage));
        }
    }

    return {
        notes: response.data,
        total,
        page,
        perPage,
        totalPages,
    };
}

export async function getNoteByIdServer(id: string): Promise<Note> {
    const cookieStore = await cookies();
    const cookieStr = cookieStore.getAll().map(({ name, value }) => `${name}=${value}`).join("; ");

    const response = await api.get<Note>(`/notes/${id}`, { headers: { Cookie: cookieStr } });
    return response.data;
}

export async function createNoteServer(note: Pick<Note, "title" | "content" | "tag">): Promise<Note> {
    const cookieStore = await cookies();
    const cookieStr = cookieStore.getAll().map(({ name, value }) => `${name}=${value}`).join("; ");

    const response = await api.post<Note>("/notes", note, { headers: { Cookie: cookieStr } });
    return response.data;
}

export async function deleteNoteServer(id: string): Promise<void> {
    const cookieStore = await cookies();
    const cookieStr = cookieStore.getAll().map(({ name, value }) => `${name}=${value}`).join("; ");

    await api.delete(`/notes/${id}`, { headers: { Cookie: cookieStr } });
}
