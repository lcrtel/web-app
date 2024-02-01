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

import { supabaseClient } from "@/lib/supabase-client";
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
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { HiOutlineCloudUpload, HiPlusCircle, HiTrash } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx";
import { postTargets } from "../actions";

declare module "@tanstack/react-table" {
    interface TableMeta<TData extends RowData> {
        updateData: (
            rowIndex: number,
            columnId: string,
            value: unknown
        ) => void;
    }
}

export function PostTargetTable() {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [posting, setPosting] = useState(false);
    const router = useRouter();
    const supabase = supabaseClient();
    const [data, setData] = useState<any>([
        {
            id: uuidv4(),
            destination: "",
            rate: "",
            route_type: "cli",
            prefix: "",
            asr: "",
            acd: "",
            ports: "",
            pdd: "",
            capacity: "",
        },
    ]);

    useEffect(() => {
        const storedRouteData = localStorage.getItem("pendingBuyingTargetData");
        if (storedRouteData) {
            setData(JSON.parse(storedRouteData));
        }
    }, [setData]);

    const handleAddRoute = () => {
        setData((prevData: any) => [
            ...prevData,
            {
                id: uuidv4(),
                destination: "",
                rate: "",
                route_type: "cli",
                prefix: "",
                asr: "",
                acd: "",
                ports: "",
                pdd: "",
                capacity: "",
            },
        ]);
    };
    const handleClear = () => {
        localStorage.removeItem("pendingBuyingTargetsData");
        setData([]);
    };

    const handleRemoveRoute = (row: any) => {
        setData((prevData: any) =>
            prevData.filter((route: any) => route.id !== row.original.id)
        );
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        localStorage.setItem("pendingBuyingTargetsData", JSON.stringify(data));
        setPosting(true);
        const posting = toast.loading("Posting...");
        const res = await postTargets(data);
        if (res?.error) {
            setPosting(false);
            toast.dismiss(posting);
            toast.error(res?.error);
            return;
        }
        router.refresh();
        router.push("/user/my-targets");
        toast.dismiss(posting);
        toast.success("Target rates posted!");
        setPosting(false);
        setData([]);
        const storedTargetData = localStorage.getItem(
            "pendingBuyingTargetsData"
        );
        if (storedTargetData) {
            localStorage.removeItem("pendingBuyingTargetsData");
        }
    };

    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: "prefix",
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
                            placeholder="Prefix"
                        />
                    );
                },
            },
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
                    return <div className="min-w-[80px]">Code</div>;
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
                    return <div className=" min-w-[120px]">Type</div>;
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
                                        <SelectItem value="non-cli">
                                            Non-CLI
                                        </SelectItem>
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
                    return <div className=" min-w-[80px]">Rate</div>;
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
                    return <div className=" min-w-[80px]">ASR</div>;
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
                    return <div className=" min-w-[80px]">ACD</div>;
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
                    return <div className=" min-w-[80px]">PDD</div>;
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
                    return <div className=" min-w-[80px]">Ports</div>;
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
                    return <div className=" min-w-[80px]">Capacity</div>;
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
                                table.options.meta?.updateData(
                                    index,
                                    id,
                                    e.target.value
                                )
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
                        <HiTrash className="h-5 w-5 text-red-500 mx-2 cursor-pointer" />
                    </div>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data,
        columns,
        // defaultColumn,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
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
                    })
                );
            },
        },
    });

    const ImportDropdown = () => {
        const [isOpen, setIsOpen] = useState(false);

        const generateExcelSheet = () => {
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet([
                [
                    "prefix",
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
                    className="text-primary-500 underline whitespace-nowrap cursor-pointer"
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
            <div className="relative  text-left">
                <div
                    onClick={handleCLick}
                    className="flex relative cursor-pointer shadow-sm items-center transition-all ease-in-out justify-center rounded-full hover:bg-primary hover:bg-opacity-5 border px-3 py-2 text-sm font-medium text-primary"
                >
                    <HiOutlineCloudUpload className="mr-1.5 h-4 w-4" />
                    Import
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                className="z-10  w-60 absolute border-2  border-surface  right-0 top-10 rounded-xl  shadow-xl bg-white"
                                initial={{ opacity: 0, y: "-10%" }}
                                animate={{ opacity: 1, y: "0%" }}
                                exit={{ opacity: 0, y: "-10%" }}
                            >
                                <div className="flex flex-col  items-center justify-center p-4">
                                    <label
                                        htmlFor="file-upload"
                                        className=" cursor-pointer text-primary font-semibold mt-2 flex flex-col items-center"
                                    >
                                        <div className="p-2 mb-1 rounded-lg border-2 border-surface">
                                            <HiOutlineCloudUpload className="w-5 h-5" />
                                        </div>
                                        Click to Upload{" "}
                                    </label>
                                    <span className="text-gray-500 text-xs">
                                        .xlsx only
                                    </span>
                                    <p className="text-slate-400 mt-2 text-xs text-center">
                                        To import from a filled spreadsheet, you
                                        have to <EmptyFile /> and edit it, then
                                        upload.
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

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-primary tracking-tight">
                    Post your target rates
                </h3>
                <ImportDropdown />
            </div>
            <form className=" mt-4 overflow-y-auto" onSubmit={handleSubmit}>
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
                        {table.getFilteredRowModel().rows.length} request(s)
                    </div>
                    {data.length ? (
                        <Button type="submit" disabled={posting}>
                            {posting ? (
                                <>
                                    Posting
                                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                </>
                            ) : (
                                "Post"
                            )}
                        </Button>
                    ) : (
                        ""
                    )}
                </div>
                <div className="border rounded-lg overflow-clip">
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
                                                              header.column
                                                                  .columnDef
                                                                  .header,
                                                              header.getContext()
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
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-[120px] flex bg-surface shadow items-center justify-center cursor-pointer"
                                        onClick={handleAddRoute}
                                    >
                                        <HiPlusCircle className="w-5 h-5" />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </form>
            {table.getRowModel().rows?.length > 0 && (
                <div className="flex items-center justify-between gap-2 mt-2">
                    <Button
                        variant="outline"
                        className="w-full "
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                    <Button
                        variant="secondary"
                        className="w-full "
                        onClick={handleAddRoute}
                    >
                        Add
                    </Button>
                </div>
            )}
        </div>
    );
}