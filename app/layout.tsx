import { RefreshOnFocus } from "@/components/refresh-on-focus";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Toast from "./Toast";
import "./globals.css";
// export const dynamic = "force-dynamic";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://lcrtel.com"),
  title: {
    template: "%s | LCRTel",
    default: "LCRTel",
  },
  description: "Streamline Your VoIP Trading Experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.className} text-primary-900`}>
        <Toast />
        <Toaster />
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
