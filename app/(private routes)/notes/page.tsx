"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";
import type { FetchNotesResponse } from "@/lib/api";

export default function NotesPage() {
    const { data, isLoading, isError } = useQuery<Note[]>({
        queryKey: ["notes"],
        queryFn: async () => {
            const res: FetchNotesResponse = await fetchNotes();
            return res.notes; // якщо у відповіді є notes
        },
    });

    if (isLoading) {
        return <p>Loading notes...</p>;
    }

    if (isError) {
        return <p>Failed to load notes</p>;
    }

    if (!data || data.length === 0) {
        return <p>No notes found</p>;
    }

    return (
        <main>
            <h1>Notes</h1>
            <ul>
                {data.map((note) => (
                    <li key={note.id}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
