
import React, { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;

    modal?: ReactNode;
}

export default function AuthLayout({ children, modal }: AuthLayoutProps) {
    return (
        <>
            {children}
            {modal && <div id="auth-modal">{modal}</div>}
        </>
    );
}
