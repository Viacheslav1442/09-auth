import axios from "axios";
import type { NewNoteData, Note } from "@/types/note";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});


const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
    baseURL: "https://notehub-public.goit.study/api",

    headers: token ? { Authorization: `Bearer ${token}` } : {},
});


export interface FetchNotesResponse {
    total: number;
    notes: Note[];
    totalPages: number,
    page: number;
    perPage: number;
}

export interface FetchNotesParams {
    page?: number;
    perPage?: number;
    search?: string;
    tag?: string;
}

export const fetchNotes = async (
    page = 1,
    perPage = 12,
    search = "",
    tag?: string
): Promise<FetchNotesResponse> => {
    const params: Record<string, string | number> = { page, perPage };

    if (search.trim() !== "") {
        params.search = search.trim();
    }

    if (tag && tag.trim() !== "") {
        params.tag = tag.trim();
    }

    const res = await instance.get<FetchNotesResponse>("/notes", {
        params,
    });
    return res.data;
};

export const addNote = async (newNote: NewNoteData): Promise<Note> => {
    const res = await instance.post<Note>("/notes", newNote);
    return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const res = await instance.delete<Note>(`/notes/${id}`);
    return res.data;
};



export const fetchNoteById = async (id: string): Promise<Note> => {
    const res = await instance.get<Note>(`/notes/${id}`);
    return res.data;
};
