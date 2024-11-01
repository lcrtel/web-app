import PasswordLoginForm from "@/components/auth/forms/PasswordLoginForm";
import { AlertTriangle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};
const page = async (props: { searchParams: Promise<{ message: string }> }) => {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full max-w-[360px] space-y-2">
      <section className="rounded-2xl bg-white p-6">
        <div className="mb-5 flex w-full flex-col items-center space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-gray-400">Login with your password.</p>
        </div>
        {searchParams?.message && (
          <div className="my-4 flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-surface p-4 text-center text-sm text-primary-900">
            <AlertTriangle className="size-5" />
            {searchParams.message}
          </div>
        )}
        <PasswordLoginForm />
      </section>
      <div className="space-y-1">
        <p className="text-center text-sm font-light text-white">
          Don’t have an account yet?{" "}
          <Link href="/auth/signup" className="font-medium hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-center text-sm font-light text-white">
          Forgot password?{" "}
          <Link
            href="/auth/reset-password"
            className="font-medium hover:underline"
          >
            Reset
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
