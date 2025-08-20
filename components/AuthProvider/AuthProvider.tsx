"use client";

import { ReactNode, useEffect, useState } from "react";
import { getSession, logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import css from "./AuthProvider.module.css";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const { setUser, clear } = useAuthStore();
    const [checking, setChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const user = await getSession();
                if (user) {
                    setUser(user);
                } else {
                    await logout().catch(() => void 0);
                    clear();
                    router.replace("/sign-in");
                    return;
                }
            } finally {
                if (mounted) setChecking(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [setUser, clear, router]);

    if (checking) {
        return <div className={css.loader} aria-busy="true">Loading…</div>;
    }
    return <>{children}</>;
}
