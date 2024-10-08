"use client";

import {
    HiOutlineCloudUpload,
    HiOutlinePlusCircle,
    HiPaperAirplane,
} from "react-icons/hi";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
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
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
    CalendarIcon,
    Check,
    ChevronsUpDown,
    Loader2,
    Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { HiX } from "react-icons/hi";
import * as z from "zod";
import { sendBulkInvoice } from "../actions";

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
}: {
  clients: any;
  paymentMethods: any;
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
  const router = useRouter();

  useEffect(() => {
    if (dateIssued) {
      const newDateDue = new Date(dateIssued);
      newDateDue.setDate(newDateDue.getDate() + 3);
      setDateDue(newDateDue);
    }
  }, [dateIssued]);

  useEffect(() => {
    if (endDate) {
      const newStartDate = new Date(endDate);
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
        cc: [],
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

  async function handleSubmit() {
    setErrorMessage(null);
    setLoading(true);

    const res: any = await sendBulkInvoice({
      invoices: invoices,
      date_due: dateDue,
      date_issued: dateIssued,
      start_date: startDate,
      end_date: endDate,
      bill_to: paymentMethod.details,
    });

    if (!res.success) {
      toast.error(res.error.message);
    } else {
      router.refresh();
      toast.success("Invoices Sent Successfully");
      setInvoices([]);
      router.back();
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
                client?.name.toLowerCase() === json["Account id"].toLowerCase(),
            ),
            total_amount: json["Total charges"],
            total_duration: json["Total duration"],
            calls: json["Number of cdr"],
            cc: [""],
          }));
          setInvoices((prevData: any) => [...prevData, ...newArray]);
        }
      };

      reader.readAsArrayBuffer(file);
      setUpLoading(false);
    };

    return (
      <div className="relative text-left">
        <div className="flex flex-col items-center justify-center p-4">
          <label
            htmlFor="file-upload"
            className="text-primary mt-2 flex cursor-pointer flex-col items-center font-semibold"
          >
            <div className="mb-1 rounded-lg border-2 border-surface p-2">
              {upLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <HiOutlineCloudUpload className="h-5 w-5" />
              )}
            </div>
            {upLoading ? "Uploading" : " Click to Upload"}
          </label>
          <span className="text-xs text-gray-500">.xlsx only</span>
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
    <section className="h-full">
      <div className="grid gap-4 rounded-lg border p-4">
        <div className="flex items-center gap-4">
          <div className="flex w-full max-w-[305px] flex-col gap-2">
            <Label>Invoice Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full max-w-[305px] rounded-lg text-left font-normal",
                    !dateIssued && "text-muted-foreground",
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
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateIssued}
                  onSelect={setDateIssued}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex w-full max-w-[305px] flex-col gap-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full max-w-[305px] rounded-lg text-left font-normal",
                    !dateDue && "text-muted-foreground",
                  )}
                >
                  {dateDue ? format(dateDue, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
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
            <div className="flex w-full max-w-[305px] flex-col gap-2">
              <Label>From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full max-w-[305px] rounded-lg text-left font-normal",
                      !startDate && "text-muted-foreground",
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
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex w-full max-w-[305px] flex-col gap-2">
              <Label>To</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full max-w-[305px] rounded-lg text-left font-normal",
                      !endDate && "text-muted-foreground",
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
                <PopoverContent className="w-auto p-0" align="start">
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
          <div className="flex flex-col gap-2">
            <Label>Payment Method:</Label>{" "}
            <div className="flex items-center gap-2">
              {paymentMethod && (
                <div className="text-sm text-slate-400">
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
                  <DropdownMenuLabel>Bank Accounts</DropdownMenuLabel>
                  <DropdownMenuSeparator />{" "}
                  {paymentMethods.map(
                    (method: any) =>
                      method.type === "bank" && (
                        <DropdownMenuCheckboxItem
                          key={method.id}
                          className="cursor-pointer"
                          checked={paymentMethod.id === method.id}
                          onCheckedChange={(e) => setPaymentMethod(method)}
                        >
                          {method.details.bankName}{" "}
                          {method.details.accountNumber}
                        </DropdownMenuCheckboxItem>
                      ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Invoices</h2>
        <Button
          onClick={handleSubmit}
          disabled={
            !endDate ||
            !startDate ||
            !invoices.length ||
            invoices?.every((invoice: any) => !areAllValuesPresent(invoice)) ||
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
              Send <HiPaperAirplane className="h-4 w-4 rotate-90" />
            </>
          )}
        </Button>
      </div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <Button onClick={handleClear} variant="secondary" size="sm">
          Clear
        </Button>
        <Button onClick={handleAddInvoice} size="sm" className="gap-2">
          Add Invoice <HiOutlinePlusCircle className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {invoices.map((invoice: any, index: any) => (
          <div
            key={index}
            className="relative grid gap-4 rounded-lg border bg-slate-50 p-3"
          >
            <button
              className="absolute right-1 top-1 rounded-full p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
              onClick={() => handleDeleteInvoice(index)}
            >
              <HiX className="h-4 w-4" />
            </button>
            <div className="mt-2 flex flex-col gap-2">
              <Label>Client</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between rounded-lg",
                      !invoice.invoice_to?.id && "text-muted-foreground",
                    )}
                  >
                    {invoice.invoice_to?.id
                      ? clients.find(
                          (client: any) => client.id === invoice.invoice_to?.id,
                        )?.name
                      : "Select Client"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-full overflow-clip p-0"
                >
                  <Command>
                    <CommandInput placeholder="Search Client..." />
                    <CommandEmpty>No clients found.</CommandEmpty>
                    <CommandGroup>
                      {clients.map((client: any) => (
                        <CommandItem
                          value={client?.name}
                          key={client.id}
                          onSelect={() => {
                            handleInvoiceChange(index, "invoice_to", client);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              client.id === invoice.invoice_to?.id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {client?.name} - {client.company_name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <Label>To</Label>
              <Input
                type="text"
                placeholder="Email"
                value={invoice.invoice_to.email}
                disabled
              />
            </div>
            <MailCC
              client={invoice.invoice_to}
              index={index}
              invoice={invoice}
              invoices={invoices}
              setInvoices={setInvoices}
            />
            <div className="flex flex-col gap-2">
              <Label>Number of CDR</Label>
              <Input
                type="text"
                placeholder="Number of CDR"
                value={invoice.calls}
                onChange={(e) =>
                  handleInvoiceChange(index, "calls", e.target.value)
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
                  handleInvoiceChange(index, "total_duration", e.target.value)
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
                  handleInvoiceChange(index, "total_amount", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex h-[300px] items-center justify-center">
        <ImportDropdown />
      </div>
      {/* <pre>{JSON.stringify(invoices, null, 2)}</pre> */}
    </section>
  );
}

const MailCC = ({
  invoice,
  invoices,
  setInvoices,
  index,
  client,
}: {
  invoice: any;
  invoices: any;
  setInvoices: any;
  index: number;
  client: any;
}) => {
  useEffect(() => {
    const updatedInvoices = [...invoices];
    updatedInvoices[index].cc = [];
    setInvoices(updatedInvoices);

    const addEmailToCc = (email: any) => {
      const updatedInvoices = [...invoices];
      updatedInvoices[index].cc.push(email);
      setInvoices(updatedInvoices);
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
  }, [client, index, invoices, setInvoices]);

  const handleCcChange = (emailIndex: any, value: any) => {
    const updatedInvoices = [...invoices];
    updatedInvoices[index].cc[emailIndex] = value;
    setInvoices(updatedInvoices);
  };

  const addCcInput = () => {
    const updatedInvoices = [...invoices];
    updatedInvoices[index].cc.push("");
    setInvoices(updatedInvoices);
  };

  const removeCcInput = (emailIndex: any) => {
    const updatedInvoices = [...invoices];
    updatedInvoices[index].cc.splice(emailIndex, 1);
    setInvoices(updatedInvoices);
  };

  return (
    <motion.div className="flex flex-col items-start gap-2">
      <Label>CC</Label>
      <AnimatePresence>
        {invoice?.cc?.map((email: string, emailIndex: number) => (
          <motion.div
            key={emailIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex w-full gap-2"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => handleCcChange(emailIndex, e.target.value)}
            />
            <button type="button" onClick={() => removeCcInput(emailIndex)}>
              <Trash className="h-4 w-4 text-red-500" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      <Button
        type="button"
        onClick={() => addCcInput()}
        className="w-full"
        size="sm"
        variant="outline"
      >
        Add CC Email
      </Button>
    </motion.div>
  );
};
