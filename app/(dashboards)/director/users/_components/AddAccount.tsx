"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { addAccount } from "../actions";

const accountSchema = z.object({
  name: z.string(),
  company_name: z.string().optional(),
  email: z.string().email(),
  phone: z.string(),
  password: z.string(),
  skype_id: z.string().optional(),
});

export const AddAccountForm = ({ role }: { role: UserTypesEnum }) => {
  const form = useForm<any>({
    resolver: zodResolver(accountSchema),
    mode: "onChange",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(user: any) {
    setLoading(true);
    const adding = toast.loading("Adding...");
    const res = await addAccount(user, role);
    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }
    setLoading(false);
    toast.dismiss(adding);
    toast.success(`Added ${role}: ${user.name}`);
    router.refresh();
    setIsOpen(false);
  }
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="default">Add {role}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-primary-900">Add {role}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-4xl space-y-3 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{role} Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
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
                    <Input placeholder="WhatsApp No number" {...field} />
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
                    <Input placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-2 flex gap-2">
                    <FormLabel>Password</FormLabel>
                    <div
                      className="cursor-pointer text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <HiEyeOff /> : <HiEye />}
                    </div>
                  </div>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                    />
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
