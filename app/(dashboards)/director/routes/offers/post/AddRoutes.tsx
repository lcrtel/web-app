"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ImportDropdown, PostRoutesTable } from "@/components/PostRoutesTable";
import { toast } from "react-hot-toast";
import { insertRoutesInDb } from "../../../_actions/routeActions";

export function AddRouteTable({ users }: { users: any }) {
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
    const { error } = await insertRoutesInDb(data);
    if (error) {
      setPosting(false);
      toast.error(error.message);
      return;
    }
    setPosting(false);
    setData([]);
    toast.success("Route Offer Posted");
    router.refresh();
    router.push("/director/routes/offers");
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
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-2xl font-bold tracking-tight">Post route offers</h2>
        <div className="flex items-center gap-2 text-sm">
          <p>{data.length} route(s)</p> <ImportDropdown setData={setData} />
        </div>
      </div>
      <PostRoutesTable
        data={data}
        vendors={users}
        handleSubmit={handleSubmit}
        setData={setData}
        posting={posting}
      />
    </div>
  );
}
