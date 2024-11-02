import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import DepartmentInfo from "../DepartmentInfo";
import { CreateDepartmentExecutive } from "../_components/CreateDepartmentExecutive";

export default function ManagersPage() {
  return (
    <div className="space-y-2">
      <PageHeader>
        <PageHeaderHeading>NOC Department</PageHeaderHeading>
        <PageActions>
          <CreateDepartmentExecutive department="noc" />
        </PageActions>
      </PageHeader>
      <DepartmentInfo department="noc" />
    </div>
  );
}
