import { fetchNoteById } from "@/lib/api";
import NotePreview from "./NotePreview.client";
import styles from "@/css/Modal.module.css";
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";


type Props = {
    params: Promise<{ id: string }>;
};

export default async function NoteModalPage({ params }: Props) {
    const resolvedParams = await params;
    const { id } = resolvedParams;


    const queryClient = new QueryClient();


    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <div className={styles.modalBackdrop}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NotePreview id={id} />
            </HydrationBoundary>
        </div>
    );
}