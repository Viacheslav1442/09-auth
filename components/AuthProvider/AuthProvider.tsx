'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getSession, getCurrentUser } from '@/lib/api/clientApi';

type Props = {
    children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
    const setUser = useAuthStore((state) => state.setUser);
    const clear = useAuthStore((state) => state.clear);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const session = await getSession();
                if (session.valid) {
                    const user = await getCurrentUser();
                    if (user) {
                        setUser(user);
                    }
                } else {
                    clear();
                }
            } catch {
                clear();
            }
        };

        fetchUser();
    }, [setUser, clear]);

    return children;
};

export default AuthProvider;
