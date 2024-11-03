"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Department, updateExecutiveManager } from "./actions";

interface Manager {
  id: string;
  profiles: {
    name: string;
  };
}

interface Props {
  executiveId: string;
  currentManagerId?: string;
  department: Department;
  managers: any[];
}

export function ExecutiveManagerPopover({
  executiveId,
  currentManagerId,
  department,
  managers,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedManagerId, setSelectedManagerId] = useState<string | null>(
    currentManagerId || null,
  );
  const router = useRouter();

  const handleManagerChange = async (newManagerId: string | null) => {
    const updating = toast.loading("Updating manager...");
    try {
      await updateExecutiveManager(executiveId, newManagerId);
      setIsOpen(false);
      toast.dismiss(updating);
      toast.success(
        newManagerId
          ? "Manager updated successfully"
          : "Manager unassigned successfully",
      );
      router.refresh();
    } catch (error) {
      toast.dismiss(updating);
      toast.error("Failed to update manager");
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <SquarePen className="h-4 mr-2 w-4 -mb-0.5" />
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none text-primary-900">
            Change Manager
          </h4>
          <Select
            value={selectedManagerId || ""}
            onValueChange={(value) =>
              setSelectedManagerId(value === "null" ? null : value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a manager" />
            </SelectTrigger>
            <SelectContent>
              {currentManagerId && (
                <SelectItem value="null">Unassign Manager</SelectItem>
              )}
              {managers.length > 0 ? (
                managers.map((manager) => (
                  <SelectItem key={manager.id} value={manager.id}>
                    {manager.profiles.name}
                  </SelectItem>
                ))
              ) : (
                <div className="flex flex-col px-3 py-2 text-sm text-slate-500">
                  No managers found
                  <Link
                    href={`/admin/departments/${department}/managers`}
                    className="text-primary-900 underline"
                  >
                    Create one
                  </Link>
                </div>
              )}
            </SelectContent>
          </Select>
          {(selectedManagerId !== currentManagerId ||
            (selectedManagerId === null && currentManagerId !== undefined)) && (
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={() => handleManagerChange(selectedManagerId)}
            >
              Save
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
