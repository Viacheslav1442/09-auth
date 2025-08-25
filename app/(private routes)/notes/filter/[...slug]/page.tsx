import { getNotesWithPaginationServer, FetchNotesResponse } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const tag = resolvedParams.slug?.[0] === "All" ? undefined : resolvedParams.slug?.[0];

    return {
        title: `Notes: ${tag || "All"}`,
        description: `List of notes filtered by tag: ${tag || "All"}. Ability to view, edit and delete notes. Create a new note.`,
        openGraph: {
            title: `Notes: ${tag || "All"}`,
            description: `List of notes filtered by tag: ${tag || "All"}. Ability to view, edit and delete notes. Create a new note.`,
            url: `https://09-auth-ruby.vercel.app/notes/filter/${tag || "All"}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: `Notes: ${tag || "All"}`,
                },
            ],
            type: "article",
        },
    };
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params;
    const tag = resolvedParams.slug?.[0] ?? "All";


    const initialData: FetchNotesResponse = await getNotesWithPaginationServer(
        1,                    // page
        "",                   // search
        tag !== "All" ? tag : "", // tag
        12                    // perPage
    );

    return <NotesClient initialData={initialData} tag={tag} />;
}
