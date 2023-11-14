"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { AnimatePresence, motion } from "framer-motion";
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

import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlinePlusCircle, HiX } from "react-icons/hi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import formatDate from "@/utils/formatDate";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AddBank from "@/app/(dashboards)/admin/config/add-bank/AddBank";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";

const invoiceFormSchema = z.object({
    date_issued: z.date({
        required_error: "Date of issue is required.",
    }),
    date_due: z.date({
        required_error: "Date of Due is required.",
    }),
    note: z.string().optional(),
});

export function CreateInvoice({
    gateways,
    clients,
    paymentMethods,
}: {
    gateways: any;
    clients: any;
    paymentMethods: any;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [duration, setDuration] = useState(0);
    const [calls, setCalls] = useState(0);
    const [rate, setRate] = useState(0);
    const [invoiceTo, setInvoiceTo] = useState();
    const [gatewayID, setGatewayID] = useState();
    const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const router = useRouter();
    
    const form = useForm<any>({
        resolver: zodResolver(invoiceFormSchema),
        defaultValues: { date_issued: new Date() },
        mode: "onChange",
    });

    async function onSubmit(data: any) {
        setErrorMessage(null);
        setLoading(true);

        await fetch("/agent/invoices/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                invoice_to: invoiceTo,
                gateway: gatewayID, 
                description: `Invoice period: ${formatDate(
                    startDate
                )} to ${formatDate(
                    endDate
                )}. Calls: ${calls}. Duration: ${duration}mins.`,
                total_amount: (duration * rate).toFixed(2),
                balance: (duration * rate).toFixed(2),
                bill_to: paymentMethod.details,
            }),
        }).then(async (response) => {
            if (!response.ok) {
                const error = await response.json();
                toast.error(error.message);
                setLoading(false);
                return;
            } else {
                setIsOpen(false);
                setLoading(false);
                router.refresh();
                toast.success("Invoice Created");
            }
        });
    }

    
    return (
        <>
            <Button
                onClick={(e) => setIsOpen(true)}
                className="gap-2 "
                size="sm"
            >
                Create Invoice <HiOutlinePlusCircle className="w-4 h-4" />
            </Button>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {" "}
                        <motion.div
                            className="w-full sm:w-96 z-10 absolute right-0 top-0 h-full overflow-y-auto p-5 shadow-lg rounded-l-xl bg-white border-2"
                            initial={{ opacity: 0, x: "10%" }}
                            animate={{ opacity: 1, x: "0%" }}
                            exit={{ opacity: 0, x: "10%" }}
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-bold tracking-tight text-xl">
                                    Create Invoice
                                </h2>
                                <Button
                                    onClick={(e) => setIsOpen(false)}
                                    variant="outline"
                                    size="icon"
                                >
                                    <HiX className="w-5 h-5" />
                                </Button>
                            </div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="grid gap-5  mb-5">
                                        <div className="flex flex-col items-start gap-2">
                                            <Label>Client</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "w-full rounded-lg justify-between",
                                                                !invoiceTo &&
                                                                    "text-muted-foreground"
                                                            )}
                                                        >
                                                            {invoiceTo
                                                                ? clients.find(
                                                                      (
                                                                          client: any
                                                                      ) =>
                                                                          client.id ===
                                                                          invoiceTo
                                                                  )?.name
                                                                : "Select Client"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    align="start"
                                                    className="w-full p-0 overflow-clip"
                                                >
                                                    <Command>
                                                        <CommandInput placeholder="Search Client..." />
                                                        <CommandEmpty>
                                                            No clients found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {clients.map(
                                                                (
                                                                    client: any
                                                                ) => (
                                                                    <CommandItem
                                                                        value={
                                                                            client.name
                                                                        }
                                                                        key={
                                                                            client.id
                                                                        }
                                                                        onSelect={() => {
                                                                            setInvoiceTo(
                                                                                client.id
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                client.id ===
                                                                                    invoiceTo
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {
                                                                            client.name
                                                                        }{" "}
                                                                        -{" "}
                                                                        {
                                                                            client.company_name
                                                                        }
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </div>
                                        <div className="flex flex-col items-start gap-2">
                                            <Label>Gateway</Label>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-full rounded-lg justify-between",
                                                            !gatewayID &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {gatewayID
                                                            ? gateways.find(
                                                                  (
                                                                      gateway: any
                                                                  ) =>
                                                                      gateway.id ===
                                                                      gatewayID
                                                              )?.name
                                                            : "Select Gateway"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    className="w-64"
                                                    align="start"
                                                >
                                                    <DropdownMenuLabel>
                                                        Gateways
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator />{" "}
                                                    {invoiceTo ? (
                                                        gateways
                                                            .filter(
                                                                (
                                                                    gateway: any
                                                                ) =>
                                                                    gateway.client_id ===
                                                                    invoiceTo
                                                            )
                                                            .map(
                                                                (
                                                                    gateway: any
                                                                ) => (
                                                                    <DropdownMenuCheckboxItem
                                                                        className="cursor-pointer"
                                                                        checked={
                                                                            gateway.id ===
                                                                            gatewayID
                                                                        }
                                                                        key={
                                                                            gateway.id
                                                                        }
                                                                        onCheckedChange={(
                                                                            e
                                                                        ) => {
                                                                            setGatewayID(
                                                                                gateway.id
                                                                            );
                                                                            setRate(
                                                                                gateway.rate
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            gateway.name
                                                                        }
                                                                    </DropdownMenuCheckboxItem>
                                                                )
                                                            )
                                                    ) : (
                                                        <p className="text-slate-400 text-sm p-3">
                                                            Choose a Client
                                                        </p>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <FormMessage />
                                        </div>
                                        <div className="flex flex-col  gap-2 border-b pb-5">
                                            <h3 className="text-base text-left font-semibold">
                                                Invoice Period
                                            </h3>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col items-start gap-2">
                                                    <Label>From</Label>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={
                                                                        "outline"
                                                                    }
                                                                    className={cn(
                                                                        "w-full text-left font-normal rounded-lg",
                                                                        !startDate &&
                                                                            "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {startDate ? (
                                                                        format(
                                                                            startDate,
                                                                            "PPP"
                                                                        )
                                                                    ) : (
                                                                        <span>
                                                                            Pick
                                                                            a
                                                                            date
                                                                        </span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            className="w-auto p-0"
                                                            align="start"
                                                        >
                                                            <Calendar
                                                                mode="single"
                                                                selected={
                                                                    startDate
                                                                }
                                                                onSelect={
                                                                    setStartDate
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                <div className="flex flex-col items-start gap-2">
                                                    <Label>To</Label>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={
                                                                        "outline"
                                                                    }
                                                                    className={cn(
                                                                        "w-full text-left font-normal rounded-lg",
                                                                        !endDate &&
                                                                            "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {endDate ? (
                                                                        format(
                                                                            endDate,
                                                                            "PPP"
                                                                        )
                                                                    ) : (
                                                                        <span>
                                                                            Pick
                                                                            a
                                                                            date
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
                                                                selected={
                                                                    endDate
                                                                }
                                                                onSelect={
                                                                    setEndDate
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 border-b pb-5">
                                            <h3 className="text-base text-left font-semibold">
                                                Usage
                                            </h3>

                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="flex flex-col items-start gap-2">
                                                    <Label>Calls</Label>
                                                    <Input
                                                        type="number"
                                                        value={calls}
                                                        onChange={(e) =>
                                                            setCalls(
                                                                e.target
                                                                    .valueAsNumber
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="flex flex-col items-start gap-2">
                                                    <Label>Mins</Label>
                                                    <Input
                                                        type="number"
                                                        value={duration}
                                                        onChange={(e) =>
                                                            setDuration(
                                                                e.target
                                                                    .valueAsNumber
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="flex flex-col items-start gap-2">
                                                    <Label>Rate</Label>
                                                    <Input
                                                        type="number"
                                                        value={rate}
                                                        onChange={(e) =>
                                                            setRate(
                                                                e.target
                                                                    .valueAsNumber
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <h3 className="text-base text-left font-semibold">
                                                Total Amount: ${" "}
                                                {(duration * rate).toFixed(2)}
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <FormField
                                                control={form.control}
                                                name="date_issued"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col items-start">
                                                        <FormLabel>
                                                            Date Issued
                                                        </FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger
                                                                asChild
                                                            >
                                                                <FormControl>
                                                                    <Button
                                                                        variant={
                                                                            "outline"
                                                                        }
                                                                        className={cn(
                                                                            "w-full text-left font-normal rounded-lg",
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
                                                                                Pick
                                                                                a
                                                                                date
                                                                            </span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent
                                                                className="w-auto p-0"
                                                                align="start"
                                                            >
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={
                                                                        field.value
                                                                    }
                                                                    onSelect={
                                                                        field.onChange
                                                                    }
                                                                    initialFocus
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
                                                    <FormItem className="flex flex-col items-start">
                                                        <FormLabel>
                                                            Date Due
                                                        </FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger
                                                                asChild
                                                            >
                                                                <FormControl>
                                                                    <Button
                                                                        variant={
                                                                            "outline"
                                                                        }
                                                                        className={cn(
                                                                            "w-full text-left font-normal rounded-lg",
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
                                                                                Pick
                                                                                a
                                                                                date
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
                                                                    selected={
                                                                        field.value
                                                                    }
                                                                    onSelect={
                                                                        field.onChange
                                                                    }
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="flex flex-col items-start gap-2">
                                            <div className="flex items-center w-full justify-between">
                                                <Label>Payment Method</Label>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            Choose
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        className="w-full"
                                                        align="end"
                                                    >
                                                        <DropdownMenuLabel>
                                                            Bank Accounts
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuSeparator />{" "}
                                                        {paymentMethods.map(
                                                            (method: any) =>
                                                                method.type ===
                                                                    "bank" && (
                                                                    <DropdownMenuCheckboxItem
                                                                        key={
                                                                            method.id
                                                                        }
                                                                        className="cursor-pointer"
                                                                        checked={
                                                                            paymentMethod.id ===
                                                                            method.id
                                                                        }
                                                                        onCheckedChange={(
                                                                            e
                                                                        ) =>
                                                                            setPaymentMethod(
                                                                                method
                                                                            )
                                                                        }
                                                                    >
                                                                        {
                                                                            method
                                                                                .details
                                                                                .bankName
                                                                        }{" "}
                                                                        {
                                                                            method
                                                                                .details
                                                                                .accountNumber
                                                                        }
                                                                    </DropdownMenuCheckboxItem>
                                                                )
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                            {paymentMethod && (
                                                <div className="text-slate-400 text-left text-sm">
                                                    <p>
                                                        A/C No:{" "}
                                                        {
                                                            paymentMethod
                                                                .details
                                                                .accountNumber
                                                        }
                                                    </p>
                                                    <p>
                                                        A/C Holder Name:{" "}
                                                        {
                                                            paymentMethod
                                                                .details
                                                                .accountHolderName
                                                        }
                                                    </p>
                                                    <p>
                                                        Bank Name:{" "}
                                                        {
                                                            paymentMethod
                                                                .details
                                                                .bankName
                                                        }
                                                    </p>
                                                    <p>
                                                        Branch Name:{" "}
                                                        {
                                                            paymentMethod
                                                                .details
                                                                .branchName
                                                        }
                                                    </p>
                                                    <p>
                                                        IFSC Code:{" "}
                                                        {
                                                            paymentMethod
                                                                .details
                                                                .IFSCCode
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={
                                            !endDate ||
                                            !startDate ||
                                            duration === 0 ||
                                            calls === 0
                                                ? true
                                                : false
                                        }
                                        className=" w-full"
                                    >
                                        {" "}
                                        {loading ? (
                                            <>
                                                Creating
                                                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                            </>
                                        ) : (
                                            "Create"
                                        )}
                                    </Button>{" "}
                                    {errorMessage && (
                                        <div className="text-base mt-4 text-red-500">
                                            {errorMessage}
                                        </div>
                                    )}
                                </form>
                            </Form>
                        </motion.div>
                        <motion.div
                            className="w-full h-full absolute right-0 top-0 bg-white/50 backdrop-blur"
                            onClick={(e) => setIsOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        ></motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
