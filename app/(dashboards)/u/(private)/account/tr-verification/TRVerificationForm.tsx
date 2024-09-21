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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { submitTRVerificationForm, whoisCheckup } from "./actions";

const trSchema = z.object({
  name: z.string(),
  company_name: z.string(),
  website: z.string(),
  email: z.string().email(),
});

export default function TRVerificationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof trSchema>>({
    resolver: zodResolver(trSchema),
    mode: "onChange",
  });

  async function onSubmit(data: any) {
    setLoading(true);
    try {
      // Fetch WHOIS data
      const res = await whoisCheckup(data.website);
      if (res) {
        const res = await submitTRVerificationForm(data);
        if (!res?.error) {
          toast.success("Submitted");
          router.refresh();
          window.location.reload();
          setLoading(false);
        } else {
          toast.error(res?.error);
          setLoading(false);
        }
      } else {
        throw new Error("Failed to verify.");
      }
    } catch (error) {
      toast.error(
        `Failed to verify the website. Please check the domain name and try again.`,
      );
      setLoading(false);
    }
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
                  <Input placeholder=" name" {...field} />
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
                  <Input placeholder="Company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="ml-auto flex items-center gap-2">
          {loading ? (
            <>
              Submitting
              <Loader2 className="size-4 animate-spin" />
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
