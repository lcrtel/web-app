import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Nav() {
  return (
    <div className={`fixed top-0 z-50 w-full p-4`}>
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between rounded-full bg-white py-2 pl-3 pr-2 shadow-2xl shadow-primary-900/30">
        <Link passHref href="/" className="-mt-1">
          <Image
            src="/lcrtelcom_logo.svg"
            alt="LCRTel Logo"
            className="w-32 md:w-40"
            width={160}
            height={32}
          />
        </Link>
        <div className="flex gap-2 md:order-2">
          <Link
            href="/auth/login"
            className={`${buttonVariants({ variant: "outline", size: "sm" })}`}
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className={`${buttonVariants({ variant: "default", size: "sm" })}`}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
