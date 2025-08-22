"use client";

import { useRouter } from "next/navigation";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function CreateNotePageClient() {
    const router = useRouter();
    const handleClose = () => router.back();


    return <NoteForm onClose={handleClose} />;
}