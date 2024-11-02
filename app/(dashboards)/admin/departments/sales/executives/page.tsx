import NotAuthorized from "@/components/NotAuthorized";
import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { getUserRole } from "@/utils/user";
import { CreateDepartmentExecutive } from "../../_components/CreateDepartmentExecutive";
import ExecutivesList from "../../_components/ExecutivesList";

export default async function ExecutivesPage() {
  const userRole = (await getUserRole()) as UserRolesEnum;
  return (
    <div className="space-y-2">
      <PageHeader>
        <PageHeaderHeading>Sales Executives</PageHeaderHeading>
        {(userRole === "director" || userRole === "sales_manager") && (
          <PageActions>
            <CreateDepartmentExecutive department="sales" />
          </PageActions>
        )}
      </PageHeader>
      {userRole === "director" || userRole === "sales_manager" ? (
        <ExecutivesList department="sales" />
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
}
