"use client";

import { useNotes } from "../../../lib/hooks/useNotes";
import type { Note } from "@/types/note";

export default function NotesPage() {
    const { data, isLoading, isError } = useNotes();

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
                {data.map((note: Note) => (
                    <li key={note.id}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
