"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
    ColumnDef,
    RowData,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Dispatch, useEffect, useMemo, useState } from "react";
import {
    HiOutlineCloudUpload,
    HiOutlineUpload,
    HiOutlineX,
    HiPlusCircle,
    HiX
} from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export function PostRoutesTable({
  setData,
  data,
  handleSubmit,
  posting,
}: {
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
        capacity: "",
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

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "destination",
        header: ({ column }) => {
          return <div className="w-[200px]">Destination</div>;
        },
        cell: function Cell({
          getValue,
          row: { index },
          column: { id },
          table,
        }) {
          const initialValue = getValue();
          // We need to keep and update the state of the cell normally
          const [value, setValue] = useState<any>(initialValue);

          // When the input is blurred, we'll call our table meta's updateData function
          const onBlur = () => {
            table.options.meta?.updateData(index, id, value);
          };

          // If the initialValue is changed external, sync it up with our state
          useEffect(() => {
            setValue(initialValue);
          }, [initialValue]);

          return (
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={onBlur}
              required
              placeholder="eg: United Arab Emirates"
            />
          );
        },
      },
      {
        accessorKey: "destination_code",
        header: ({ column }) => {
          return <div className="min-w-[80px]">Prefix</div>;
        },
        cell: function Cell({
          getValue,
          row: { index },
          column: { id },
          table,
        }) {
          const initialValue = getValue();
          // We need to keep and update the state of the cell normally
          const [value, setValue] = useState<any>(initialValue);

          // When the input is blurred, we'll call our table meta's updateData function
          const onBlur = () => {
            table.options.meta?.updateData(index, id, value);
          };

          // If the initialValue is changed external, sync it up with our state
          useEffect(() => {
            setValue(initialValue);
          }, [initialValue]);

          return (
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={onBlur}
              required
              className=""
              placeholder="eg: +971"
            />
          );
        },
      },
      {
        accessorKey: "route_type",
        header: ({ column }) => {
          return <div className="min-w-[120px]">Type</div>;
        },
        cell: function Cell({
          getValue,
          row: { index },
          column: { id },
          table,
        }) {
          const initialValue = getValue();
          const onBlur = (val: any) => {
            table.options.meta?.updateData(index, id, val);
          };

          return (
            <>
              <Select
                defaultValue={initialValue as string}
                onValueChange={(val) => {
                  onBlur(val);
                }}
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
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          );
        },
      },
      {
        accessorKey: "rate",
        header: function Cell({ column }) {
          return <div className="min-w-[80px]">Rate</div>;
        },
        cell: function Cell({
          getValue,
          row: { index },
          column: { id },
          table,
        }) {
          const initialValue = getValue();
          // We need to keep and update the state of the cell normally
          const [value, setValue] = useState<any>(initialValue);

          // When the input is blurred, we'll call our table meta's updateData function
          const onBlur = () => {
            table.options.meta?.updateData(index, id, value);
          };

          // If the initialValue is changed external, sync it up with our state
          useEffect(() => {
            setValue(initialValue);
          }, [initialValue]);

          return (
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={onBlur}
              required
              placeholder="Rate"
            />
          );
        },
      },
      {
        accessorKey: "asr",
        header: ({ column }) => {
          return <div className="min-w-[80px]">ASR</div>;
        },
        cell: function Cell({
          getValue,
          row: { index },
          column: { id },
          table,
        }) {
          const initialValue = getValue();
          // We need to keep and update the state of the cell normally
          const [value, setValue] = useState<any>(initialValue);

          // When the input is blurred, we'll call our table meta's updateData function
          const onBlur = () => {
            table.options.meta?.updateData(index, id, value);
          };

          // If the initialValue is changed external, sync it up with our state
          useEffect(() => {
            setValue(initialValue);
          }, [initialValue]);

          return (
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={onBlur}
              required
              placeholder="ASR"
            />
          );
        },
      },
      {
        accessorKey: "acd",
        header: ({ column }) => {
          return <div className="min-w-[80px]">ACD</div>;
        },
        cell: function Cell({
          getValue,
          row: { index },
          column: { id },
          table,
        }) {
          const initialValue = getValue();
          // We need to keep and update the state of the cell normally
          const [value, setValue] = useState<any>(initialValue);

          // When the input is blurred, we'll call our table meta's updateData function
          const onBlur = () => {
            table.options.meta?.updateData(index, id, value);
          };

          // If the initialValue is changed external, sync it up with our state
          useEffect(() => {
            setValue(initialValue);
          }, [initialValue]);

          return (
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={onBlur}
              required
              placeholder="ACD"
            />
          );
        },
      },
      {
        accessorKey: "pdd",
        header: ({ column }) => {
          return <div className="min-w-[80px]">PDD</div>;
        },
        cell: function Cell({
          getValue,
          row: { index },
          column: { id },
          table,
        }) {
          const initialValue = getValue();
          // We need to keep and update the state of the cell normally
          const [value, setValue] = useState<any>(initialValue);

          // When the input is blurred, we'll call our table meta's updateData function
          const onBlur = () => {
            table.options.meta?.updateData(index, id, value);
          };

          // If the initialValue is changed external, sync it up with our state
          useEffect(() => {
            setValue(initialValue);
          }, [initialValue]);

          return (
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={onBlur}
              required
              placeholder="PDD"
            />
          );
        },
      },
      {
        accessorKey: "ports",
        header: ({ column }) => {
          return <div className="min-w-[80px]">Ports</div>;
        },
        cell: function Cell({
          getValue,
          row: { index },
          column: { id },
          table,
        }) {
          const initialValue = getValue();
          // We need to keep and update the state of the cell normally
          const [value, setValue] = useState<any>(initialValue);

          // When the input is blurred, we'll call our table meta's updateData function
          const onBlur = () => {
            table.options.meta?.updateData(index, id, value);
          };

          // If the initialValue is changed external, sync it up with our state
          useEffect(() => {
            setValue(initialValue);
          }, [initialValue]);

          return (
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={onBlur}
              required
              placeholder="Ports"
            />
          );
        },
      },
      {
        accessorKey: "capacity",
        header: ({ column }) => {
          return <div className="min-w-[80px]">Capacity</div>;
        },
        cell: function Cell({
          getValue,
          row: { index },
          column: { id },
          table,
        }) {
          const initialValue = getValue();
          // We need to keep and update the state of the cell normally
          const [value, setValue] = useState<any>(initialValue);

          // When the input is blurred, we'll call our table meta's updateData function
          const onBlur = () => {
            table.options.meta?.updateData(index, id, value);
          };

          // If the initialValue is changed external, sync it up with our state
          useEffect(() => {
            setValue(initialValue);
          }, [initialValue]);

          return (
            <Input
              type="number"
              value={value}
              onChange={(e) =>
                table.options.meta?.updateData(index, id, e.target.value)
              }
              onBlur={onBlur}
              required
              placeholder="Capacity"
            />
          );
        },
      },
      {
        id: "delete",
        header: "",
        cell: ({ row }) => (
          <div onClick={() => handleRemoveRoute(row)}>
            <HiX className="mx-2 h-5 w-5 cursor-pointer text-red-500" />
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
      <form
        className="mt-4 overflow-clip rounded-lg border"
        onSubmit={handleSubmit}
      >
        <Table>
          {table.getRowModel().rows?.length !== 0 && (
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
          )}

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="flex h-[120px] cursor-pointer items-center justify-center rounded-lg bg-surface"
                  onClick={handleAddRoute}
                >
                  <HiPlusCircle className="h-5 w-5" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {table.getRowModel().rows?.length > 0 && (
          <div className="flex items-center justify-between gap-2 border-t p-2">
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
        "capacity",
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
    <div className="relative text-left">
      <div
        onClick={handleCLick}
        className="hover:bg-primary text-primary relative flex cursor-pointer items-center justify-center rounded-full border px-3 py-2 text-sm font-medium shadow-sm transition-all ease-in-out hover:bg-opacity-5"
      >
        <HiOutlineCloudUpload className="mr-1.5 h-4 w-4" />
        Import
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="absolute right-0 top-10 z-10 w-60 rounded-lg border-2 border-surface bg-white shadow-xl"
              initial={{ opacity: 0, y: "-10%" }}
              animate={{ opacity: 1, y: "0%" }}
              exit={{ opacity: 0, y: "-10%" }}
            >
              <div className="flex flex-col items-center justify-center p-4">
                <label
                  htmlFor="file-upload"
                  className="text-primary mt-2 flex cursor-pointer flex-col items-center font-semibold"
                >
                  <div className="mb-1 rounded-lg border-2 border-surface p-2">
                    <HiOutlineCloudUpload className="h-5 w-5" />
                  </div>
                  Click to Upload{" "}
                </label>
                <span className="text-xs text-gray-500">.xlsx only</span>
                <p className="mt-2 text-center text-xs text-slate-400">
                  To import from a filled spreadsheet, you have to <EmptyFile />{" "}
                  and edit it, then upload.
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".xlsx"
                onChange={handleFileChange}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
