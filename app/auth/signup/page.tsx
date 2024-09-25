import SignUpForm from "@/components/auth/forms/SignUpForm";
import { AlertTriangle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signup",
};

const page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className="space-y-2">
      <section className="rounded-2xl bg-white p-6">
        <div className="mb-5 flex w-full flex-col items-center space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-gray-400">
            Enter your details below to create your account
          </p>
        </div>
        {searchParams?.error && (
          <div className="mx-auto my-4 flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-red-50 p-4 text-center text-red-500 md:max-w-[400px]">
            <AlertTriangle />
            {searchParams.error}
          </div>
        )}
        {searchParams?.message && (
          <div className="my-4 flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-surface p-4 text-center text-primary-900">
            <AlertTriangle />
            {searchParams.message}
          </div>
        )}
        <SignUpForm />
      </section>
      <p className="text-center text-sm font-light text-white">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-medium hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default page;
