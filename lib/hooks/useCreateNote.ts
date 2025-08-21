import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note, NewNoteData } from "@/types/note";
import { addNote } from "../api";

export function useCreateNote() {
    const queryClient = useQueryClient();

    return useMutation<Note, Error, NewNoteData>({
        mutationFn: addNote,
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });
}
