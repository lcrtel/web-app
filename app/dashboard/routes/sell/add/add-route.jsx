"use client";
import { Fragment, useState, useRef } from "react";
import { HiArrowLeft, HiOutlineX, HiPlusCircle, HiTrash } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs/dist";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import ImportDropdown from "./ImportDropdown";
import SelectDropdown from "./SelectDropdown";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const CreateRoute = () => {
    const [routes, setRoutes] = useState([]);
    const supabase = createClientComponentClient();

    const handleRouteChange = (index, field, value) => {
        setRoutes((prevRoutes) => {
            const updatedRoutes = [...prevRoutes];
            updatedRoutes[index][field] = value;
            return updatedRoutes;
        });
    };

    const handleAddRoute = () => {
        setRoutes((prevRoutes) => [
            ...prevRoutes,
            {
                id: uuidv4(),
                destination: "",
                rate: "",
                type: "",
                prefix: "",
                asr: "",
                acd: "",
                ports: "",
                capacity: "",
            },
        ]);
    };

    const handleDiscard = () => {
        setRoutes([]);
    };

    const handleRemoveRoute = (id) => {
        setRoutes((prevRoutes) =>
            prevRoutes.filter((route) => route.id !== id)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const { data, error } = await supabase
        //     .from("routes")
        //     .insert(
        //         routes.map((route) => ({
        //             destination: route.destination,
        //             rate: route.rate,
        //             type: route.type,
        //             prefix: route.prefix,
        //             asr: route.asr,
        //             acd: route.acd,
        //             ports: route.ports,
        //             capacity: route.capacity,
        //         }))
        //     )
        //     .select();
        console.log(routes);
        setRoutes([]);
    };

    const handleDataImport = (data) => {
        const routesWithId = data?.map((route) => ({
            ...route,
            id: uuidv4(), // Assign a unique ID
        }));

        if (routesWithId) {
            setRoutes((prevRoutes) => [...prevRoutes, ...routesWithId]);
        }
    };

    return (
        <>
            <div className="flex mb-4 z-20 justify-between items-center">
                <div className="flex items-center">
                    <Link
                        href="/dashboard/routes/sell"
                        className="flex items-center justify-center rounded-xl bg-surface px-3 py-2 text-sm font-medium text-gray-400 mr-2 "
                    >
                        <HiArrowLeft className="mr-1.5" /> Back
                    </Link>
                    <h3 className="text-lg  font-semibold text-primary-500">
                        Add New VoIP Routes to the Marketplace
                    </h3>
                </div>
                <ImportDropdown onDataImport={handleDataImport} />
            </div>
            <form className="h-full border rounded-xl p-4 transition-all ease-in-out">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <AnimatePresence>
                        {routes.map((route, index) => (
                            <motion.div
                                key={route.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="mb-2.5 rounded-xl transition-all ease-in-out flex flex-col items-end bg-surface p-3.5 "
                            >
                                <div className="mb-2.5 w-full flex flex-col">
                                    <label
                                        htmlFor={`destination-${index}`}
                                        className="mb-1 block cursor-pointer text-sm font-medium text-primary-500"
                                    >
                                        Destination
                                    </label>
                                    <input
                                        type="hidden"
                                        name="destination"
                                        value={route.destination}
                                    />
                                    <input
                                        type="text"
                                        id={`destination-${index}`}
                                        value={route.destination}
                                        onChange={(e) =>
                                            handleRouteChange(
                                                index,
                                                "destination",
                                                e.target.value
                                            )
                                        }
                                        className="flex w-full cursor-pointer select-none items-center justify-between overflow-hidden rounded-xl border-0 bg-surface p-2 text-sm text-primary-500 focus:ring-1 focus:ring-gray-200"
                                        placeholder="Enter Destination"
                                        required
                                    />
                                </div>
                                <div className="mb-2.5 w-full">
                                    <label
                                        htmlFor={`type-${index}`}
                                        className="mb-1 block cursor-pointer text-sm font-medium text-primary-500"
                                    >
                                        Type
                                    </label>

                                    <SelectDropdown
                                        placeHolder="Route Type"
                                        options={[
                                            {
                                                value: "non-cli",
                                                label: "Non-CLI",
                                            },
                                            { value: "cli", label: "CLI" },
                                            { value: "sms", label: "SMS" },
                                            { value: "did", label: "DID" },
                                            { value: "cc", label: "CC" },
                                        ]}
                                        initialOption={route.type}
                                        onChange={(selectedOption) =>
                                            handleRouteChange(
                                                index,
                                                "type",
                                                selectedOption.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-2.5 rounded-xl bg-white p-2.5 ">
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <label
                                                htmlFor={`prefix-${index}`}
                                                className="mb-2 block cursor-pointer text-sm font-medium text-primary-500"
                                            >
                                                Prefix
                                            </label>
                                            <input
                                                type="number"
                                                id={`prefix-${index}`}
                                                value={route.prefix}
                                                onChange={(e) =>
                                                    handleRouteChange(
                                                        index,
                                                        "prefix",
                                                        e.target.value
                                                    )
                                                }
                                                className="flex w-full cursor-pointer select-none items-center justify-between overflow-hidden rounded-xl border-0 bg-surface p-2 text-sm text-primary-500 focus:ring-1 focus:ring-gray-200"
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor={`asr-${index}`}
                                                className="mb-2 block cursor-pointer text-sm font-medium text-primary-500"
                                            >
                                                ASR %
                                            </label>
                                            <input
                                                type="number"
                                                id={`asr-${index}`}
                                                value={route.asr}
                                                onChange={(e) =>
                                                    handleRouteChange(
                                                        index,
                                                        "asr",
                                                        e.target.value
                                                    )
                                                }
                                                className="flex w-full cursor-pointer select-none items-center justify-between overflow-hidden rounded-xl border-0 bg-surface p-2 text-sm text-primary-500 focus:ring-1 focus:ring-gray-200"
                                                placeholder="ASR"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <label
                                                htmlFor={`acd-${index}`}
                                                className="mb-2 block cursor-pointer text-sm font-medium text-primary-500"
                                            >
                                                ACD
                                            </label>
                                            <input
                                                type="number"
                                                id={`acd-${index}`}
                                                value={route.acd}
                                                onChange={(e) =>
                                                    handleRouteChange(
                                                        index,
                                                        "acd",
                                                        e.target.value
                                                    )
                                                }
                                                className="flex w-full cursor-pointer select-none items-center justify-between overflow-hidden rounded-xl border-0 bg-surface p-2 text-sm text-primary-500 focus:ring-1 focus:ring-gray-200"
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor={`ports-${index}`}
                                                className="mb-2 block cursor-pointer text-sm font-medium text-primary-500"
                                            >
                                                Ports
                                            </label>
                                            <input
                                                type="number"
                                                id={`ports-${index}`}
                                                value={route.ports}
                                                onChange={(e) =>
                                                    handleRouteChange(
                                                        index,
                                                        "ports",
                                                        e.target.value
                                                    )
                                                }
                                                className="flex w-full cursor-pointer select-none items-center justify-between overflow-hidden rounded-xl border-0 bg-surface p-2 text-sm text-primary-500 focus:ring-1 focus:ring-gray-200"
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <label
                                                htmlFor={`capacity-${index}`}
                                                className="mb-2 block cursor-pointer text-sm font-medium text-primary-500"
                                            >
                                                Capacity
                                            </label>
                                            <input
                                                type="number"
                                                id={`capacity-${index}`}
                                                value={route.capacity}
                                                onChange={(e) =>
                                                    handleRouteChange(
                                                        index,
                                                        "capacity",
                                                        e.target.value
                                                    )
                                                }
                                                className="flex w-full cursor-pointer select-none items-center justify-between overflow-hidden rounded-xl border-0 bg-surface p-2 text-sm text-primary-500 focus:ring-1 focus:ring-gray-200"
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor={`rate-${index}`}
                                                className="mb-2 block cursor-pointer text-sm font-medium text-primary-500"
                                            >
                                                Rate $
                                            </label>
                                            <input
                                                type="number"
                                                id={`rate-${index}`}
                                                value={route.rate}
                                                onChange={(e) =>
                                                    handleRouteChange(
                                                        index,
                                                        "rate",
                                                        e.target.value
                                                    )
                                                }
                                                className="flex w-full cursor-pointer select-none items-center justify-between overflow-hidden rounded-xl border-0 bg-surface p-2 text-sm text-primary-500 focus:ring-1 focus:ring-gray-200"
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2.5 w-full">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveRoute(route.id)
                                        }
                                        className="flex w-full cursor-pointer select-none items-center justify-center rounded-xl border border-red-500 bg-white gap-2 p-2 text-sm text-red-500 "
                                    >
                                        <HiTrash className="h-5 w-5" />
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <button
                        type="button"
                        onClick={handleAddRoute}
                        className="inline-flex flex-col items-center min-h-[450px] mb-2.5 justify-center gap-2 rounded-xl border-[2px] border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-center text-base font-medium text-gray-500"
                    >
                        <HiPlusCircle className="h-8 w-8" />
                    </button>
                </div>
                <div className=" grid gap-5 grid-cols-2 sm:grid-cols-8">
                    <button
                        type="submit"
                        onClick={handleDiscard}
                        className="inline-flex items-center sm:col-start-1 sm:col-span-2 justify-center gap-1 rounded-xl border border-gray-400 bg-white px-3 py-2 text-center text-sm font-medium text-gray-500"
                    >
                        <HiOutlineX className="h-4 w-4" />
                        Clear
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="inline-flex items-center sm:col-end-9 sm:col-span-2 justify-center rounded-xl bg-primary-500 px-3 py-2 text-center text-sm font-medium text-white"
                    >
                        Post Routes
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateRoute;
