import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Toast from "./Toast";
import { Analytics } from '@vercel/analytics/react';
import { fetchUserRole } from "@/utils/user";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://lcrtel.com"),
    title: {
        template: "%s | LCRTel",
        default: "LCRTel",
    },
    description: "Streamline Your VoIP Trading Experience",
};

export default async function RootLayout({
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
