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
        <PageHeaderHeading>Sales Department</PageHeaderHeading>
        <PageActions>
          <CreateDepartmentExecutive department="sales" />
        </PageActions>
      </PageHeader>
      <DepartmentInfo department="sales" />
    </div>
  );
}
