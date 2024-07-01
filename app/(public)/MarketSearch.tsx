"use client";

import { Button } from "@/components/ui/button";

import * as z from "zod";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronsUpDown,
  FilterXIcon,
  Loader2,
  SearchIcon,
  SearchX,
} from "lucide-react";
import { useEffect, useState } from "react";
import updatePhoneCodes from "./actions";
import { RatesTable } from "./rates-table";

const FormSchema = z.object({
  prefix: z.string(),
  route_type: z.string().optional(),
});

/**
 * Renders an input form for searching for phone codes and destinations.
 * Returns JSX.Element.
 */
export default function InputForm(): JSX.Element {
  const [routeOffers, setRouteOffers] = useState<Route[]>([]);
  const [prefix, setPrefix] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [routeType, setRouteType] = useState<string | "">("");
  const [destination, setDestination] = useState<Destination>();

  /**
   * Handles form submission. Logs the form data to the console.
   *
   * @param data - The form data.
   */
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(prefix);
    console.log(routeType);
  }
  function clearFilters() {
    setPrefix("");
    setRouteType("");
    setDestination(undefined);
  }

  return (
    <div className="">
      <form
        onSubmit={onSubmit}
        className="flex flex-wrap items-center gap-2 border-b pb-2"
      >
        <Destination
          prefix={prefix}
          setPrefix={setPrefix}
          setDestination={setDestination}
          destination={destination}
        />
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex-1 sm:max-w-32 justify-between">
              {routeType ? routeType.toUpperCase() : "Route type"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-32 p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {" "}
                  {["cli", "non-cli", "sms", "tdm", "pri", "did", "cc"].map(
                    (value) => (
                      <CommandItem
                        key={value}
                        value={value}
                        onSelect={(currentValue) => {
                          setRouteType(
                            currentValue === routeType ? "" : currentValue,
                          );
                          setIsOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === routeType ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {value.toUpperCase()}
                      </CommandItem>
                    ),
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button type="submit" variant="outline" size="icon">
          <SearchIcon className="size-4" />
        </Button>
        {(prefix || routeType) && (
          <Button
            type="button"
            size="icon"
            className="gap-2"
            variant="outline"
            onClick={() => clearFilters()}
          >
            <FilterXIcon className="size-4 text-red-500" />
          </Button>
        )}
      </form>
      {routeOffers.length > 0 ? (
        <RatesTable data={routeOffers} />
      ) : (
        <div className="flex h-[180px] text-center flex-col items-center justify-center gap-5 text-slate-400">
          <SearchX className="size-10" />
          <p>Sorry, we did not find any routes for your search</p>
        </div>
      )}
    </div>
  );
}

const Destination = ({
  prefix,
  setPrefix,
  destination,
  setDestination,
}: {
  prefix: string;
  setPrefix: React.Dispatch<React.SetStateAction<string>>;
  destination: Destination | undefined;
  setDestination: React.Dispatch<React.SetStateAction<Destination | undefined>>;
}): JSX.Element => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!prefix) {
      setDestinations([]);
      return;
    }

    setLoading(true);
    updatePhoneCodes(prefix).then((data: any) => {
      setDestinations(data || []);
      setLoading(false);
    });
  }, [prefix]);
  return (
    <>
      <Input
        className="w-28"
        placeholder="Prefix"
        value={prefix}
        onFocus={() => setIsOpen(true)}
        onClick={() => setIsOpen(true)}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Destination</DialogTitle>
          </DialogHeader>
          <div className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-white transition-all duration-300 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 hover:ring-2 hover:ring-primary-50 focus-visible:border focus-visible:border-gray-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-50 disabled:cursor-not-allowed disabled:opacity-50">
            <input
              placeholder="Search destinations..."
              className="flex-1 appearance-none focus-visible:outline-none"
              onChange={(e) => setPrefix(e.target.value)}
              value={prefix}
            />
            {loading && <Loader2 className="size-4 animate-spin" />}
          </div>
          {destinations.length > 0 && (
            <ul className="flex max-h-[300px] flex-col gap-2 overflow-y-auto pr-2">
              {destinations.map((destination) => (
                <li
                  key={destination.code}
                  onClick={() => {
                    setDestination(destination);
                    setPrefix(destination.code);
                    setIsOpen(false);
                  }}
                  className="cursor-pointer rounded-md bg-surface px-2 py-1 capitalize tracking-wide"
                >
                  {destination.value?.toLowerCase()}
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
      </Dialog>
      {destination?.name && (
        <div className="px-2">
          <h3 className="text-xs">Destination Name</h3>
          <p className="capitalize">
            {destination?.name?.toLowerCase() || "N/A"}
          </p>
        </div>
      )}
    </>
  );
};
