import { supabaseServer } from "@/lib/supabase-server";
import DeleteUser from "./DeleteUser";
import { VendorForm } from "./VendorForm";
import { Suspense } from "react";

export const revalidate = 0;

const VendorDetails = async ({ id }: { id: string }) => {
    const supabase = await supabaseServer();

    let { data: vendor, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
    return <VendorForm user={vendor} />;
};

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <div className="">
            <Suspense>
                <VendorDetails id={params.id} />
            </Suspense>
            <div className="flex justify-between max-w-3xl items-center border border-red-500 rounded-lg p-4 text-red-500">
                <div>
                    <h3 className="font-semibold tracking-tight">
                        Delete this Vendor
                    </h3>
                    <p className="text-sm">
                        Once deleted, it will be gone forever. Please be
                        certain.
                    </p>
                </div>
                <div className="p-2 bg-red-500 text-white rounded-lg ">
                    <DeleteUser userID={params.id} />
                </div>
            </div>
        </div>
    );
}
