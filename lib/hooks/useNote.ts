import { useQuery } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import { fetchNoteById } from "../api";

export function useNote(id: string) {
    return useQuery<Note, Error>({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        enabled: Boolean(id), // хук не виконується, якщо id пустий
    });
}
