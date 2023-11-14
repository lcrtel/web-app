import fetchUser from "@/app/post/fetchUser";
import { supabaseRouteHandler } from "@/lib/supabaseRouteHandler";


export async function POST(request: Request) {
    const formData = await request.json();
    const userData = await fetchUser();

    const supabase = await supabaseRouteHandler()

    const {
        data: { user },
        error,
    } = await supabase.auth.admin.createUser({
        email: formData.email,
        password: formData.password,
        email_confirm: true,
        user_metadata: {
            name: formData.name,
            company_name: formData.company_name,
            email: formData.email,
            phone: formData.phone,
            skype_id: formData.skype_id,
            role: "vendor",
            agent_id: userData?.id,
        },
    });

    if (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response("Vendor created successfully", { status: 200 });
}
