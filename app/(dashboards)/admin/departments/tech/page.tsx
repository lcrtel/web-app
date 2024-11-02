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
        <PageHeaderHeading>Tech Department</PageHeaderHeading>
        <PageActions>
          <CreateDepartmentExecutive department="tech" />
        </PageActions>
      </PageHeader>
      <DepartmentInfo department="tech" />
    </div>
  );
}
