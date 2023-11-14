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
import { Loader2 } from "lucide-react";
import { HiEye, HiEyeOff } from "react-icons/hi";

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
});

export function VendorForm({ user }: { user: any }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

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
                toast.success("Vendor's details updated");
                setLoading(false);
                router.refresh();
            }
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 max-w-3xl mb-4  flex flex-col"
            >
                <div className="grid md:grid-cols-2 gap-2 border-b pb-5">
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
                <div className="grid md:grid-cols-2 gap-2 border-b pb-5">
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
                    
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem className="col-span-1 grid md:grid-cols-2">
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
                <Button type="submit" className="self-end w-full md:w-fit">
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
            </form>
        </Form>
    );
}
