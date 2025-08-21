import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Roboto } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import 'modern-normalize';
import './globals.css';
export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'A simple and efficient app for creating and organizing your notes.',
  openGraph: {
    title: 'NoteHub',
    description: 'A simple and efficient app for creating and organizing your notes.',
    url: `https://react-v3-hw-solutions.vercel.app/`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - A simple and efficient app for creating and organizing your notes.',
      },
    ],
  },
};
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-roboto',
  display: 'swap',
});
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}