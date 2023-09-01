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
import { Check, CalendarIcon, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";

const bankSchema = z.object({
    bank_name: z.string(),
    account_name: z.string(),
    account_number: z.string(),
    ifsc_code: z.string(),
    branch: z.string(),
});
const routeFormSchema = z.object({
    date_issued: z.date(),
    date_due: z.date(),
    bill_to: bankSchema,
    agent: z.string(),
    description: z.string(),

    quantity: z.number(),
    note: z.string(),
    total_amount: z.number(),
});

export default function InvoiceForm({
    users,
    connections,
}: {
    users: any;
    connections: any;
}) {
    const defaultValues: z.infer<typeof routeFormSchema> = {
        date_issued: new Date(),
        date_due: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        bill_to: {
            bank_name: "",
            account_name: "",
            account_number: "",
            ifsc_code: "",
            branch: "",
        },
        description: "",
        quantity: 0,
        agent: "",
        note: "",
        total_amount: 0,
    };
    const form = useForm<z.infer<typeof routeFormSchema>>({
        resolver: zodResolver(routeFormSchema),
        defaultValues,
        mode: "onChange",
    });
    const [invoiceTo, setInvoiceTo] = useState<any>("");
    const [connection, setConnection] = useState<any>("");
    const [rate, setRate] = useState(0);
    const [calls, setCalls] = useState(0);
    const [open, setOpen] = useState(false);
    const [connectionOpen, setConnectionOpen] = useState(false);
    const router = useRouter();
    async function onSubmit(data: z.infer<typeof routeFormSchema>) {
        const supabase = supabaseAdmin();
        if (connection === "") {
            toast.error("Select a route connection");
        }
        if (invoiceTo === "") {
            toast.error("Select a buyer");
        }
        const { data: target, error } = await supabase.from("invoices").insert({
            ...data,
            connection_id: connection.id,
            invoice_to: invoiceTo.id,
            quantity: calls,
        });
        if (error) {
            toast.error(error.message);
            return;
        }
        toast.success("Invoice Created");
        router.refresh();
        router.back();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-2 max-w-8xl mx-auto"
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
                            <h2 className="text-lg font-medium">Invoice</h2>
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
                            <h2 className="mb-2">Invoice To:</h2>{" "}
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        role="combobox"
                                        aria-expanded={open}
                                        className=" justify-between"
                                    >
                                        {invoiceTo
                                            ? users.find(
                                                  (user: any) =>
                                                      user.id === invoiceTo.id
                                              )?.email
                                            : "Select User..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className=" p-0" align="start">
                                    <Command>
                                        <CommandInput placeholder="Search users..." />
                                        <CommandEmpty>
                                            No users found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {users.map((user: any) => (
                                                <CommandItem
                                                    key={user.id}
                                                    onSelect={() => {
                                                        setInvoiceTo(
                                                            user === invoiceTo
                                                                ? ""
                                                                : user
                                                        );
                                                        setOpen(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            invoiceTo === user
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {user.email}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            {invoiceTo !== "" ? (
                                <div className="mt-2 text-sm text-slate-500">
                                    <p>
                                        {invoiceTo?.user_metadata?.first_name}{" "}
                                        {invoiceTo?.user_metadata?.last_name}
                                    </p>
                                    <p>{invoiceTo?.email}</p>
                                    <p>{invoiceTo?.user_metadata?.phone}</p>
                                </div>
                            ) : null}
                        </div>
                        <div className="w-[300px] flex flex-col gap-2">
                            <h2>Bill To:</h2>
                        </div>
                    </div>
                    <div className="p-4 border-b">
                        <h2 className="mb-2">Route Connection</h2>
                        <Popover
                            open={connectionOpen}
                            onOpenChange={setConnectionOpen}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    role="combobox"
                                    aria-expanded={connectionOpen}
                                    className=" justify-between"
                                >
                                    {connection
                                        ? connections.find(
                                              (item: any) =>
                                                  item.id === connection.id
                                          )?.route_offers?.destination
                                        : "Select Connections..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className=" p-0" align="start">
                                <Command>
                                    <CommandInput placeholder="Search Connections..." />
                                    <CommandEmpty>
                                        No connections found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {connections.map((item: any) => (
                                            <CommandItem
                                                key={item.id}
                                                onSelect={() => {
                                                    setConnection(
                                                        item === connection
                                                            ? ""
                                                            : item
                                                    );
                                                    setConnectionOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        connection === item
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {
                                                    item?.route_offers
                                                        ?.destination
                                                }
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        {connection !== "" ? (
                            <div className="mt-2 text-sm text-slate-500">
                                <p>
                                    Destination:{" "}
                                    {connection?.route_offers?.destination}
                                </p>
                                <p>
                                    Route Type:{" "}
                                    {connection?.route_offers?.route_type}
                                </p>
                                <p>
                                    Rate: $
                                    {connection?.route_offers?.selling_rate}
                                </p>
                            </div>
                        ) : null}
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
                                            required
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=" space-y-2">
                            <FormLabel className="font-medium">Rate</FormLabel>
                            <Input
                                placeholder="$0.00"
                                className=""
                                type="number"
                                required
                                onChange={(e) =>
                                    setRate(e.target.valueAsNumber)
                                }
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" font-medium">
                                        Calls
                                    </FormLabel>
                                    <Input
                                        placeholder="0"
                                        type="number"
                                        className=""
                                        required
                                        onChange={(e) =>
                                            setCalls(e.target.valueAsNumber)
                                        }
                                    />
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
                            <p className=" font-semibold">
                                Total Amount: ${calls ? rate * calls : 0}
                            </p>
                        </div>
                    </div>
                    <div className="p-4 w-full">
                        <FormField
                            control={form.control}
                            name="note"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="It was a pleasure working with you and your team. Thank You!"
                                            className="resize-none w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit" className="w-full">
                    Save
                </Button>
            </form>
        </Form>
    );
}
