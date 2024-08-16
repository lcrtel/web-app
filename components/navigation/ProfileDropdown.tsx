"use client";

import { signOut } from "@/app/(dashboards)/u/_actions/userActions";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverArrow, PopoverClose } from "@radix-ui/react-popover";
import { UserRoundIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiOutlineLogout } from "react-icons/hi";

export default function ProfileDropdown({
  user,
  accountPage,
}: {
  user: any;
  accountPage: string;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error(error.message);
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
        <div className="flex flex-col space-y-1 border-b p-4">
          <p className="font-medium leading-none">{user.name}</p>
          <p className="text-muted-foreground text-sm leading-none">
            {user.email}
          </p>
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
            <p>Signout</p> <HiOutlineLogout />
          </div>
        </div>
        <PopoverArrow className="fill-slate-200" />
      </PopoverContent>
    </Popover>
  );
}
