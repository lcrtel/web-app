import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex flex-col my-2 border-[1.5px] border-r-0 rounded-tl-2xl rounded-bl-2xl px-5 py-4 space-y-2 bg-white flex-grow overflow-y-auto pb-4">
            {children}
        </div>
    );
}
