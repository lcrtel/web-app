"use server";

import EmailTemplate from "@/emails/EmailTemplate";
import GatewayAccountDetailsTemplate from "@/emails/GatewayAccountDetailsTemplate";
import RateNotificationTemplate from "@/emails/RateNotificationTemplate";
import { supabaseServer } from "@/lib/supabase-server";
import { transporter } from "@/utils/smtp-transporter";
import { renderAsync } from "@react-email/render";

export async function sendLowBalanceNotification(data: any) {
  const supabase = await supabaseServer();
  const emailHtml = await renderAsync(
    <EmailTemplate body={data.body} subject={data.subject} />,
  );

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: data.to,
      cc: data.cc,
      subject: data.subject,
      html: emailHtml,
    });
    await supabase.from("user_actions").insert({
      action_type: "sent_email",
      action_details: `Sent low balance notification to ${data.to}`,
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function sendPaymentReminder(data: any) {
  const supabase = await supabaseServer();
  const emailHtml = await renderAsync(
    <EmailTemplate body={data.body} subject={data.subject} />,
  );

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: data.to,
      cc: data.cc,
      subject: data.subject,
      html: emailHtml,
    });
    await supabase.from("user_actions").insert({
      action_type: "sent_email",
      action_details: `Sent payment reminder to ${data.to}`,
    });
    return true;
  } catch (error) {
    return false;
  }
}
export async function sendRateNotification(data: any) {
  const supabase = await supabaseServer();
  const emailHtml = await renderAsync(<RateNotificationTemplate data={data} />);

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: data.to,
      cc: data.cc,
      subject: data.subject,
      html: emailHtml,
    });
    await supabase.from("user_actions").insert({
      action_type: "sent_email",
      action_details: `Sent rate notification to ${data.to}`,
    });
    return true;
  } catch (error) {
    return false;
  }
}
export async function sendGatewayAccountDetails(data: any) {
  const supabase = await supabaseServer();
  const emailHtml = await renderAsync(
    <GatewayAccountDetailsTemplate data={data} />,
  );

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: data.to,
      cc: data.cc,
      subject: data.subject,
      html: emailHtml,
    });
    await supabase.from("user_actions").insert({
      action_type: "sent_email",
      action_details: `Sent gateway account details to ${data.to}`,
    });
    return true;
  } catch (error) {
    return false;
  }
}
