import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { Suspense } from "react";
import CreateRateHikeForm from "./CreateRateHikeForm";
import DeleteRateHikeModal from "./DeleteRateHikeModal";
import UpdateRateHikeModal from "./UpdateRateHikeModal";
export default function RateHikesPage() {
  return (
    <section className="space-y-2">
      <PageHeader>
        <PageHeaderHeading>Rate hikes & Deductions</PageHeaderHeading>
      </PageHeader>
      <div className="grid gap-5 md:grid-cols-4">
        <CreateRateHikeForm />
        <Suspense fallback={<Skeleton className="h-96 w-full md:col-span-3" />}>
          <RateHikesList />
        </Suspense>
      </div>
    </section>
  );
}

async function RateHikesList() {
  const supabase = await supabaseAdminServer();
  const { data: rateHikes } = await supabase
    .from("rate_hikes")
    .select("*, phone_codes(*)");
  return (
    <div className="h-fit rounded-lg border md:col-span-3">
      {rateHikes && rateHikes?.length !== 0 ? (
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Destination</TableHead>
              <TableHead className="w-1/4">Deduction%</TableHead>
              <TableHead className="w-1/4">Hike%</TableHead>
              <TableHead className="w-1/4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rateHikes?.map((rateHike: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">
                  {rateHike.phone_codes.value}
                </TableCell>
                <TableCell>{rateHike.decrease_percentage}%</TableCell>
                <TableCell>{rateHike.increase_percentage}%</TableCell>
                <TableCell className="flex items-center justify-end gap-2">
                  <UpdateRateHikeModal rateHike={rateHike} />
                  <DeleteRateHikeModal id={rateHike.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex h-36 w-full items-center justify-center">
          <p className="text-center text-sm text-slate-500">
            No Rate Hikes & Deductions created yet.
          </p>
        </div>
      )}
    </div>
  );
}
