"use client"; // Error components must be Client Components

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center gap-5">
      <h1 className="text-9xl font-extrabold">404</h1>
      <div className="flex gap-4">
        <Link href="/" className={buttonVariants({ size: "sm" })}>
          Go to home
        </Link>
        <Button variant="secondary" size="sm" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
