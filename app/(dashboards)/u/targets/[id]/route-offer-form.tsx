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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { postRouteOffer } from "./actions";

const formSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  rate: z.string().min(1, "Rate is required"),
  route_type: z.string(),
  asr: z.string(),
  destination_code: z.string(),
  acd: z.string(),
  ports: z.string(),
  pdd: z.string(),
  remarks: z.string().optional(),
});

export default function RouteOfferForm({ target }: { target: Target }) {
  const [isPosting, setIsPosting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: target.destination,
      destination_code: target.destination_code,
      rate: target.buying_rate.toString(),
      route_type: target.route_type.toString(),
      asr: target.asr,
      acd: target.acd,
      ports: target.ports,
      pdd: target.pdd,
      remarks: "",
    },
  });

  async function onSubmit(values: any) {
    setIsPosting(true);
    const postingToast = toast.loading("Posting...");
    const res = await postRouteOffer(values);
    if (res?.error) {
      setIsPosting(false);
      toast.dismiss(postingToast);
      toast.error(res.error);
      return;
    }
    router.refresh();
    toast.dismiss(postingToast);
    toast.success("Route offer posted!");
    setIsPosting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input placeholder="Enter destination" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="destination_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prefix</FormLabel>
                <FormControl>
                  <Input placeholder="Enter prefix" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate</FormLabel>
                <FormControl>
                  <Input placeholder="Enter rate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="route_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Route Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a route type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cli">CLI</SelectItem>
                    <SelectItem value="ncli">NCLI</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="asr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ASR</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ASR" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ACD</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ACD" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ports"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ports</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ports" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pdd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PDD</FormLabel>
                <FormControl>
                  <Input placeholder="Enter PDD" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarks</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter remarks" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {isPosting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
