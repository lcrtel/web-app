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
import { toast } from "@/components/ui/use-toast";
import { supabaseClient } from "@/lib/supabase-client";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const bankDetailsSchema = z.object({
    accountHolderName: z.string(),
    accountNumber: z.string().regex(/^\d+$/),
    bankName: z.string(),
    branchName: z.string(),
    IFSCCode: z.string(),
});

export function PaymentsForm({ user }: { user: User }) {
    const userID = user?.id;
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const form = useForm<User>({
        resolver: zodResolver(bankDetailsSchema),
        mode: "onChange",
    });

    async function onSubmit(data: User) {
        const supabase = supabaseClient();

        const { error } = await supabase.auth.updateUser({
            password: data.password,
        });
        if (error) {
            toast({
                title: error.message,
            });
            return;
        }
        toast({
            title: "Your password updated",
        });

        router.refresh();
    }

    return (
        <div className="p-5 border rounded-lg mb-5">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 "
                >
                    <FormField
                        control={form.control}
                        name="accountHolderName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account Holder Name</FormLabel>
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
                                <FormLabel>Account Number</FormLabel>
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
                                    <Input placeholder="Bank Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="IFSCECode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>IFSC Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="IFSC Code" {...field} />
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
                                <FormLabel>Branch Name</FormLabel>
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
                    <Button type="submit">Save</Button>
                </form>
            </Form>
        </div>
    );
}
