import BackButton from "@/components/BackButton";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { DropDownMenu } from "./_components/dropdownMenu";
import { VendorNav } from "./_components/VendorNav";

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function SettingsLayout(props: SettingsLayoutProps) {
  const params = await props.params;

  const { children } = props;

  const basePath = "/admin/users/vendors";
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
      title: "Notification",
      href: `${basePath}/${params.id}/email_notification`,
    },
    {
      title: "Route Offers",
      href: `${basePath}/${params.id}/routes`,
    },
    {
      title: "Purchased Routes",
      href: `${basePath}/${params.id}/purchased_routes`,
    },
    {
      title: "Buying Targets",
      href: `${basePath}/${params.id}/targets`,
    },
  ];

  return (
    <div className="w-full">
      <Suspense
        fallback={
          <>
            <div className="mb-4 flex flex-col gap-2">
              <div className="">
                <Skeleton className="h-7 w-full max-w-xs" />
              </div>
              <Skeleton className="h-6 w-full max-w-xs" />
            </div>
          </>
        }
      >
        <VendorDetails userId={params.id} />
      </Suspense>
      <DropDownMenu items={NavItems} />
      <VendorNav items={NavItems} />
      {children}
    </div>
  );
}

async function VendorDetails({ userId }: { userId: any }) {
  const supabaseAdmin = await supabaseAdminServer();

  let { data: vendor, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (!vendor) {
    redirect("/admin/users/vendors");
  }
  return (
    vendor && (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <BackButton />
          <Link href="/director" className="hover:underline">
            Dashboard
          </Link>
          /
          <Link href="/admin/users/vendors" className="hover:underline">
            Vendors
          </Link>
          /
          <Link
            href={`/admin/users/vendors/${userId}`}
            className="hover:underline"
          >
            {vendor?.name}
          </Link>
        </div>
        <div className="flex flex-col gap-2 pb-2">
          <div className="">
            <h1 className="text-xl font-bold capitalize tracking-tight">
              {vendor?.name}
            </h1>
            {vendor?.company_name && (
              <p className="text-base font-medium text-slate-400">
                Company: {vendor?.company_name}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
}
