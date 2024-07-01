"use client";

import LoginModal from "@/components/auth/LoginModal";
import OtpModal from "@/components/auth/OTPModal";
import { ImportDropdown, PostRoutesTable } from "@/components/PostRoutesTable";
import { RowData } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { postTargets } from "./actions";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export function PostTargetTable({
  userEmail,
  userId,
}: {
  userEmail: string | undefined;
  userId: string | undefined;
}) {
  const [isPosting, setIsPosting] = useState(false);
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [email, setEmail] = useState<string | undefined>(userEmail);
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
    },
  ]);

  async function post() {
    setIsPosting(true);
    const postingToast = toast.loading("Posting...");
    const res = await postTargets(data);
    if (res?.error) {
      setIsPosting(false);
      toast.dismiss(postingToast);
      toast.error(res.error);
      return;
    }
    router.refresh();
    router.push("/user/my-targets");
    toast.dismiss(postingToast);
    toast.success("Target rates posted!");
    setIsPosting(false);
    setData([]);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setIsDialogOpen(true);
      return;
    }
    await post();
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-primary text-2xl font-bold tracking-tight">
          Post your buying targets
        </h3>
        <ImportDropdown setData={setData} />
      </div>
      <LoginModal
        setOtpModalOpen={setIsOtpModalOpen}
        dialogOpen={isDialogOpen}
        setDialogOpen={setIsDialogOpen}
        email={email}
        setEmail={setEmail}
      />
      <OtpModal
        email={email}
        otpModalOpen={isOtpModalOpen}
        setDialogOpen={setIsDialogOpen}
        setOtpModalOpen={setIsOtpModalOpen}
        postFunction={post}
      />
      <PostRoutesTable
        data={data}
        handleSubmit={handleSubmit}
        posting={isPosting}
        setData={setData}
      />
    </div>
  );
}
