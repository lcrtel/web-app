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
            },
        }
    );

    if (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response("Vendor created successfully", { status: 200 });
}
