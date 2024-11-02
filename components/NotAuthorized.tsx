import { LockKeyhole } from "lucide-react";

export default function NotAuthorized() {
  return (
    <div className="rounded-lg border bg-slate-50 p-10 md:p-20">
      <div className="flex items-center gap-2 pb-4">
        <div className="flex items-center justify-center rounded-full border bg-white p-3">
          <LockKeyhole />
        </div>
        <h1 className="text-3xl font-bold md:text-4xl">Not authorized!</h1>
      </div>
      <p className="text-slate-500">
        You are not authorized to access this section
      </p>
    </div>
  );
}
