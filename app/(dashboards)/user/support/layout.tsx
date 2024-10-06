import { Loader } from "lucide-react";
import { Suspense } from "react";

export default function SupportLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid grid-cols-3">
      <aside className="h-[80svh] rounded-xl border">
        <h2 className="border-b p-4 text-xl font-semibold">Support chats</h2>
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Loader className="size-5 animate-spin" />
            </div>
          }
        >
          <SupportChats />
        </Suspense>
      </aside>
      <section className="col-span-2">{children}</section>
    </main>
  );
}

async function SupportChats() {
  return <div>Support Chats</div>;
}
