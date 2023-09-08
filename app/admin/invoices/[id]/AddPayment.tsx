"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
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
    FormDescription,
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

import { supabaseAdmin } from "@/lib/supabase-admin";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { HiOutlineExternalLink, HiX } from "react-icons/hi";
import Link from "next/link";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { PopoverContent } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
const paymentFormSchema = z.object({
    amount: z.string(),
    payment_method: z.string(),
    paid_at: z.date(),
});

export function AddPayment({ invoice }: { invoice: Invoice }) {
    const supabase = supabaseAdmin();
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
                    connection_id: invoice.connection_id,
                },
            ])
            .select("*")
            .single();
        if (error) {
            toast.error(error.message);
            return;
        }

        await supabase
            .from("invoices")
            .update({ balance: Number(invoice?.balance) - Number(data.amount) })
            .eq("invoice_id", invoice.invoice_id);

        toast.success("Saved");
        setIsOpen(false);
        router.refresh();
    }
    return (
        <Sheet open={isOpen}>
            <SheetTrigger asChild>
                <Button
                    onClick={(e) => setIsOpen(true)}
                    className=" bg-green-500 hover:bg-green-600 w-full"
                >
                    $ Add Payment
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <div className="flex justify-between items-center mb-5">
                        <SheetTitle>Add Payment</SheetTitle>
                        <div
                            className={`${buttonVariants({
                                variant: "ghost",
                                size: "icon",
                            })} cursor-pointer`}
                            onClick={(e) => setIsOpen(false)}
                        >
                            {" "}
                            <HiX className="w-5 h-5" />
                        </div>
                    </div>
                </SheetHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className=" space-y-4 "
                    >
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payment Amount $</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Payment mount"
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
                                <FormItem className="flex flex-col relative">
                                    <FormLabel>Payment Date</FormLabel>{" "}
                                    <div
                                        className={`${buttonVariants({
                                            variant: "secondary",
                                        })} cursor-pointer w-full rounded-lg flex justify-between relative border border-gray-200 bg-primary-50 focus-visible:bg-white hover:bg-white px-3 py-2 text-sm ring-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:border focus-visible:outline-none focus-visible:border-gray-400 focus-visible:ring-4 focus-visible:ring-primary-50 hover:ring-2 hover:ring-primary-50 disabled:cursor-not-allowed disabled:opacity-50  transition-all ease-in-out duration-300`}
                                        onClick={(event) =>
                                            setCalenderOpen(!calenderOpen)
                                        }
                                    >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        <AnimatePresence>
                                            {calenderOpen && (
                                                <>
                                                    <motion.div
                                                        className=" z-20 absolute border-2 overflow-y-auto border-surface left-0 top-11 rounded-2xl  shadow-xl bg-white"
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
                                                    >
                                                        <Calendar
                                                            mode="single"
                                                            selected={
                                                                field.value
                                                            }
                                                            onSelect={
                                                                field.onChange
                                                            }
                                                        />
                                                    </motion.div>
                                                </>
                                            )}
                                        </AnimatePresence>
                                    </div>
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
                                            <SelectItem value="cash">
                                                Cash
                                            </SelectItem>
                                            <SelectItem value="bank_transfer">
                                                Bank Transfer
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SheetClose asChild>
                            <Button type="submit" className="w-full">
                                Save
                            </Button>
                        </SheetClose>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
