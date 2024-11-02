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
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  updateFinanceDipartment,
  updateNOCDipartment,
  updateSalesDipartment,
} from "./actions";

const departmentSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  skype_id: z.string().optional(),
});

export function CompanyForm({ user }: { user: any }) {
  const userID = user.id;
  const router = useRouter();

  const FinanceDipartment = () => {
    const defaultValues = user.finance_department;
    const form = useForm<any>({
      resolver: zodResolver(departmentSchema),
      defaultValues,
      mode: "onChange",
    });
    async function onSubmit(data: any) {
      const res = await updateFinanceDipartment({
        user_id: userID,
        name: user.name,
        user_type: user.user_type,
        finance_department: data,
      });
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Finance department details saved");
      router.refresh();
    }
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid items-end gap-5 sm:grid-cols-2 lg:grid-cols-5"
        >
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
                  <Input type="email" placeholder="email address" {...field} />
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
          <Button type="submit">Save</Button>
        </form>
      </Form>
    );
  };
  const NOCDipartment = () => {
    const defaultValues = user.noc_department;
    const form = useForm<any>({
      resolver: zodResolver(departmentSchema),
      defaultValues,
      mode: "onChange",
    });

    async function onSubmit(data: any) {
      const res = await updateNOCDipartment({
        user_id: userID,
        name: user.name,
        user_type: user.user_type,
        noc_department: data,
      });
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("NOC department details saved");
      router.refresh();
    }
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid items-end gap-5 sm:grid-cols-2 lg:grid-cols-5"
        >
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
                  <Input type="email" placeholder="email address" {...field} />
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
          <Button type="submit">Save</Button>
        </form>
      </Form>
    );
  };
  const SalesDipartment = () => {
    const defaultValues = user.sales_department;
    const form = useForm<any>({
      resolver: zodResolver(departmentSchema),
      defaultValues,
      mode: "onChange",
    });
    async function onSubmit(data: any) {
      const res = await updateSalesDipartment({
        user_id: userID,
        name: user.name,
        user_type: user.user_type,
        sales_department: data,
      });
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Sales department details saved");
      router.refresh();
    }
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid items-end gap-5 sm:grid-cols-2 lg:grid-cols-5"
        >
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
                  <Input type="email" placeholder="email address" {...field} />
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
          <Button type="submit">Save</Button>
        </form>
      </Form>
    );
  };

  return (
    <section className="max-w-6xl">
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
