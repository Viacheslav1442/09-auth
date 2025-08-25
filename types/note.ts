export interface Note {
    tag: NoteTag;
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    description?: string;
    excerpt?: string;
    coverUrl?: string;
    image?: string;
}

export interface NewNoteData {
    title: string;
    content: string;
    tag: NoteTag;
}

export interface FetchNotesResponse {
    notes: Note[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}




export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';


export type AuthRequestData = {
    email: string;
    password: string;
}
export type User = {
    id: string;
    email: string;
    userName: string;
    createdAt: string;
    updatedAt: string;
}