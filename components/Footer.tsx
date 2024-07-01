import Link from "next/link";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 z-50 mx-auto flex max-w-5xl items-center justify-between gap-2 p-3 text-xs text-white">
      <span className="">Copyright © 2023(1445 AH) LCRTelcom™</span>{" "}
      <div className=" space-x-2">
        <Link href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>
        <Link href="/terms-and-conditions" className="hover:underline">
          Terms &amp; Conditions
        </Link>
      </div>
    </footer>
  );
}
