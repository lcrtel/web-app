import Navigation from "@/components/navigation/user";
import Link from "next/link";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-screen flex-col justify-between bg-white">
      <div>
        <Navigation />
        <section className="mx-auto max-w-7xl p-4 md:px-8 md:py-6">
          {children}
        </section>
      </div>

      <footer className="w-full">
        <hr className="mt-5 border-gray-300 sm:mx-auto" />
        <div className="flex items-center justify-center bg-white p-2">
          <span className="text-xs text-gray-500 ">
            © 2023 (1445 AH){" "}
            <Link href="/" className="hover:underline">
              LCRTelcom™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </section>
  );
}
