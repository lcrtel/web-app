"use client";

import { Button } from "@/components/ui/button";
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
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import formatDate from "@/utils/formatDate";
import { format } from "date-fns";
import {
    CalendarIcon,
    Check,
    ChevronsUpDown,
    Edit,
    Loader2,
    Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlinePlusCircle, HiX } from "react-icons/hi";
import sendInvoice from "./actions";

const invoiceFormSchema = z.object({
    date_issued: z.date({
        required_error: "Date of issue is required.",
    }),
    date_due: z.date({
        required_error: "Date of Due is required.",
    }),
    number_of_cdr: z.string(),
    total_duration: z.string(),
    total_amount: z.string(),
});

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function CreateInvoice({
    clients,
    paymentMethods,
}: {
    clients: any;
    paymentMethods: any;
}) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [clientPopover, setClientPopover] = useState(false);
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    const [client, setClient] = useState<any>();

    const [to, setTo] = useState<string>("");
    useEffect(() => {
        setTo(client?.email);
    }, [client]);

    const [cc, setCc] = useState<any>([]);

    const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const form = useForm<z.infer<typeof invoiceFormSchema>>({
        resolver: zodResolver(invoiceFormSchema),
        defaultValues: { date_issued: new Date() },
        mode: "onChange",
    });

    async function onSubmit(data: z.infer<typeof invoiceFormSchema>) {
        setErrorMessage(null);
        setLoading(true);
        const res: any = await sendInvoice({
            invoice_details: {
                date_issued: data.date_issued,
                date_due: data.date_due,
                invoice_to: client.id,
                description: `Invoice period: ${formatDate(
                    startDate
                )} to ${formatDate(endDate)}. Calls: ${
                    data.number_of_cdr
                }. Duration: ${data.total_duration}mins.`,
                total_amount: data.total_amount,
                balance: data.total_amount,
                bill_to: paymentMethod.details,
            },
            to: to,
            cc: cc,
        });
        if (!res.success) {
            toast.error(res.error.message);
        } else {
            form.reset();
            router.refresh();
            toast.success("Invoices Sent Successfully");
            setLoading(false);
            setIsOpen(false);
        }
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
                                            <Popover
                                                open={clientPopover}
                                                onOpenChange={setClientPopover}
                                            >
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={
                                                                clientPopover
                                                            }
                                                            className={cn(
                                                                "w-full rounded-lg justify-between",
                                                                !client &&
                                                                    "text-muted-foreground"
                                                            )}
                                                        >
                                                            {client
                                                                ? clients.find(
                                                                      (
                                                                          item: any
                                                                      ) =>
                                                                          item.id ===
                                                                          client?.id
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
                                                                (item: any) => (
                                                                    <CommandItem
                                                                        value={
                                                                            item.name
                                                                        }
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        onSelect={() => {
                                                                            setClient(
                                                                                item
                                                                            );
                                                                            setClientPopover(
                                                                                false
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                item.id ===
                                                                                    client?.id
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {
                                                                            item.name
                                                                        }{" "}
                                                                        -{" "}
                                                                        {
                                                                            item.company_name
                                                                        }
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="flex flex-col gap-2 items-start space-y-0">
                                            <Label>Email</Label>
                                            <Input
                                                placeholder="Reciepient Email"
                                                type="email"
                                                value={to}
                                                onChange={(e) =>
                                                    setTo(e.target.value)
                                                }
                                            />
                                        </div>
                                        <MailCC
                                            cc={cc}
                                            client={client}
                                            setCc={setCc}
                                        />
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

                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="number_of_cdr"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col gap-2 items-start space-y-0">
                                                            <FormLabel>
                                                                Number of CDR
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="CDR"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="total_duration"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col gap-2 items-start space-y-0">
                                                            <FormLabel>
                                                                Total Duration
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Duration"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="total_amount"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col gap-2 items-start space-y-0 col-span-2">
                                                            <FormLabel>
                                                                Total Amount
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Total Amount"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
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
                                            !endDate || !startDate
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

export const MailCC = ({
    cc,
    setCc,
    client,
}: {
    cc: any;
    setCc: any;
    client: any;
}) => {
    useEffect(() => {
        setCc([]);
        const addEmailToCc = (email: any) => {
            setCc((prevCc: any) => {
                if (!prevCc.includes(email)) {
                    return [...prevCc, email];
                }
                return prevCc;
            });
        };
        if (client?.finance_department?.email) {
            addEmailToCc(client.finance_department.email);
        }
        if (client?.noc_department?.email) {
            addEmailToCc(client.noc_department.email);
        }
        if (client?.sales_department?.email) {
            addEmailToCc(client.sales_department.email);
        }
    }, [client]);

    const [editIndex, setEditIndex] = useState<number | null>(null);

    const addCc = (email: string) => {
        if (!cc.includes(email)) {
            setCc((prevData: any) => [...prevData, email]);
        } else {
            toast.error("Email already added");
        }
        setEditIndex(null);
    };

    const editCc = (index: number) => {
        setEditIndex(index);
    };

    const updateCc = (index: number, email: string) => {
        setCc((prevData: any) => {
            const newData = [...prevData];
            newData[index] = email;
            return newData;
        });
        setEditIndex(null);
    };

    const removeCc = (index: number) => {
        setCc((prevData: any) => {
            const newData = [...prevData];
            newData.splice(index, 1);
            return newData;
        });
    };

    const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent the default behavior (e.g., form submission)
            if (emailRegex.test(e.currentTarget.value)) {
                addCc(e.currentTarget.value);
                e.currentTarget.value = "";
            } else if (e.currentTarget.value !== "") {
                toast.error("Please enter a valid email address");
            }
        }
    };

    return (
        <div className="flex flex-col items-start gap-2">
            <Label>CC</Label>
            {cc?.map((email: string, index: number) => (
                <div className="flex gap-2 w-full" key={index}>
                    <Input
                        type="email"
                        value={email}
                        readOnly={editIndex !== index}
                        onChange={(e) => updateCc(index, e.target.value)}
                    />
                    <button type="button" onClick={() => editCc(index)}>
                        <Edit className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => removeCc(index)}>
                        <Trash className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            ))}
            <Input
                type="email"
                placeholder="Enter a valid email address"
                onBlur={(e) => {
                    if (emailRegex.test(e.target.value)) {
                        addCc(e.target.value);
                        e.target.value = "";
                    } else if (e.target.value !== "") {
                        toast.error("Please enter a valid email address");
                    }
                }}
                onKeyDown={handleEnterKeyPress}
            />
        </div>
    );
};
