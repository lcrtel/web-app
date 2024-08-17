import Image from "next/image";
import Link from "next/link";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative h-svh overflow-hidden bg-gradient-to-t from-primary-900 via-primary-100 via-70% to-surface">
      <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-[linear-gradient(to_right,#a8a8a82d_1px,transparent_1px),linear-gradient(to_bottom,#a8a8a82d_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <section className="relative z-20 flex h-full flex-col items-center justify-center gap-10 overflow-y-auto px-4 py-10 md:p-8">
        <Link href="/" passHref className="">
          <Image
            src="/lcrtelcom_logo.svg"
            alt="LCRTelcom"
            width={180}
            height={30}
          />
        </Link>
        {children}
      </section>
    </main>
  );
}
