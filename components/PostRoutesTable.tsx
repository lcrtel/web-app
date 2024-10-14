"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import React, { Dispatch, useEffect, useMemo, useState } from "react";
import {
  HiOutlineCloudDownload,
  HiOutlineCloudUpload,
  HiOutlineDuplicate,
  HiOutlineTrash,
  HiOutlineUpload,
  HiOutlineX,
  HiPlusCircle,
} from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export function PostRoutesTable({
  clients,
  vendors,
  setData,
  data,
  handleSubmit,
  posting,
}: {
  clients?: Profile[];
  vendors?: Profile[];
  setData: Dispatch<any>;
  data: any;
  handleSubmit: (e: any) => Promise<void>;
  posting: boolean;
}) {
  const [columnVisibility, setColumnVisibility] = useState({});

  const handleAddRoute = () => {
    setData((prevData: any) => [
      ...prevData,
      {
        id: uuidv4(),
        destination: "",
        rate: 0,
        route_type: "cli",
        asr: "",
        acd: "",
        ports: "",
        pdd: "",
        remarks: "",
      },
    ]);
  };

  const handleClear = () => {
    setData([]);
  };

  const handleRemoveRoute = (row: any) => {
    setData((prevData: any) =>
      prevData.filter((route: any) => route.id !== row.original.id),
    );
  };
  const handleDuplicateRow = (row: any) => {
    setData((prevData: any) => {
      const newRow = { ...row.original, id: uuidv4() };
      return [...prevData, newRow];
    });
  };

  interface EditableCellProps {
    getValue: () => any;
    users?: Profile[];
    row: { index: number };
    column: { id: string };
    table: any;
    type?: string;
    max?: number;
    placeholder?: string;
    required?: boolean;
  }

  const EditableCell: React.FC<EditableCellProps> = ({
    getValue,
    row: { index },
    column: { id },
    table,
    max,
    type = "text",
    placeholder,
    required = true,
  }) => {
    const initialValue = getValue();
    const [value, setValue] = useState<any>(initialValue);

    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <Input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        max={max}
        required={required}
        placeholder={placeholder}
      />
    );
  };
  const ClientsOrVendorsDropdown: React.FC<EditableCellProps> = ({
    getValue,
    row: { index },
    column: { id },
    table,
    users,
    placeholder,
    required = true,
  }) => {
    const initialValue = getValue();
    const [value, setValue] = useState<any>(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
      table.options.meta?.updateData(index, id, value);
    }, [value]);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {value ? (
              <>
                <Input required={required} type="hidden" value={value} />
                {users?.find((user: any) => user.id === value)?.name}
              </>
            ) : (
              placeholder
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup className="max-h-56 overflow-y-auto">
              {users?.map((user: any) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => {
                    setValue(user.id);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === user.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {user.name}
                  {user.company_name && (
                    <span className="text-slate-400">
                      ({user.company_name})
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      ...(vendors
        ? [
            {
              accessorKey: "vendor_id",
              header: "Vendor",
              cell: (props: any) => (
                <ClientsOrVendorsDropdown
                  {...props}
                  users={vendors}
                  placeholder="Select vendor..."
                />
              ),
            },
          ]
        : []),
      ...(clients
        ? [
            {
              accessorKey: "client_id",
              header: "Client",
              cell: (props: any) => (
                <ClientsOrVendorsDropdown
                  {...props}
                  users={clients}
                  placeholder="Select client..."
                />
              ),
            },
          ]
        : []),
      {
        accessorKey: "destination",
        header: () => <div className="min-w-[80px]">Destination</div>,
        cell: (props) => (
          <EditableCell {...props} placeholder="eg: United Arab Emirates" />
        ),
      },
      {
        accessorKey: "destination_code",
        header: () => <div className="min-w-[80px]">Prefix</div>,
        cell: (props) => (
          <EditableCell {...props} type="number" placeholder="eg: +971" />
        ),
      },
      {
        accessorKey: "route_type",
        header: () => <div className="min-w-[120px]">Type</div>,
        cell: ({ getValue, row: { index }, column: { id }, table }) => {
          const initialValue = getValue();
          const onBlur = (val: any) => {
            table.options.meta?.updateData(index, id, val);
          };

          return (
            <Select
              defaultValue={initialValue as string}
              onValueChange={onBlur}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Route Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="cli">CLI</SelectItem>
                  <SelectItem value="non-cli">Non-CLI</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="tdm">TDM</SelectItem>
                  <SelectItem value="pri">PRI</SelectItem>
                  <SelectItem value="did">DID</SelectItem>
                  <SelectItem value="cc">CC</SelectItem>
                  <SelectItem value="lgw">LGW</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          );
        },
      },
      {
        accessorKey: "rate",
        header: () => <div className="min-w-[80px]">Rate</div>,
        cell: (props) => (
          <EditableCell {...props} type="number" placeholder="Rate" />
        ),
      },
      {
        accessorKey: "asr",
        header: () => <div className="min-w-[80px]">ASR %</div>,
        cell: (props) => (
          <EditableCell
            {...props}
            type="number"
            placeholder="ASR %"
            max={100}
            required={false}
          />
        ),
      },
      {
        accessorKey: "acd",
        header: () => <div className="min-w-[80px]">ACD</div>,
        cell: (props) => (
          <EditableCell
            {...props}
            type="number"
            placeholder="ACD"
            required={false}
          />
        ),
      },
      {
        accessorKey: "pdd",
        header: () => <div className="min-w-[80px]">PDD</div>,
        cell: (props) => (
          <EditableCell
            {...props}
            type="number"
            placeholder="PDD"
            required={false}
          />
        ),
      },
      {
        accessorKey: "ports",
        header: () => <div className="min-w-[80px]">Ports</div>,
        cell: (props) => (
          <EditableCell
            {...props}
            type="number"
            placeholder="Ports"
            required={false}
          />
        ),
      },
      {
        accessorKey: "remarks",
        header: () => <div className="min-w-[100px]">Remarks</div>,
        cell: (props) => (
          <EditableCell
            {...props}
            type="text"
            placeholder="Remarks"
            required={false}
          />
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 px-2">
            <button type="button" onClick={() => handleDuplicateRow(row)}>
              <HiOutlineDuplicate className="h-5 w-5 cursor-pointer text-primary-900" />
            </button>
            <button type="button" onClick={() => handleRemoveRoute(row)}>
              <HiOutlineTrash className="h-5 w-5 cursor-pointer text-red-500" />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        setData((old: any) =>
          old.map((row: any, index: any) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
  });

  return (
    <div className="w-full">
      <form className="overflow-clip rounded-lg border" onSubmit={handleSubmit}>
        <Table>
          {/* {table.getRowModel().rows?.length !== 0 && ( */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {/* )} */}

          <TableBody>
            {table.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="p-2 pr-0">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
        {table.getRowModel().rows?.length ? null : (
          <div className="p-2">
            <button
              type="button"
              className="flex h-[112px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-surface"
              onClick={handleAddRoute}
            >
              Add
              <HiPlusCircle className="h-5 w-5" />
            </button>
          </div>
        )}
        {table.getRowModel().rows?.length > 0 && (
          <div className="grid grid-cols-3 gap-2 border-t p-2">
            <Button
              variant="outline"
              type="button"
              className="w-full gap-1 text-slate-600"
              onClick={handleClear}
            >
              Clear <HiOutlineX className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              type="button"
              className="w-full items-center gap-1"
              onClick={handleAddRoute}
            >
              Add <HiPlusCircle className="h-4 w-4" />
            </Button>
            {data.length ? (
              <Button type="submit" className="items-center gap-1">
                {posting ? (
                  <>
                    Posting
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Post
                    <HiOutlineUpload className="h-4 w-4" />
                  </>
                )}
              </Button>
            ) : (
              ""
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export const ImportDropdown = ({ setData }: { setData: Dispatch<any> }) => {
  const [isOpen, setIsOpen] = useState(false);

  const generateExcelSheet = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
      [
        "destination",
        "destination_code",
        "route_type",
        "rate",
        "asr",
        "acd",
        "ports",
        "pdd",
      ],
    ]);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Create a binary blob from the workbook
    const ExcelSheet = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([ExcelSheet], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    return blob;
  };

  const EmptyFile = () => {
    const handleDownload = async () => {
      const excelBlob = generateExcelSheet();
      if (excelBlob) {
        const url = URL.createObjectURL(excelBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "empty_file.xlsx";
        a.click();
      }
    };

    return (
      <span
        className="cursor-pointer whitespace-nowrap text-primary-900 underline"
        onClick={handleDownload}
      >
        Download empty file
      </span>
    );
  };

  const handleFileChange = async (e: any) => {
    e.preventDefault();
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

        // Assuming you have a `setData` and `setIsOpen` function in your component
        setData([]);
        setData((prevData: any) => [...prevData, ...jsonData]);
        setIsOpen(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleCLick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="hover:bg-primary text-primary relative flex cursor-pointer items-center justify-center rounded-full border px-3 py-2 text-sm font-medium shadow-sm transition-all ease-in-out hover:bg-opacity-5">
          Import
          <HiOutlineCloudDownload className="ml-2 h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="flex flex-col items-center justify-center text-primary-900">
          <label
            htmlFor="file-upload"
            className="text-primary flex w-full cursor-pointer flex-col items-center rounded-lg border border-dashed bg-slate-50 p-4 font-semibold"
          >
            <div className="mb-1 rounded-lg border-2 p-2">
              <HiOutlineCloudUpload className="size-5" />
            </div>
            Click to Upload{" "}
            <span className="text-xs text-gray-500">.xlsx only</span>
          </label>
          <p className="mt-2 text-center text-xs text-slate-400">
            To import from a filled spreadsheet, you have to <EmptyFile /> and
            edit it, then upload.
          </p>
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
