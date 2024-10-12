import BackButton from "@/components/BackButton";
import Link from "next/link";

export default function TargetsMarketingPage() {
  return (
    <section className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <BackButton />
        <Link href="/director" className="hover:underline">
          Dashboard
        </Link>
        /
        <Link href="/director/marketing" className="hover:underline">
          Marketing
        </Link>
        /
        <Link href="/director/marketing/targets" className="hover:underline">
          Targets
        </Link>
      </div>
      <h2 className="text-2xl font-bold tracking-tight">Targets Marketing</h2>
      <p>Coming soon...</p>
    </section>
  );
}
