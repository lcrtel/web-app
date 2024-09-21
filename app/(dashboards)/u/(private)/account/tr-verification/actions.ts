"use server";
import { supabaseServer } from "@/lib/supabase-server";
import { JSDOM } from "jsdom";
import { z } from "zod";

export async function whoisCheckup(domain: string) {
  const response = await fetch(`https://www.whois.com/whois/${domain}`);
  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const registryData = document.querySelector(".whois-data");
  return registryData?.textContent;
}

const trSchema = z.object({
  name: z.string(),
  company_name: z.string(),
  website: z.string(),
  email: z.string().email(),
});
export async function submitTRVerificationForm(data: z.infer<typeof trSchema>) {
  const { name, company_name, website, email } = data;
  const supabase = supabaseServer();
  const { error } = await supabase.from("tr_verifications").insert({
    company_email: email,
    company_name,
    name,
    website,
  });

  if (error) {
    return { error: error.message };
  }
}

export async function getTRVerificationStatus() {
  const supabase = supabaseServer();
  const { data } = await supabase
    .from("tr_verifications")
    .select("status")
    .eq("status", "VERIFIED");
  if (data && data?.length > 2) {
    return { status: "VERIFIED" };
  }
}
