import { redirect } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  redirect("/director/users/clients/" + params.id + "/account_settings");
}
