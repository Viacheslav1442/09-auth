'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNoteStore } from '@/lib/store/noteStore';
import css from '@/css/NoteForm.module.css';
import { createNote } from '../../lib/api/clientApi';
import type { NewNoteData } from '@/types/note';

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
export type NotePayload = {
    title: string;
    content: string;
    tag: NoteTag;
};

type Draft = {
    title?: string;
    content?: string;
    tag?: string;
};

type NoteFormProps = {
    onClose?: () => void;
};

const DEFAULT_FORM: NotePayload = {
    title: '',
    content: '',
    tag: 'Todo',
};

export default function NoteForm({ onClose }: NoteFormProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { draft, setDraft, clearDraft } = useNoteStore();

    const normalizeDraft = (d: Draft | undefined): NotePayload => ({
        title: d?.title ?? '',
        content: d?.content ?? '',
        tag: ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'].includes(d?.tag ?? '')
            ? (d!.tag as NoteTag)
            : 'Todo',
    });

    const [form, setForm] = useState<NotePayload>(() => normalizeDraft(draft));
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        setForm(normalizeDraft(draft));
    }, [draft]);


    const mutation = useMutation({
        mutationFn: (payload: NewNoteData) => createNote(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            clearDraft();
            setForm(DEFAULT_FORM);
            router.back();
            onClose?.();
        },
        onError: (err: unknown) => {
            if (err instanceof Error) setErrorMessage(err.message);
            else setErrorMessage('Failed to create note');
        },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const updated: NotePayload = { ...form, [name]: value } as NotePayload;
        setForm(updated);
        setDraft(updated);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!form.title.trim()) {
            setErrorMessage('Title is required');
            return;
        }


        const payload: NewNoteData = {
            title: form.title,
            content: form.content,
            tag: form.tag,
        };
        mutation.mutate(payload);
    };

    const handleCancel = () => {
        router.back();
        onClose?.();
    };


    const isSubmitting = mutation.isPending;

    return (
        <form className={css.form} onSubmit={handleSubmit} aria-busy={isSubmitting}>
            <label className={css.label}>
                Title:
                <input
                    className={css.input}
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                />
            </label>

            <label className={css.label}>
                Content:
                <textarea
                    className={css.textarea}
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    disabled={isSubmitting}
                />
            </label>

            <label className={css.label}>
                Tag:
                <select
                    className={css.select}
                    name="tag"
                    value={form.tag}
                    onChange={handleChange}
                    disabled={isSubmitting}
                >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </label>

            {errorMessage && <p role="alert" className={css.error}>{errorMessage}</p>}

            <div className={css.actions}>
                <button type="submit" className={css.button} disabled={isSubmitting}>
                    {isSubmitting ? 'Saving…' : 'Save'}
                </button>
                <button
                    type="button"
                    className={css.buttonCancel}
                    onClick={handleCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}