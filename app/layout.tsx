import React, { ReactNode } from "react";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

interface RootLayoutProps {
  children: ReactNode;
  modal?: ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
          {modal && <div id="modal-container">{modal}</div>}
        </QueryProvider>
      </body>
    </html>
  );
}
