// src/app/components/refresh-on-focus.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function RefreshOnFocus() {
  const { refresh } = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const onFocus = () => {
      refresh();
    };
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, [refresh]);

  useEffect(() => {
    refresh();
  }, [pathname, refresh]);
  return null;
}
