"use client";

import { HiOutlineCloudDownload, HiOutlineCloudUpload } from "react-icons/hi";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarIcon, Loader2, Send, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { HiX } from "react-icons/hi";
import { sendBulkInvoice } from "./sendBulkInvoice";

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
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
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

    // Check if the field value has actually changed
    if (updatedInvoices[index][field] !== value) {
      updatedInvoices[index][field] = value;
      setInvoices(updatedInvoices);
    }
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
      bill_to: paymentMethod,
    });

    if (!res.success) {
      toast.error(res.error.message);
    } else {
      router.refresh();
      toast.success("Invoices Sent Successfully");
      setInvoices([]);
      router.back();
    }
    setLoading(false);
  }

  function areAllValuesPresent(obj: any) {
    for (const value of Object.values(obj)) {
      if (value === undefined || value === null || value === "") {
        return false; // If any value is undefined or null, return false
      }
    }
    return true; // All values are present
  }

  return (
    <section className="flex h-full flex-row-reverse gap-4">
      <div className="grid h-fit gap-4 rounded-lg border p-4">
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

        <div className="flex flex-col gap-2">
          <Label>Payment Method:</Label>{" "}
          <Textarea
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="max-w-xs"
          />
        </div>
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
              Send <Send className="size-4" />
            </>
          )}
        </Button>
      </div>

      <div className="flex-1 space-y-2">
        {invoices.length > 0 && (
          <Button onClick={handleClear} variant="secondary" size="sm">
            Clear
          </Button>
        )}

        {invoices.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
                  <Input type="text" value={invoice.invoice_to.name} disabled />
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
                {/* <MailCC
                  client={invoice.invoice_to}
                  index={index}
                  invoice={invoice}
                  invoices={invoices}
                  setInvoices={setInvoices}
                /> */}
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
                      handleInvoiceChange(
                        index,
                        "total_duration",
                        e.target.value,
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
                      handleInvoiceChange(index, "total_amount", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-96 w-full items-center justify-center rounded-lg border border-dashed bg-slate-50 p-4">
            <InvoiceImportDropdown clients={clients} setData={setInvoices} />
          </div>
        )}
      </div>
    </section>
  );
}

// const MailCC = ({
//   invoice,
//   invoices,
//   setInvoices,
//   index,
//   client,
// }: {
//   invoice: any;
//   invoices: any;
//   setInvoices: any;
//   index: number;
//   client: any;
// }) => {
//   useEffect(() => {
//     const updatedInvoices = [...invoices];
//     updatedInvoices[index].cc = [];
//     setInvoices(updatedInvoices);

//     const addEmailToCc = (email: any) => {
//       const updatedInvoices = [...invoices];
//       updatedInvoices[index].cc.push(email);
//       setInvoices(updatedInvoices);
//     };
//     if (client?.finance_department?.email) {
//       addEmailToCc(client.finance_department.email);
//     }
//     if (client?.noc_department?.email) {
//       addEmailToCc(client.noc_department.email);
//     }
//     if (client?.sales_department?.email) {
//       addEmailToCc(client.sales_department.email);
//     }
//   }, [client, index, invoices, setInvoices]);

//   const handleCcChange = (emailIndex: any, value: any) => {
//     const updatedInvoices = [...invoices];
//     updatedInvoices[index].cc[emailIndex] = value;
//     setInvoices(updatedInvoices);
//   };

//   const addCcInput = () => {
//     const updatedInvoices = [...invoices];
//     updatedInvoices[index].cc.push("");
//     setInvoices(updatedInvoices);
//   };

//   const removeCcInput = (emailIndex: any) => {
//     const updatedInvoices = [...invoices];
//     updatedInvoices[index].cc.splice(emailIndex, 1);
//     setInvoices(updatedInvoices);
//   };

//   return (
//     <motion.div className="flex flex-col items-start gap-2">
//       <Label>CC</Label>
//       <AnimatePresence>
//         {invoice?.cc?.map((email: string, emailIndex: number) => (
//           <motion.div
//             key={emailIndex}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//             className="flex w-full gap-2"
//           >
//             <Input
//               type="email"
//               value={email}
//               onChange={(e) => handleCcChange(emailIndex, e.target.value)}
//             />
//             <button type="button" onClick={() => removeCcInput(emailIndex)}>
//               <Trash className="h-4 w-4 text-red-500" />
//             </button>
//           </motion.div>
//         ))}
//       </AnimatePresence>
//       <Button
//         type="button"
//         onClick={() => addCcInput()}
//         className="w-full"
//         size="sm"
//         variant="outline"
//       >
//         Add CC Email
//       </Button>
//     </motion.div>
//   );
// };

const InvoiceImportDropdown = ({
  clients,
  setData,
}: {
  clients: any[];
  setData: Dispatch<any>;
}) => {
  const handleFileChange = async (e: any) => {
    e.preventDefault();
    const file: File | null = e.target.files?.[0];

    if (!file) {
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
        setData((prevData: any) => [...prevData, ...newArray]);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm">
          Import
          <HiOutlineCloudDownload className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col items-center justify-center text-primary-900">
          <p className="pb-2 text-xs text-slate-400">
            Import the excel file exported from VOS3000.
          </p>
          <label
            htmlFor="file-upload"
            className="text-primary flex w-full cursor-pointer flex-col items-center rounded-lg border border-dashed bg-slate-50 p-4 font-semibold"
          >
            <div className="mb-1 rounded-lg border-2 p-2">
              <HiOutlineCloudUpload className="size-5" />
            </div>
            Click to Import{" "}
            <span className="text-xs text-gray-500">.xlsx only</span>
          </label>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".xlsx"
          onChange={handleFileChange}
        />
      </PopoverContent>
    </Popover>
  );
};
