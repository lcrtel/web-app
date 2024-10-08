import BackButton from "@/components/BackButton";
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
import Link from "next/link";
import { Suspense } from "react";
import CreateRateHikeForm from "./CreateRateHikeForm";
import DeleteRateHikeModal from "./DeleteRateHikeModal";
import UpdateRateHikeModal from "./UpdateRateHikeModal";
export default function RateHikesPage() {
  return (
    <section className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <BackButton />
        <Link href="/director" className="hover:underline">
          Dashboard
        </Link>
        /
        <Link href="/director/finance/rate-hikes" className="hover:underline">
          Rate Hikes & Deductions
        </Link>
      </div>
      <h2 className="text-2xl font-bold tracking-tight">
        Rate hikes & Deductions
      </h2>
      <div className="grid md:grid-cols-4 gap-5">
        <CreateRateHikeForm />
        <Suspense fallback={<Skeleton className="md:col-span-3 h-96 w-full" />}>
          <RateHikesList />
        </Suspense>
      </div>
    </section>
  );
}

async function RateHikesList() {
  const supabase = supabaseAdminServer();
  const { data: rateHikes } = await supabase
    .from("rate_hikes")
    .select("*, phone_codes(*)");
  return (
    <div className="md:col-span-3 h-fit rounded-lg border">
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
