"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { addPurchase } from "./addPurchase";

const routeFormSchema = z
  .object({
    buying_rate: z
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    route_id: z.string(),
    user_id: z.string(),
    payment_type: z.enum(["prepaid", "postpaid"]),
    whatsapp_no: z.string(),
    ip: z
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    status: z.string(),
    vos_status: z.string(),
    communication_status: z.string(),
  })
  .refine(
    (data) => {
      if (
        data.status === "approved" &&
        (data.communication_status !== "deal_settled_successfully" ||
          data.vos_status !== "added")
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        "Status cannot be set to approved if communication status is not 'deal_settled_successfully' and VOS status is not 'added'",
      path: ["status"],
    },
  );;

type FormData = z.infer<typeof routeFormSchema>;

export default function AddPurchaseSheet({
  routes,
  users,
}: {
  routes: Route[];
  users: Profile[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [routeOpen, setRouteOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(routeFormSchema),
    mode: "onChange",
  });
  const router = useRouter();
  const watchCommunicationStatus = form.watch("communication_status");
  const watchVosStatus = form.watch("vos_status");

  useEffect(() => {
    if (
      watchCommunicationStatus === "deal_settled_successfully" &&
      watchVosStatus === "added"
    ) {
      form.setValue("status", "approved");
    } else {
      form.setValue("status", "pending");
    }
  }, [watchCommunicationStatus, watchVosStatus, form]);

  async function onSubmit(data: FormData) {
    setLoading(true);
    const res = await addPurchase(data);
    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }
    setIsOpen(false);
    toast.success("Added");
    router.refresh();
    setLoading(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button onClick={() => setIsOpen(true)} size="sm">
          Add <PlusCircle className="ml-2 size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="mb-5 flex items-center justify-between">
            <SheetTitle className="text-primary-900">Add Purchase</SheetTitle>
          </div>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full space-y-4 overflow-y-auto px-2 pb-14"
          >
            <FormField
              control={form.control}
              name="route_id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Route</FormLabel>
                  <Popover open={routeOpen} onOpenChange={setRouteOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between rounded-lg",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            <div className="flex flex-1 items-center justify-between">
                              <div className="flex items-center">
                                {
                                  routes.find(
                                    (route) => route.id === field.value,
                                  )?.destination
                                }
                                ,{" "}
                                {
                                  routes.find(
                                    (route) => route.id === field.value,
                                  )?.destination_code
                                }
                                ,{" "}
                                {routes
                                  .find((route) => route.id === field.value)
                                  ?.route_type.toUpperCase()}
                              </div>
                              $
                              {
                                routes.find((route) => route.id === field.value)
                                  ?.selling_rate
                              }
                              /m
                            </div>
                          ) : (
                            "Select route"
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search route..." />
                        <CommandEmpty>No route found.</CommandEmpty>
                        <CommandGroup className="max-h-[200px] overflow-y-auto">
                          {routes.map((route, idx: number) => (
                            <CommandItem
                              value={`${route.destination}, ${route.destination_code}, ${route.route_type.toUpperCase()}, $${route.selling_rate}/m`}
                              key={idx}
                              onSelect={() => {
                                form.setValue("route_id", route.id);
                                form.setValue(
                                  "buying_rate",
                                  route.selling_rate,
                                );
                                setRouteOpen(false);
                              }}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center">
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    route.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {route.destination}, {route.destination_code},{" "}
                                {route.route_type.toUpperCase()}
                              </div>
                              ${route.selling_rate}/m
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="buying_rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Buying Rate <span className="text-sm text-slate-500"></span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter buying rate"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? undefined : value);
                      }}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>User</FormLabel>
                  <Popover open={userOpen} onOpenChange={setUserOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          disabled={form.getValues("route_id") === undefined}
                          className={cn(
                            "w-full justify-between rounded-lg",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? users.find((user) => user.id === field.value)
                                ?.name
                            : "Select user"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search user..." />
                        <CommandEmpty>No user found.</CommandEmpty>
                        <CommandGroup className="max-h-[200px] overflow-y-auto">
                          {users
                            .filter(
                              (user) =>
                                user.id !==
                                routes.find(
                                  (route) =>
                                    route.id === form.getValues("route_id"),
                                )?.vendor_id,
                            )
                            .map((user, idx: number) => (
                              <CommandItem
                                value={user.name || user.id}
                                key={idx}
                                onSelect={() => {
                                  form.setValue("user_id", user.id);
                                  user.phone &&
                                    form.setValue("whatsapp_no", user.phone);

                                  setUserOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    user.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {user.name}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="prepaid">Prepaid</SelectItem>
                      <SelectItem value="postpaid">Postpaid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsapp_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter WhatsApp number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IP Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter IP address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="communication_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor Communication Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Communication Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="not_contacted">
                        Not Contacted
                      </SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
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
                        <SelectValue placeholder="Update Status" {...field} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="added">Added</SelectItem>
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
                    disabled={
                      watchCommunicationStatus !==
                        "deal_settled_successfully" ||
                      watchVosStatus !== "added"
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Change Status" {...field} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Add Purchase"
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
