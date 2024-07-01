"use client";
import { updateUser } from "@/app/(dashboards)/user/_actions/userActions";
import {
  AlertDialog,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
interface ProfileModalProps {
  user: any;
}
export const profileFormSchema = z.object({
  name: z.string(),
  company_name: z.string(),
  phone: z.string().optional(),
  skype_id: z.string().optional(),
});
export default function CompleteProfileModal({ user }: ProfileModalProps) {
  const defaultValues = user;
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  useEffect(() => {
    if (user) {
      if (user.name && user.company_name) {
        setIsProfileComplete(true);
      }
    }
  }, [user]);
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });
  async function onSubmit(formData: z.infer<typeof profileFormSchema>) {
    const { error } = await updateUser(user.id, formData);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Your details updated");
    router.refresh();
    setIsDialogOpen(false);
  }
  return isProfileComplete ? null : (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-2"
        >
          <span>Complete your profile to continue using our platform </span>
          <ArrowRightCircle className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Complete your profile</AlertDialogTitle>
          <AlertDialogDescription>
            Please complete your profile to continue using our platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <AlertDialogFooter>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
