import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { Clock, Ellipsis, KeyRound, Settings } from "lucide-react";
import { Suspense } from "react";

import { AccountSettingsSheet } from "@/components/auth/modals/AccountSettingsSheet";
import PasswordResetSheet from "@/components/auth/modals/PasswordResetSheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Department } from "./actions";
import DeleteManager from "./DeleteManager";

export default async function ManagersList({
  department,
}: {
  department: Department;
}) {
  const supabase = await supabaseAdminServer();
  const { data: managers } = await supabase
    .from("managers")
    .select("profiles(*), departments!inner (slug), executives!inner (count)")
    .eq("departments.slug", department);

  return (
    <div className="space-y-4">
      {managers?.length ? (
        <div className="space-y-2 rounded-lg border p-3 pt-2">
          <h4 className="text-xl font-semibold">Managers performance</h4>
          <Tabs defaultValue="time_spent" className="">
            <TabsList>
              <TabsTrigger value="time_spent">Time Spent</TabsTrigger>
              <TabsTrigger value="tasks_completed">Tasks Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="time_spent">
              <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                <TimeSpentByManager department={department} />
              </Suspense>
            </TabsContent>
            <TabsContent value="tasks_completed">
              <ActionsDoneByManager department={department} />
            </TabsContent>
          </Tabs>
        </div>
      ) : null}
      <div className="h-fit overflow-hidden overflow-x-auto rounded-lg border">
        {managers && managers?.length !== 0 ? (
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/5">Name</TableHead>
                <TableHead className="w-1/5">Email</TableHead>
                <TableHead className="w-1/5">WhatsApp No</TableHead>
                <TableHead className="w-1/5">Skype ID</TableHead>
                <TableHead className="w-1/5">Executives</TableHead>
                <TableHead className="w-1/5"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {managers?.map((manager: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="text-base">
                    {manager.profiles.name}
                  </TableCell>
                  <TableCell className="text-base">
                    {manager.profiles.email}
                  </TableCell>
                  <TableCell className="text-base">
                    {manager.profiles.phone}
                  </TableCell>
                  <TableCell className="text-base">
                    {manager.profiles.skype_id || "N/A"}
                  </TableCell>
                  <TableCell className="text-base">
                    {manager.executives.count || "N/A"}
                  </TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Ellipsis className="size-5 cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <div className="px-2 py-1">
                          <AccountSettingsSheet user={manager.profiles}>
                            <div className="flex cursor-pointer items-center gap-2">
                              <Settings className="size-4" /> Settings
                            </div>
                          </AccountSettingsSheet>
                        </div>{" "}
                        <div className="px-2 py-1">
                          <PasswordResetSheet user={manager.profiles}>
                            <div className="flex cursor-pointer items-center gap-2">
                              <KeyRound className="size-4" /> Reset password
                            </div>
                          </PasswordResetSheet>
                        </div>
                        <DropdownMenuSeparator />
                        <div className="px-2 py-1">
                          <DeleteManager
                            managerId={manager.profiles.id}
                            managerName={manager.profiles.name}
                          />
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
              No managers added yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

async function TimeSpentByManager({ department }: { department: Department }) {
  const supabase = await supabaseAdminServer();
  const { data: managersWithTimeSpent, error } = await supabase
    .from("manager_durations")
    .select("*")
    .eq("department_slug", department)
    .range(0, 3);
  return (
    <div className="grid gap-2 md:grid-cols-4">
      {managersWithTimeSpent &&
        managersWithTimeSpent.map((executive, idx: number) => (
          <div
            key={idx}
            className="space-y-2 rounded-lg border bg-slate-50 p-4"
          >
            <h5 className="text-lg font-semibold">{executive.name}</h5>
            {executive.total_duration && (
              <div className="flex items-center text-sm">
                <p className="mr-1">Time Spent:</p>{" "}
                <Clock className="mr-1 size-3.5" />
                <p className="text-green-500">
                  {(executive.total_duration / 60).toFixed(2)} mins
                </p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
async function ActionsDoneByManager({
  department,
}: {
  department: Department;
}) {
  const supabase = await supabaseAdminServer();
  const { data: executiveActionCounts, error } = await supabase
    .from("executive_action_counts")
    .select("*")
    .eq("department_slug", department)
    .range(0, 3);
  return (
    <div className="grid md:grid-cols-4">
      {executiveActionCounts?.length ? (
        executiveActionCounts.map((executive, idx: number) => (
          <div
            key={idx}
            className="space-y-2 rounded-lg border bg-slate-50 p-4"
          >
            <h5 className="text-lg font-semibold">{executive.name}</h5>
            {executive.action_counts &&
            Object.keys(executive.action_counts).length > 0 ? (
              <ul className="text-sm">
                {Object.entries(executive.action_counts).map(
                  ([actionType, count]) => (
                    <li key={actionType}>
                      <span className="capitalize">
                        {actionType.replace("_", " ").toLowerCase()}
                      </span>
                      : {count}
                    </li>
                  ),
                )}
              </ul>
            ) : (
              <p>No action counts available.</p>
            )}
          </div>
        ))
      ) : (
        <div className="space-y-2 rounded-lg border bg-slate-50 p-4">
          <p>No action counts available.</p>
        </div>
      )}
    </div>
  );
}
