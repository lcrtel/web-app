import fetchUser from "@/app/post/fetchUser";
import { supabaseRouteHandler } from "@/lib/supabaseRouteHandler";

export async function POST(request: Request) {
    const formData = await request.json();
const agent = await fetchUser()
    const supabase = await supabaseRouteHandler();

    const { data, error } = await supabase
        .from("invoices")
        .insert([{...formData, agent: agent?.id}])
        .select();

    if (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response("Client created successfully", { status: 200 });
}
