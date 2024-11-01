"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}  className="border p-1.5 rounded-full bg-white hover:bg-gray-50 hover:scale-105 active:scale-95 duration-300">
      <ArrowLeft className="size-3.5" />
    </button>
  );
}
