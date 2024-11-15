"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { changeEmail } from "@/components/auth/userActions";
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
import { User } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const emailFormSchema = z
  .object({
    currentEmail: z.string().email(),
    newEmail: z.string(),
  })
  .refine(
    (values) => {
      return values.currentEmail !== values.newEmail;
    },
    {
      message: "New email must be different from the current email!",
      path: ["newEmail"],
    },
  );

export function EmailForm({ user }: { user: User | undefined }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { currentEmail: user?.email, newEmail: user?.new_email },
    mode: "onChange",
  });
  async function onSubmit(data: z.infer<typeof emailFormSchema>) {
    if (!user) return;
    setLoading(true);
    const res = await changeEmail(data.newEmail);
    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }
    window.location.reload();
    setLoading(false);
    toast.success("Your email has been updated");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="currentEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current email</FormLabel>
              <FormControl>
                <Input type="email" disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="New email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="ml-auto flex gap-2">
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Save"}
        </Button>
      </form>
    </Form>
  );
}
