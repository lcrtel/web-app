"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import OTPForm from "@/components/auth/forms/OTPForm";
import { ImportDropdown, PostRoutesTable } from "@/components/PostRoutesTable";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { postRoutes } from "./actions";

export function PostOffersTable({
  userEmail,
  userId,
}: {
  userEmail: string | undefined;
  userId: string | undefined;
}) {
  const [isPosting, setIsPosting] = useState(false);
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      remarks: ""
    },
  ]);

  async function post() {
    setIsPosting(true);
    const postingToast = toast.loading("Posting...");
    const res = await postRoutes(data);
    if (res?.error) {
      setIsPosting(false);
      toast.dismiss(postingToast);
      toast.error(res.error);
      return;
    }
    router.refresh();
    router.push("/user/my-routes");
    toast.dismiss(postingToast);
    toast.success("Route offers posted!");
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
  useEffect(() => {
    if (isDialogOpen) {
      setIsDialogOpen(false);
      post()
    }
  }, [userId]);
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-primary text-2xl font-bold tracking-tight">
          Post your route offers
        </h2>
        <ImportDropdown setData={setData} />
      </div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Authenticate</AlertDialogTitle>
          </AlertDialogHeader>
          <OTPForm />
        </AlertDialogContent>
      </AlertDialog>
      <PostRoutesTable
        data={data}
        handleSubmit={handleSubmit}
        posting={isPosting}
        setData={setData}
      />
    </div>
  );
}
