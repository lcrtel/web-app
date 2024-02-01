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
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { supabaseClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiEye, HiEyeOff } from "react-icons/hi";

const profileFormSchema = z.object({
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .refine(
            (value) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
                    value
                ),
            {
                message:
                    "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character",
            }
        ),
});

export function PasswordForm({ user }: { user: any }) {
    const userID = user?.id;
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const form = useForm<any>({
        resolver: zodResolver(profileFormSchema),
        mode: "onChange",
    });

    async function onSubmit(data: any) {
        const supabase = supabaseClient();

        const { error } = await supabase.auth.updateUser({
            password: data.password,
        });
        if (error) {
            toast.error(error.message);

            return;
        }
        toast.success("Your password updated");
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex">
                                    <FormLabel>New Password</FormLabel>
                                    <div
                                        className="text-gray-400 ml-2 cursor-pointer"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
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
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="New Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Reset Password</Button>
                </form>
            </Form>
        </div>
    );
}
