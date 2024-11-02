"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiTrash } from "react-icons/hi";
import { deleteAccount, updateAccountDetails, updateCredentials } from "./actions";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  company_name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  phone: z.string(),
  skype_id: z.string().optional(),
});

export function AccountSettingsForm({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<any>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name,
      company_name: user?.company_name,
      phone: user?.phone,
      skype_id: user.skype_id || "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: any) {
    setLoading(true);
    const toastId = toast.loading("Updating...");
    const res = await updateAccountDetails({ id: user?.id , user_type: user.user_type, ...data });
    if (res?.error) {
      setLoading(false);
      toast.error(res.error);
      toast.dismiss(toastId);
      return;
    }
    toast.dismiss(toastId);
    toast.success("Account details updated");
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="space-y-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex max-w-4xl flex-col rounded-lg border"
        >
          <div className="grid gap-2 p-3 md:grid-cols-2">
            <h3 className="text-lg font-semibold tracking-tight">
              Personal Details
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="">
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
                  <FormItem className="">
                    <FormLabel>Skype ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Skype ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>{" "}
          </div>
          <div className="w-full self-end px-3 pb-3 md:w-fit">
            <Button type="submit" className="">
              {loading ? (
                <>
                  Updating
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <LoginCredentials user={user} />
      <Delete user={user} />
    </div>
  );
}

function LoginCredentials({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: user?.email,
  };
  const userID = user.id;
  const form = useForm<any>({
    resolver: zodResolver(
      z.object({
        email: z.string(),
        password: z.string().optional(),
      }),
    ),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: any) {
    setLoading(true);
    const updating = toast.loading("Updating...");
    const res = await updateCredentials({
      id: user.id,
      name: user.name,
      user_type: user.user_type,
      ...data,
    });
    if (res?.error) {
      setLoading(false);
      toast.error(res?.error);
      return;
    }
    toast.dismiss(updating);
    toast.success("Login credentials updated");
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-4 flex max-w-4xl flex-col gap-2 rounded-lg border p-3"
      >
        <h3 className="text-lg font-semibold tracking-tight">
          Login Credentials
        </h3>
        <div className="flex flex-wrap items-end gap-4">
          <div className="grid flex-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="" disabled={loading}>
            {" "}
            {loading ? (
              <>
                Updating
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

function Delete({ user }: { user: any }) {
  const router = useRouter();
  const handleDelete = async () => {
    const deleting = toast.loading("Deleting...");
    const res = await deleteAccount(user);
    if (res?.error) {
      toast.error(res?.error);
    } else {
      toast.dismiss(deleting);
      toast.success("Deleted account");
      router.refresh();
    }
  };
  return (
    <div className="flex max-w-4xl items-center justify-between rounded-lg border border-red-500 p-4 text-red-500">
      <div>
        <h3 className="font-semibold tracking-tight">Delete account</h3>
        <p className="text-sm">
          Once deleted, it will be gone forever. Please be certain.
        </p>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="cursor-pointer rounded-lg bg-red-500 p-2 text-white">
            <HiTrash className="h-5 w-5" />{" "}
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="border-red-500">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <p className="text-red-500">Are you absolutely sure?</p>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p className="text-red-500">
                This action cannot be undone. This will permanently delete this
                user&apos;s account and remove their routes from our database.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-red-200 bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete()}
              className="hover:white border-red-200 bg-red-500 text-white hover:bg-red-600"
            >
              I&apos;m sure
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
