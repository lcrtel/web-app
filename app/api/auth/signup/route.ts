import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function POST(request: Request) {
    const requestUrl = new URL(request.url);
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

    const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
            data: {
                name: formData.name,
                company_name: formData.company_name,
                email: formData.email,
                phone: formData.phone,
                skype_id: formData.skype_id,
                role: "client",
                agent_id: "",
                finance_department: {},
                noc_department: {},
                sales_department: {},
            },
            emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
        },
    });

    if (error) {

        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    } 
    
    return new Response
}
