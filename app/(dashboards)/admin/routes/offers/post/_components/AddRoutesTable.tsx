"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-hot-toast";
import { postRoutesAsAdmin } from "./actions";
import { ImportDropdown, PostRoutesTable } from "@/components/routes-and-targets/PostRoutesTable";

export function AddRoutesTable({ users }: { users: any }) {
  const [posting, setPosting] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<any>([
    {
      id: uuidv4(),
      destination: "",
      rate: 0,
      vendor_id: "",
      route_type: "cli",
      asr: "",
      acd: "",
      ports: "",
      pdd: "",
    },
  ]);
  const postRoutes = async () => {
    setPosting(true);
    const { error } = await postRoutesAsAdmin(data);
    if (error) {
      setPosting(false);
      toast.error(error);
      return;
    }
    setPosting(false);
    setData([]);
    toast.success("Route Offer Posted");
    router.refresh();
    router.push("/admin/routes/offers");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      data.every((item: any) => item.vendor_id && item.vendor_id.trim() !== "")
    ) {
      await postRoutes();
    } else {
      setPosting(false);
      toast.error("Please select vendor");
    }
  };

  return (
    <div className="w-full space-y-2 py-2">
      <PostRoutesTable
        data={data}
        vendors={users}
        handleSubmit={handleSubmit}
        setData={setData}
        posting={posting}
      />
      <div className="flex items-center justify-center rounded-lg bg-slate-100 py-16">
        <div className="flex items-center gap-2 text-sm">
          <ImportDropdown setData={setData} />
        </div>
      </div>
    </div>
  );
}
