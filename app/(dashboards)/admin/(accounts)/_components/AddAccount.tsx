"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { HiEye, HiEyeOff, HiX } from "react-icons/hi";
import { addAccount, getAgents } from "../actions";
import { fetchUserData } from "@/utils/user";

const accountSchema = z.object({
    name: z.string(),
    company_name: z.string().optional(),
    email: z.string().email(),
    phone: z.string(),
    password: z.string(),
    skype_id: z.string().optional(),
    agent_id: z.string().optional(),
});

export const AddAccountForm = ({
    role,
    type,
}: {
    role: AccountRole;
    type: "admin" | "agent";
}) => {
    const [agents, setAgents] = useState<Profile[]>([]);
    const form = useForm<any>({
        resolver: zodResolver(accountSchema),
        mode: "onChange",
    });
    const [isOpen, setIsOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function onSubmit(user: any) {
        setLoading(true);
        const adding = toast.loading("Adding...");
        const res = await addAccount(user, role);
        if (res?.error) {
            toast.error(res.error);
            setLoading(false);
            return;
        }
        setLoading(false);
        toast.dismiss(adding);
        toast.success(`Added ${role}: ${user.name}`);
        router.refresh();
        setIsOpen(false);
        console.log(user);
    }
    const fetchAgents = useCallback(async () => {
        const agents = await getAgents();
        setAgents(agents);
    }, [setAgents]);
    const setAgent = useCallback(async () => {
        const agent = await fetchUserData();
        if (agent) {
            form.setValue("agent_id", agent?.id);
        }
    }, [form]);
    useEffect(() => {
        if (type === "admin") {
            fetchAgents();
        } else if (type === "agent") {
            setAgent();
        }
    }, [fetchAgents, setAgent,type]);
    return (
        <>
            <Button
                onClick={(e) => {
                    setIsOpen(true);
                    form.reset();
                }}
                className=" capitalize"
            >
                Add {role}
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
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-bold tracking-tight text-xl capitalize">
                                    Add {role}
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
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="capitalize">
                                                    {role} Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {role !== "agent" && (
                                        <FormField
                                            control={form.control}
                                            name="company_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Company Name
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Company Name"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    WhatsApp No
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="WhatsApp No number"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="user@example.com"
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
                                            <FormItem>
                                                <div className="flex gap-2 mb-2">
                                                    <FormLabel>
                                                        Password
                                                    </FormLabel>
                                                    <div
                                                        className="text-gray-400 cursor-pointer"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <HiEyeOff />
                                                        ) : (
                                                            <HiEye />
                                                        )}
                                                    </div>
                                                </div>
                                                <FormControl>
                                                    <Input
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        placeholder="Password"
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
                                            <FormItem>
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
                                    {role !== "agent" && type !== "agent" && (
                                        <FormField
                                            control={form.control}
                                            name="agent_id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Agent</FormLabel>
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
                                                                          )
                                                                              ?.name
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
                                                                    No agents
                                                                    found.
                                                                </CommandEmpty>
                                                                <CommandGroup>
                                                                    {agents?.map(
                                                                        (
                                                                            agent: any
                                                                        ) => (
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
                                                                                {
                                                                                    agent.name
                                                                                }
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
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <Loader2 className="animate-spin w-4 h-4" />
                                        ) : (
                                            "Add"
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </motion.div>
                        <motion.div
                            className="w-full h-full absolute right-0 top-0 bg-white/50 backdrop-blur"
                            onClick={(e) => {
                                setIsOpen(true);
                                form.reset();
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
