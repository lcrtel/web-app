"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { supabaseClient } from "@/lib/supabase-client";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { useRouter } from "next/navigation";
import { HiEye, HiEyeOff, HiX } from "react-icons/hi";
import { Checkbox } from "@/components/ui/checkbox";
import { revalidatePath } from "next/cache";

const profileFormSchema = z.object({
    first_name: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    last_name: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    email: z.string().email(),
    phone: z.string(),
    password: z.string(),
    role: z.string(),
    skype_id: z.string().optional(),
    email_confirm: z.boolean().default(false),
});

const CreateNewUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const form = useForm<User>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            email_confirm: false,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            phone: "",
            skype_id: "",
        },
        mode: "onChange",
    });

    async function onSubmit(data: User) {
        const adminSupabase = supabaseAdmin();
        setErrorMessage(null);
        setLoading(true);
        const {
            data: { user },
            error,
        } = await adminSupabase.auth.admin.createUser({
            email: data.email,
            password: data.password,
            email_confirm: data.email_confirm,
            user_metadata: {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                skype_id: data.skype_id,
                role: data.role,
            },
        });
        if (error) {
            setLoading(false);
            setErrorMessage(error.message);
            return;
        }
        toast({
            title: "Created a new user",
        });
        router.push("/admin/users");
    }
    return (
        <>
            <Button onClick={(e) => setIsOpen(true)}>Add user</Button>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="w-96 z-10 absolute right-0 top-0 h-screen overflow-y-auto p-5 shadow-xl bg-white"
                            initial={{ opacity: 0, x: "10%" }}
                            animate={{ opacity: 1, x: "0%" }}
                            exit={{ opacity: 0, x: "10%" }}
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-bold tracking-tight text-xl">
                                    Create a new user
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
                                        name="first_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    User First Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="First name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="last_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    User Last Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Last name"
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
                                            <FormItem>
                                                <FormLabel>
                                                    User Phone
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Phone number"
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
                                                <FormLabel>
                                                    User Email
                                                </FormLabel>
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
                                                        User Password
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
                                                        placeholder="User password"
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
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>User Role</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
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
                                                        <SelectItem value="buyer">
                                                            Buyer
                                                        </SelectItem>
                                                        <SelectItem value="seller">
                                                            Seller
                                                        </SelectItem>
                                                        <SelectItem value="manager">
                                                            Manager
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email_confirm"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        Auto Confirm User?
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Creates the user without
                                                        sending them a
                                                        confirmation email
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    {errorMessage && (
                                        <div className="text-base mt-1.5 text-red-500">
                                            {errorMessage}
                                        </div>
                                    )}
                                    <Button type="submit">Create user</Button>
                                </form>
                            </Form>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-primary-500/20 backdrop-blur w-full  absolute left-0 top-0 bottom-0 right-0 h-screen "
                        ></motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default CreateNewUser;
