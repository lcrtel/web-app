"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { editTarget } from "./actions";
const targetFormSchema = z.object({
  acd: z.string().optional(),
  asr: z.string().optional(),
  buying_rate: z.string(),
  destination: z.string(),
  destination_code: z.string(),
  pdd: z.string(),
  ports: z.string().optional(),
  rate: z.string(),
  route_type: z.string(),
});
export function EditTarget({ target }: { target: Target }) {
  const [isOpen, setIsOpen] = useState(false);
  const defaultValues = target;
  const form = useForm<Target>({
    resolver: zodResolver(targetFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const router = useRouter();
  async function onSubmit(data: Target) {
    const res = await editTarget(data, target.id);
    const updating = toast.loading("Updating...");
    if (res?.error) {
      toast.dismiss(updating);
      toast.error(res.error);
      return;
    }
    toast.dismiss(updating);
    toast.success("Target updated");
    setIsOpen(false);
    router.refresh();
  }
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button onClick={(e) => setIsOpen(true)}>Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-primary-900">
            Edit Target
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-5 py-5 sm:grid-cols-2">
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
                        <SelectItem value="lgw">LGW</SelectItem>
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
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rate $</FormLabel>
                    <FormControl>
                      <Input placeholder="Rate $" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buying_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Buying Rate $</FormLabel>
                    <FormControl>
                      <Input placeholder="Buying rate $" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Update target
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
