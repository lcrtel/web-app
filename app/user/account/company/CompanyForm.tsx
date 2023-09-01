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

const departmentSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        })
        .optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    skype_id: z.string().optional(),
});

export function CompanyForm({ user }: { user: any }) {
    const userID = user.id;
    const router = useRouter();

    const FinanceDipartment = () => {
        const defaultValues = user.user_metadata.finance_department;
        const form = useForm<User>({
            resolver: zodResolver(departmentSchema),
            defaultValues,
            mode: "onChange",
        });
        async function onSubmit(data: any) {
            const supabase = supabaseClient();
            const { data: any } = await supabase.auth.updateUser({
                data: { finance_department: data },
            });
            const { data: user, error } = await supabase
                .from("profiles")
                .update({ finance_department: data })
                .eq("id", userID)
                .select();
            if (error) {
                toast.error(error.message);
                return;
            }
            toast.success("Finance department details saved");

            router.refresh();
        }
        return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 "
                >
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder=" name" {...field} />
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
                                            placeholder="email address"
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
                    </div>
                    <Button type="submit">Save</Button>
                </form>
            </Form>
        );
    };
    const NOCDipartment = () => {
        const defaultValues = user.user_metadata.noc_dipartment;
        const form = useForm<User>({
            resolver: zodResolver(departmentSchema),
            defaultValues,
            mode: "onChange",
        });

        async function onSubmit(data: any) {
            const supabase = supabaseClient();
            const { data: any } = await supabase.auth.updateUser({
                data: { noc_dipartment: data },
            });
            const { data: user, error } = await supabase
                .from("profiles")
                .update({ noc_dipartment: data })
                .eq("id", userID)
                .select();
            if (error) {
                toast.error(error.message);
                return;
            }
            toast.success("NOC department details saved");

            router.refresh();
        }
        return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 "
                >
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name" {...field} />
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
                                            placeholder="email address"
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
                    </div>
                    <Button type="submit">Save</Button>
                </form>
            </Form>
        );
    };
    const SalesDipartment = () => {
        const defaultValues = user.user_metadata.sales_dipartment;
        const form = useForm<User>({
            resolver: zodResolver(departmentSchema),
            defaultValues,
            mode: "onChange",
        });
        async function onSubmit(data: any) {
            const supabase = supabaseClient();
            const { data: any } = await supabase.auth.updateUser({
                data: { sales_dipartment: data },
            });
            const { data: user, error } = await supabase
                .from("profiles")
                .update({ sales_dipartment: data })
                .eq("id", userID)
                .select();
            if (error) {
                toast.error(error.message);
                return;
            }
            toast.success("Sales department details saved");

            router.refresh();
        }
        return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 "
                >
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name" {...field} />
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
                                            placeholder="email address"
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
                    </div>
                    <Button type="submit">Save</Button>
                </form>
            </Form>
        );
    };

    return (
        <section>
            <div className="p-5 border rounded-lg mb-5">
                <h2 className=" font-semibold text-lg tracking-tight mb-2">
                    Finance Dipartment
                </h2>
                <FinanceDipartment />
            </div>
            <div className="p-5 border rounded-lg mb-5">
                <h2 className=" font-semibold text-lg tracking-tight mb-2">
                    NOC Dipartment
                </h2>
                <NOCDipartment />
            </div>
            <div className="p-5 border rounded-lg mb-5">
                <h2 className=" font-semibold text-lg tracking-tight mb-2">
                    Sales Dipartment
                </h2>
                <SalesDipartment />
            </div>
        </section>
    );
}
