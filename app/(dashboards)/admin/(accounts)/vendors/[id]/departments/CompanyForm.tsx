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

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
    updateFinanceDipartment,
    updateNOCDipartment,
    updateSalesDipartment,
} from "./actions";

const departmentSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    skype_id: z.string().optional(),
});

export function CompanyForm({ user }: { user: any }) {
    const userID = user.id;
    const router = useRouter();

    const FinanceDipartment = () => {
        const defaultValues = user.finance_department;
        const form = useForm<any>({
            resolver: zodResolver(departmentSchema),
            defaultValues,
            mode: "onChange",
        });
        async function onSubmit(data: any) {
            await updateFinanceDipartment({
                user_id: userID,
                finance_department: data,
            });

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
                                            type="email"
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
        const defaultValues = user.noc_department;
        const form = useForm<any>({
            resolver: zodResolver(departmentSchema),
            defaultValues,
            mode: "onChange",
        });

        async function onSubmit(data: any) {
            await updateNOCDipartment({
                user_id: userID,
                noc_department: data,
            });

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
                                            type="email"
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
        const defaultValues = user.sales_department;
        const form = useForm<any>({
            resolver: zodResolver(departmentSchema),
            defaultValues,
            mode: "onChange",
        });
        async function onSubmit(data: any) {
            await updateSalesDipartment({
                user_id: userID,
                sales_department: data,
            });

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
                                            type="email"
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
        <section className=" max-w-2xl">
            <div className="p-5 border rounded-lg mb-5">
                <h2 className=" font-semibold text-lg tracking-tight mb-2">
                    Finance Department
                </h2>
                <FinanceDipartment />
            </div>
            <div className="p-5 border rounded-lg mb-5">
                <h2 className=" font-semibold text-lg tracking-tight mb-2">
                    NOC Department
                </h2>
                <NOCDipartment />
            </div>
            <div className="p-5 border rounded-lg mb-5">
                <h2 className=" font-semibold text-lg tracking-tight mb-2">
                    Sales Department
                </h2>
                <SalesDipartment />
            </div>
        </section>
    );
}
