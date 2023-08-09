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
import { HiPlusCircle, HiTrash } from "react-icons/hi";
import { supabaseClient } from "@/lib/supabase-client";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
// import ImportDropdown from "./ImportDropdown";

export function AddRouteTable() {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [posting, setPosting] = useState(false);
    const router = useRouter();
    const supabase = supabaseClient();
    const [data, setData] = useState([]);

    const handleAddRoute = () => {
        setData((prevData) => [
            ...prevData,
            {
                id: uuidv4(),
                destination: "",
                rate: "",
                type: "",
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

    const handleRemoveRoute = (row) => {
        setData((prevData) =>
            prevData.filter((route) => route.id !== row.original.id)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data: route, error } = await supabase
            .from("route_posts")
            .insert(
                data.map((route) => ({
                    destination: route.destination,
                    destination_code: route.destination_code,
                    rate: route.rate,
                    route_type: route.type,
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
            console.error(error.message);
            return;
        }
        setPosting(false);
        setData([]);
        router.refresh();
        router.push("/admin/routes");
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
                accessorKey: "type",
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
                            onChange={(e) => setValue(e.target.value)}
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

    return (
        <div className="w-full">
            {/* {JSON.stringify(data)} */}
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
