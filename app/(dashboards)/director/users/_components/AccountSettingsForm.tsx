"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiTrash } from "react-icons/hi";
import {
    deleteAccount,
    getAgents,
    updateAccountDetails,
    updateCredentials,
} from "../actions";
import { fetchUser } from "@/utils/user";

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
    phone: z.string(),
    skype_id: z.string(),
    role: z.string(),
    agent_id: z.string().optional(),
});

export function AccountSettingsForm({
    user,
    type,
}: {
    user: any;
    type: "director" | "agent";
}) {
    const [agents, setAgents] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const defaultValues = {
        name: user?.name,
        company_name: user?.company_name,
        phone: user?.phone,
        skype_id: user?.skype_id,
        role: user?.role,
        agent_id: user?.agent_id,
    };
    const form = useForm<any>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    });

    async function onSubmit(data: any) {
        setLoading(true);
        const toastId = toast.loading("Updating...");
        const { error } = await updateAccountDetails({ id: user?.id, ...data });
        if (error) {
            setLoading(false);
            toast.error(error);
            return;
        }
        toast.dismiss(toastId);
        toast.success("Account details updated");
        setLoading(false);
        router.refresh();
    }
    const fetchAgents = useCallback(async () => {
        const agents = await getAgents();
        setAgents(agents);
    }, [setAgents]);
    const setAgent = useCallback(async () => {
        const agent = await fetchUser();
        if (agent) {
            form.setValue("agent_id", agent?.id);
        }
    }, [form]);
    useEffect(() => {
        if (type === "director") {
            fetchAgents();
        } else if (type === "agent") {
            setAgent();
        }
    }, [fetchAgents, setAgent, type]);
    return (
        <>
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
                                        <FormLabel>WhatsApp No</FormLabel>
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
                                            {type === "director" && (
                                                <SelectItem value="agent">
                                                    Agent
                                                </SelectItem>
                                            )}

                                            <SelectItem value="client">
                                                Client
                                            </SelectItem>
                                            <SelectItem value="vendor">
                                                Vendor
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {user?.role !== "agent" && type !== "agent" && (
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
                                                                  (
                                                                      client: any
                                                                  ) =>
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
                                                        {agents.map(
                                                            (agent: any) => (
                                                                <CommandItem
                                                                    value={
                                                                        agent.name
                                                                    }
                                                                    key={
                                                                        agent.id
                                                                    }
                                                                    onSelect={() => {
                                                                        field.value ===
                                                                        agent.id
                                                                            ? form.setValue(
                                                                                  "agent_id",
                                                                                  ""
                                                                              )
                                                                            : form.setValue(
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
                                                            )
                                                        )}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

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
            <LoginCredentials user={user} />
            <Delete user={user} />
        </>
    );
}

function LoginCredentials({ user }: { user: any }) {
    const [loading, setLoading] = useState(false);
    const defaultValues = {
        email: user?.email,
    };
    const userID = user.id;
    const form = useForm<any>({
        resolver: zodResolver(
            z.object({
                email: z.string(),
                password: z.string().optional(),
            })
        ),
        defaultValues,
        mode: "onChange",
    });

    async function onSubmit(data: any) {
        setLoading(true);
        const updating = toast.loading("Updating...");
        const res = await updateCredentials({
            id: user.id,
            name: user.name,
            ...data,
        });
        if (res?.error) {
            setLoading(false);
            toast.error(res?.error);
            return;
        }
        toast.dismiss(updating);
        toast.success("Login credentials updated");
        setLoading(false);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-3xl mb-4 p-3 gap-2 flex flex-col border rounded-lg "
            >
                <h3 className="text-lg font-semibold tracking-tight">
                    Login Credentials
                </h3>
                <div className="flex gap-4 items-end flex-wrap">
                    <div className="grid md:grid-cols-2 gap-4 flex-1">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter email"
                                            disabled
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
                                    <FormLabel>New Password</FormLabel>
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
                    <Button type="submit" className="" disabled={loading}>
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

function Delete({ user }: { user: any }) {
    const router = useRouter();
    const handleDelete = async () => {
        const deleting = toast.loading("Deleting...");
        const res = await deleteAccount(user);
        if (res?.error) {
            toast.error(res?.error);
        } else {
            toast.dismiss(deleting);
            toast.success("Deleted account");
            router.refresh();
        }
    };
    return (
        <div className="flex justify-between max-w-3xl items-center border border-red-500 rounded-lg p-4 text-red-500">
            <div>
                <h3 className="font-semibold tracking-tight">Delete account</h3>
                <p className="text-sm">
                    Once deleted, it will be gone forever. Please be certain.
                </p>
            </div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div className="p-2 bg-red-500 text-white rounded-lg cursor-pointer">
                        <HiTrash className="w-5 h-5" />{" "}
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-red-500">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            <p className="text-red-500">
                                Are you absolutely sure?
                            </p>
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <p className="text-red-500">
                                This action cannot be undone. This will
                                permanently delete this user&apos;s account and
                                remove their routes from our database.
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-600 border-red-200">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleDelete()}
                            className="bg-red-500 hover:bg-red-600 text-white hover:white border-red-200"
                        >
                            I&apos;m sure
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
