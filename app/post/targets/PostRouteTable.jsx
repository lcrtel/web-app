"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
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
import {
    HiArrowLeft,
    HiOutlineArrowCircleLeft,
    HiPlusCircle,
    HiTrash,
} from "react-icons/hi";
import { supabaseClient } from "@/lib/supabase-client";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { HiOutlineCloudUpload } from "react-icons/hi";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { AnimatePresence, motion } from "framer-motion";

export function PostRouteTable() {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [posting, setPosting] = useState(false);
    const router = useRouter();
    const supabase = supabaseClient();
    const [data, setData] = useState([]);

    useEffect(() => {
        const storedRouteData = localStorage.getItem(
            "pendingBuyingTargetsData"
        );
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPosting(true);
        localStorage.setItem("pendingBuyingTargetsData", JSON.stringify(data));
        const user = await supabase.auth.getUser();
        if (!user) {
            setPosting(false);
            router.push("/post/auth");
            return;
        }
        const { data: route, error } = await supabase
            .from("buying_targets")
            .insert(
                data.map((route) => ({
                    destination: route.destination,
                    destination_code: route.destination_code,
                    rate: route.rate,
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
            toast.error(error.message);
            setPosting(false);
            return;
        }
        await fetch("http://localhost:3000/api/routes/post-target", {
            method: "POST",
            body: JSON.stringify(data),
        });
        setPosting(false);
        toast.success("Buying targets posted");
        setData([]);
        localStorage.removeItem("pendingBuyingTargetsData");
        router.push("/user/routes/targets");
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

        const handleFileChange = async (e) => {
            e.preventDefault();
            const file = e.target.files[0];
            const workbook = new ExcelJS.Workbook();
            let headers = [];
            await workbook.xlsx.load(file);
            const worksheet = workbook.getWorksheet(1);
            const jsonData = [];
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) {
                    headers = row.values.map((header) => header.toString());
                    return;
                }
                const rowData = {};
                row.eachCell((cell, colNumber) => {
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
            <div className="relative inline-block text-left">
                <button
                    onClick={handleCLick}
                    className="flex relative shadow-sm items-center transition-all ease-in-out justify-center rounded-lg hover:bg-primary hover:bg-opacity-5 border px-3 py-2 text-sm font-medium text-primary"
                >
                    <HiOutlineCloudUpload className="mr-1.5 h-4 w-4" />
                    Import
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                className="z-10 max-w-md w-60 absolute border-2  border-surface  right-0 top-10 rounded-lg  shadow-xl bg-white"
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
        <div className="mx-auto min-h-screen max-w-8xl px-8 py-5 w-full">
            <Link
                href="/"
                className="inline-flex mt-3 items-center text-gray-400 hover:text-primary-500 transition-all ease-in-out mb-2"
            >
                <HiOutlineArrowCircleLeft className="mr-1.5" /> Go back to home
            </Link>
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
