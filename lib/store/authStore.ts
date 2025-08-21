"use client";

import { create } from "zustand";
import type { User } from "@/types/user";
import type { NotePayload } from "@/components/NoteForm/NoteForm";

// Auth store
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: true }),
    clear: () => set({ user: null, isAuthenticated: false }),
}));

// Note store
interface NoteStore {
    draft?: NotePayload;
    setDraft: (draft: NotePayload) => void;
    clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
    draft: undefined,
    setDraft: (draft: NotePayload) => set({ draft }),
    clearDraft: () => set({ draft: undefined }),
}));
