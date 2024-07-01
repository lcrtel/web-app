import { fetchUser } from "@/utils/user";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchUser();
  if (!user) {
    redirect("/auth/login");
  }
  return <>{children}</>;
}
