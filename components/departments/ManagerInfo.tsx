import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import {
  EllipsisVertical,
  KeyRound,
  PlusCircle,
  Settings
} from "lucide-react";
import { AccountSettingsSheet } from "../auth/modals/AccountSettingsSheet";
import PasswordResetSheet from "../auth/modals/PasswordResetSheet";
import { Department } from "./actions";
import { CreateDepartmentManager } from "./CreateDepartmentManager";
import DeleteExecutive from "./DeleteExecutive";
export default async function ManagerInfo({
  department,
}: {
  department: Department;
}) {
  const supabase = supabaseAdminServer();
  const { data: manager } = await supabase
    .from("managers")
    .select("profiles(*), departments!inner (slug)")
    .eq("departments.slug", department)
    .single();
  return manager ? (
    <div className="relative">
      {manager && manager?.profiles?.id && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical className="absolute -top-[30px] right-0 size-5 cursor-pointer" />
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
              <DeleteExecutive executiveId={manager.profiles.id} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <h4>
        <span>Name:</span> {manager?.profiles?.name}
      </h4>
      <h4>
        <span>Email:</span> {manager?.profiles?.email}
      </h4>
      <h4>
        <span>WhatsApp No:</span> {manager?.profiles?.phone}
      </h4>
      <h4>
        <span>Skype ID:</span> {manager?.profiles?.skype_id}
      </h4>
    </div>
  ) : (
    <CreateDepartmentManager department={department}>
      <div className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed bg-white px-4 py-8 shadow">
        <PlusCircle className="size-4" />
        Add manager
      </div>
    </CreateDepartmentManager>
  );
}
