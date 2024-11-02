import { CreateDepartmentExecutive } from "@/components/departments/CreateDepartmentExecutive";

import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import DepartmentInfo from "../DepartmentInfo";

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
