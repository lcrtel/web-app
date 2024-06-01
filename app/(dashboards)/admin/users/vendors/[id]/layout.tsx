import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { VendorNav } from "./VendorNav";
import { DropDownMenu } from "./dropdownMenu";

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  const basePath = "/admin/users/vendors";
  const NavItems = [
    {
      title: "Account",
      href: `${basePath}/${params.id}/account_settings`,
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
      title: "Requests",
      href: `${basePath}/${params.id}/requests`,
    },
    {
      title: "Departments",
      href: `${basePath}/${params.id}/departments`,
    },
    {
      title: "Notification",
      href: `${basePath}/${params.id}/email_notification`,
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
  const supabase = supabaseServer();

  let { data: vendor, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (!vendor) {
    redirect("/admin/users/vendors");
  }
  return (
    vendor && (
      <>
        <Link
          href="/admin/users/vendors"
          className={`mb-2 h-8 gap-1 ${buttonVariants({ variant: "outline", size: "sm" })}`}
        >
          <ArrowLeft className="size-4" />
          Vendors
        </Link>
        <div className="mb-4 flex flex-col gap-2">
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
      </>
    )
  );
}
