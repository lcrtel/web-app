"use client";

import { updatePassword } from "@/app/(dashboards)/user/(private)/account/password/action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiEye, HiEyeOff } from "react-icons/hi";
import * as z from "zod";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

const passwordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
            value,
          ),
        {
          message:
            "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character",
        },
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    },
  );

export function PasswordResetModal({ role }: { role: string }) {
  const searchParams = useSearchParams();
  const password_reset = searchParams.get("update_password");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  useEffect(() => {
    if (password_reset) {
      setPasswordModalOpen(true);
    }
  }, [password_reset]);
  const router = useRouter();
  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    mode: "onChange",
  });
  async function onSubmit(data: any) {
    const res = await updatePassword({
      password: data.password,
    });
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    setPasswordModalOpen(false);
    toast.success("Your password updated");
    router.push("/");
  }

  return (
    <AlertDialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Update password</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex">
                    <FormLabel>New password</FormLabel>
                    <div
                      className="ml-2 cursor-pointer text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <HiEyeOff /> : <HiEye />}
                    </div>
                  </div>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="flex">
                    <FormLabel>Confirm new password</FormLabel>
                    <div
                      className="ml-2 cursor-pointer text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <HiEyeOff /> : <HiEye />}
                    </div>
                  </div>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="ml-auto flex">
              Change Password
            </Button>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
