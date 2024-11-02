
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
        <PageHeaderHeading>Tech Department</PageHeaderHeading>
        <PageActions>
          <CreateDepartmentExecutive department="tech" />
        </PageActions>
      </PageHeader>
      <DepartmentInfo department="tech" />
    </div>
  );
}
