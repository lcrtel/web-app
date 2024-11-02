"use client";
import { RowData } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ImportDropdown, PostRoutesTable } from "@/components/PostRoutesTable";
import { toast } from "react-hot-toast";
import { postTargetsAsAdmin } from "./actions";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export function AddTargetsTable({ users }: { users: any }) {
  const [posting, setPosting] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<any>([
    {
      id: uuidv4(),
      destination: "",
      rate: "",
      route_type: "cli",
      asr: "",
      acd: "",
      ports: "",
      pdd: "",
      remarks: "",
    },
  ]);
  const postRoutes = async () => {
    setPosting(true);
    const { error } = await postTargetsAsAdmin(data);
    if (error) {
      setPosting(false);
      toast.error(error.message);
      return;
    }
    toast.success("Buying targets posted");
    router.refresh();
    router.push("/admin/routes/targets");
    setPosting(false);
    setData([]);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const postingToast = toast.loading("Posting...");
    if (
      data.every((item: any) => item.client_id && item.client_id.trim() !== "")
    ) {
      await postRoutes();
      toast.dismiss(postingToast);
    } else {
      setPosting(false);
      toast.error("Please select client");
    }
  };
  return (
    <div className="w-full space-y-2 py-2">
      <PostRoutesTable
        data={data}
        handleSubmit={handleSubmit}
        clients={users}
        posting={posting}
        setData={setData}
      />
      <div className="flex items-center justify-center rounded-lg bg-slate-100 py-16">
        <div className="flex items-center gap-2 text-sm">
          <ImportDropdown setData={setData} />
        </div>
      </div>
    </div>
  );
}
