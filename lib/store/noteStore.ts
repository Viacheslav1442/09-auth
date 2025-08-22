import { create } from "zustand";
import { persist } from "zustand/middleware";

type Draft = {
    title: string;
    content: string;
    tag: string;
};

const initialDraft: Draft = {
    title: "",
    content: "",
    tag: "Todo",
};

type NoteStore = {
    draft: Draft;
    setDraft: (note: Partial<Draft>) => void;
    clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (note) =>
                set((state) => ({
                    draft: { ...state.draft, ...note },
                })),
            clearDraft: () => set({ draft: initialDraft }),
        }),
        {
            name: "note-draft",
        }
    )
);