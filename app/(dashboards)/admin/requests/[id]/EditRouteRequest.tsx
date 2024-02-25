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
import { HiX } from "react-icons/hi";
const routeFormSchema = z.object({
    acd: z.string(),
    asr: z.string(),
    buying_rate: z.string(),
    capacity: z.string(),
    destination: z.string(),
    destination_code: z.string(),
    pdd: z.string(),
    ports: z.string(),
    rate: z.string(),
    route_type: z.string(),
});
export function EditRouteRequest({ route_request }: { route_request: Target }) {
    const supabase = supabaseClient();
    const [isOpen, setIsOpen] = useState(false);
    const defaultValues = route_request;
    const form = useForm<Target>({
        resolver: zodResolver(routeFormSchema),
        defaultValues,
        mode: "onChange",
    });

    const router = useRouter();
    async function onSubmit(data: Target) {
        const { error } = await supabase
            .from("targets")
            .update({
                ...data,
                updated_at: new Date().toISOString(),
            })
            .eq("id", route_request.id)
            .select();
        if (error) {
            toast.error(error.message);
            return;
        }
        toast.success("Route request updated");
        setIsOpen(false);
        router.refresh();
    }
    return (
        <Sheet open={isOpen}>
            <SheetTrigger asChild>
                <Button onClick={(e) => setIsOpen(true)}>Edit</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <div className="flex justify-between items-center mb-2">
                        <SheetTitle>Edit Route request</SheetTitle>
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
                        <div className="grid gap-5 sm:grid-cols-2 mb-5">
                           
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
                                                <SelectItem value="cli">
                                                    CLI
                                                </SelectItem>
                                                <SelectItem value="non-cli">
                                                    Non-CLI
                                                </SelectItem>
                                                <SelectItem value="sms">
                                                    SMS
                                                </SelectItem>
                                                <SelectItem value="tdm">
                                                    TDM
                                                </SelectItem>
                                                <SelectItem value="pri">
                                                    PRI
                                                </SelectItem>
                                                <SelectItem value="did">
                                                    DID
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
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
                                            <Input
                                                placeholder="ASR"
                                                {...field}
                                            />
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
                                            <Input
                                                placeholder="ACD"
                                                {...field}
                                            />
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
                                            <Input
                                                placeholder="Ports"
                                                {...field}
                                            />
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
                                            <Input
                                                placeholder="Capacity"
                                                {...field}
                                            />
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
                                            <Input
                                                placeholder="PDD"
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
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="buying_rate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Selling Rate</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="buying_rate"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <SheetClose asChild>
                            <Button type="submit" className="w-full">
                                Update route
                            </Button>
                        </SheetClose>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
