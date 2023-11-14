"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { supabaseClient } from "@/lib/supabase-client";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlinePencilAlt, HiX } from "react-icons/hi";
import { Loader2 } from "lucide-react";

const routeFormSchema = z.object({
    name: z.string(),
    status: z.string(),
    payment_type: z.string(),
});

export function EditGateway({ gateway }: { gateway: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const defaultValues = gateway;
    const form = useForm<any>({
        resolver: zodResolver(routeFormSchema),
        defaultValues,
        mode: "onChange",
    });

    async function onSubmit(data: any) {
        await fetch("/admin/gateways/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set the appropriate content type
            },
            body: JSON.stringify({ ...data, id: gateway.id }), // Convert data to JSON string
        }).then(async (response) => {
            if (!response.ok) {
                const error = await response.json();
                toast.error(error.message);
                setLoading(false);
                return;
            } else {
                setIsOpen(false);
                router.refresh();
                toast.success("Gateway details updated");
            }
        });
    }

    return (
        <Sheet  open={isOpen}>
            <SheetTrigger asChild>
                <Button onClick={(e) => setIsOpen(true)} className="gap-2 ">
                    Edit <HiOutlinePencilAlt className="w-4 h-4" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <div className="flex justify-between items-center mb-2">
                        <SheetTitle>Edit Gateway</SheetTitle>
                        <div
                            className={`${buttonVariants({
                                variant: "ghost",
                                size: "icon",
                            })} cursor-pointer`}
                            onClick={(e) => setIsOpen(false)}
                        >
                            {" "}
                            <HiX className="w-5 h-5" />
                        </div>
                    </div>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-5  mb-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gateway Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter Gateway Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="payment_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Payment Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose a payment type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="prepaid">
                                                    Prepaid
                                                </SelectItem>
                                                <SelectItem value="postpaid">
                                                    Postpaid
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="active">
                                                    Active
                                                </SelectItem>
                                                <SelectItem value="pending">
                                                    Pending
                                                </SelectItem>
                                                <SelectItem value="expired">
                                                    Expired
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <SheetClose asChild>
                            <Button type="submit" className=" w-full">
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
                        </SheetClose>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
