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
        <PageHeaderHeading>Purchases Department</PageHeaderHeading>
        <PageActions>
          <CreateDepartmentExecutive department="purchases" />
        </PageActions>
      </PageHeader>
      <DepartmentInfo department="purchases" />
    </div>
  );
}
