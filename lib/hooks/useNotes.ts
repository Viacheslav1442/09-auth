import { useQuery } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import type { FetchNotesResponse, FetchNotesParams } from "../api";
import { fetchNotes } from "../api";

export function useNotes(params?: FetchNotesParams) {
    return useQuery<Note[], Error>({
        queryKey: ["notes", params],
        queryFn: async () => {
            const res: FetchNotesResponse = await fetchNotes(
                params?.page,
                params?.perPage,
                params?.search,
                params?.tag
            );
            return res.notes; // повертаємо тільки масив Note[]
        },
    });
}
