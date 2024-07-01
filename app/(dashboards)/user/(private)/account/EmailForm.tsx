"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateUser } from "../../_actions/userActions";
import { User } from "@supabase/supabase-js";

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
  const form = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { currentEmail: user?.email, newEmail: user?.new_email },
    mode: "onChange",
  });
  async function onSubmit(data: z.infer<typeof emailFormSchema>) {
    const { error } = await updateUser({
      email: data.newEmail,
    });
    if (error) {
      toast.error(error);
      return;
    }
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
                <Input type="email" placeholder="new email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="ml-auto flex">
          Save
        </Button>
      </form>
    </Form>
  );
}
