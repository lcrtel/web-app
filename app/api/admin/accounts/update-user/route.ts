import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function POST(request: Request) {
    const formData = await request.json();

    const supabase = await supabaseAdminServer();
    const { data: user, error } = await supabase.auth.admin.updateUserById(
        formData.user_id,
        {
            email: formData.email,
            password: formData.password,
            user_metadata: {
                name: formData.name,
                company_name: formData.company_name,
                email: formData.email,
                phone: formData.phone,
                skype_id: formData.skype_id,
                role: formData.role,
                agent_id: formData.agent_id,
            },
        }
    );

    const { data } = await supabase
        .from("profiles")
        .update({
            vos_vendor_id: formData.vos_vendor_id,
            vos_client_id: formData.vos_client_id,
        })
        .eq("id", formData.user_id)
        .select();

    if (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response("Vendor created successfully", { status: 200 });
}
