import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const cookieStore = cookies();
    const formData = await request.json();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    cookieStore.set({ name, value, ...options });
                },
                remove(name: string, options: CookieOptions) {
                    cookieStore.set({ name, value: "", ...options });
                },
            },
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );

    const {
        data: { user },
        error,
    } = await supabase.auth.admin.createUser({
        email: formData.email,
        password: formData.password,
        email_confirm: true,
        user_metadata: {
            name: formData.name,
            company_name: "",
            email: formData.email,
            phone: formData.phone,
            skype_id: formData.skype_id,
            role: "agent",
        },
    });

    if (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response("Agent created successfully", { status: 200 });
}
