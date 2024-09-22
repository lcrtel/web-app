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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { postPurchaseRequest } from "./actions";

const FormSchema = z.object({
  buying_rate: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Buying rate must be a valid number",
    })
    .optional(),
  whatsapp_no: z.string().min(9, {
    message: "WhatsApp number is required to contact you",
  }),
  payment_type: z.string({
    required_error: "Please select a payment type",
  }),
  ip: z.string().min(6, {
    message: "IP Address is required to configure the route",
  }),
});

export default function PurchaseForm({
  routeId,
  buying_rate,
  whatsapp_no,
  ip,
  trVerified,
}: {
  routeId: string;
  buying_rate: string;
  whatsapp_no: string | null | undefined;
  ip: string | null | undefined;
  trVerified: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      buying_rate,
      whatsapp_no: whatsapp_no || "",
      ip: ip || "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const res = await postPurchaseRequest(routeId, data);
    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    } else {
      toast.success("Purchase request posted");
      router.refresh();
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4"
      >
        <FormField
          control={form.control}
          name="buying_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Buying Rate{" "}
                <span className="text-sm text-slate-500">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter buying rate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsapp_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your WhatsApp number for contact purposes."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IP Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the IP address to configure the route."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payment_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="postpaid">Postpaid</SelectItem>
                  <SelectItem value="prepaid">Prepaid</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("payment_type") === "postpaid" && !trVerified && (
          <div className="flex items-center justify-center gap-2 rounded-full border border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-600">
            <AlertCircle className="size-4" /> Verify your TR to purchase
            postpaid.{" "}
            <Link
              href="/u/account/tr-verification"
              className="font-semibold underline"
            >
              Verify now
            </Link>
          </div>
        )}
        <Button type="submit" className="w-full">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Submit purchase request"
          )}
        </Button>
      </form>
    </Form>
  );
}
