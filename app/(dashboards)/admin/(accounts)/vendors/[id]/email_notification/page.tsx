import React from "react";
import MailForm from "./MailForm";
import { supabaseServer } from "@/lib/supabase-server";


const Notification = async ({ params }: { params: { id: string } }) => {
    const supabase = supabaseServer();

    let { data: client, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", params.id)
        .single();

    return <MailForm clientDetails={client} />;
};

export default Notification;
