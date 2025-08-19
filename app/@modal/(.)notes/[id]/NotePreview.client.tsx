"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "../../../../components/Modal/Modal";
import styles from "../../../../css/NotePreview.module.css";
import type { Note } from "@/types/note";

type Props = {
    id: string;
};

export default function NotePreview({ id }: Props) {
    const router = useRouter();

    const { data: note, isLoading, isError } = useQuery<Note>({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        enabled: Boolean(id),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const closeModal = () => {
        router.back();
    };

    const formatDate = (iso?: string) => {
        if (!iso) return null;
        const t = Date.parse(iso);
        if (isNaN(t)) return iso;
        return new Date(t).toLocaleString();
    };

    return (
        <Modal onClose={closeModal}>
            <div className={styles.modalContent}>
                <button className={styles.closeBtn} onClick={closeModal}>
                    ×
                </button>

                {isLoading && <p>Loading note...</p>}
                {isError && <p>Error loading note.</p>}

                {note && (
                    <>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>

                        {note.tag && (
                            <p className={styles.meta}>
                                <strong>Tag:</strong> {note.tag}
                            </p>
                        )}

                        {note.createdAt && (
                            <p className={styles.meta}>
                                <strong>Created:</strong> {formatDate(note.createdAt)}
                            </p>
                        )}
                    </>
                )}
            </div>
        </Modal>
    );
}