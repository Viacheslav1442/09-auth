import css from "./ProfilePage.module.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCurrentUserServer } from "@/lib/api/serverApi";

export const metadata: Metadata = {
    title: "Profile",
    description: "User profile page",
    robots: { index: false, follow: false },
    openGraph: { title: "Profile", description: "User profile page" },
};

export default async function ProfilePage() {
    const user = await getCurrentUserServer();


    if (!user) {
        return (
            <main className={css.mainContent}>
                <p>User not found or not logged in.</p>
            </main>
        );
    }

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>
                    <Link href="/profile/edit" className={css.editProfileButton}>
                        Edit Profile
                    </Link>
                </div>

                <div className={css.avatarWrapper}>
                    <Image
                        src={user.avatar}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                </div>

                <div className={css.profileInfo}>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
            </div>
        </main>
    );
}
