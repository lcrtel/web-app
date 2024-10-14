import { PasswordForm } from "./PasswordForm";

export default async function Page() {
  return (
    <div className="mb-5 rounded-lg border p-5">
      <h2 className="mb-4 text-xl font-bold tracking-tight">Reset Password</h2>
      <PasswordForm />
    </div>
  );
}
