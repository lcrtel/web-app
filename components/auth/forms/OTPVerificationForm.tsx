"use client";

import { Button } from "@/components/ui/button";
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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import verifyOtp from "../actions/verifyOtp";
const otpSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "Your one-time password must be 6 characters." }),
});

export default function OTPVerificationForm({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });
  async function onSubmit(data: z.infer<typeof otpSchema>) {
    if (!email) return;
    setLoading(true);
    const res = await verifyOtp(email, data.otp);
    if (!res?.error) {
      toast.success("OTP verified");
      setLoading(false);
      router.refresh();
    } else {
      setLoading(false);
      toast.error(res.error);
    }
  }
  // const EmailForm = () => {
  //   const handleSubmit = async (data: z.infer<typeof emailSchema>) => {
  //     if (data.email) {
  //       setEmail(data.email);
  //       setOTPLoading(true);
  //       const res = await signInWithOtp(data.email);
  //       if (!res?.error) {
  //         setIsOTPSent(true);
  //         toast.success("OTP sent to your email");
  //       } else {
  //         toast.error(res.error);
  //       }
  //       setOTPLoading(false);
  //     }
  //   };
  //   const form = useForm<z.infer<typeof emailSchema>>({
  //     resolver: zodResolver(emailSchema),
  //     defaultValues: {
  //       email: email,
  //     },
  //   });
  //   return (
  //     <Form {...form}>
  //       <form
  //         onSubmit={form.handleSubmit(handleSubmit)}
  //         className="w-full space-y-2"
  //       >
  //         <FormField
  //           control={form.control}
  //           name="email"
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>Email</FormLabel>
  //               <FormControl>
  //                 <Input
  //                   type="email"
  //                   placeholder="Enter your email"
  //                   {...field}
  //                 />
  //               </FormControl>
  //             </FormItem>
  //           )}
  //         />
  //         <button
  //           type="submit"
  //           className="flex items-center gap-2 text-xs underline"
  //         >
  //           {OTPloading ? (
  //             <>
  //               <Loader2 className="size-4 animate-spin" />
  //               Sending OTP
  //             </>
  //           ) : (
  //             "Send OTP"
  //           )}
  //         </button>
  //       </form>
  //     </Form>
  //   );
  // };
  return (
    <div className="mx-auto w-full space-y-2 md:max-w-[360px]">
      {/* <EmailForm /> */}
      <Form {...otpForm}>
        <form onSubmit={otpForm.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={otpForm.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
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
                <FormDescription className="text-sm">
                  Please enter the OTP sent to{" "}
                  <span className="font-medium text-primary-900">{email}</span>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full gap-2">
            {loading ? (
              <>
                Verifying <Loader2 className="size-4 animate-spin" />
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
