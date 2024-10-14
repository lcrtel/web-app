import OTPVerificationForm from "@/components/auth/forms/OTPVerificationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OTP Verification",
};
export default function VerifyOTPVerificationPage({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  return (
    <div className="w-full max-w-[360px] space-y-2">
      <section className="rounded-2xl bg-white p-6">
        <div className="mb-5 flex w-full flex-col items-center space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            OTP Verification
          </h1>
          <p className="text-sm text-gray-400">Enter your one time password.</p>
        </div>
      <OTPVerificationForm email={searchParams?.email} />
      </section>
    </div>
  );
}
