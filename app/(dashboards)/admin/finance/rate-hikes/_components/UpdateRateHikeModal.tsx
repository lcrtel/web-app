"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { updateRateHike } from "./actions";

const formSchema = z.object({
  decreasePercentage: z.number().min(0).max(100),
  increasePercentage: z.number().min(0).max(100),
});

type FormValues = z.infer<typeof formSchema>;

export default function UpdateRateHikeModal({
  rateHike,
}: {
  rateHike: any;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      decreasePercentage: rateHike.decrease_percentage,
      increasePercentage: rateHike.increase_percentage,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    const res = await updateRateHike(rateHike.id, rateHike.phone_codes.value, values);
    if (res?.error) {
      setIsSubmitting(false);
      toast.error(res.error);
      return;
    } else if (res?.success) {
      setIsSubmitting(false);
      form.reset();
      setOpen(false);
      router.refresh();
      toast.success(res.success);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <Edit className="size-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary-900">
            Update rate hike & deduction
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 rounded-lg border p-4"
          >
            <div className="space-y-2">
              <Label>Destination Code</Label>
              <Input
                type="number"
                readOnly
                disabled
                value={rateHike.destination_code}
              />
            </div>
            <FormField
              control={form.control}
              name="decreasePercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deduction%</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      max={100}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="increasePercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hike%</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      max={100}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
