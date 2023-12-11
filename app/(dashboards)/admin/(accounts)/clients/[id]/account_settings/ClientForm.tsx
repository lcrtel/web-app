"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const profileFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    company_name: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),

    email: z.string(),
    password: z.string().optional(),
    phone: z.string(),
    skype_id: z.string(),
    role: z.string(),
    agent_id: z.string().optional(),
    vos_client_id: z.string().optional(),
    vos_vendor_id: z.string().optional(),
});

export function ClientForm({ user, agents }: { user: any; agents: any }) {
    const [loading, setLoading] = useState(false);
    const [agentID, setAgentID] = useState("");
    const router = useRouter();

    const defaultValues = user;
    const userID = user.id;
    const form = useForm<any>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    });

    async function onSubmit(data: any) {
        setLoading(true);
        await fetch("/api/admin/accounts/update-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set the appropriate content type
            },
            body: JSON.stringify({ ...data, user_id: userID }), // Convert data to JSON string
        }).then(async (response) => {
            if (!response.ok) {
                const error = await response.json();
                setLoading(false);
                toast.error(error.message);
                return;
            } else {
                toast.success("Client's details updated");
                setLoading(false);
                router.refresh();
            }
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-3xl mb-4  flex flex-col border rounded-lg "
            >
                <div className="grid md:grid-cols-2 gap-2 border-b p-3">
                    <h3 className="text-lg font-semibold tracking-tight">
                        Personal Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="first name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company_name"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="company name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="phone number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="skype_id"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>Skype ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Skype ID"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-2 border-b p-3">
                    <h3 className="text-lg font-semibold tracking-tight">
                        VOS Credentials
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="vos_vendor_id"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel>Vendor ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Vendor ID on VOS"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vos_client_id"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>Customer ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Customer ID on VOS"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-2 border-b p-3">
                    <h3 className="text-lg font-semibold tracking-tight">
                        Login Credentials
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>Change Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter a new password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="p-3 border-b">
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem className="items-center grid md:grid-cols-2">
                                <FormLabel className="text-lg font-semibold tracking-tight">
                                    Role
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="Select a role"
                                                {...field}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="agent">
                                            Agent
                                        </SelectItem>
                                        <SelectItem value="client">
                                            Client
                                        </SelectItem>
                                        <SelectItem value="vendor">
                                            Vendor / Client
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="p-3 border-b">
                    <FormField
                        control={form.control}
                        name="agent_id"
                        render={({ field }) => (
                            <FormItem className=" items-center grid md:grid-cols-2">
                                <FormLabel className="text-lg font-semibold tracking-tight">
                                    Agent
                                </FormLabel>
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
                                                    ? agents.find(
                                                          (client: any) =>
                                                              client.id ===
                                                              field.value
                                                      )?.name
                                                    : "Choose Agent"}
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
                                                No agents found.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {agents.map((agent: any) => (
                                                    <CommandItem
                                                        value={agent.name}
                                                        key={agent.id}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                "agent_id",
                                                                agent.id
                                                            );
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                agent.id ===
                                                                    field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {agent.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="p-3 self-end w-full md:w-fit">
                    <Button type="submit" className="">
                        {" "}
                        {loading ? (
                            <>
                                Updating
                                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                            </>
                        ) : (
                            "Update"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
