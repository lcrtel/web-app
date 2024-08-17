"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { signInWithOtp, verifyOtp } from "./actions";
const otpSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "Your one-time password must be 6 characters." }),
});
const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function OTPForm() {
  const [email, setEmail] = useState<string | undefined>("");
  const [isOTPSent, setIsOTPSent] = useState(false);
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
    const res = await verifyOtp(email, data.otp);
    if (!res?.error) {
      toast.success("OTP verified");
      router.refresh();
    } else {
      toast.error(res.error);
    }
  }
  const EmailForm = () => {
    const handleSubmit = async (data: z.infer<typeof emailSchema>) => {
      if (data.email) {
        setEmail(data.email);
        setLoading(true);
        const res = await signInWithOtp(data.email);
        if (!res?.error) {
          setIsOTPSent(true);
          toast.success("OTP sent to your email");
        } else {
          toast.error(res.error);
        }
        setLoading(false);
      }
    };
    const form = useForm<z.infer<typeof emailSchema>>({
      resolver: zodResolver(emailSchema),
      defaultValues: {
        email: email,
      },
    });
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <button type="submit" className="text-xs underline">
            {loading ? "Sending OTP" : "Send OTP"}
          </button>
        </form>
      </Form>
    );
  };
  return (
    <div className="mx-auto w-full space-y-2 md:max-w-[360px]">
      <EmailForm />
      <Form {...otpForm}>
        <form onSubmit={otpForm.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={otpForm.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP disabled={!isOTPSent} maxLength={6} {...field}>
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
                {isOTPSent && (
                  <FormDescription className="text-sm">
                    Please enter the OTP sent to{" "}
                    <span className="font-medium text-primary-900">
                      {email}
                    </span>
                    .
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!isOTPSent || otpForm.formState.isSubmitting}
            className="w-full"
          >
            {otpForm.formState.isSubmitting ? "Verifying..." : "Verify"}
          </Button>
          <div className="flex items-center justify-between gap-2">
            <span className="h-px w-full bg-gradient-to-r from-transparent to-slate-200" />
            <p className="text-slate-400">or</p>
            <span className="h-px w-full bg-gradient-to-l from-transparent to-slate-200" />
          </div>
          <Link
            href="/auth/login"
            className={`w-full gap-2 ${buttonVariants({ variant: "outline" })}`}
          >
            Login with Password <ArrowRight className="size-4" />
          </Link>
        </form>
      </Form>
    </div>
  );
}
