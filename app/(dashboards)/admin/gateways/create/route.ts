import { supabaseRouteHandler } from "@/lib/supabaseRouteHandler";

export async function POST(request: Request) {
    const formData = await request.json();

    const supabase = await supabaseRouteHandler();

    const { data, error } = await supabase.from("gateways").insert([formData]);

    if (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response("Client created successfully", { status: 200 });
}
