import { fetchUser, getUser } from "@/utils/user";
import { AlertCircle } from "lucide-react";
import { AccountForm } from "./AccountForm";
import { EmailForm } from "./EmailForm";

export default async function Page() {
  const userProfile = await getUser();
  const user = await fetchUser();
  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-5">
        <h2 className="mb-4 text-xl font-bold tracking-tight">Personal info</h2>
        <AccountForm user={userProfile} />
      </div>
      <div className="rounded-lg border p-5">
        <h2 className="mb-4 text-xl font-bold tracking-tight">Email address</h2>
        {user?.new_email && (
          <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-4 text-slate-500">
            <AlertCircle className="size-5" />
            <h4 className="text-sm">
              We&apos;ve sent an email change confirmation email to{" "}
              <span className="font-bold text-primary-900">{user?.email}</span>{" "}
              &{" "}
              <span className="font-bold text-primary-900">
                {user?.new_email}
              </span>
              , please check and confirm.
            </h4>
          </div>
        )}
        <EmailForm user={user} />
      </div>
    </div>
  );
}
