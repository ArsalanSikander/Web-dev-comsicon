// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { SocketProvider } from "./components/socketProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Collab Sphere',
  description: 'A comprehensive project management application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SocketProvider>
          <AuthProvider>
              {/* <div className="flex flex-row justify-between items-center h-[10vh] p-[1vw]">
                <p>Collab Sphere</p>
                <div className="flex flex-row w-[20vw] justify-around items-center">
                  <p>Route 1</p>
                  <p>Route 2</p>
                </div>
                <div>
                  Logout button
                </div>
              </div> */}
              {children}
          </AuthProvider>
        </SocketProvider>
      </body>
    </html>
  );
}