import React from 'react'
import { CompanyForm } from './CompanyForm'
import { supabaseServer } from '@/lib/supabase-server';

export default async function Page ({ params }: { params: { id: string } }) {
    const supabase = await supabaseServer();

    let { data: vendor, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", params.id)
        .single();
    return <CompanyForm user={vendor} />;
};
