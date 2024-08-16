import { getUser } from "@/utils/user";
import { CompanyForm } from "./CompanyForm";

export default async function Page() {
  const user = await getUser();
  return <CompanyForm user={user} />;
}
