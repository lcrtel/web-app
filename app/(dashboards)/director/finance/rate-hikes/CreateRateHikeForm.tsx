"use client";

import { Destination } from "@/app/(public)/MarketSearch";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { createRateHike } from "./createRateHike";
import { calculateNewRate } from "@/utils/rateHikes";

const formSchema = z.object({
  decreasePercentage: z.number().min(0).max(100),
  increasePercentage: z.number().min(0).max(100),
  destinationCode: z.number().positive(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateRateHikeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prefix, setPrefix] = useState<string>("");
  const [destination, setDestination] = useState<Destination>();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      decreasePercentage: undefined,
      increasePercentage: undefined,
      destinationCode: undefined,
    },
  });

  // async function testHike() {
  //   const res = await calculateNewRate(1, 91, false);
  //   toast.success(res);
  // }
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    const res = await createRateHike(values);
    if (res?.error) {
      setIsSubmitting(false);
      toast.error(res.error);
      return;
    } else if (res?.success) {
      setIsSubmitting(false);
      form.reset();
      router.refresh();
      form.setValue("destinationCode", 0);
      toast.success(res.success);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 rounded-lg border p-4"
        >
          <h3 className="text-lg font-semibold">Add rate hike & deduction</h3>
          <FormField
            control={form.control}
            name="destinationCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination Code</FormLabel>
                <Destination
                  prefix={form.getValues("destinationCode")?.toString()}
                  setPrefix={(e) => {
                    form.setValue("destinationCode", Number(e));
                  }}
                  setDestination={setDestination}
                  destination={destination}
                  displayDestinationName={false}
                />
                <FormMessage />
              </FormItem>
            )}
          />
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
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Adding..." : "Add"}
          </Button>
        </form>
      </Form>
      {/* <Button onClick={testHike}>Test</Button> */}
    </>
  );
}
