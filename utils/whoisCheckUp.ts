"use server";
import { JSDOM } from "jsdom";

export async function whoisCheckup(domain: string) {
  const response = await fetch(`https://www.whois.com/whois/${domain}`);
  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const registryData = document.querySelector(".whois-data");
  return registryData?.textContent;
}
