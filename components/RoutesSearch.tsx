"use client";

import updatePhoneCodes from "@/app/(public)/actions";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronsUpDown,
  FilterXIcon,
  Loader2
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";

export default function RoutesSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [prefix, setPrefix] = useState<string>("");
  const [routeType, setRouteType] = useState<string | "">("");
  const [destination, setDestination] = useState<Destination>();

  useEffect(() => {
    setPrefix(searchParams.get("prefix") || "");
    if (searchParams.get("prefix") === "") {
      setDestination(undefined);
    }
    setRouteType(searchParams.get("route_type") || "");
  }, [searchParams]);
  useEffect(() => {
    router.push(pathname + "?" + createQueryString("prefix", prefix));
  }, [prefix]);
  useEffect(() => {
    router.push(pathname + "?" + createQueryString("route_type", routeType));
  }, [routeType]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  function clearFilters() {
    setPrefix("");
    setRouteType("");
    setDestination(undefined);
  }

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
    <div className="flex items-center gap-2">
      <SelectDestination
        destination={destination}
        setDestination={setDestination}
        setPrefix={setPrefix}
        prefix={prefix}
        loading={loading}
        destinations={destinations}
      />
      <SelectRouteType routeType={routeType} setRouteType={setRouteType} />

      {(prefix || routeType || destination) && (
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
    </div>
  );
}

interface SelectRouteTypeProps {
  routeType: string;
  setRouteType: (value: string) => void;
}
function SelectRouteType({ routeType, setRouteType }: SelectRouteTypeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className=" justify-between sm:max-w-32"
        >
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
  );
}

interface SelectDestinationProps {
  destination: Destination | undefined;
  setDestination: (value: Destination | undefined) => void;
  setPrefix: (value: string) => void;
  prefix: string;
  loading: boolean;
  destinations: Destination[];
}
function SelectDestination({
  destination,
  setDestination,
  setPrefix,
  prefix,
  loading,
  destinations,
}: SelectDestinationProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex items-center gap-2">
      <div className="flex h-10 sm:w-auto items-center justify-between overflow-clip rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-white transition-all duration-300 ease-in-out placeholder:text-gray-400 hover:ring-2 hover:ring-primary-50 focus-visible:border focus-visible:border-gray-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-50">
        <input
          placeholder="Search destinations..."
          className="w-36 appearance-none focus-visible:outline-none"
          onChange={(e) => setPrefix(e.target.value.toUpperCase())}
          value={prefix}
          onFocus={() => setIsOpen(true)}
        />
        {loading && <Loader2 className="size-4 animate-spin" />}
      </div>
      {destinations.length > 0 && isOpen && (
        <ScrollArea className="!absolute left-0 top-11 z-10 h-[250px] drop-shadow-2xl rounded-md border bg-white p-4">
          {destinations.map((destination) => (
            <li
              key={destination.code}
              onClick={() => {
                setDestination(destination);
                setPrefix(destination.code.toString());
                setIsOpen(false);
              }}
              className="my-1 cursor-pointer whitespace-nowrap rounded-md bg-surface px-2 py-1 capitalize tracking-wide"
            >
              {destination.value?.toLowerCase()}
            </li>
          ))}
        </ScrollArea>
      )}
      {destination?.name && (
        <div className="px-2">
          <h3 className="whitespace-nowrap text-xs">Destination Name</h3>
          <p className="whitespace-nowrap capitalize">
            {destination?.name?.toLowerCase() || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}
