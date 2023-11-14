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
    name: z.string(),
    route_id: z.string(),
    client_id: z.string(),
    payment_type: z.string(),
    status: z.string(),
    rate: z.string(),
});

const CreateGateway = ({ routes, clients }: { routes: any; clients: any }) => {
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

        await fetch("/agent/gateways/create", {
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
                toast.success("Created a new getway");
            }
        });
    }


    return (
        <>
            <Button onClick={(e) => setIsOpen(true)}>Create Gateway</Button>
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
                                    Create Gateway
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
                                        name="client_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Select Client
                                                </FormLabel>
                                                <FormControl>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-full rounded-lg justify-between",
                                                                        !field.value &&
                                                                            "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value
                                                                        ? clients.find(
                                                                              (
                                                                                  client: any
                                                                              ) =>
                                                                                  client.id ===
                                                                                  field.value
                                                                          )
                                                                              ?.name
                                                                        : "Select Client"}
                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            align="start"
                                                            className="w-full p-0 overflow-clip"
                                                        >
                                                            <Command>
                                                                <CommandInput placeholder="Search Client..." />
                                                                <CommandEmpty>
                                                                    No client
                                                                    found.
                                                                </CommandEmpty>
                                                                <CommandGroup>
                                                                    {clients.map(
                                                                        (
                                                                            client: any
                                                                        ) => (
                                                                            <CommandItem
                                                                                value={
                                                                                    client.name
                                                                                }
                                                                                key={
                                                                                    client.id
                                                                                }
                                                                                onSelect={() => {
                                                                                    form.setValue(
                                                                                        "client_id",
                                                                                        client.id
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        "mr-2 h-4 w-4",
                                                                                        client.id ===
                                                                                            field.value
                                                                                            ? "opacity-100"
                                                                                            : "opacity-0"
                                                                                    )}
                                                                                />
                                                                                {
                                                                                    client.name
                                                                                }{" "}
                                                                                -{" "}
                                                                                {
                                                                                    client.company_name
                                                                                }
                                                                            </CommandItem>
                                                                        )
                                                                    )}
                                                                </CommandGroup>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="route_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Select Route
                                                </FormLabel>
                                                <FormControl>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-full rounded-lg justify-between",
                                                                        !field.value &&
                                                                            "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value
                                                                        ? routes.find(
                                                                              (
                                                                                  route: any
                                                                              ) =>
                                                                                  route.id ===
                                                                                  field.value
                                                                          )
                                                                              ?.destination
                                                                        : "Select Route"}
                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            align="start"
                                                            className="w-full p-0 overflow-clip"
                                                        >
                                                            <Command>
                                                                <CommandInput placeholder="Search Route..." />
                                                                <CommandEmpty>
                                                                    No route
                                                                    found.
                                                                </CommandEmpty>
                                                                <CommandGroup>
                                                                    {routes.map(
                                                                        (
                                                                            route: any
                                                                        ) => (
                                                                            <CommandItem
                                                                                value={
                                                                                    route.name
                                                                                }
                                                                                key={
                                                                                    route.id
                                                                                }
                                                                                onSelect={() => {
                                                                                    form.setValue(
                                                                                        "route_id",
                                                                                        route.id
                                                                                    );
                                                                                    setRate(
                                                                                        route.selling_rate
                                                                                    );
                                                                                    form.setValue(
                                                                                        "rate",
                                                                                        Number(
                                                                                            route.selling_rate
                                                                                        ).toFixed(
                                                                                            2
                                                                                        )
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        "mr-2 h-4 w-4",
                                                                                        route.id ===
                                                                                            field.value
                                                                                            ? "opacity-100"
                                                                                            : "opacity-0"
                                                                                    )}
                                                                                />
                                                                                {
                                                                                    route.destination
                                                                                }{" "}
                                                                                -{" "}
                                                                                {
                                                                                    route
                                                                                        .profiles
                                                                                        .name
                                                                                }{" "}
                                                                                <span className="text-slate-400">
                                                                                    (
                                                                                    {
                                                                                        route
                                                                                            .profiles
                                                                                            .company_name
                                                                                    }

                                                                                    )
                                                                                </span>
                                                                            </CommandItem>
                                                                        )
                                                                    )}
                                                                </CommandGroup>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="rate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Rate</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Rate"
                                                        value={Number(
                                                            rate
                                                        ).toFixed(2)}
                                                        onChange={(e) => {
                                                            setRate(
                                                                e.target
                                                                    .valueAsNumber
                                                            );
                                                            form.setValue(
                                                                "rate",
                                                                e.target
                                                                    .valueAsNumber
                                                            );
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Gateway Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Gateway Name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="payment_type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Payment Type
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Choose a payment type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="prepaid">
                                                            Prepaid
                                                        </SelectItem>
                                                        <SelectItem value="postpaid">
                                                            Postpaid
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select the status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="active">
                                                            Active
                                                        </SelectItem>
                                                        <SelectItem value="pending">
                                                            Pending
                                                        </SelectItem>
                                                        <SelectItem value="expired">
                                                            Expired
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
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

export default CreateGateway;
