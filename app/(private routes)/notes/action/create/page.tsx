import CreateNotePageClient from "./CreateNotePage.client";
import type { Metadata } from "next";

const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    process.env.BASE_URL ??
    "http://localhost:3000";

export const metadata: Metadata = {
    title: "Create Note - NoteHub",
    description: "Create a new note in NoteHub",
    openGraph: {
        title: "Create Note - NoteHub",
        description: "Create a new note in NoteHub",
        url: `${baseUrl}/notes/action/create`,
        type: "website",
        siteName: "NoteHub",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "NoteHub — Create Note",
            },
        ],
    },
    alternates: {
        canonical: "/notes/action/create",
    },
};

export default function CreateNotePage() {
    return <CreateNotePageClient />;
}