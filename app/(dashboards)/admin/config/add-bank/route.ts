import { supabaseRouteHandler } from "@/lib/supabaseRouteHandler";

export async function POST(request: Request) {
    const formData = await request.json();

    const supabase = await supabaseRouteHandler();

    const { data, error } = await supabase
        .from("config")
        .insert([{ details: formData, type: "bank" }])
        .select();

    if (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response("Client created successfully", { status: 200 });
}
export async function DELETE(request: Request) {
    const id = await request.json();

    const supabase = await supabaseRouteHandler();

    const { error } = await supabase
        .from("config")
        .delete()
        .eq("id", id);

    if (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response("Client created successfully", { status: 200 });
}
