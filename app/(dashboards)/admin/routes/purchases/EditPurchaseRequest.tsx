"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

import CopyButton from "@/components/ui/copy-button";
import { Input } from "@/components/ui/input";
import { Edit3Icon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import { updatePurchase } from "./updatePurchase";

const routeFormSchema = z
  .object({
    buyingRate: z
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
  );

export function EditPurchaseRequest({ request }: { request: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const defaultValues = request;
  const form = useForm({
    resolver: zodResolver(routeFormSchema),
    defaultValues,
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

  async function onSubmit(formData: any) {
    setLoading(true);
    const res = await updatePurchase(formData, request.id);
    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }
    setIsOpen(false);
    toast.success("Updated");
    router.refresh();
    setLoading(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div
          onClick={(e) => setIsOpen(true)}
          className="ml-auto flex w-fit cursor-pointer items-center gap-1 rounded-full border px-2 py-1 text-xs"
        >
          Edit <Edit3Icon className="size-3" />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="mb-5 flex items-center justify-between">
            <SheetTitle className="text-primary-900">
              Request Details
            </SheetTitle>
          </div>
        </SheetHeader>
        <div className="h-full overflow-y-auto space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 rounded-lg border p-4"
            >
              <FormField
                control={form.control}
                name="buying_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Buying Rate{" "}
                      <span className="text-sm text-slate-500">(Optional)</span>
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
                          <SelectValue
                            placeholder="Communication Status"
                            {...field}
                          />
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
                  "Update"
                )}
              </Button>
            </form>
          </Form>{" "}
          <div className="space-y-2 rounded-lg bg-slate-50 border border-slate-200 p-4">
            <div className="">
              <p className="font-medium">Client</p>
              <Link
                href={`/admin/users/clients/${request.client_id}`}
                className="flex gap-2 text-slate-500"
              >
                {request?.profiles?.email}
                <HiOutlineExternalLink className="h-5 w-5" />
              </Link>
            </div>
            <div className="">
              <p className="font-medium">Route Offer</p>
              <Link
                href={`/admin/routes/offers/${request.route_id}`}
                className="flex gap-2 uppercase text-slate-500"
              >
                {request?.routes?.destination} - {request?.routes?.route_type}
                <HiOutlineExternalLink className="h-5 w-5" />
              </Link>
            </div>

            <div className="">
              <p className="font-medium">Payment Type</p>
              <p className="capitalize text-slate-500">
                {request?.payment_type}
              </p>
            </div>
            <div className="">
              <p className="font-medium">WhatsApp No</p>
              <div className="flex items-center justify-between gap-2 text-slate-500">
                <p className="flex items-center gap-2 text-slate-500">
                  {request?.whatsapp_no}{" "}
                  <CopyButton textToCopy={request?.whatsapp_no} />
                </p>
                <Link
                  href={`https://wa.me/${request?.whatsapp_no}`}
                  className={`flex items-center gap-2 rounded-full bg-[#128c7e] px-3 py-2 text-white duration-150 hover:bg-[#25d366]`}
                >
                  <FaWhatsapp className="h-5 w-5" /> Chat
                </Link>
              </div>
            </div>
            <div className="">
              <p className="font-medium">IP Address</p>
              <p className="flex items-center gap-2 text-slate-500">
                {request?.ip} <CopyButton textToCopy={request?.ip} />
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
