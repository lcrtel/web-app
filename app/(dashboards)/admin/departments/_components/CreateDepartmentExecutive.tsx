"use client";

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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiEye, HiEyeOff } from "react-icons/hi";
import * as z from "zod";
import { createDepartmentExecutive, Department, getManagers } from "./actions";

const accountSchema = z.object({
  manager_id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  skype_id: z.string().optional(),
});

type FormValues = z.infer<typeof accountSchema>;

interface Props {
  department: Department;
}

export function CreateDepartmentExecutive({ department }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      manager_id: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      skype_id: "",
    },
    mode: "onChange",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [managers, setManagers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchManagers() {
      const { data, error } = await getManagers(department);
      if (error) {
        toast.error(error);
        return;
      }
      if (data) {
        setManagers(data);
      }
    }
    fetchManagers();
  }, [department]);

  async function onSubmit(values: FormValues) {
    setLoading(true);
    console.log(values);
    const adding = toast.loading("Adding...");
    const res = await createDepartmentExecutive(values, department);
    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
      toast.dismiss(adding);
      return;
    }
    setLoading(false);
    toast.dismiss(adding);
    toast.success(`Added ${department} executive: ${values.name}`);
    router.refresh();
    setIsOpen(false);
    form.reset();
  }
  console.log(form.watch("manager_id"));
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="gap-2" size="sm">
            Add Executive <PlusCircle className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-primary-900">Add Executive</SheetTitle>
            <SheetDescription>
              Add a new executive to the {department} department.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="manager_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manager</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a manager" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {managers.length ? (
                          managers.map((manager) => (
                            <SelectItem
                              key={manager.id}
                              value={manager.id.toString()}
                            >
                              {manager.profiles.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className=" py-2 px-3 text-sm text-slate-500">No managers found</div>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
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
    </>
  );
}
