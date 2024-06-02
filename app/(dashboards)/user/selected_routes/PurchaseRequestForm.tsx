"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiTrash } from "react-icons/hi";
import * as z from "zod";
import {
    postPurchaseRequest,
    removeFromSelectedRoutes,
    sendPurchaseRequestNotificatiion,
} from "./actions";

const FormSchema = z.object({
  buying_rate: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)))
    .optional(),
  payment_type: z.string(),
  whatsapp_no: z.string().min(9, {
    message: "WhatsApp number is required to contact you",
  }),
  ip: z.string().min(6, {
    message: "IP Address is required to configure the route",
  }),
});

export function PurchaseRequestForm({
  selectedRoutes,
  purchaseRequest,
  user,
}: {
  selectedRoutes: any[];
  purchaseRequest: any;
  user: any;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      payment_type: "postpaid",
      whatsapp_no: purchaseRequest?.whatsapp_no,
      ip: purchaseRequest?.ip,
    },
  });
  const router = useRouter();

  const DeleteButton = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(false);
    const handleDelete = async (id: string) => {
      setLoading(true);
      const res = await removeFromSelectedRoutes(id, user?.id);
      if (res?.error) {
        toast.error(res?.error);
        return;
      }
      router.refresh();
    };
    return (
      <Button
        onClick={(e) => handleDelete(id)}
        variant="outline"
        size="sm"
        className="w-full"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin text-red-400" />
        ) : (
          <HiTrash className="h-5 w-5 text-red-400" />
        )}
      </Button>
    );
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    selectedRoutes.map(async (route: SelectedRoute) => {
      const res = await postPurchaseRequest(route, data);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
    });
    sendPurchaseRequestNotificatiion(selectedRoutes, data, user);
    toast.success("Purchase request posted");
    router.refresh();
  }

  return (
    <Form {...form}>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {selectedRoutes.map((route: any) => (
          <div
            key={route.id}
            className="flex w-full flex-col gap-4 rounded-lg border bg-slate-50 p-4"
          >
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Destination
                </p>
                <p className="text-base font-semibold capitalize leading-none">
                  {route.routes?.destination}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Route Type</p>
                <p className="text-base font-semibold uppercase leading-none">
                  {route.routes?.route_type}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Rate</p>
                <p className="text-base font-semibold uppercase leading-none">
                  ${route.routes?.selling_rate}
                </p>
              </div>
            </div>{" "}
            <div className="grid gap-1">
              <div className="flex w-full items-center justify-between rounded-md border border-slate-100 bg-white px-2 py-1">
                <p className="text-sm text-gray-500">Prefix</p>
                <p className="font-semibold">
                  {route.routes?.destination_code}
                </p>
              </div>
              <div className="flex w-full items-center justify-between rounded-md border border-slate-100 bg-white px-2 py-1">
                <p className="text-sm text-gray-500">ASR</p>
                <p className="font-semibold">{route.routes?.asr}</p>
              </div>
              <div className="flex w-full items-center justify-between rounded-md border border-slate-100 bg-white px-2 py-1">
                <p className="text-sm text-gray-500">ACD</p>
                <p className="font-semibold">{route.routes?.acd}</p>
              </div>
              <div className="flex w-full items-center justify-between rounded-md border border-slate-100 bg-white px-2 py-1">
                <p className="text-sm text-gray-500">PDD</p>
                <p className="font-semibold">{route.routes?.pdd}</p>
              </div>
              <div className="flex w-full items-center justify-between rounded-md border border-slate-100 bg-white px-2 py-1">
                <p className="text-sm text-gray-500">Ports</p>
                <p className="font-semibold">{route.routes?.ports}</p>
              </div>
              <div className="flex w-full items-center justify-between rounded-md border border-slate-100 bg-white px-2 py-1">
                <p className="text-sm text-gray-500">Capacity</p>
                <p className="font-semibold">{route.routes?.capacity}</p>
              </div>
              <DeleteButton id={route.id} />
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sticky bottom-0 left-0 right-0 border-t bg-white py-4 md:relative md:border-0 md:p-0"
      >
        <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-3">
          <FormField
            control={form.control}
            name="payment_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Type</FormLabel>
                <Select
                  required
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Payment type" />
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
          />{" "}
          <FormField
            control={form.control}
            name="whatsapp_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="items-center gap-1">
                  WhatsApp No
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your WhatsApp number"
                    className="bg-slate-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ip"
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel className="items-center gap-1">IP Address</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your IP Address"
                    className="bg-slate-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <Button type="submit" className="">
            Request Purchase
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
