import React from "react";
import type { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
    modal?: boolean; // необов'язковий
}

export default function AuthLayout({ children, modal }: AuthLayoutProps) {
    return <>{children}</>;
}
