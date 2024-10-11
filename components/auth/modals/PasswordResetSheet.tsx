"use client";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { updatePasswordAsAdmin } from "../actions/updatePasswordAsAdmin";

export default function PasswordResetSheet({
  user,
  children,
}: {
  user: Profile;
  children?: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const defaultValues = {
    email: user?.email,
  };
  const form = useForm<any>({
    resolver: zodResolver(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    ),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: any) {
    setLoading(true);
    const updating = toast.loading("Updating...");
    const res = await updatePasswordAsAdmin({
      id: user.id,
      name: user.name,
      ...data,
    });
    if (res?.error) {
      setLoading(false);
      toast.error(res?.error);
      return;
    }
    toast.dismiss(updating);
    toast.success("Login credentials updated");
    router.refresh();
    setIsOpen(false);
    setLoading(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="outline">Reset Password</Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-primary-900">Reset password</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {" "}
              {loading ? (
                <>
                  Saving
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
