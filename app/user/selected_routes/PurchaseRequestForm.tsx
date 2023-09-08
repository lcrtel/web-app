"use client";
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
import { Textarea } from "@/components/ui/textarea";
import { supabaseClient } from "@/lib/supabase-client";
import formatString from "@/utils/formatString";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiTrash } from "react-icons/hi";
import * as z from "zod";

const FormSchema = z.object({
    buying_rate: z
        .string()
        .refine((val) => !Number.isNaN(parseInt(val, 10)))
        .optional(),
    message: z.string().optional(),
    payment_type: z.string(),
});

export function PurchaseRequestForm({
    selectedRoute,
    user,
}: {
    selectedRoute: any;
    user: any;
}) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const supabase = supabaseClient();
    const router = useRouter();

    useEffect(() => {
        const selectedRoutes = supabase
            .channel("realtime-page")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "selected_routes" },
                () => {
                    router.refresh();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(selectedRoutes);
        };
    }, [supabase, router]);

    const handleDelete = async () => {
        const { error } = await supabase
            .from("selected_routes")
            .delete()
            .match({ id: selectedRoute.id, user_id: selectedRoute.user_id });
        if (error) {
            toast.error(error.message);
            return;
        }
        router.refresh();
    };

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const supabase = supabaseClient();

        let { data: purchase_requests } = await supabase
            .from("purchase_requests")
            .select(`*`)
            .match({ buyer_id: user.id, route_id: selectedRoute.route_id })
            .single();
        if (purchase_requests?.route_id === selectedRoute.route_id) {
            toast.error(
                "You have already sent a purchase requests for this route"
            );
        } else {
            const { error } = await supabase.from("purchase_requests").insert([
                {
                    route_id: selectedRoute.route_id,
                    buying_rate: data.buying_rate,
                    message: data.message,
                    payment_type: data.payment_type,
                    communication_status: "not_contacted",
                },
            ]);
            if (error) {
                toast.error(error.message);
                return;
            }
            toast.success("Purchase request posted");
            await supabase
                .from("selected_routes")
                .delete()
                .eq("id", selectedRoute.id);
            router.refresh();
        }
    }

    return (
        <Form {...form}>
            <div className="w-full border bg-slate-50 flex flex-col md:flex-row p-4 gap-4 rounded-lg ">
                <div className=" w-full rounded-lg flex flex-col justify-between">
                    <div>
                        <div className="flex  gap-4 flex-wrap mb-4">
                            <div>
                                <p className="text-slate-400 font-medium text-sm">
                                    Destination
                                </p>
                                <p className=" capitalize font-semibold text-lg leading-none">
                                    {selectedRoute.route_offers?.destination}
                                </p>
                            </div>
                            <div>
                                <p className="text-slate-400 font-medium text-sm">
                                    Route Type
                                </p>
                                <p className="uppercase font-semibold text-lg leading-none">
                                    {selectedRoute.route_offers?.route_type}
                                </p>
                            </div>
                            <div>
                                <p className="text-slate-400 font-medium text-sm">
                                    Rate
                                </p>
                                <p className="uppercase font-semibold text-lg leading-none">
                                    ${selectedRoute.route_offers?.selling_rate}
                                </p>
                            </div>
                        </div>{" "}
                        <div className="grid sm:grid-cols-2 gap-2  mb-4">
                            <div className="w-full flex justify-between items-center bg-white border border-slate-100 rounded-md px-2 py-1">
                                <p className=" text-sm text-gray-500">Prefix</p>
                                <p className=" font-semibold">
                                    {selectedRoute.route_offers?.prefix}
                                </p>
                            </div>
                            <div className="w-full flex justify-between items-center bg-white border border-slate-100 rounded-md px-2 py-1">
                                <p className=" text-sm text-gray-500">
                                    Destination Code
                                </p>
                                <p className=" font-semibold">
                                    {
                                        selectedRoute.route_offers
                                            ?.destination_code
                                    }
                                </p>
                            </div>
                            <div className="w-full flex justify-between items-center bg-white border border-slate-100 rounded-md px-2 py-1">
                                <p className=" text-sm text-gray-500">ASR</p>
                                <p className=" font-semibold">
                                    {selectedRoute.route_offers?.asr}
                                </p>
                            </div>
                            <div className="w-full flex justify-between items-center bg-white border border-slate-100 rounded-md px-2 py-1">
                                <p className=" text-sm text-gray-500">ACD</p>
                                <p className=" font-semibold">
                                    {selectedRoute.route_offers?.acd}
                                </p>
                            </div>
                            <div className="w-full flex justify-between items-center bg-white border border-slate-100 rounded-md px-2 py-1">
                                <p className=" text-sm text-gray-500">PDD</p>
                                <p className=" font-semibold">
                                    {selectedRoute.route_offers?.pdd}
                                </p>
                            </div>
                            <div className="w-full flex justify-between items-center bg-white border border-slate-100 rounded-md px-2 py-1">
                                <p className=" text-sm text-gray-500">Ports</p>
                                <p className=" font-semibold">
                                    {selectedRoute.route_offers?.ports}
                                </p>
                            </div>
                            <div className="w-full flex justify-between items-center bg-white border border-slate-100 rounded-md px-2 py-1">
                                <p className=" text-sm text-gray-500">
                                    Capacity
                                </p>
                                <p className=" font-semibold">
                                    {selectedRoute.route_offers?.capacity}
                                </p>
                            </div>
                            <div className="w-full flex justify-between items-center bg-white border border-slate-100 rounded-md px-2 py-1">
                                <p className=" text-sm text-gray-500">Status</p>
                                <p className=" font-semibold">
                                    {formatString(
                                        selectedRoute.route_offers?.verification
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button variant={"outline"} onClick={() => handleDelete()}>
                        <HiTrash className="ml-2 w-5 h-5 text-red-500" />
                    </Button>
                </div>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex w-full md:w-2/3 flex-col gap-4 p-4 bg-white  rounded-lg"
                >
                    <FormField
                        control={form.control}
                        name="buying_rate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Target Buying Rate</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="$0.00"
                                        className="bg-slate-50"
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
                                    required
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Payment type" />
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
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Remarks</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Remarks"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />{" "}
                    <Button type="submit">Request Purchase</Button>
                </form>
            </div>
        </Form>
    );
}
