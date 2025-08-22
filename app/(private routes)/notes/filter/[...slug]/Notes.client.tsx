'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { fetchNotes, FetchNotesResponse } from '@/lib/api';
import css from './NotesPage.module.css';
import { NoteTag } from '@/types/note';

interface NotesClientProps {
    initialData: FetchNotesResponse;
    tag: NoteTag | string;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
        queryKey: ['notes', searchQuery, currentPage, tag],
        queryFn: () =>
            fetchNotes(
                currentPage,
                12,
                searchQuery,
                tag !== 'All' ? (tag as string) : undefined
            ),

        placeholderData: initialData,
    });

    const changeSearchQuery = useDebouncedCallback((newQuery: string) => {
        setCurrentPage(1);
        setSearchQuery(newQuery);
    }, 300);

    const totalPages = data?.totalPages ?? 0;
    const notes = data?.notes ?? [];

    return (
        <div className={css.app}>
            <main>
                <section>
                    <header className={css.toolbar}>
                        <SearchBox value={searchQuery} onChange={changeSearchQuery} />

                        <div className={css.actions}>
                            <Link href="/notes/action/create" className={css.button}>
                                Create note +
                            </Link>

                            {totalPages > 1 && (
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onPageChange={setCurrentPage}
                                />
                            )}
                        </div>
                    </header>

                    {isLoading && <p className={css.info}>Loading notes…</p>}
                    {isError && <p className={css.error}>Failed to load notes. Try again later.</p>}

                    {!isLoading && notes.length === 0 && (
                        <p className={css.info}>No notes found.</p>
                    )}

                    {notes.length > 0 && <NoteList notes={notes} />}
                </section>
            </main>
        </div>
    );
}