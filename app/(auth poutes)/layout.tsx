// app/layout.tsx
import React, { ReactNode } from "react";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

interface RootLayoutProps {
    children: ReactNode;
    modal: boolean;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {

    return (
        <html lang="en">
            <body>
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    );
}
