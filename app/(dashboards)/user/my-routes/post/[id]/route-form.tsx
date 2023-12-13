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
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const routeFormSchema = z.object({
    destination: z.string(),
    rate: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Cannot leave this field blank",
    }),
    route_type: z.string(),
    prefix: z.string(),
    asr: z.string(),
    acd: z.string(),
    ports: z.string(),
    capacity: z.string(),
    destination_code: z.string(),
    pdd: z.string(),
});

export function RouteForm({ route }: { route: Route }) {
    const defaultValues = route;
    const form = useForm<Route>({
        resolver: zodResolver(routeFormSchema),
        defaultValues,
        mode: "onChange",
    });

    const router = useRouter();
    async function onSubmit(data: Route) {
        const supabase = supabaseClient();
        const { data: target, error } = await supabase
            .from("routes")
            .update({ ...data, updated_at: new Date().toISOString() })
            .eq("id", route.id)
            .select();
        if (error) {
            toast.error(error.message);

            return;
        }
        toast.success("Route updated");
        router.refresh();
        router.back();
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 mb-5">
                    <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Destination</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Destination"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rate</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Rate"
                                        type="number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="route_type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Route Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="Choose a type"
                                                {...field}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="cli">CLI</SelectItem>
                                        <SelectItem value="non-cli">
                                            Non-CLI
                                        </SelectItem>
                                        <SelectItem value="sms">SMS</SelectItem>
                                        <SelectItem value="tdm">TDM</SelectItem>
                                        <SelectItem value="pri">PRI</SelectItem>
                                        <SelectItem value="did">DID</SelectItem>
                                                                                <SelectItem value="cc">CC</SelectItem>

                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="prefix"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prefix</FormLabel>
                                <FormControl>
                                    <Input placeholder="Prefix" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="asr"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ASR</FormLabel>
                                <FormControl>
                                    <Input placeholder="ASR" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="acd"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ACD</FormLabel>
                                <FormControl>
                                    <Input placeholder="ACD" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ports"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ports</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ports" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="capacity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Capacity</FormLabel>
                                <FormControl>
                                    <Input placeholder="Capacity" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="destination_code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Destination Code</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Destination Code"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pdd"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>PDD</FormLabel>
                                <FormControl>
                                    <Input placeholder="PDD" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Update route</Button>
            </form>
        </Form>
    );
}
