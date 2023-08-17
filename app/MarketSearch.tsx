"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { RatesTable } from "./rates-table";
import { supabaseClient } from "@/lib/supabase-client";

const FormSchema = z.object({
    destination_code: z.string(),
    route_type: z.string(),
});

export default function InputForm() {
    const supabase = supabaseClient();
    const [routeOffers, setRouteOffers] = useState<RouteOffer[]>([]);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        let { data: routes, error } = await supabase
            .from("route_offers")
            .select("*")
            .match({ route_type: data.route_type })
            .eq("destination_code", data.destination_code);
        if (routes) {
            setRouteOffers(routes);
        }
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid sm:grid-cols-3  gap-4 mb-4"
                >
                    <FormField
                        control={form.control}
                        name="destination_code"
                        render={({ field }) => (
                            <FormItem>
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
                        name="route_type"
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="Route type"
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
                                        <SelectItem value="did">DID</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Search</Button>
                </form>
            </Form>
            <RatesTable data={routeOffers} />
        </>
    );
}
