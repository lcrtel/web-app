
import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { CreateDepartmentExecutive } from "../_components/CreateDepartmentExecutive";
import DepartmentInfo from "../_components/DepartmentInfo";

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
