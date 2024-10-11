import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { Ellipsis, KeyRound, Settings } from "lucide-react";
import { AccountSettingsSheet } from "../auth/modals/AccountSettingsSheet";
import PasswordResetSheet from "../auth/modals/PasswordResetSheet";
import { Department } from "./actions";
import DeleteExecutive from "./DeleteExecutive";

export default async function ExecutivesList({
  department,
}: {
  department: Department;
}) {
  const supabase = supabaseAdminServer();
  const { data: executives } = await supabase
    .from("executives")
    .select("profiles(*), departments!inner (slug)")
    .eq("departments.slug", department);
  return (
    <div className="h-fit rounded-lg border overflow-x-auto overflow-hidden">
      {executives && executives?.length !== 0 ? (
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5">Name</TableHead>
              <TableHead className="w-1/5">Email</TableHead>
              <TableHead className="w-1/5">WhatsApp No</TableHead>
              <TableHead className="w-1/5">Skype ID</TableHead>
              <TableHead className="w-1/5"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {executives?.map((executive: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell className="text-base">
                  {executive.profiles.name}
                </TableCell>
                <TableCell className="text-base">
                  {executive.profiles.email}
                </TableCell>
                <TableCell className="text-base">
                  {executive.profiles.phone}
                </TableCell>
                <TableCell className="text-base">
                  {executive.profiles.skype_id}
                </TableCell>
                <TableCell className="flex items-center justify-end gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Ellipsis className="size-5 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <div className="px-2 py-1">
                        <AccountSettingsSheet user={executive.profiles}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <Settings className="size-4" /> Settings
                          </div>
                        </AccountSettingsSheet>
                      </div>{" "}
                      <div className="px-2 py-1">
                        <PasswordResetSheet user={executive.profiles}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <KeyRound className="size-4" /> Reset password
                          </div>
                        </PasswordResetSheet>
                      </div>
                      <DropdownMenuSeparator />
                      <div className="px-2 py-1">
                        <DeleteExecutive executiveId={executive.profiles.id} />
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex h-36 w-full items-center justify-center">
          <p className="text-center text-sm text-slate-500">
            No executives added yet.
          </p>
        </div>
      )}
    </div>
  );
}
