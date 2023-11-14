"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { supabaseClient } from "@/lib/supabase-client";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

type Gateways = {
    client_id: string;
    expiration_date: string;
    id: string;
    route_id: string;
    status: string;
    rate: string;
    routes: {
        acd: string;
        asr: string;
        capacity: string;
        created_at: string | null;
        destination: string;
        destination_code: string;
        id: string;
        pdd: string;
        ports: string;
        prefix: string;
        rate: string;
        route_type: string;
        vendor_id: string;
        selling_rate: string | null;
        updated_at: string | null;
        verification: string;
        verification_by: string | null;
        verified_at: string | null;
    };
};

export default function InvoiceForm({
    users,
    gateways,
    banks,
}: {
    users: Profile[] | null;
    gateways: any;
    banks: BankAccount[] | null;
}) {
    const [open, setOpen] = useState(false);
    const [connectionOpen, setConnectionOpen] = useState(false);
    const [bankDropdown, setBankDropdown] = useState(false);
    const router = useRouter();

    const [invoiceTo, setInvoiceTo] = useState<Profile>();
    const [paymentInfo, setPaymentInfo] = useState<BankAccount>();
    const [connection, setConnection] = useState<Gateways>();
    const [calls, setCalls] = useState(0);
    const [dateIssued, setDateIssued] = useState<Date | undefined>(new Date());
    const [startDate, setStartDate] = useState<Date | undefined>(
        new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
    );
    const [endDate, setEndDate] = useState<Date | undefined>(new Date());
    const [dateDue, setDateDue] = useState<Date | undefined>(
        new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    );
    const [description, setDescription] = useState("");
    const [notes, setNotes] = useState("");

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const supabase =  supabaseClient();
        if (!connection) {
            toast.error("Select a route connection");
            return;
        }
        if (!invoiceTo) {
            toast.error("Select a client");
            return;
        }
        if (!paymentInfo) {
            toast.error("Select a payment method");
            return;
        }
        if (connection && invoiceTo) {
            const { data: invoice, error } = await supabase
                .from("invoices")
                .insert({
                    invoice_to: invoiceTo?.id,
                    connection_id: connection?.id,
                    quantity: calls,
                    date_issued: dateIssued?.toISOString(),
                    date_due: dateDue?.toISOString(),
                    description: `${startDate?.toDateString()} - ${endDate?.toDateString()}`,
                    bill_to: paymentInfo,
                    note: notes,
                    total_amount:
                        calls * Number(connection?.routes?.selling_rate),
                    balance:
                        calls * Number(connection?.routes?.selling_rate),
                })
             .select(`*, profiles (*)`)
                .single();
            if (error) {
                toast.error(error.message);
                return;
            }


            router.push(`/admin/invoices/${invoice.invoice_id}`);
            toast.success("Invoice Created");

            const { data: route } = await supabase
                .from("gateways")
                .select(`*, routes (*)`)
                .eq("id", connection?.id)
                .single();

                fetch("http://localhost:3000/api/emails/invoice", {
                    method: "POST",
                    body: JSON.stringify({ ...route, ...invoice }),
                });
            toast.success("Sent email successfully");

        }
    };

    return (
        <form
            onSubmit={onSubmit}
            className=" flex items-starts max-w-8xl mx-auto gap-5 mb-5"
        >
            <Link href="/admin/invoices">
                <HiOutlineArrowCircleLeft className="w-6 h-6 mt-2 text-slate-400" />
            </Link>

            <div className="bg-white flex-1 rounded-2xl shadow-xl border w-full">
                <div className=" flex justify-between rounded-t-2xl bg-surface  p-8">
                    <div className="">
                        <Image
                            src="/lcrtelcom_logo.svg"
                            className=""
                            alt="LCRTel Logo"
                            width={160}
                            height={20}
                        />
                    </div>
                    <h2 className="text-4xl uppercase font-bold tracking-tight">
                        Invoice
                    </h2>
                </div>
                <div className="flex justify-between p-8 border-b">
                    <div className="">
                        <div className="flex gap-2 mb-2 items-center">
                            <h2 className="font-medium">Invoice To:</h2>{" "}
                            <div className="relative">
                                <div
                                    className={`${buttonVariants({
                                        variant: "secondary",
                                    })} cursor-pointer w-full flex justify-between `}
                                    onClick={(event) => setOpen(!open)}
                                >
                                    {invoiceTo
                                        ? users?.find(
                                              (user: any) =>
                                                  user.id === invoiceTo.id
                                          )?.email
                                        : "Select Customer..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </div>
                                <AnimatePresence>
                                    {open && (
                                        <>
                                            <motion.div
                                                className=" z-20 absolute border-2 max-h-60 overflow-y-auto border-surface left-0 top-11 rounded-2xl  shadow-xl bg-white"
                                                initial={{
                                                    opacity: 0,
                                                    y: "-4%",
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: "0%",
                                                }}
                                                exit={{ opacity: 0, y: "-4%" }}
                                            >
                                                <Command>
                                                    <CommandInput placeholder="Search Customer..." />
                                                    <CommandEmpty>
                                                        No customers found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {users?.map(
                                                            (user: any) => (
                                                                <CommandItem
                                                                    key={
                                                                        user.id
                                                                    }
                                                                    onSelect={() => {
                                                                        setInvoiceTo(
                                                                            user ===
                                                                                invoiceTo
                                                                                ? ""
                                                                                : user
                                                                        );
                                                                        setOpen(
                                                                            false
                                                                        );
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            invoiceTo ===
                                                                                user
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {user.email}
                                                                </CommandItem>
                                                            )
                                                        )}
                                                    </CommandGroup>
                                                </Command>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        {invoiceTo ? (
                            <div className=" text-slate-500 space-y-1">
                                <p className=" capitalize">
                                    Name: {invoiceTo?.name}{" "}
                                    {invoiceTo?.company_name}
                                </p>
                                <p>Email: {invoiceTo?.email}</p>
                                <p>Phone: {invoiceTo?.phone}</p>
                            </div>
                        ) : null}
                    </div>
                    <div className="w-[300px] flex flex-col gap-2">
                        <div className="flex gap-2 items-center justify-between">
                            <p className=" font-medium whitespace-nowrap">
                                Date Issued:
                            </p>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[200px] pl-3 text-left font-normal !mt-0",
                                            !dateIssued &&
                                                "text-muted-foreground"
                                        )}
                                    >
                                        {dateIssued ? (
                                            format(dateIssued, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    avoidCollisions={false}
                                    className="w-auto p-0"
                                    align="end"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={dateIssued}
                                        onSelect={setDateIssued}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex gap-2 items-center justify-between">
                            <p className=" font-medium whitespace-nowrap">
                                Date Due:
                            </p>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[200px] pl-3 text-left font-normal !mt-0",
                                            !dateDue && "text-muted-foreground"
                                        )}
                                    >
                                        {dateDue ? (
                                            format(dateDue, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    avoidCollisions={false}
                                    className="w-auto p-0"
                                    align="end"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={dateDue}
                                        onSelect={setDateDue}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
                <div className="p-8 border-b">
                    <div className="flex gap-2 mb-2 items-center">
                        <h2 className="font-medium">Route:</h2>
                        <div className="relative">
                            <div
                                className={`${buttonVariants({
                                    variant: "secondary",
                                })} cursor-pointer w-full flex justify-between `}
                                onClick={(event) =>
                                    setConnectionOpen(!connectionOpen)
                                }
                            >
                                {connection
                                    ? gateways?.find(
                                          (item: any) =>
                                              item.id === connection.id
                                      )?.routes?.destination
                                    : "Select Route..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </div>

                            <AnimatePresence>
                                {connectionOpen && (
                                    <>
                                        <motion.div
                                            className=" z-20 w-60 absolute border-2 max-h-60 overflow-y-auto border-surface left-0 top-11 rounded-2xl  shadow-xl bg-white"
                                            initial={{
                                                opacity: 0,
                                                y: "-4%",
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: "0%",
                                            }}
                                            exit={{ opacity: 0, y: "-4%" }}
                                        >
                                            <Command>
                                                <CommandInput placeholder="Search Route" />
                                                <CommandEmpty>
                                                    No routes found.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {gateways
                                                        .filter(
                                                            (item: any) =>
                                                                item.client_id ===
                                                                invoiceTo?.id
                                                        )
                                                        ?.map((item: any) => (
                                                            <CommandItem
                                                                key={item.id}
                                                                onSelect={() => {
                                                                    setConnection(
                                                                        item ===
                                                                            connection
                                                                            ? ""
                                                                            : item
                                                                    );
                                                                    setConnectionOpen(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        connection ===
                                                                            item
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {
                                                                    item
                                                                        ?.routes
                                                                        ?.destination
                                                                }
                                                            </CommandItem>
                                                        ))}
                                                </CommandGroup>
                                            </Command>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    {connection ? (
                        <div className="">
                            <div className="mt-2 flex gap-4 text-slate-500">
                                <p>
                                    Destination:{" "}
                                    <span className=" uppercase">
                                        {connection?.routes?.destination}
                                    </span>
                                </p>
                                <p>
                                    Route Type:{" "}
                                    <span className=" uppercase">
                                        {connection?.routes?.route_type}
                                    </span>
                                </p>
                                <p>
                                    Rate: $
                                    {connection?.routes?.selling_rate}
                                </p>
                            </div>
                            <div className="flex gap-4 mt-2">
                                <div className="flex-1 flex flex-col">
                                    <Label className="font-medium mb-2">
                                        Invoice Period
                                    </Label>
                                    <div className="flex gap-4 items-center">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full rounded-lg pl-3 text-left font-normal !mt-0",
                                                        !startDate &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {startDate ? (
                                                        format(startDate, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                avoidCollisions={false}
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={startDate}
                                                    onSelect={setStartDate}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <p>to</p>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full rounded-lg pl-3 text-left font-normal !mt-0",
                                                        !endDate &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {endDate ? (
                                                        format(endDate, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                avoidCollisions={false}
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={endDate}
                                                    onSelect={setEndDate}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <div className=" flex flex-col">
                                    <Label className="font-medium mb-2">
                                        Rate
                                    </Label>
                                    <Input
                                        disabled
                                        type="number"
                                        id="rate"
                                        value={
                                            connection?.routes
                                                ?.selling_rate
                                                ? +connection?.routes
                                                      ?.selling_rate
                                                : 0
                                        }
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <Label className=" font-medium mb-2">
                                        Duration
                                    </Label>
                                    <Input
                                        placeholder="0"
                                        type="number"
                                        className=""
                                        required
                                        value={calls}
                                        onChange={(e) =>
                                            setCalls(e.target.valueAsNumber)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
                {/* <div className="flex gap-4">
                    <div className="flex-1 flex flex-col">
                        <Label className="font-medium mb-2">
                            Invoice Period
                        </Label>
                        <div className="flex gap-4 items-center">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full rounded-lg pl-3 text-left font-normal !mt-0",
                                            !startDate &&
                                                "text-muted-foreground"
                                        )}
                                    >
                                        {startDate ? (
                                            format(startDate, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    avoidCollisions={false}
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={setStartDate}
                                    />
                                </PopoverContent>
                            </Popover>
                            <p>to</p>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full rounded-lg pl-3 text-left font-normal !mt-0",
                                            !endDate && "text-muted-foreground"
                                        )}
                                    >
                                        {endDate ? (
                                            format(endDate, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    avoidCollisions={false}
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={setEndDate}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className=" flex flex-col">
                        <Label className="font-medium mb-2">Rate</Label>
                        <Input
                            disabled
                            type="number"
                            id="rate"
                            value={
                                connection?.routes?.selling_rate
                                    ? +connection?.routes?.selling_rate
                                    : 0
                            }
                        />
                    </div>

                    <div className="flex flex-col">
                        <Label className=" font-medium mb-2">Calls</Label>
                        <Input
                            placeholder="0"
                            type="number"
                            className=""
                            required
                            value={calls}
                            onChange={(e) => setCalls(e.target.valueAsNumber)}
                        />
                    </div>
                </div> */}
                <div className="flex justify-between items-start p-8 gap-5 border-b">
                    <div className=" space-y-2 mb-2">
                        <h2 className="">Payment Method</h2>
                        <div className="relative">
                            <div
                                className={`${buttonVariants({
                                    variant: "secondary",
                                })} cursor-pointer w-full flex justify-between `}
                                onClick={(event) =>
                                    setBankDropdown(!bankDropdown)
                                }
                            >
                                {paymentInfo
                                    ? banks?.find(
                                          (item: any) =>
                                              item.id === paymentInfo.id
                                      )?.account_no
                                    : "Select Bank Account..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </div>
                            <AnimatePresence>
                                {bankDropdown && (
                                    <>
                                        <motion.div
                                            className=" z-20 w-60 absolute border-2 max-h-60 overflow-y-auto border-surface left-0 top-11 rounded-2xl  shadow-xl bg-white"
                                            initial={{
                                                opacity: 0,
                                                y: "-4%",
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: "0%",
                                            }}
                                            exit={{ opacity: 0, y: "-4%" }}
                                        >
                                            <Command>
                                                <CommandEmpty>
                                                    No Bank Accounts found.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {banks?.map((item: any) => (
                                                        <CommandItem
                                                            key={item.id}
                                                            onSelect={() => {
                                                                setPaymentInfo(
                                                                    item ===
                                                                        paymentInfo
                                                                        ? ""
                                                                        : item
                                                                );
                                                                setBankDropdown(
                                                                    false
                                                                );
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    paymentInfo ===
                                                                        item
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {item.account_no}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                        {paymentInfo ? (
                            <div className=" text-sm text-slate-500">
                                <p>Bank Name: {paymentInfo?.bank_name}</p>
                                <p>Account Name: {paymentInfo?.name}</p>
                                <p>
                                    Account Number:
                                    {paymentInfo?.account_no}
                                </p>
                                <p>
                                    Account Type:
                                    {paymentInfo?.account_type}
                                </p>
                                <p>
                                    IFSC Code:
                                    {paymentInfo?.ifsc_code}
                                </p>
                                <p>
                                    Branch:
                                    {paymentInfo?.branch}
                                </p>
                            </div>
                        ) : null}
                    </div>

                    <div className="flex flex-col gap-2 w-[300px]">
                        <p className=" font-semibold">
                            Total Amount: $
                            {connection?.routes?.selling_rate
                                ? (+connection?.routes?.selling_rate *
                                  calls).toFixed(3)
                                : 0}
                        </p>
                    </div>
                </div>
                <div className="space-y-2 p-8 flex-1">
                    <Label>Notes</Label>
                    <Textarea
                        placeholder="It was a pleasure working with you and your team. Thank You!"
                        className="resize-none w-full"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
            </div>
            
            <Button type="submit" className=" max-w-[200px] w-full">
                Send
            </Button>
        </form>
    );
}
