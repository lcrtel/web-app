import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Toast from "./Toast";
import { Analytics } from "@vercel/analytics/react";
import { fetchUserRole } from "@/utils/user";
import { redirect } from "next/navigation";
import { RefreshOnFocus } from "@/components/refresh-on-focus";

// export const dynamic = "force-dynamic";

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
    let date = new Date();
    return (
        <html lang="en">
            <body className={`${inter.className} text-primary-500 `}>
                <Toast />
                <main className="relative">
                    {/* <RefreshOnFocus /> */}
                    {children}{" "}
                </main>
                <Analytics />
            </body>
        </html>
    );
}
