"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const bankSchema = z.object({
    bank_name: z.string(),
    account_name: z.string(),
    account_number: z.string(),
    ifsc_code: z.string(),
    branch: z.string(),
});
const itemsSchema = z.object({
    description: z.string(),
    rate: z.number(),
    quantity: z.number(),
});
const routeFormSchema = z.object({
    invoice_id: z.string(),
    date_issued: z.date(),
    date_due: z.date(),
    bill_to: bankSchema,
    invoice_to: z.string(),
    agent: z.string(),
    description: z.string(),
    rate: z.number(),
    quantity: z.number(),
    deal_id: z.number(),
    note: z.string(),
    total_amount: z.number(),
});
const defaultValues: z.infer<typeof routeFormSchema> = {
    invoice_id: "",
    date_issued: new Date(),
    date_due: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    bill_to: {
        bank_name: "",
        account_name: "",
        account_number: "",
        ifsc_code: "",
        branch: "",
    },
    invoice_to: "",
    description: "",
    rate: 0,
    quantity: 0,
    agent: "",
    deal_id: 0,
    note: "",
    total_amount: 0,
};
export default function InvoiceForm() {
    const form = useForm<z.infer<typeof routeFormSchema>>({
        resolver: zodResolver(routeFormSchema),
        defaultValues,
        mode: "onChange",
    });
    const [invoiceTo, setInvoiceTo] = useState();
    // const [items, setItems] = useState<z.infer<typeof itemsSchema>[]>([
    //     {
    //         description: "",
    //         rate: 0,
    //         quantity: 0,
    //     },
    // ]);
    // const handleAddItem = () => {
    //     setItems((prevItems) => [
    //         ...prevItems,
    //         {
    //             description: "",
    //             rate: 0,
    //             quantity: 0,
    //         },
    //     ]);
    // };
    const router = useRouter();
    async function onSubmit(data: z.infer<typeof routeFormSchema>) {
        const supabase = supabaseAdmin();
        // const { data: target, error } = await supabase
        //     .from("invoices")
        //     .insert(data)
        //     .select();
        // if (error) {
        //     toast.error(error.message);
        //     return;
        // }
        toast.success("Invoice Created");
        router.refresh();
        router.back();
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-5 w-full max-w-8xl mx-auto"
            >
                <div className="bg-white border-2 border-white rounded-lg shadow-lg w-full">
                    <div className="flex justify-between p-4 border-b">
                        <div className="">
                            <Image
                                src="/lcrtelcom_logo.svg"
                                className=""
                                alt="LCRTel Logo"
                                width={160}
                                height={20}
                            />
                        </div>
                        <div className="w-[300px] flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="invoice_id"
                                render={({ field }) => (
                                    <FormItem className="flex gap-2 items-center justify-between">
                                        <FormLabel className="text-lg font-medium">
                                            Invoice
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="#0000"
                                                disabled
                                                className="!mt-0 w-[200px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date_issued"
                                render={({ field }) => (
                                    <FormItem className="flex gap-2 items-center justify-between">
                                        <FormLabel className=" font-medium whitespace-nowrap">
                                            Date Issued:
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[200px] pl-3 text-left font-normal !mt-0",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="end"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date_due"
                                render={({ field }) => (
                                    <FormItem className="flex gap-2 items-center justify-between">
                                        <FormLabel className=" font-medium whitespace-nowrap">
                                            Date Due:
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[200px] pl-3 text-left font-normal !mt-0",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="end"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between p-4 border-b">
                        <div className="">
                            <h2>Invoice To:</h2>
                        </div>
                        <div className="w-[300px] flex flex-col gap-2">
                            <h2>Bill To:</h2>
                        </div>
                    </div>

                    <div className="flex gap-4 p-4 border-b">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className=" font-medium">
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Description"
                                            className=""
                                            {...field}
                                        />
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
                                    <FormLabel className=" font-medium">
                                        Rate
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="$0.00"
                                            type="number"
                                            className=""
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" font-medium">
                                        Qty
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="0"
                                            type="number"
                                            className=""
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-between p-4 border-b">
                        <div className="">
                            <h2>Agent:</h2>
                        </div>
                        <div className="flex flex-col gap-2 w-[300px]">
                            <div className="flex justify-between">
                                <p>Subtotal: </p>
                                <p></p>
                            </div>
                            <div className="flex justify-between">
                                <p>Discount: </p>
                                <p></p>
                            </div>
                            <div className="flex justify-between ">
                                <p>Tax: </p>
                                <p></p>
                            </div>
                            <div className="flex justify-between pt-2 border-t">
                                <p>Total: </p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between p-4"></div>
                </div>
                <div className="w-1/4 bg-white border-2 border-white rounded-lg shadow-lg p-4"></div>
                {/* <FormField
                        control={form.control}
                        name="bill_to"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Route Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="Choose a type"
                                                {...field}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="cli">CLI</SelectItem>
                                        <SelectItem value="non-cli">
                                            Non-CLI
                                        </SelectItem>
                                        <SelectItem value="sms">SMS</SelectItem>
                                        <SelectItem value="did">DID</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
            </form>
        </Form>
    );
}
