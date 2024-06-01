import { redirect } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  redirect("/admin/users/vendors/" + params.id + "/account_settings");
}
