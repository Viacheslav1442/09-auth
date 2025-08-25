"use client";

import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("user_email@example.com");
    const [avatar, setAvatar] = useState<string | null>(null);
    const router = useRouter();

    const setUser = useAuthStore((state) => state.setUser);

    useEffect(() => {
        (async () => {
            const me = await getMe().catch(() => null);
            if (me) {
                setUsername(me.username);
                setEmail(me.email);
                setAvatar(me.avatar ?? null);
            }
        })();
    }, []);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedUser = await updateMe({ username });
        setUser(updatedUser);
        router.replace("/profile");
    };

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image
                    src={avatar ?? "/default-avatar.png"}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form className={css.profileInfo} onSubmit={onSubmit}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            className={css.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <p>Email: {email}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>Save</button>
                        <button type="button" className={css.cancelButton} onClick={() => router.back()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
