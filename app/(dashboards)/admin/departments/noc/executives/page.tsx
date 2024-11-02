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
        <PageHeaderHeading>NOC Executives</PageHeaderHeading>
        {(userRole === "director" || userRole === "noc_manager") && (
          <PageActions>
            <CreateDepartmentExecutive department="noc" />
          </PageActions>
        )}
      </PageHeader>
      {userRole === "director" || userRole === "noc_manager" ? (
        <ExecutivesList department="noc" />
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
}
