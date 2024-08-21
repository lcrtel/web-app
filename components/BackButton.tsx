"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}  className="border p-1 rounded-full bg-white shadow-sm">
      <ArrowLeft className="size-3" />
    </button>
  );
}
