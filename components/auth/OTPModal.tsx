"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { verifyOtp } from "@/app/auth/otp-login/actions";

interface OtpModalProps {
  setOtpModalOpen: Dispatch<SetStateAction<boolean>>;
  otpModalOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  email: string | undefined;
  postFunction: () => Promise<void>;
}

const formSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "Your one-time password must be 6 characters." }),
});
export default function OtpModal({
  email,
  otpModalOpen,
  setDialogOpen,
  setOtpModalOpen,
  postFunction,
}: OtpModalProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!email) return;
    const { error } = await verifyOtp(email, data.otp);
    if (!error) {
      toast.success("OTP verified");
      setOtpModalOpen(false);
      setDialogOpen(false);
      router.refresh();
      await postFunction();
    } else {
      toast.error(error);
    }
  }

  return (
    <AlertDialog open={otpModalOpen} onOpenChange={setOtpModalOpen}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>OTP Verification</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center">
                  <FormLabel className="sr-only">One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="text-center">
                    Please enter the one-time password sent to{" "}
                    <span className="text-primary-900 underline">{email}</span>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter className="!justify-center">
              <Button type="submit">Submit</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
