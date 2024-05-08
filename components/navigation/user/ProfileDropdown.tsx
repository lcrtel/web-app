"use client";

import { signOut } from "@/app/(dashboards)/user/_actions/userActions";
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

export default function ProfileDropdown({ user }: { user: any }) {
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
      <PopoverContent className="p-0 text-primary-500 rounded-2xl overflow-clip" align="end">
        <div className="flex flex-col space-y-1 border-b p-4">
          <p className=" font-medium leading-none">
            {user.user_metadata?.name}
          </p>
          <p className="text-muted-foreground text-sm leading-none">
            {user.user_metadata?.email}
          </p>
        </div>
        <div className="flex flex-col">
          <PopoverClose asChild>
            <Link
              href="/user/account"
              className="w-full border-b px-4 py-3 hover:bg-surface"
            >
              Account Settings
            </Link>
          </PopoverClose>
          <div
            className="flex  w-full cursor-pointer items-center justify-between px-4 py-3 hover:bg-surface"
            onClick={handleSignOut}
          >
            <p>Signout</p> <HiOutlineLogout />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
