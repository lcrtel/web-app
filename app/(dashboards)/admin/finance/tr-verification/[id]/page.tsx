import BackButton from "@/components/BackButton";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { format } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";
import TRInquiryForm from "./TRInquiryForm";
import VerificationStatusUpdate from "./VerificationStatusUpdate";
import { whoisCheckup } from "@/utils/whoisCheckUp";
export default async function TRDetailsPage(
  props: {
    params: Promise<{ id: number }>;
  }
) {
  const params = await props.params;
  const supabase = await supabaseAdminServer();
  const { data: details } = await supabase
    .from("tr_verifications")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!details) {
    redirect("/admin/finance/tr-verification");
  }
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <BackButton />
        <Link href="/director" className="hover:underline">
          Dashboard
        </Link>
        /
        <Link href="/admin/finance" className="hover:underline">
          Finance
        </Link>
        /
        <Link
          href="/admin/finance/tr-verification"
          className="font-semibold hover:underline"
        >
          TR Verifications
        </Link>
      </div>
      <div className="my-4 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tight">TR Verification</h1>
        <VerificationStatusUpdate TRId={params.id} />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="w- h-fit space-y-3 rounded-lg border bg-slate-50 p-4 text-slate-500">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
            <h4 className="font-medium text-primary-900">Name:</h4>
            <p>{details.name}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
            <h4 className="font-medium text-primary-900">Company Name:</h4>
            <p>{details.company_name}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
            <h4 className="font-medium text-primary-900">Company Email:</h4>
            <p>{details.company_email}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
            <h4 className="font-medium text-primary-900">Website:</h4>
            <p>{details.website}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
            <h4 className="font-medium text-primary-900">Verification:</h4>
            <Badge variant={details.status}>
              {details.status?.toLowerCase()}
            </Badge>
          </div>
        </div>
        <div className="md:col-span-3">
          <TRInquiry trId={params.id} email={details.company_email} />
          <WhoisData website={details.website} />
        </div>
      </div>
    </div>
  );
}

async function WhoisData({ website }: { website: string | null }) {
  if (!website) return;
  const whoisData = await whoisCheckup(website);
  return (
    <div className="w-full overflow-hidden rounded-lg border p-4">
      <h3 className="mb-2 text-lg font-semibold">Whois Info</h3>
      <ScrollArea className="w-full overflow-auto">
        <pre className="text-xs">{whoisData}</pre>
      </ScrollArea>
    </div>
  );
}

async function TRInquiry({
  trId,
  email,
}: {
  trId: number;
  email: string | null;
}) {
  const supabase = await supabaseAdminServer();
  const { data: trMessages } = await supabase
    .from("tr_communication")
    .select("*")
    .eq("tr_request_id", trId);
  return (
    <div className="space-y-4 pb-4">
      <div className="space-y-2 rounded-lg border p-4">
        <h3 className="mb-2 text-lg font-semibold">TR enquiry</h3>
        {email && <TRInquiryForm trId={trId} email={email} />}
        {trMessages && trMessages?.length > 0 && (
          <div className="rounded-lg border p-4">
            <h4 className="text-md mb-2 font-medium">Previous messages</h4>
            <div className="space-y-2">
              {trMessages?.map((message) => (
                <div key={message?.id}>
                  <span className="mb-1 text-xs text-slate-500">
                    {format(
                      new Date(message?.created_at),
                      "dd/MM/yyyy hh:mm a",
                    )}
                  </span>
                  <div className="rounded-lg border bg-slate-50 p-3 text-sm">
                    <pre className="font-sans">{message.message}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
