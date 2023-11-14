import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function POST(request: Request) {
    const formData = await request.json();

    const supabase = await supabaseAdminServer();
        const { data, error } = await supabase.auth.admin.deleteUser(
            formData.user_id
        );


    if (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response("Vendor created successfully", { status: 200 });
}
