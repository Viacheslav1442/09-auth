"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";
import css from "./NotesPage.module.css";

export default function NotesPage() {
    const [page, setPage] = useState(1);
    const perPage = 12;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["notes", page],
        queryFn: () => fetchNotes(page, perPage),

    });

    if (isLoading) return <p>Loading notes...</p>;
    if (isError) return <p>Failed to load notes</p>;
    if (!data || data.notes.length === 0) return <p>No notes found</p>;

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (page < data.totalPages) setPage((prev) => prev + 1);
    };

    return (
        <main className={css.main}>
            <h1>Notes</h1>
            <ul className={css.list}>
                {data.notes.map((note: Note) => (
                    <li key={note.id} className={css.item}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                    </li>
                ))}
            </ul>

            <div className={css.pagination}>
                <button onClick={handlePrev} disabled={page === 1}>
                    Prev
                </button>
                <span>
                    Page {page} of {data.totalPages}
                </span>
                <button onClick={handleNext} disabled={page === data.totalPages}>
                    Next
                </button>
            </div>
        </main>
    );
}
