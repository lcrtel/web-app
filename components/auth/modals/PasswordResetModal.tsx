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
import { supabaseClient } from "@/lib/supabase-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
} from "../../ui/alert-dialog";

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

export function PasswordResetModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const password_reset = searchParams.get("update_password");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  useEffect(() => {
    const checkSession = async () => {
      const supabase = await supabaseClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (password_reset && session) {
        router.refresh();
        setPasswordModalOpen(true);
      }
    };

    checkSession();
  }, [password_reset, router]);
  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    mode: "onChange",
  });
  async function onSubmit(data: any) {
    setLoading(true);
    const res = await updatePassword({
      password: data.password,
    });
    if (res?.error) {
      setLoading(false);
      toast.error(res.error);
      return;
    }
    setPasswordModalOpen(false);
    toast.success("Your password updated");
    setLoading(false);
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
                      placeholder="Confirm New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="ml-auto flex gap-2">
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
