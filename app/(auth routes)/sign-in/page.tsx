'use client';

import css from "./SignInPage.module.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser, type LoginData } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import type { User } from "@/types/user";
import { useAuthStore } from "@/lib/store/authStore";
import type { AxiosError } from "axios";

export default function SignInPage() {
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);
    const clear = useAuthStore((state) => state.clear);

    const mutation = useMutation<User, AxiosError<{ message?: string }>, LoginData>({
        mutationFn: (loginData) => loginUser(loginData),
        onSuccess: (user) => {
            setUser(user);
            router.replace("/profile");
        },
        onError: (err) => {
            setError(err.response?.data?.message ?? "Login error");
        },
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        const form = new FormData(e.currentTarget);
        const email = String(form.get("email"));
        const password = String(form.get("password"));

        mutation.mutate({ email, password });
    };

    return (
        <main className={css.mainContent}>
            <form className={css.form} onSubmit={onSubmit}>
                <h1 className={css.formTitle}>Sign in</h1>
                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" className={css.input} required />
                </div>
                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" className={css.input} required />
                </div>
                <div className={css.actions}>
                    <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
                        {mutation.isPending ? "…" : "Log in"}
                    </button>
                </div>
                <p className={css.error}>{error}</p>
            </form>
        </main>
    );
}
