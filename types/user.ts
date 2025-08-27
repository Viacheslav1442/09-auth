export interface User {
    email: string;
    username: string;
    avatar: string;
}

export interface UpdateUser {
    email?: string;
    username?: string;
    avatar?: string;
    password?: string;
}