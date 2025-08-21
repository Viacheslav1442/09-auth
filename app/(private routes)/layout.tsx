import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { ReactNode } from "react";

interface PrivateLayoutProps {
    children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
    return <AuthProvider>{children}</AuthProvider>;
}
