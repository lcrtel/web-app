"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { destinations } from "@/lib/countries";
import { supabaseClient } from "@/lib/supabase-client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { RatesTable } from "./rates-table";

const FormSchema = z.object({
  route_type: z.string().optional(),
});

export default function InputForm() {
  const supabase = supabaseClient();
  const [routeOffers, setRouteOffers] = useState<Route[]>([]);
  const [destination, setDestination] = useState("");
  const [destinationCode, setDestinationCode] = useState("");
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  let matchFilter: any = { verification: "verified" };

  if (destination) {
    matchFilter.destination = destination;
  }

  if (destinationCode) {
    matchFilter.destination_code = destinationCode;
  }
  useEffect(() => {
    const fetchRouteOffers = async () => {
      let { data: routes, error } = await supabase
        .from("routes")
        .select("*")
        .eq("verification", "verified");
      if (routes) {
        setRouteOffers(routes);
      }
    };
    fetchRouteOffers();
  }, [setRouteOffers, supabase]);

  let query = supabase.from("routes").select("*").match(matchFilter);
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let { data: routes, error } = await query;
    if (routes) {
      setRouteOffers(routes);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 sm:grid-cols-4"
        >
          <div className="relative w-full">
            <div
              className={`${buttonVariants({
                variant: "secondary",
              })} flex w-full cursor-pointer justify-between`}
              onClick={(event) => setOpen(!open)}
            >
              {destination
                ? destinations.find((item: any) => item.country === destination)
                    ?.country
                : "Select Destination..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </div>
            <AnimatePresence>
              {open && (
                <>
                  <motion.div
                    className="absolute left-0 top-11 z-20 max-h-60 w-full overflow-y-auto rounded-lg border-2 border-surface bg-white shadow-xl"
                    initial={{ opacity: 0, y: "-4%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    exit={{ opacity: 0, y: "-4%" }}
                  >
                    <Command>
                      <CommandInput placeholder="Search Destinations..." />
                      <CommandEmpty>No destinations found.</CommandEmpty>
                      <CommandGroup>
                        {destinations.map((item) => (
                          <CommandItem
                            key={item.code}
                            onClick={(event) => setOpen(false)}
                            onSelect={() => {
                              setDestination(
                                item.country === destination
                                  ? ""
                                  : item.country,
                              );
                              setDestinationCode(
                                item.code === destination ? "" : item.code,
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                destination === item.code
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {item.country}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <div className="">
            <Input
              type="text"
              placeholder="Prefix"
              value={destinationCode}
              onChange={(e) => setDestinationCode(e.target.value)}
            />
          </div>
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
                      <SelectValue placeholder="Route type" {...field} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cli">CLI</SelectItem>
                    <SelectItem value="non-cli">Non-CLI</SelectItem>
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
          <Button type="submit">Search</Button>
        </form>
      </Form>
      <RatesTable data={routeOffers} />
    </>
  );
}
