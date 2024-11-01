import PasswordResetRequestForm from "@/components/auth/forms/PasswordResetRequestForm";
import { AlertTriangle, ArrowLeftFromLine } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reset Password",
};
export default async function ResetPasswordPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full max-w-[360px] space-y-2">
      <section className="rounded-2xl bg-white p-6">
        <div className="mb-5 flex w-full flex-col items-center space-y-1 text-center">
          <Link href="/" passHref className="mb-4 md:hidden">
            <Image src="/lcr-icon.svg" alt="LCRTelcom" width={80} height={30} />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
          <p className="text-sm text-gray-400">
            Enter your email to reset your password
          </p>
        </div>
        {searchParams?.message && (
          <div className="my-4 flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-surface p-4 text-center text-sm text-primary-900">
            <AlertTriangle className="size-4" />
            {searchParams.message}
          </div>
        )}
        <PasswordResetRequestForm />
      </section>
      <Link
        href="/auth/login"
        className="flex items-center justify-center gap-2 text-sm font-light text-white hover:underline"
      >
        <ArrowLeftFromLine className="size-4" /> Go back to login
      </Link>
    </div>
  );
}
