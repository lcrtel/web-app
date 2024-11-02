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
        <PageHeaderHeading>Tech Executives</PageHeaderHeading>
        {(userRole === "director" || userRole === "tech_manager") && (
          <PageActions>
            <CreateDepartmentExecutive department="tech" />
          </PageActions>
        )}
      </PageHeader>
      {userRole === "director" || userRole === "tech_manager" ? (
        <ExecutivesList department="tech" />
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
}
