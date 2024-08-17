import { supabaseClient } from "@/lib/supabase-client";
import OTPForm from "./OTPForm";
import { fetchUser } from "@/utils/user";

export default async function OTPLogin({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  const supabase = supabaseClient()
  const user  = await fetchUser()
  console.log(user)
  return (
    <div className="w-full max-w-[360px] space-y-2">
      <section className="rounded-2xl bg-white p-6">
        <div className="mb-5 flex w-full flex-col items-center space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Verify email</h1>
          <p className="text-sm text-gray-400">
            Enter the one time password sent to {searchParams?.email}.
          </p>
        </div>
        <OTPForm email={searchParams?.email} />
      </section>
    </div>
  );
}
