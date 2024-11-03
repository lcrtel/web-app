import BackButton from "@/components/BackButton";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ClientNav } from "./_components/ClientNav";
import { DropDownMenu } from "./_components/dropdownMenu";

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function SettingsLayout(props: SettingsLayoutProps) {
  const params = await props.params;

  const { children } = props;

  const basePath = "/admin/users/clients";
  const NavItems = [
    {
      title: "Account",
      href: `${basePath}/${params.id}`,
    },
    {
      title: "Departments",
      href: `${basePath}/${params.id}/departments`,
    },
    {
      title: "Notifications",
      href: `${basePath}/${params.id}/email_notification`,
    },
    {
      title: "Buying Targets",
      href: `${basePath}/${params.id}/targets`,
    },
    {
      title: "Purchased Routes",
      href: `${basePath}/${params.id}/purchased_routes`,
    },
  ];

  return (
    <div className="w-full">
      
      <Suspense
        fallback={
          <>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-400">
              Clients / <Skeleton className="h-4 w-full max-w-xs" />
            </div>
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
  const supabaseAdmin = await supabaseAdminServer();
  let { data: user } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (!user) {
    redirect("/admin/users/clients");
  }
  return (
    user && (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <BackButton />
          <Link href="/director" className="hover:underline">
            Dashboard
          </Link>
          /
          <Link href="/admin/users/clients" className="hover:underline">
            Clients
          </Link>
          /
          <Link
            href={`/admin/users/clients/${userId}`}
            className="hover:underline"
          >
            {user?.name}
          </Link>
        </div>
        <div className="flex flex-col gap-2 pb-4">
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
      </div>
    )
  );
}
