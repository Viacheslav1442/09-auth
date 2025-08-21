import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  modal?: ReactNode;
}

export default function RootLayout({ children, modal }: LayoutProps) {
  return (
    <>
      {children}
      {modal && <div id="modal">{modal}</div>}
    </>
  );
}
