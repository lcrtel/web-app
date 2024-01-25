import { RefreshOnFocus } from "@/components/refresh-on-focus";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Toast from "./Toast";
import "./globals.css";
import { supabaseServer } from "@/lib/supabase-server";
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
   
    return (
        <html lang="en">
            <body className={`${inter.className} text-primary-500 `}>
                <Toast />
                <main className="relative">
                    <RefreshOnFocus />
                    {children}{" "}
                </main>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
