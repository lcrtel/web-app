"use client";

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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { supabaseClient } from "@/lib/supabase-client";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

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
    skype_id: z.string(),
    role: z.string(),
});

export function ProfileForm({ user }: { user: User }) {
    const defaultValues = user.user_metadata;
    const userID = user.id;
    const form = useForm<User>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    });

    async function onSubmit(data: User) {
        const adminSupabase = supabaseAdmin();
        const { data: user, error } =
            await adminSupabase.auth.admin.updateUserById(userID, {
                user_metadata: data,
            });
        toast.success("User details updated");
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-8"
            >
                <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="first name" {...field} />
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
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="last name" {...field} />
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
                                    <SelectItem value="buyer">Buyer</SelectItem>
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email address" {...field} />
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
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="phone number" {...field} />
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
                                <Input placeholder="Skype ID" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    );
}
