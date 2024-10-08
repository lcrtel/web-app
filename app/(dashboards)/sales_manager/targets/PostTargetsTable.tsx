"use client";
import { RowData } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ImportDropdown, PostRoutesTable } from "@/components/PostRoutesTable";
import { toast } from "react-hot-toast";
import { postTargetsAsManager } from "./actions";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export function PostTargetsTable({ users }: { users: any }) {
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
    const { error } = await postTargetsAsManager(data);
    if (error) {
      setPosting(false);
      toast.error(error.message);
      return;
    }
    toast.success("Buying targets posted");
    router.refresh();
    setPosting(false);
    setData([
      {
        id: uuidv4(),
        destination: "",
        destination_code: "",
        rate: "",
        route_type: "cli",
        asr: "",
        acd: "",
        ports: "",
        pdd: "",
        remarks: "",
      },
    ]);
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
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-2xl font-bold tracking-tight">Post buying targets</h2>
        <div className="flex items-center gap-2 text-sm">
          <p>{data.length} route(s)</p> <ImportDropdown setData={setData} />
        </div>
      </div>

      <PostRoutesTable
        data={data}
        handleSubmit={handleSubmit}
        clients={users}
        posting={posting}
        setData={setData}
      />
    </div>
  );
}
