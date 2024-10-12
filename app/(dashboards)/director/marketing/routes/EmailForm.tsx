"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, Send, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import sendRoutes from "./sendRoutes";
import toast from "react-hot-toast";

export default function EmailForm({
  routes,
  clients,
}: {
  routes: Route[];
  clients: Profile[];
}) {
  const [message, setMessage] = useState(`Hi, here are our route offers:`);
  const [emailIds, setEmailIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const collectedEmails: string[] = [];

    clients.forEach((client: any) => {
      // Add main email
      if (client?.email) collectedEmails.push(client.email);
      // Add sales department email if it exists and is non-empty
      // if (client?.noc_department?.email)
      //   collectedEmails.push(client.noc_department.email);
    });

    // Update state with the collected email addresses
    setEmailIds(collectedEmails);
  }, [clients]);
  const removeEmail = (emailToRemove: string) => {
    setEmailIds((prevEmailIds) =>
      prevEmailIds.filter((email) => email !== emailToRemove),
    );
  };

  async function sendEmail() {
    setLoading(true);
    await sendRoutes(routes, emailIds, message);
    setLoading(false);
    toast.success("Email sent successfully");
  }

  return (
    <div className="space-y-2 rounded-lg border p-4">
      <h3 className="text-lg font-semibold">
        <div className="-mb-2 mr-2 inline-block rounded-md border bg-slate-50 p-1">
          <Mail className="size-5" />
        </div>
        Email Form
      </h3>
      <div className="w-full space-y-2 overflow-auto rounded-lg border p-4 pt-3">
        <div className="">
          <h4 className="font-medium">Recipients</h4>
          <p className="text-sm text-gray-500">
            These are the mail addresses that will receive the email
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {emailIds.length ? (
            emailIds?.map((emailId, idx: number) => (
              <div key={idx} className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 rounded-full border bg-slate-50 px-3 py-1">
                  <p>{emailId}</p>{" "}
                  <XCircle
                    className="size-4 cursor-pointer text-slate-500"
                    onClick={() => removeEmail(emailId)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No recipients selected.</p>
          )}
        </div>
        <div className="">
          <h4 className="font-medium">Message</h4>
          <p className="text-sm text-gray-500">
            Enter the message you would like to send with the route offers
          </p>
        </div>
        <div className="bg-slate-50">
          <Textarea
            name="message"
            placeholder="Enter your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-none rounded-lg border p-2"
            rows={4}
          />
        </div>
        <Button
          className="ml-auto"
          disabled={loading || emailIds.length === 0 || routes.length === 0}
          onClick={sendEmail}
        >
          Send Email{" "}
          {loading ? (
            <Loader2 className="size-5 ml-2 animate-spin" />
          ) : (
            <Send className="ml-2 size-4" />
          )}{" "}
        </Button>
      </div>
    </div>
  );
}
