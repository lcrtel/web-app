"use client";

import { Button } from "@/components/ui/button";
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
import { supabaseAdmin } from "@/lib/supabase-admin";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

type Connections = {
    buyer_id: string;
    expiration_date: string;
    id: string;
    route_id: string;
    status: string;
    route_offers: {
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
        seller_id: string;
        selling_rate: string | null;
        updated_at: string | null;
        verification: string;
        verification_by: string | null;
        verified_at: string | null;
    };
};

export default function InvoiceForm({
    users,
    connections,
}: {
    users: Profile[] | null;
    connections: Connections[] | null;
}) {
    const [open, setOpen] = useState(false);
    const [connectionOpen, setConnectionOpen] = useState(false);
    const router = useRouter();

    const [invoiceTo, setInvoiceTo] = useState<Profile>();
    const [billTo, setBillTo] = useState<BankAccount>();
    const [connection, setConnection] = useState<Connections>();
    const [calls, setCalls] = useState(0);
    const [dateIssued, setDateIssued] = useState<Date | undefined>(new Date());
    const [dateDue, setDateDue] = useState<Date | undefined>(
        new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    );
    const [description, setDescription] = useState("");
    const [notes, setNotes] = useState("");

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const supabase = supabaseAdmin();
        if (!connection) {
            toast.error("Select a route connection");
        }
        if (!invoiceTo) {
            toast.error("Select a buyer");
        }
        const { data: target, error } = await supabase.from("invoices").insert({
            invoice_to: invoiceTo?.id,
            connection_id: connection?.id,
            quantity: calls,
            date_issued: dateIssued?.toDateString(),
            date_due: dateDue?.toString(),
            description: description,
            bill_to: {},
            note: notes,
            total_amount:
                calls * Number(connection?.route_offers?.selling_rate),
        });
        if (error) {
            toast.error(error.message);
            return;
        }
        toast.success("Invoice Created");
        router.refresh();
        router.back();
    };

    return (
        <form onSubmit={onSubmit} className=" space-y-2 max-w-8xl mx-auto">
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
                                        ? users?.find(
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
                                    <CommandEmpty>No users found.</CommandEmpty>
                                    <CommandGroup>
                                        {users?.map((user: any) => (
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
                        {invoiceTo ? (
                            <div className="mt-2 text-sm text-slate-500">
                                <p>
                                    {invoiceTo?.first_name}{" "}
                                    {invoiceTo?.last_name}
                                </p>
                                <p>{invoiceTo?.email}</p>
                                <p>{invoiceTo?.phone}</p>
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
                                    ? connections?.find(
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
                                    {connections?.map((item: any) => (
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
                                            {item?.route_offers?.destination}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {connection ? (
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
                                Rate: ${connection?.route_offers?.selling_rate}
                            </p>
                        </div>
                    ) : null}
                </div>
                <div className="flex gap-4 p-4 border-b">
                    <div className="flex-1 space-y-2">
                        <Label className=" font-medium">Description</Label>
                        <Input
                            placeholder="Description"
                            className=""
                            required
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className=" space-y-2">
                        <Label className="font-medium">Rate</Label>
                        <Input
                            disabled
                            type="number"
                            id="rate"
                            value={
                                connection?.route_offers?.selling_rate
                                    ? +connection?.route_offers?.selling_rate
                                    : 0
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className=" font-medium">Calls</Label>
                        <Input
                            placeholder="0"
                            type="number"
                            className=""
                            required
                            value={calls}
                            onChange={(e) => setCalls(e.target.valueAsNumber)}
                        />
                    </div>
                </div>
                <div className="flex justify-between p-4 border-b">
                    <div className="">
                        <h2>Agent:</h2>
                    </div>
                    <div className="flex flex-col gap-2 w-[300px]">
                        <p className=" font-semibold">
                            Total Amount: $
                            {connection?.route_offers?.selling_rate
                                ? +connection?.route_offers?.selling_rate *
                                  calls
                                : 0}
                        </p>
                    </div>
                </div>
                <div className="p-4 w-full">
                    <div>
                        <Label>Notes</Label>
                        <Textarea
                            placeholder="It was a pleasure working with you and your team. Thank You!"
                            className="resize-none w-full"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <Button type="submit" className="w-full">
                Save
            </Button>
        </form>
    );
}
