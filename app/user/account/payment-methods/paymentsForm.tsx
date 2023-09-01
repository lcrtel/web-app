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

import { supabaseClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const bankDetailsSchema = z.object({
    accountHolderName: z.string(),
    accountNumber: z.string().regex(/^\d+$/),
    bankName: z.string(),
    branchName: z.string(),
    IFSCCode: z.string(),
});

export function PaymentsForm({ user }: { user: any }) {
    const userID = user?.id;
    const defaultValues = user.user_metadata.payment_method;
    const router = useRouter();
    const form = useForm<any>({
        resolver: zodResolver(bankDetailsSchema),
        defaultValues,
        mode: "onChange",
    });

    async function onSubmit(data: any) {
        toast.success("Payment method saved");
        // const supabase = supabaseClient();
        // const { data: any } = await supabase.auth.updateUser({
        //     data: { payment_method: data },
        // });
        // const { data: user, error } = await supabase
        //     .from("profiles")
        //     .update({ payment_method: data })
        //     .eq("id", userID)
        //     .select();
        // if (error) {
        //     toast.success(error.message);
        //     return;
        // }

        // router.refresh();
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
