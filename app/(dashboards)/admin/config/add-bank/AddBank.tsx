"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { HiEye, HiEyeOff, HiX } from "react-icons/hi";
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
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const profileFormSchema = z.object({
    accountHolderName: z.string(),
    accountNumber: z.string(),
    bankName: z.string(),
    IFSCCode: z.string(),
    branchName: z.string(),
});

const AddBank = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [rate, setRate] = useState(0);
    const [loading, setLoading] = useState(false);
    const form = useForm<any>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            status: "active",
        },
        mode: "onChange",
    });

    async function onSubmit(data: any) {
        setErrorMessage(null);
        setLoading(true);

        await fetch("/admin/config/add-bank", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set the appropriate content type
            },
            body: JSON.stringify(data), // Convert data to JSON string
        }).then(async (response) => {
            if (!response.ok) {
                const error = await response.json();
                toast.error(error.message);
                setLoading(false);
                setErrorMessage(error.message);
                return;
            } else {
                setLoading(false);
                setIsOpen(false);
                router.refresh();
                toast.success("Added Bank Account");
            }
        });
    }

    return (
        <>
            <Button variant="secondary" onClick={(e) => setIsOpen(true)}>
                Add Bank Account
            </Button>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="w-full sm:w-96 z-10 absolute right-0 top-0 h-full overflow-y-auto p-5 shadow-lg rounded-l-xl bg-white border-2"
                            initial={{ opacity: 0, x: "10%" }}
                            animate={{ opacity: 1, x: "0%" }}
                            exit={{ opacity: 0, x: "10%" }}
                        >
                            {/* <pre>{JSON.stringify(clients, null, 2)}</pre>
                            <pre>{JSON.stringify(routes, null, 2)}</pre> */}
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-bold tracking-tight text-xl">
                                    Add Bank Account
                                </h2>
                                <Button
                                    onClick={(e) => setIsOpen(false)}
                                    variant="outline"
                                    size="icon"
                                >
                                    <HiX className="w-5 h-5" />
                                </Button>
                            </div>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-4 md:space-y-6 max-w-4xl"
                                >
                                    <FormField
                                        control={form.control}
                                        name="accountHolderName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Account Holder Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Account Holder Name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="accountNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Account Number
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Account Number"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="bankName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bank Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Bank Name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="IFSCCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>IFSC Code</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="IFSC Code"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />{" "}
                                    <FormField
                                        control={form.control}
                                        name="branchName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Branch Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Branch Name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {errorMessage && (
                                        <div className="text-base mt-1.5 text-red-500">
                                            {errorMessage}
                                        </div>
                                    )}
                                    <Button type="submit" className=" w-full">
                                        {" "}
                                        {loading ? (
                                            <>
                                                Creating
                                                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                            </>
                                        ) : (
                                            "Create"
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </motion.div>
                        <motion.div
                            className="w-full h-full absolute right-0 top-0 bg-white/50 backdrop-blur"
                            onClick={(e) => setIsOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        ></motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default AddBank;
