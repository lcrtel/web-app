import { PasswordResetModal } from "@/components/auth/PasswordResetModal";
import { fetchUserRole } from "@/utils/user";

export default async function DashboardLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const role = await fetchUserRole();

  return (
    <>
      <PasswordResetModal role={role} />
      {children}
    </>
  );
}
