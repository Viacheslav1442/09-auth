'use client';

import { checkSessionServer, getCurrentUserServer as getMe } from '@/lib/api/serverApi';
import { useAuthStore } from '../../lib/store/authStore';
import { useEffect } from 'react';

type Props = {
    children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
    const setUser = useAuthStore((state) => state.setUser);
    const clear = useAuthStore((state) => state.clear);

    useEffect(() => {
        const fetchUser = async () => {
            const isAuthenticated = await checkSessionServer();
            if (isAuthenticated) {
                const user = await getMe();
                if (user) setUser(user);
            } else {
                clear();
            }
        };
        fetchUser();
    }, [setUser, clear]);

    return children;
};

export default AuthProvider;
