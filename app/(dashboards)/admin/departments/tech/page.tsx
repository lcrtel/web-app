
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
        <PageHeaderHeading>Tech Department</PageHeaderHeading>
        <PageActions>
          <CreateDepartmentExecutive department="tech" />
        </PageActions>
      </PageHeader>
      <DepartmentInfo department="tech" />
    </div>
  );
}
