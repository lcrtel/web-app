"use client";

import {
    HiOutlineCloudUpload,
    HiOutlinePlusCircle,
    HiPaperAirplane,
} from "react-icons/hi";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import * as z from "zod";

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
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { HiX } from "react-icons/hi";

const invoiceFormSchema = z.object({
    date_issued: z.date({
        required_error: "Date of issue is required.",
    }),
    date_due: z.date({
        required_error: "Date of Due is required.",
    }),
    note: z.string().optional(),
});

export default function BulkInvoiceForm({
    clients,
    paymentMethods,
    agents,
}: {
    clients: any;
    paymentMethods: any;
    agents: any;
}) {
    const [loading, setLoading] = useState(false);
    const [upLoading, setUpLoading] = useState(false);
    const [dateIssued, setDateIssued] = useState<Date | undefined>(new Date());
    const [dateDue, setDateDue] = useState<Date | undefined>();
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date | undefined>(new Date());
    const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [invoices, setInvoices] = useState<any>([]);

    useEffect(() => {
        if (dateIssued) {
            // Clone the dateIssued to avoid mutating it
            const newDateDue = new Date(dateIssued);
            // Add 3 days to the dateDue
            newDateDue.setDate(newDateDue.getDate() + 3);
            setDateDue(newDateDue);
        }
    }, [dateIssued]);

    useEffect(() => {
        if (endDate) {
            // Clone the dateIssued to avoid mutating it
            const newStartDate = new Date(endDate);
            // Add 3 days to the dateDue
            newStartDate.setDate(newStartDate.getDate() - 7);
            setStartDate(newStartDate);
        }
    }, [dateIssued, endDate]);

    const handleAddInvoice = () => {
        setInvoices([
            ...invoices,
            {
                invoice_to: "",
                total_amount: "",
                total_duration: "",
                calls: "",
            },
        ]);
    };

    const handleInvoiceChange = (index: any, field: any, value: any) => {
        const updatedInvoices: any = [...invoices];
        updatedInvoices[index][field] = value;
        setInvoices(updatedInvoices);
    };

    const handleDeleteInvoice = (index: any) => {
        const updatedInvoices = [...invoices];
        updatedInvoices.splice(index, 1);
        setInvoices(updatedInvoices);
    };

    const handleClear = (index: any) => {
        setInvoices([]);
    };

    const router = useRouter();

    async function handleSubmit() {
        setErrorMessage(null);
        setLoading(true);
        
        const response = await fetch("/admin/invoices/bulk/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                invoices.map((item: any) => ({
                    invoice_to: item.invoice_to,
                    total_amount: item.total_amount,
                    balance: item.total_amount,
                    description: `Invoice period: ${formatDate(
                        startDate
                    )} to ${formatDate(endDate)}. Calls: ${
                        item.calls
                    }. Duration: ${item.total_duration}mins.`,
                    bill_to: paymentMethod.details,
                    date_issued: dateIssued,
                    date_due: dateDue,
                }))
            ),
        });
        
        if (response.ok) {
            setLoading(false);
            setInvoices([]);
            router.refresh();
            router.push("/admin/invoices");
            toast.success("Invoices Sent Successfully");
        } else {
            const error = await response.json()
            toast.error(error.error);
            setLoading(false);
        }
    }

    const ImportDropdown = () => {
        const handleFileChange = async (e: any) => {
            e.preventDefault();
            setUpLoading(true);
            const file: File | null = e.target.files?.[0]; // Use optional chaining

            if (!file) {
                // Handle the case where no file is selected
                return;
            }

            const reader = new FileReader();

            reader.onload = (e: any) => {
                if (e.target?.result) {
                    const data = new Uint8Array(e.target.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: "array" });

                    let headers: string[] = [];
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData: Record<string, any>[] = [];

                    XLSX.utils
                        .sheet_to_json(worksheet)
                        .forEach((row: any, rowIndex: number) => {
                            if (rowIndex === 0) {
                                headers = Object.keys(row);
                            }

                            const rowData: Record<string, any> = {};

                            headers.forEach((header: string) => {
                                rowData[header] = row[header];
                            });

                            jsonData.push(rowData);
                        });

                    // Clear the input value
                    if (e.target) {
                        (e.target as HTMLInputElement).value = "";
                    }

                    const newArray = jsonData.map((json) => ({
                        invoice_to: clients.find(
                            (client: any) =>
                                client.name.toLowerCase() ===
                                json["Account id"].toLowerCase()
                        )?.id,
                        total_amount: json["Total charges"],
                        total_duration: json["Total duration"],
                        calls: json["Number of cdr"],
                    }));
                    setInvoices((prevData: any) => [...prevData, ...newArray]);
                }
            };

            reader.readAsArrayBuffer(file);
            setUpLoading(false);
        };

        return (
            <div className="relative  text-left">
                <div className="flex flex-col  items-center justify-center p-4">
                    <label
                        htmlFor="file-upload"
                        className=" cursor-pointer text-primary font-semibold mt-2 flex flex-col items-center"
                    >
                        <div className="p-2 mb-1 rounded-lg border-2 border-surface">
                            {upLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <HiOutlineCloudUpload className="w-5 h-5" />
                            )}
                        </div>
                        {upLoading ? "Uploading" : " Click to Upload"}
                    </label>
                    <span className="text-gray-500 text-xs">.xlsx only</span>
                </div>
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".xlsx"
                    onChange={handleFileChange}
                />
            </div>
        );
    };

    function areAllValuesPresent(obj: any) {
        for (const value of Object.values(obj)) {
            if (value === undefined || value === null || value === "") {
                return false; // If any value is undefined or null, return false
            }
        }
        return true; // All values are present
    }

    return (
        <section className=" h-full">
            <div className="grid gap-4 border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col w-full max-w-[305px]  gap-2">
                        <Label>Invoice Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full max-w-[305px] text-left font-normal rounded-lg",
                                        !dateIssued && "text-muted-foreground"
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
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={dateIssued}
                                    onSelect={setDateIssued}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex flex-col w-full max-w-[305px] gap-2">
                        <Label>Due Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full max-w-[305px] text-left font-normal rounded-lg",
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
                                align="start"
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
                <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium">Invoice Period</h3>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col w-full max-w-[305px]  gap-2">
                            <Label>From</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full max-w-[305px] text-left font-normal rounded-lg",
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
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={setStartDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex flex-col w-full max-w-[305px]  gap-2">
                            <Label>To</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full max-w-[305px] text-left font-normal rounded-lg",
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
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={setEndDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col  gap-2">
                        <Label>Payment Method:</Label>{" "}
                        <div className="flex items-center gap-2">
                            {paymentMethod && (
                                <div className="text-slate-400 text-sm">
                                    {paymentMethod.details.bankName}:{" "}
                                    {paymentMethod.details.accountNumber}
                                </div>
                            )}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        Choose
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full">
                                    <DropdownMenuLabel>
                                        Bank Accounts
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />{" "}
                                    {paymentMethods.map(
                                        (method: any) =>
                                            method.type === "bank" && (
                                                <DropdownMenuCheckboxItem
                                                    key={method.id}
                                                    className="cursor-pointer"
                                                    checked={
                                                        paymentMethod.id ===
                                                        method.id
                                                    }
                                                    onCheckedChange={(e) =>
                                                        setPaymentMethod(method)
                                                    }
                                                >
                                                    {method.details.bankName}{" "}
                                                    {
                                                        method.details
                                                            .accountNumber
                                                    }
                                                </DropdownMenuCheckboxItem>
                                            )
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center gap-2 my-4">
                <h2 className="font-semibold text-lg">Invoices</h2>
                <Button
                    onClick={handleSubmit}
                    disabled={
                        !endDate ||
                        !startDate ||
                        !invoices.length ||
                        invoices?.every(
                            (invoice: any) => !areAllValuesPresent(invoice)
                        ) ||
                        !dateIssued ||
                        !dateDue ||
                        !paymentMethod
                            ? true
                            : false
                    }
                    className="gap-2"
                >
                    {loading ? (
                        <>
                            Sending <Loader2 className="h-4 w-4 animate-spin" />
                        </>
                    ) : (
                        <>
                            Send{" "}
                            <HiPaperAirplane className="h-4 w-4 rotate-90" />
                        </>
                    )}
                </Button>
            </div>
            <div className="flex items-center justify-between mb-4 gap-2">
                <Button onClick={handleClear} variant="secondary" size="sm">
                    Clear
                </Button>
                <Button onClick={handleAddInvoice} size="sm" className="gap-2">
                    Add Invoice <HiOutlinePlusCircle className="h-4 w-4" />
                </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {invoices.map((invoice: any, index: any) => (
                    <div
                        key={index}
                        className="border relative bg-slate-50 p-3 rounded-lg grid gap-4"
                    >
                        <button
                            className="absolute right-1 top-1 hover:text-red-500 text-slate-400 p-1 hover:bg-red-50 rounded-full"
                            onClick={() => handleDeleteInvoice(index)}
                        >
                            <HiX className="w-4 h-4" />
                        </button>
                        <div className="flex flex-col mt-2 gap-2">
                            <Label>Client</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-full rounded-lg justify-between",
                                            !invoice.invoice_to &&
                                                "text-muted-foreground"
                                        )}
                                    >
                                        {invoice.invoice_to
                                            ? clients.find(
                                                  (client: any) =>
                                                      client.id ===
                                                      invoice.invoice_to
                                              )?.name
                                            : "Select Client"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
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
                                            {clients.map((client: any) => (
                                                <CommandItem
                                                    value={client.name}
                                                    key={client.id}
                                                    onSelect={() => {
                                                        handleInvoiceChange(
                                                            index,
                                                            "invoice_to",
                                                            client.id
                                                        );
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            client.id ===
                                                                invoice.invoice_to
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {client.name} -{" "}
                                                    {client.company_name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Number of CDR</Label>
                            <Input
                                type="text"
                                placeholder="Number of CDR"
                                value={invoice.calls}
                                onChange={(e) =>
                                    handleInvoiceChange(
                                        index,
                                        "calls",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Total Duration</Label>
                            <Input
                                type="text"
                                placeholder="Total Duration"
                                value={invoice.total_duration}
                                onChange={(e) =>
                                    handleInvoiceChange(
                                        index,
                                        "total_duration",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Total Amount $</Label>
                            <Input
                                type="text"
                                placeholder="Total Amount"
                                value={invoice.total_amount}
                                onChange={(e) =>
                                    handleInvoiceChange(
                                        index,
                                        "total_amount",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="h-[300px] flex items-center justify-center ">
                <ImportDropdown />
            </div>
            {/* <pre>{JSON.stringify(invoices, null, 2)}</pre> */}
        </section>
    );
}
