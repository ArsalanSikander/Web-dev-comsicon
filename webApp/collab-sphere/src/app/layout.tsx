import type { Metadata } from "next";
import "./globals.css";
import { SocketProvider } from "./components/socketProvider";

export const metadata: Metadata = {
  title: "Collab Sphere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SocketProvider>
          <div className="flex flex-row justify-between items-center h-[10vh] p-[1vw] bg-[#f0ebe8] text-gray-800">
            <img src="/logo.png" alt="" className="w-[11vw]" />
            <div className="flex flex-row w-[20vw] justify-around items-center">
                <p>Route 1</p>
                <p>Route 2</p>
            </div>
            <div>
              Logout button
            </div>
          </div>
            {children}
        </SocketProvider>
      </body>
    </html>
  );
}
