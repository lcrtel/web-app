"use client";
import { signInWithOtp } from "@/app/auth/otp-login/actions";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
interface LoginModalProps {
  email: string | undefined;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  setOtpModalOpen: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
}
export default function LoginModal({
  email,
  dialogOpen,
  setDialogOpen,
  setOtpModalOpen,
  setEmail,
}: LoginModalProps) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      const res = await signInWithOtp(email);
      if (!res?.error) {
        toast.success("OTP sent to your email");
        setLoading(false);
        setOtpModalOpen(true);
      } else {
        toast.error(res.error);
        setLoading(false);
      }
    }
  };
  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Enter your email</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter your email to post your buying targets
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <AlertDialogFooter>
            <Button type="submit">
              {loading ? <Loader2 className="size-4 animate-spin" /> : "Submit"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
