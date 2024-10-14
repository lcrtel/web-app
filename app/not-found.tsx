import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-9xl font-extrabold">404</h1>
      <h2 className="text-3xl font-bold">Not Found</h2>
      <p className="text-lg font-medium">Could not find requested resource</p>
      <Link href="/" className={buttonVariants({ variant: "default" })}>
        Return Home
      </Link>
    </div>
  );
}
