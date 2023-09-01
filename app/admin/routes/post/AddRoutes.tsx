"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
    flexRender,
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    RowData,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { HiArrowLeft, HiPlusCircle, HiTrash } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import { Check, ChevronsUpDown } from "lucide-react";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { HiOutlineCloudUpload } from "react-icons/hi";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

declare module "@tanstack/react-table" {
    interface TableMeta<TData extends RowData> {
        updateData: (
            rowIndex: number,
            columnId: string,
            value: unknown
        ) => void;
    }
}

export function AddRouteTable({ users }: { users: any }) {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [posting, setPosting] = useState(false);
    const [seller, setSeller] = useState("");
    const router = useRouter();
    const supabase = supabaseAdmin();
    const [data, setData] = useState<any>([]);
    const [open, setOpen] = useState(false);

    const handleAddRoute = () => {
        setData((prevData: any) => [
            ...prevData,
            {
                id: uuidv4(),
                destination: "",
                rate: 0,
                route_type: "",
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
        setData([]);
    };

    const handleRemoveRoute = (row: any) => {
        setData((prevData: any) =>
            prevData.filter((route: any) => route.id !== row.original.id)
        );
    };
    function add20Percent(numberString: string) {
        const number = parseFloat(numberString); // Convert the string to a number
        if (isNaN(number)) {
            return;
        }

        const increase = number * 0.2; // Calculate 20% of the number
        const result = number + increase; // Add the increase to the original number
        return result.toString;
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setPosting(true);
        if (seller !== "") {
            const { data: route, error } = await supabase
                .from("route_offers")
                .insert(
                    data.map((route: any) => ({
                        seller_id: seller,
                        destination: route.destination,
                        destination_code: route.destination_code,
                        rate: route.rate,
                        selling_rate: add20Percent(route.rate),
                        route_type: route.route_type,
                        prefix: route.prefix,
                        asr: route.asr,
                        acd: route.acd,
                        ports: route.ports,
                        capacity: route.capacity,
                        pdd: route.pdd,
                        verification: "pending",
                    }))
                )
                .select();
            if (error) {
                setPosting(false);
                toast.error(error.message);
                return;
            }
            setPosting(false);
            setData([]);
            toast.success("Route Offer Posted");
            router.refresh();
            router.push("/admin/routes");
        } else toast.error("Select a seller to post");
    };

    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: "prefix",
                header: "Prefix",
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
                            placeholder="Prefix"
                        />
                    );
                },
            },
            {
                accessorKey: "destination",
                header: ({ column }) => {
                    return <div className=" min-w-[200px]">Destination</div>;
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
                    return <div className=" min-w-[80px]">Code</div>;
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
                            placeholder="eg: +971"
                        />
                    );
                },
            },
            {
                accessorKey: "route_type",
                header: ({ column }) => {
                    return <div className=" min-w-[80px]">Type</div>;
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
                                <SelectTrigger className="min-w-[100px]">
                                    <SelectValue placeholder="Route Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="cli">CLI</SelectItem>
                                        <SelectItem value="non-cli">
                                            Non-CLI
                                        </SelectItem>
                                        <SelectItem value="sms">SMS</SelectItem>
                                        <SelectItem value="did">DID</SelectItem>
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
                header: "Actions",
                cell: ({ row }) => (
                    <Button
                        onClick={() => handleRemoveRoute(row)}
                        variant="destructive"
                        size="icon"
                    >
                        <HiTrash className="h-5 w-5" />
                    </Button>
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

        const generateExcelSheet = async () => {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Sheet1");
            worksheet.addRow([
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
            ]);
            const blob = await workbook.xlsx.writeBuffer();
            return new Blob([blob], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
        };

        const EmptyFile = () => {
            const handleDownload = async () => {
                const excelBlob = await generateExcelSheet();
                saveAs(excelBlob, "empty_file.xlsx");
            };
            return (
                <span
                    className="text-primary-500 underline whitespace-nowrap cursor-pointer"
                    onClick={handleDownload}
                >
                    download empty file
                </span>
            );
        };

        const handleFileChange = async (e: any) => {
            e.preventDefault();
            const file = e.target.files[0];
            const workbook = new ExcelJS.Workbook();
            let headers: any = [];
            await workbook.xlsx.load(file);
            const worksheet = workbook.getWorksheet(1);
            const jsonData: any = [];
            worksheet.eachRow((row: any, rowNumber: any) => {
                if (rowNumber === 1) {
                    headers = row.values.map((header: any) =>
                        header.toString()
                    );
                    return;
                }
                const rowData: any = {};
                row.eachCell((cell: any, colNumber: any) => {
                    const header = headers[colNumber];
                    const cellValue = cell.value;
                    rowData[header] = cellValue;
                });
                e.target.value = null;
                jsonData.push(rowData);
                setData(jsonData);
            });
            setIsOpen(false);
        };

        const handleCLick = () => {
            setIsOpen(!isOpen);
        };
        return (
            <div className="relative  text-left">
                <div
                    onClick={handleCLick}
                    className="flex relative cursor-pointer shadow-sm items-center transition-all ease-in-out justify-center rounded-lg hover:bg-primary hover:bg-opacity-5 border px-3 py-2 text-sm font-medium text-primary"
                >
                    <HiOutlineCloudUpload className="mr-1.5 h-4 w-4" />
                    Import
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                className="z-10  w-60 absolute border-2  border-surface  right-0 top-10 rounded-lg  shadow-xl bg-white"
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
            {/* <pre> {JSON.stringify(data, null, 2)}</pre> */}
            <div className="flex items-center gap-4 justify-between mb-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/routes"
                        className={buttonVariants({ variant: "secondary" })}
                    >
                        <HiArrowLeft className="mr-1.5" /> Back
                    </Link>
                    <h3 className="text-lg  font-semibold text-primary">
                        Post route offers!
                    </h3>
                </div>
                <ImportDropdown />
            </div>
            <form
                className="border rounded-md mt-4 overflow-y-auto p-4"
                onSubmit={handleSubmit}
            >
                <div className="flex items-center justify-between gap-4 mb-4 ">
                    <div className="text-sm flex gap-2 items-center whitespace-nowrap">
                        <p className=" font-semibold text-lg tracking-tight">
                            Seller
                        </p>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className=" justify-between"
                                >
                                    {seller
                                        ? users.find(
                                              (user: any) => user.id === seller
                                          )?.email
                                        : "Select Seller..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className=" p-0" align="start">
                                <Command>
                                    <CommandInput placeholder="Search users..." />
                                    <CommandEmpty>No users found.</CommandEmpty>
                                    <CommandGroup>
                                        {users.map((user: any) => (
                                            <CommandItem
                                                key={user.id}
                                                onSelect={() => {
                                                    setSeller(
                                                        user.id === seller
                                                            ? ""
                                                            : user.id
                                                    );
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        seller === user.id
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
                    </div>
                    <div className="text-sm flex gap-2 items-center whitespace-nowrap">
                        <p>{table.getFilteredRowModel().rows.length} routes</p>{" "}
                        {data.length ? (
                            <Button type="submit">
                                {posting ? (
                                    <>
                                        Posting
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    </>
                                ) : (
                                    "Post Requests"
                                )}
                            </Button>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <div className="border rounded-md">
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
                <div className="flex flex-col gap-2 mt-2">
                    <Button
                        variant="secondary"
                        className="w-full shadow"
                        onClick={handleAddRoute}
                    >
                        Add
                    </Button>
                    <Button
                        variant="secondary"
                        className="w-full shadow"
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                </div>
            )}
        </div>
    );
}
