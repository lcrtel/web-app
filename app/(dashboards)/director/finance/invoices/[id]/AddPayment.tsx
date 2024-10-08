"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AnimatePresence, motion } from "framer-motion";

import { supabaseClient } from "@/lib/supabase-client";
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

import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiX } from "react-icons/hi";
const paymentFormSchema = z.object({
  amount: z.string(),
  payment_method: z.string(),
  paid_at: z.date(),
});

export function AddPayment({ invoice }: { invoice: Invoice }) {
  const supabase = supabaseClient();
  const [isOpen, setIsOpen] = useState(false);
  const [calenderOpen, setCalenderOpen] = useState(false);

  const form = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
  });

  const router = useRouter();
  async function onSubmit(data: z.infer<typeof paymentFormSchema>) {
    const { data: payment, error } = await supabase
      .from("payments")
      .insert([
        {
          amount: data.amount,
          payment_method: data.payment_method,
          paid_at: data.paid_at.toISOString(),
          invoice_id: invoice.invoice_id,
          user_id: invoice.invoice_to,
        },
      ])
      .select("*")
      .single();
    if (error) {
      toast.error(error.message);
      return;
    }

    const { data: inv } = await supabase
      .from("invoices")
      .update({
        balance: (Number(invoice?.balance) - Number(data.amount)).toString(),
      })
      .eq("invoice_id", invoice.invoice_id);

    toast.success("Saved");
    setIsOpen(false);
    router.refresh();
  }
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          disabled={invoice?.balance === "0" ? true : false}
          onClick={(e) => setIsOpen(true)}
          className="w-full bg-green-500 hover:bg-green-600"
        >
          $ Add Payment
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="pb-4 text-primary-900">Add Payment</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Amount $</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Payment amount"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paid_at"
              render={({ field }) => (
                <FormItem className="relative flex flex-col">
                  <FormLabel>Payment Date</FormLabel>{" "}
                  <div
                    className={`${buttonVariants({
                      variant: "secondary",
                    })} relative flex w-full cursor-pointer justify-between rounded-lg border border-gray-200 bg-primary-50 px-3 py-2 text-sm ring-white transition-all duration-300 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 hover:bg-white hover:ring-2 hover:ring-primary-50 focus-visible:border focus-visible:border-gray-400 focus-visible:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-50 disabled:cursor-not-allowed disabled:opacity-50`}
                    onClick={(event) => setCalenderOpen(!calenderOpen)}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </div>
                  <AnimatePresence>
                    {calenderOpen && (
                      <>
                        <motion.div
                          className="absolute left-0 top-14 z-20 overflow-y-auto rounded-2xl border-2 border-surface bg-white shadow-xl"
                          initial={{
                            opacity: 0,
                            y: "-4%",
                          }}
                          animate={{
                            opacity: 1,
                            y: "0%",
                          }}
                          exit={{
                            opacity: 0,
                            y: "-4%",
                          }}
                          onMouseLeave={(event) =>
                            setCalenderOpen(!calenderOpen)
                          }
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select Payment Method"
                          {...field}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent avoidCollisions={false}>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank_transfer">
                        Bank Transfer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
