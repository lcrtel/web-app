import { CreateDepartmentExecutive } from "@/components/departments/CreateDepartmentExecutive";
import ExecutivesList from "@/components/departments/ExecutivesList";
import NotAuthorized from "@/components/NotAuthorized";
import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { getUserRole } from "@/utils/user";

export default async function ExecutivesPage() {
  const userRole = (await getUserRole()) as UserRolesEnum;
  return (
    <div className="space-y-2">
      <PageHeader>
        <PageHeaderHeading>Finance Executives</PageHeaderHeading>
        {(userRole === "director" || userRole === "finance_manager") && (
          <PageActions>
            <CreateDepartmentExecutive department="finance" />
          </PageActions>
        )}
      </PageHeader>
      {userRole === "director" || userRole === "finance_manager" ? (
        <ExecutivesList department="finance" />
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
}
