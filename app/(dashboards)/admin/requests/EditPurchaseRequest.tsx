"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
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

import CopyButton from "@/components/ui/copy-button";
import { supabaseClient } from "@/lib/supabase-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa6";
import { HiOutlineExternalLink, HiX } from "react-icons/hi";

const routeFormSchema = z.object({
    status: z.string(),
    vos_status: z.string(),
    communication_status: z.string().optional(),
});

export function EditPurchaseRequest({ request }: { request: any }) {
    const supabase = supabaseClient();
    const [isOpen, setIsOpen] = useState(false);
    const defaultValues = request;
    const form = useForm({
        resolver: zodResolver(routeFormSchema),
        defaultValues,
        mode: "onChange",
    });
    
    const router = useRouter();

    async function onSubmit(formData: any) {
        const { data: requestData, error } = await supabase
            .from("purchase_requests")
            .update({
                status: formData.status,
                communication_status: formData.communication_status,
                vos_status: formData.vos_status,
            })
            .eq("id", request.id)
            .select()
        if (error) {
            toast.error(error.message);
            return;
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
                        <p className=" font-medium">Client</p>
                        <Link
                            href={`/admin/clients/${request.client_id}`}
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
                            {request?.routes?.destination} -{" "}
                            {request?.routes?.route_type}
                            <HiOutlineExternalLink className=" w-5 h-5 " />
                        </Link>
                    </div>

                    <div className="">
                        <p className=" font-medium">Payment Type</p>
                        <p className="text-slate-500 capitalize">
                            {request?.payment_type}
                        </p>
                    </div>
                    <div className="">
                        <p className=" font-medium">WhatsApp No</p>
                        <div className="text-slate-500 flex gap-2 items-center justify-between">
                            <p className="text-slate-500 flex gap-2 items-center">
                                {request?.whatsapp_no}{" "}
                                <CopyButton textToCopy={request?.whatsapp_no} />
                            </p>
                            <Link
                                href={`https://wa.me/${request?.whatsapp_no}`}
                                className={`bg-[#128c7e] hover:bg-[#25d366] duration-150 text-white  flex gap-2 items-center rounded-full px-3 py-2`}
                            >
                                <FaWhatsapp className="w-5 h-5" /> Chat
                            </Link>
                        </div>
                    </div>
                    <div className="">
                        <p className=" font-medium">IP Address</p>
                        <p className="text-slate-500 flex gap-2 items-center">
                            {request?.ip}{" "}
                            <CopyButton textToCopy={request?.ip} />
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
                            name="communication_status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Vendor Communication Status
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
                            name="vos_status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>VOS Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder="Update Status"
                                                    {...field}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="pending">
                                                Pending
                                            </SelectItem>
                                            <SelectItem value="added">
                                                Added
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
