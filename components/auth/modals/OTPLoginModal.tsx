"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import OTPForm from "../forms/OTPForm";
export default function OTPLoginModal({
  userId,
}: {
  userId: string | undefined;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (userId) {
      setOpen(false);
    }
  }, [userId]);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm">Login</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Authenticate</AlertDialogTitle>
        </AlertDialogHeader>
        <OTPForm />
      </AlertDialogContent>
    </AlertDialog>
  );
}
