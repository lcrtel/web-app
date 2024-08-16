import { AccountForm } from "./AccountForm";
import { fetchUser, getUser } from "@/utils/user";
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
        <EmailForm user={user} />
      </div>
    </div>
  );
}
