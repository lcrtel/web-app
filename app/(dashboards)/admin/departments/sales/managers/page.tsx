import NotAuthorized from "@/components/NotAuthorized";
import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { getUserRole } from "@/utils/user";
import { CreateDepartmentManager } from "../../_components/CreateDepartmentManager";
import ManagersList from "../../_components/ManagersList";

export default async function ExecutivesPage() {
  const userRole = (await getUserRole()) as UserRolesEnum;
  return (
    <div className="space-y-2">
      <PageHeader>
        <PageHeaderHeading>Sales Managers</PageHeaderHeading>
        {(userRole === "director") && (
          <PageActions>
            <CreateDepartmentManager department="sales" />
          </PageActions>
        )}
      </PageHeader>
      {userRole === "director" ? (
        <ManagersList department="sales" />
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
}
