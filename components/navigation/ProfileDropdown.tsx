"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverArrow, PopoverClose } from "@radix-ui/react-popover";
import { Loader2, UserRoundIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiOutlineLogout } from "react-icons/hi";
import { signOut } from "../auth/userActions";
import { useState } from "react";

export default function ProfileDropdown({
  user,
  accountPage,
}: {
  user: any;
  accountPage: string;
}) {
  const router = useRouter();
const [loading, setLoading] = useState(false);
  const handleSignOut = async () => {
    setLoading(true);
    const res = await signOut();
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    router.push("/");
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <UserRoundIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="overflow-clip rounded-2xl p-0 text-primary-900"
        avoidCollisions
        collisionPadding={20}
      >
        <div className="flex flex-col items-start gap-2 border-b p-4">
          <p className="font-medium leading-none">{user.name}</p>
          <Role role={user.user_roles.role_slug} />
        </div>
        <div className="flex flex-col">
          <PopoverClose asChild>
            <Link
              href={accountPage}
              className="w-full border-b px-4 py-3 hover:bg-surface"
            >
              Account Settings
            </Link>
          </PopoverClose>
          <div
            className="flex w-full cursor-pointer items-center justify-between px-4 py-3 hover:bg-surface"
            onClick={handleSignOut}
          >
            <p>Signout</p> {loading ? <Loader2 className="size-5 animate-spin"/>:<HiOutlineLogout className="size-5" />}
          </div>
        </div>
        <PopoverArrow className="fill-slate-200" />
      </PopoverContent>
    </Popover>
  );
}

function Role({ role }: { role: UserRolesEnum }) {
  switch (role) {
    case "director":
      return (
        <h2 className="rounded-full bg-primary-900 px-3 py-1 text-center text-sm text-white">
          Director
        </h2>
      );
    case "company_manager":
      return (
        <h2 className="rounded-full bg-primary-900 px-3 py-1 text-center text-sm text-white">
          Company Manager
        </h2>
      );
    case "finance_executive":
      return (
        <h2 className="rounded-full bg-primary-900 px-3 py-1 text-center text-sm text-white">
          Finance Executive
        </h2>
      );
    case "finance_manager":
      return (
        <h2 className="rounded-full bg-primary-900 px-3 py-1 text-center text-sm text-white">
          Finance Manager
        </h2>
      );
    case "noc_executive":
      return (
        <h2 className="rounded-full bg-primary-900 px-3 py-1 text-center text-sm text-white">
          NOC Executive
        </h2>
      );
    case "noc_manager":
      return (
        <h2 className="rounded-full bg-primary-900 px-3 py-1 text-center text-sm text-white">
          NOC Manager
        </h2>
      );
    case "purchase_executive":
      return (
        <h2 className="rounded-full bg-primary-900 px-3 py-1 text-center text-sm text-white">
          Purchase Executive
        </h2>
      );
    case "purchase_manager":
      return (
        <h2 className="rounded-full bg-primary-900 px-3 py-1 text-center text-sm text-white">
          Purchase Manager
        </h2>
      );
    case "sales_executive":
      return (
        <h2 className="rounded-full bg-primary-900 px-3 py-1 text-center text-sm text-white">
          Sales Executive
        </h2>
      );
    case "sales_manager":
      return (
        <h2 className="rounded-full bg-primary-900 px-3 py-1 text-center text-sm text-white">
          Sales Manager
        </h2>
      );
    case "user":
      return null;
    default:
      return null;
  }
}
