import BackButton from "@/components/BackButton";
import Link from "next/link";

export default function MarketingPage() {
  return (
    <section className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <BackButton />
        <Link href="/director" className="hover:underline">
          Dashboard
        </Link>
        /
        <Link href="/admin/marketing" className="hover:underline">
          Marketing
        </Link>
      </div>
      <h2 className="text-2xl font-bold tracking-tight">Marketing</h2>
    </section>
  );
}
