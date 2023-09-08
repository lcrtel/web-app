"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
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

import { supabaseAdmin } from "@/lib/supabase-admin";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { HiOutlineExternalLink, HiX } from "react-icons/hi";
import Link from "next/link";
const routeFormSchema = z.object({
    status: z.string(),
    communication_status: z.string().optional(),
});
export function EditRequest({ request }: { request: any }) {
    const supabase = supabaseAdmin();
    const [isOpen, setIsOpen] = useState(false);
    const defaultValues = request;
    const form = useForm<PurchaseRequest>({
        resolver: zodResolver(routeFormSchema),
        defaultValues,
        mode: "onChange",
    });

    const router = useRouter();
    async function onSubmit(data: PurchaseRequest) {
        const { data: requestData, error } = await supabase
            .from("purchase_requests")
            .update(data)
            .eq("id", request.id)
            .select()
            .single();
        if (error) {
            toast.error(error.message);
            return;
        }
        if (requestData.status === "approved") {
            const { data, error } = await supabase
                .from("route_connections")
                .insert([
                    {
                        buyer_id: requestData.buyer_id,
                        route_id: requestData.route_id,
                        status:
                            requestData.payment_type === "postpaid"
                                ? "active"
                                : "pending",
                        payment_type: requestData.payment_type,
                    },
                ])
                .select();
        }
        toast.success("Saved");
        setIsOpen(false);
        router.refresh();
    }
    return (
        <Sheet open={isOpen}>
            <SheetTrigger asChild>
                <div
                    onClick={(e) => setIsOpen(true)}
                    className="font-medium inline-block cursor-pointer bg-blue-100 px-3 py-1.5 rounded-full text-blue-500"
                >
                    Details
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <div className="flex justify-between items-center mb-5">
                        <SheetTitle>Request Details</SheetTitle>
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
                <div className=" space-y-4 mb-5 p-4 bg-slate-50 rounded-lg">
                    <div className="">
                        <p className=" font-medium">Buyer</p>
                        <Link
                            href={`/admin/users/${request.buyer_id}`}
                            className="flex gap-2  text-slate-500"
                        >
                            {request?.profiles?.email}
                            <HiOutlineExternalLink className="w-5 h-5" />
                        </Link>
                    </div>
                    <div className="">
                        <p className=" font-medium">Route Offer</p>
                        <Link
                            href={`/admin/routes/${request.route_id}`}
                            className=" uppercase flex gap-2  text-slate-500"
                        >
                            {request?.route_offers?.destination} -{" "}
                            {request?.route_offers?.route_type}
                            <HiOutlineExternalLink className=" w-5 h-5 " />
                        </Link>
                    </div>
                    <div className="">
                        <p className=" font-medium">Target Rate</p>
                        <p className="text-slate-500">
                            {request?.buying_rate
                                ? new Intl.NumberFormat("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                  }).format(parseFloat(request?.buying_rate))
                                : "N/A"}
                        </p>
                    </div>
                    <div className="">
                        <p className=" font-medium">Payment Type</p>
                        <p className="text-slate-500 capitalize">
                            {request?.payment_type}
                        </p>
                    </div>
                    <div className="">
                        <p className=" font-medium">Message</p>
                        <p className="text-slate-500">
                            {request?.message ? request?.message : "No message"}
                        </p>
                    </div>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className=" space-y-4 p-4 border rounded-lg"
                    >
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Request Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder="Change Status"
                                                    {...field}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="pending">
                                                Pending
                                            </SelectItem>
                                            <SelectItem value="approved">
                                                Approved
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="communication_status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Seller Communication Status
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder="Communication Status"
                                                    {...field}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="not_contacted">
                                                Not Contacted
                                            </SelectItem>
                                            <SelectItem value="contacted">
                                                Contacted
                                            </SelectItem>
                                            <SelectItem value="negotiation_ongoing">
                                                Negotiation Ongoing
                                            </SelectItem>
                                            <SelectItem value="deal_settled_successfully">
                                                Deal Settled Successfully
                                            </SelectItem>
                                            <SelectItem value="asked_to_contact_later">
                                                Asked to Contact Later
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SheetClose asChild>
                            <Button type="submit" className="w-full">
                                Update
                            </Button>
                        </SheetClose>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
