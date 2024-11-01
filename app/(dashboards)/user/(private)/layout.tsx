import { getAuthUser } from "@/utils/user";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();
  if (!user) {
    redirect("/auth/login");
  }
  return <>{children}</>;
}
