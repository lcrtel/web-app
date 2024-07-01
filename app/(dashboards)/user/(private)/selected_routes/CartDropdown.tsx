"use client";

import { fetchCartItems } from "@/components/navigation/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
export function CartDropdown() {
  const [items, setItems]: any = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      const selectedRoutes = await fetchCartItems();
      setItems(selectedRoutes);
    };
    fetchItems();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <div className="absolute -right-[2px] -top-[2px] flex h-5 w-5 items-center justify-center rounded-full bg-surface text-xs">
            {items?.length}
          </div>
          <ShoppingCart className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" rounded-2xl text-primary-900">
        <h3 className="mb-2 text-lg font-bold tracking-tight">
          Selected Routes
        </h3>
        {items?.length ? (
          <div className="mb-2 grid gap-2">
            {items?.map((route: any) => (
              <div
                key={route.id}
                className=" flex justify-between gap-2 rounded-full border bg-white px-3 py-1 font-medium uppercase"
              >
                <p className=" ">
                  {route?.routes?.destination} - {route?.routes?.route_type}
                </p>
                <p>${route?.routes?.selling_rate}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4">
            <p className="text-center font-medium tracking-tight text-slate-400">
              Empty
            </p>
          </div>
        )}

        <PopoverClose asChild>
          {items?.length ? (
            <Link
              href="/user/selected_routes"
              className={`${buttonVariants({
                variant: "secondary",
                size: "sm",
              })} mt-2 w-full gap-2`}
            >
              View All <HiArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
