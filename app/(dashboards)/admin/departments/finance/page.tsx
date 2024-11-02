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
        <PageHeaderHeading>Finance Department</PageHeaderHeading>
        <PageActions>
          <CreateDepartmentExecutive department="finance" />
        </PageActions>
      </PageHeader>
      <DepartmentInfo department="finance" />
    </div>
  );
}
