import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = () =>
    createClient<Database>(
        "https://nikmyidemcjpcpvglaus.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pa215aWRlbWNqcGNwdmdsYXVzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MDQ0MDE5NiwiZXhwIjoyMDA2MDE2MTk2fQ.zgCd3SBqdpZmGFD8ztrLAOaM20IMv_vTIeARa6zmg14",
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
            },
        }
    );
