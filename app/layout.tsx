import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Toast from "./Toast";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LCRTelcom",
    description: "",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} text-primary-500 `}>
                <Toast />
                <main> {children} </main>
                <Analytics />
            </body>
        </html>
    );
}
