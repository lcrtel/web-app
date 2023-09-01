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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { RatesTable } from "./rates-table";
import { supabaseClient } from "@/lib/supabase-client";
import { destinations } from "@/lib/countries";
import { Check, ChevronsUpDown } from "lucide-react";

const FormSchema = z.object({
    route_type: z.string(),
});

export default function InputForm() {
    const supabase = supabaseClient();
    const [routeOffers, setRouteOffers] = useState<RouteOffer[]>([]);
    const [destination, setDestination] = useState("");
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        let { data: routes, error } = await supabase
            .from("route_offers")
            .select("*")
            .match({
                route_type: data.route_type,
                destination_code: destination,
            });
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
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className=" justify-between"
                            >
                                {destination
                                    ? destinations.find(
                                          (item: any) =>
                                              item.code === destination
                                      )?.country
                                    : "Select Destination..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className=" max-h-60 overflow-y-auto p-0 w-full"
                            align="start"
                        >
                            <Command>
                                <CommandInput placeholder="Search Destinations..." />
                                <CommandEmpty>
                                    No destinations found.
                                </CommandEmpty>
                                <CommandGroup>
                                    {destinations.map((item) => (
                                        <CommandItem
                                            key={item.code}
                                            onSelect={() => {
                                                setDestination(
                                                    item.code === destination
                                                        ? ""
                                                        : item.code
                                                );
                                                setOpen(false);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    destination === item.code
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {item.country}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
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
