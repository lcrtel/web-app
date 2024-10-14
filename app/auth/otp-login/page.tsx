import OTPLoginForm from "@/components/auth/forms/OTPLoginForm";
import Link from "next/link";

export default function OTPLogin({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="w-full max-w-[360px] space-y-2">
      <section className="rounded-2xl bg-white p-6">
        <div className="mb-5 flex w-full flex-col items-center space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-gray-400">Login with one time password.</p>
        </div>
        {searchParams?.message && (
          <p className="mx-auto my-4 w-full rounded-md bg-surface p-4 text-center text-primary-900 md:max-w-[360px]">
            {searchParams.message}
          </p>
        )}
        <OTPLoginForm />
      </section>
      <p className="text-center text-sm font-light text-white">
        Don’t have an account yet?{" "}
        <Link href="/auth/signup" className="font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
