import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ClientNav } from "./ClientNav";
import { DropDownMenu } from "./dropdownMenu";

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  const basePath = "/director/users/clients";
  const NavItems = [
    {
      title: "Account",
      href: `${basePath}/${params.id}/account_settings`,
    },
    {
      title: "Requests",
      href: `${basePath}/${params.id}/requests`,
    },
    {
      title: "Purchased Routes",
      href: `${basePath}/${params.id}/purchased_routes`,
    },
    {
      title: "Departments",
      href: `${basePath}/${params.id}/departments`,
    },
    {
      title: "Notifications",
      href: `${basePath}/${params.id}/email_notification`,
    },
  ];

  return (
    <div className="w-full">
      <Suspense
        fallback={
          <>
            <p className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-400">
              Clients / <Skeleton className="h-4 w-full max-w-xs" />
            </p>
            <div className="mb-4 flex flex-col gap-2">
              <div className="">
                <Skeleton className="h-7 w-full max-w-xs" />
              </div>
              <Skeleton className="h-6 w-full max-w-xs" />
            </div>
          </>
        }
      >
        <ClientDetails userId={params.id} />
      </Suspense>
      <DropDownMenu items={NavItems} />
      <ClientNav items={NavItems} />
      {children}
    </div>
  );
}
async function ClientDetails({ userId }: { userId: any }) {
  const supabase = supabaseServer();

  let { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (!user) {
    redirect("/director/user/clients");
  }
  return (
    user && (
      <>
          <Link
            href="/director/users/clients"
            className={`h-8 mb-2 gap-1 ${buttonVariants({ variant: "outline", size: "sm" })}`}
          >
            <ArrowLeft className="size-4" />
            Clients
          </Link>
        <div className="mb-4 flex flex-col gap-2">
          <div className="">
            <h1 className="text-xl font-bold capitalize tracking-tight">
              {user?.name}
            </h1>
            {user?.company_name && (
              <p className="text-base font-medium text-slate-400">
                Company: {user?.company_name}
              </p>
            )}
          </div>
        </div>
      </>
    )
  );
}
