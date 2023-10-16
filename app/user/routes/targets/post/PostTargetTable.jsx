"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { HiPlusCircle, HiTrash } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import { HiOutlineCloudUpload } from "react-icons/hi";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { AnimatePresence, motion } from "framer-motion";
import * as XLSX from "xlsx";

export function PostTargetTable() {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [posting, setPosting] = useState(false);
    const router = useRouter();
    const supabase = supabaseClient();
    const [data, setData] = useState([]);

    useEffect(() => {
        const storedRouteData = localStorage.getItem("pendingBuyingTargetData");
        if (storedRouteData) {
            setData(JSON.parse(storedRouteData));
        }
    }, [setData]);

    const handleAddRoute = () => {
        setData((prevData) => [
            ...prevData,
            {
                id: uuidv4(),
                destination: "",
                rate: "",
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
        localStorage.removeItem("pendingBuyingTargetsData");
        setData([]);
    };

    const handleRemoveRoute = (row) => {
        setData((prevData) =>
            prevData.filter((route) => route.id !== row.original.id)
        );
    };
    function dec20Percent(number) {
        const increase = number * 0.2; // Calculate 20% of the number
        const result = number + increase; // Add the increase to the original number
        return result.toString();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.setItem("pendingBuyingTargetsData", JSON.stringify(data));

        setPosting(true);
        const { data: route, error } = await supabase
            .from("buying_targets")
            .insert(
                data.map((route) => ({
                    destination: route.destination,
                    destination_code: route.destination_code,
                    rate: route.rate,
                    buying_rate: dec20Percent(Number(route.rate)),
                    route_type: route.route_type,
                    prefix: route.prefix,
                    asr: route.asr,
                    acd: route.acd,
                    ports: route.ports,
                    capacity: route.capacity,
                    pdd: route.pdd,
                }))
            )
            .select();
        if (error) {
            setPosting(false);
            toast.error(error.message);
            return;
        }
        fetch(`${location.origin}/api/emails/routes/post-target`, {
            method: "POST",
            body: JSON.stringify(data),
        });
        router.refresh();
        router.push("/user/routes/targets");
        toast.success("Targets posted!");
        setPosting(false);
        setData([]);
        const storedTargetData = localStorage.getItem(
            "pendingBuyingTargetsData"
        );
        if (storedTargetData) {
            localStorage.removeItem("pendingBuyingTargetsData");
        }
    };

    const columns = useMemo(
        () => [
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
                    const [value, setValue] = useState(initialValue);

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
                    const [value, setValue] = useState(initialValue);

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
                    // We need to keep and update the state of the cell normally
                    const [value, setValue] = useState(initialValue);

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
                            onChange={(e) =>
                                setValue(e.target.value.toLowerCase())
                            }
                            onBlur={onBlur}
                            required
                            placeholder="eg: CLI"
                        />
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
                    const [value, setValue] = useState(initialValue);

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
                accessorKey: "prefix",
                header: function Cell({ column }) {
                    return <div className=" min-w-[80px]">Prefix</div>;
                },
                cell: function Cell({
                    getValue,
                    row: { index },
                    column: { id },
                    table,
                }) {
                    const initialValue = getValue();
                    // We need to keep and update the state of the cell normally
                    const [value, setValue] = useState(initialValue);

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
                    const [value, setValue] = useState(initialValue);

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
                    const [value, setValue] = useState(initialValue);

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
                    const [value, setValue] = useState(initialValue);

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
                    const [value, setValue] = useState(initialValue);

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
                    const [value, setValue] = useState(initialValue);

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
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
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
                setData((old) =>
                    old.map((row, index) => {
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

        const handleFileChange = async (e) => {
            e.preventDefault();
            const file = e.target.files?.[0]; // Use optional chaining

            if (!file) {
                // Handle the case where no file is selected
                return;
            }

            const reader = new FileReader();

            reader.onload = (e) => {
                if (e.target?.result) {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: "array" });

                    let headers = [];
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = [];

                    XLSX.utils
                        .sheet_to_json(worksheet)
                        .forEach((row, rowIndex) => {
                            if (rowIndex === 0) {
                                headers = Object.keys(row);
                            }

                            const rowData = {};

                            headers.forEach((header) => {
                                rowData[header] = row[header];
                            });

                            jsonData.push(rowData);
                        });

                    // Clear the input value
                    if (e.target) {
                        e.target.value = "";
                    }

                    // Assuming you have a `setData` and `setIsOpen` function in your component
                    setData((prevData) => [...prevData, ...jsonData]);
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
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-primary tracking-tight">
                    Post your buying targets!
                </h3>
                <ImportDropdown />
            </div>
            <form
                className="border rounded-md mt-4 overflow-y-auto p-4"
                onSubmit={handleSubmit}
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
                        {table.getFilteredRowModel().rows.length} routes
                    </div>
                    {data.length ? (
                        <Button type="submit">
                            {posting ? (
                                <>
                                    Posting
                                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                </>
                            ) : (
                                "Post Targets"
                            )}
                        </Button>
                    ) : (
                        ""
                    )}
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
