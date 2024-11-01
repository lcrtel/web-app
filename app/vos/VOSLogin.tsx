import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

type VOSConfig = {
    created_at: string | null;
    details: {
        ip: string | null;
        cookie: string | null;
        username: string | null;
        password: string | null;
    } | null;
    id: number;
    type: string | null;
} | null;

const VOSLogin = async () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const supabase = await supabaseAdminServer();

    let { data: config }: any = await supabase
        .from("config")
        .select("*")
        .eq("type", "vos")
        .single();

    const res = await fetch(`https://${config?.details?.ip}`, {
        headers: {
            Cookie: config?.details?.cookie,
        },
    });

    if (res.url === `https://${config?.details?.ip}/login`) {
        try {
            const response1 = await fetch(`https://${config?.details?.ip}`);
            const cookie1 = response1.headers.getSetCookie();
            let laravelSession1 = "";
            for (const cookieString of cookie1) {
                const matches = cookieString.match(/laravel_session=([^;]+)/);
                if (matches && matches.length > 1) {
                    laravelSession1 = matches[0];
                    break;
                }
            }

            let laravelSession = "";

            const login = await fetch(
                `https://${config?.details?.ip}/loginpost`,
                {
                    method: "POST",
                    headers: {
                        Cookie: laravelSession1.toString(),
                        Host: config?.details?.ip,
                        "Cache-Control": "max-age=0",
                        "Sec-Ch-Ua": '"Chromium";v="119", "Not?A_Brand";v="24"',
                        "Sec-Ch-Ua-Mobile": "?0",
                        "Sec-Ch-Ua-Platform": '"Windows"',
                        "Upgrade-Insecure-Requests": "1",
                        Origin: `https://${config?.details?.ip}`,
                        "Content-Type": "application/json",
                        "User-Agent":
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.159 Safari/537.36",
                        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                        "Sec-Fetch-Site": "same-origin",
                        "Sec-Fetch-Mode": "navigate",
                        "Sec-Fetch-User": "?1",
                        "Sec-Fetch-Dest": "document",
                        Referer: `https://${config?.details?.ip}/login`,
                    },
                    redirect: "manual",
                    body: JSON.stringify({
                        username: config?.details?.username,
                        password: config?.details?.password,
                    }),
                }
            );

            const loginCookie = login.headers.getSetCookie();

            for (const cookieString of loginCookie) {
                const matches = cookieString.match(/laravel_session=([^;]+)/);
                if (matches && matches.length > 1) {
                    laravelSession = matches[0];
                    break;
                }
            }

            const { data: updatedConfig } = await supabase
                .from("config")
                .update({
                    details: {
                        ip: config?.details?.ip,
                        username: config?.details?.username,
                        password: config?.details?.password,
                        cookie: laravelSession,
                    },
                })
                .eq("type", "vos")
                .select();

            return updatedConfig;
        } catch (error) {
            return { error: error };
        }
    } else return config;
};

export default VOSLogin;
