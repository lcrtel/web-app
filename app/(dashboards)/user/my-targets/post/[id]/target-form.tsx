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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "react-hot-toast";
import { updateTarget } from "../../actions";

const routeFormSchema = z.object({
  destination: z.string(),
  rate: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Cannot leave this field blank",
  }),
  route_type: z.string(),
  asr: z.string().optional(),
  acd: z.string().optional(),
  ports: z.string().optional(),
  destination_code: z.string(),
  pdd: z.string(),
});

export function TargetForm({ route }: { route: Target }) {
  const defaultValues = route;
  const form = useForm<any>({
    resolver: zodResolver(routeFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: Route) {
    const updating = toast.loading("Updating...");
    const res = await updateTarget(route, data);
    if (res?.error) {
      toast.dismiss(updating);
      toast.error(res?.error);
      return;
    }
    toast.dismiss(updating);
    toast.success("Target updated");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-5 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input placeholder="Destination" {...field} />
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
                  <Input placeholder="Prefix" {...field} />
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
                <FormLabel>Rate $</FormLabel>
                <FormControl>
                  <Input placeholder="Rate" type="number" {...field} />
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
                      <SelectValue placeholder="Choose a type" {...field} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cli">CLI</SelectItem>
                    <SelectItem value="non-cli">Non-CLI</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="tdm">TDM</SelectItem>
                    <SelectItem value="pri">PRI</SelectItem>
                    <SelectItem value="did">DID</SelectItem>
                    <SelectItem value="cc">CC</SelectItem>
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
                <FormLabel>ASR %</FormLabel>
                <FormControl>
                  <Input placeholder="ASR %" {...field} />
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
                  <Input placeholder="ACD" {...field} />
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
                  <Input placeholder="Ports" {...field} />
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
                  <Input placeholder="PDD" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Update target</Button>
      </form>
    </Form>
  );
}
