import React, { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
    modal?: boolean;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return <>{children}</>;
}
