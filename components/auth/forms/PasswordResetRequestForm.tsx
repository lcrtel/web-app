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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import resetPassword from "../actions/resetPassword";

export const resetPasswordFormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function PasswordResetRequestForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    mode: "onChange",
  });
  async function onSubmit(data: z.infer<typeof resetPasswordFormSchema>) {
    setLoading(true);
    const res = await resetPassword(data.email);
    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }
    toast.success("Password reset link sent to your email");
    router.refresh();
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid w-full gap-4 text-primary-900"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full gap-2" type="submit">
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Send password reset link"
          )}
        </Button>
      </form>
    </Form>
  );
}
