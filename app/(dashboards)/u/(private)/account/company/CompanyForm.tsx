"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import { updateUser } from "@/components/auth/userActions";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const departmentSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  skype_id: z.string().optional(),
});

export function CompanyForm({ user }: { user: any }) {
  const userID = user.id;
  const router = useRouter();
  const FinanceDipartment = () => {
    const defaultValues = user.finance_department;
    const form = useForm<z.infer<typeof departmentSchema>>({
      resolver: zodResolver(departmentSchema),
      defaultValues,
      mode: "onChange",
    });
    async function onSubmit(data: z.infer<typeof departmentSchema>) {
      const res = await updateUser(userID, { finance_department: data });
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Finance department details saved");
      router.refresh();
    }
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name</FormLabel>
                  <FormControl>
                    <Input placeholder=" name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp No</FormLabel>
                  <FormControl>
                    <Input placeholder="phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skype_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skype ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Skype ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="ml-auto flex">
            Save
          </Button>
        </form>
      </Form>
    );
  };
  const NOCDipartment = () => {
    const defaultValues = user.noc_department;
    const form = useForm<z.infer<typeof departmentSchema>>({
      resolver: zodResolver(departmentSchema),
      defaultValues,
      mode: "onChange",
    });

    async function onSubmit(data: z.infer<typeof departmentSchema>) {
      const res = await updateUser(userID, { noc_department: data });
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("NOC department details saved");
      router.refresh();
    }
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp No</FormLabel>
                  <FormControl>
                    <Input placeholder="phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skype_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skype ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Skype ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="ml-auto flex">
            Save
          </Button>
        </form>
      </Form>
    );
  };
  const SalesDipartment = () => {
    const defaultValues = user.sales_department;
    const form = useForm<z.infer<typeof departmentSchema>>({
      resolver: zodResolver(departmentSchema),
      defaultValues,
      mode: "onChange",
    });
    async function onSubmit(data: z.infer<typeof departmentSchema>) {
      const res = await updateUser(userID, { sales_department: data });
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Sales department details saved");
      router.refresh();
    }
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp No</FormLabel>
                  <FormControl>
                    <Input placeholder="phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skype_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skype ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Skype ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="ml-auto flex">
            Save
          </Button>
        </form>
      </Form>
    );
  };

  return (
    <section>
      <div className="mb-5 rounded-lg border p-5">
        <h2 className="mb-2 text-lg font-semibold tracking-tight">
          Finance Department
        </h2>
        <FinanceDipartment />
      </div>
      <div className="mb-5 rounded-lg border p-5">
        <h2 className="mb-2 text-lg font-semibold tracking-tight">
          NOC Department
        </h2>
        <NOCDipartment />
      </div>
      <div className="mb-5 rounded-lg border p-5">
        <h2 className="mb-2 text-lg font-semibold tracking-tight">
          Sales Department
        </h2>
        <SalesDipartment />
      </div>
    </section>
  );
}
