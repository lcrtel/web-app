"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2 } from "lucide-react";
import { use, useState } from "react";
import toast from "react-hot-toast";
import { updateStatus } from "./actions";
import { useRouter } from "next/navigation";

export default function VerificationStatusUpdate({ TRId }: { TRId: number }) {
  return (
    <div className="flex items-center gap-2">
      <Decline trId={TRId} />
      <Verify trId={TRId} />
    </div>
  );
}

function Decline({ trId }: { trId: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  async function onSubmit() {
    setLoading(true);
    const res = await updateStatus(trId, "DECLINED");
    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    } else {
      toast.success("Declined successfully");
      setLoading(false);
      router.refresh()
      setOpen(false);
    }
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="destructive" size="sm">
          Mark as declined
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit rounded-2xl">
        <h4 className="mb-2">Are you sure?</h4>
        <div className="flex items-center justify-between gap-2">
          <Button size="sm" className="w-full px-5" onClick={() => setOpen(false)}>
            No
          </Button>
          <Button size="sm" variant="destructive" className="w-full px-5" onClick={onSubmit}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : "Yes"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
function Verify({ trId }: { trId: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  async function onSubmit() {
    setLoading(true);
    const res = await updateStatus(trId, "VERIFIED");
    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    } else {
      toast.success("Verified successfully");
      setLoading(false);
      router.refresh()
      setOpen(false);
    }
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="sm">
          Mark as verified
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit rounded-2xl">
        <h4 className="mb-2">Are you sure?</h4>
        <div className="flex items-center justify-between gap-2">
          <Button size="sm" className="w-full px-5" onClick={() => setOpen(false)}>
            No
          </Button>
          <Button size="sm" variant="destructive" className="w-full px-5" onClick={onSubmit}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : "Yes"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
