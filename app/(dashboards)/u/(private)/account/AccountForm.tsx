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

import { updateUser } from "@/components/auth/userActions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const profileFormSchema = z.object({
  name: z.string(),
  company_name: z.string().optional(),
  phone: z.string(),
  skype_id: z.string().optional(),
});

export function AccountForm({ user }: { user: any }) {
  const defaultValues = user;
  const userID = user?.id;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: any) {
    setLoading(true);
    const res = await updateUser(userID, data);
    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }
    toast.success("Your details updated");
    setLoading(false);
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp No</FormLabel>
                <FormControl>
                  <Input placeholder="enter your whatsapp number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skype_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skype ID</FormLabel>
                <FormControl>
                  <Input placeholder="Skype ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="ml-auto flex gap-2" disabled={loading}>
          {loading && <Loader2 className="size-4 animate-spin" />} Update
          profile
        </Button>
      </form>
    </Form>
  );
}
