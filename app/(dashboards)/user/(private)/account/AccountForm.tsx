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
import { toast } from "react-hot-toast";
import { updateUser, updateUserProfile } from "../../_actions/userActions";

const profileFormSchema = z.object({
  name: z.string(),
  company_name: z.string().optional(),
  phone: z.string(),
  skype_id: z.string().optional(),
});

export function AccountForm({ user }: { user: any }) {
  const defaultValues = user;
  const userID = user?.id;

  const router = useRouter();
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: any) {
    const { error } = await updateUserProfile(data, userID);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Your details updated");
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
        <Button type="submit" className="ml-auto flex">
          Update profile
        </Button>
      </form>
    </Form>
  );
}
