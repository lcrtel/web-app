"use client";

import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Edit, Loader2, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaPaperPlane } from "react-icons/fa6";
import { HiPaperAirplane } from "react-icons/hi";
import sendLowBalanceNotification from "./actions";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LowBalanceEmail = ({ clientDetails }: { clientDetails: any }) => {
    const [cc, setCc] = useState<any>([]);
    useEffect(() => {
        const addEmailToCc = (email: any) => {
            setCc((prevCc: any) => {
                if (!prevCc.includes(email)) {
                    return [...prevCc, email];
                }
                return prevCc;
            });
        };

        if (clientDetails?.finance_department?.email) {
            addEmailToCc(clientDetails.finance_department.email);
        }
        if (clientDetails?.noc_department?.email) {
            addEmailToCc(clientDetails.noc_department.email);
        }
        if (clientDetails?.sales_department?.email) {
            addEmailToCc(clientDetails.sales_department.email);
        }
    }, [clientDetails]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [subject, setSubject] = useState("Low Balance Notification");
    const [loading, setLoading] = useState(false);
    const balance =
        Number(clientDetails.over_draft) -
        Number(clientDetails.balance.replace(/\-/g, ""));
    const message = `Dear ${clientDetails.name} (${clientDetails.company_name}),

We hope this message finds you well.

We would like to inform you that your current account balance is $${balance.toFixed(
        2
    )} USD, and there is a possibility it might get consumed within a day. To ensure uninterrupted services, we kindly request you to process a payment at your earliest convenience.

Thank you for your prompt attention to this matter.

Best regards,
LCRTel`;
    const [body, setBody] = useState(message);

    const addCc = (email: string) => {
        if (!cc.includes(email)) {
            setCc((prevData: any) => [...prevData, email]);
        } else {
            toast.error("Email already added");
        }
        setEditIndex(null);
    };

    const editCc = (index: number) => {
        setEditIndex(index);
    };

    const updateCc = (index: number, email: string) => {
        setCc((prevData: any) => {
            const newData = [...prevData];
            newData[index] = email;
            return newData;
        });
        setEditIndex(null);
    };

    const removeCc = (index: number) => {
        setCc((prevData: any) => {
            const newData = [...prevData];
            newData.splice(index, 1);
            return newData;
        });
    };

    const sendEmail = async () => {
        const data = {
            to: clientDetails.email,
            cc: cc,
            subject: subject,
            body: body,
        };
        setLoading(true);
        await sendLowBalanceNotification(data);
        setLoading(false);
        toast.success("Email sent successfully");
    };

    const isBalanceBelowThreshold = balance < 10;

    return (
        <div>
            <div className=" bg-surface items-center p-4 grid sm:grid-cols-3 gap-2">
                <h2 className=" font-semibold text-lg">Wallet</h2>
                <div className="  col-span-2 flex items-center gap-1 flex-wrap justify-between">
                    <p className="font-medium">
                        Balance: ${balance.toFixed(2)}
                    </p>
                    <span className=" text-slate-400 text-xs bg-white px-2 py-1 rounded-full">
                        The balance is not low
                    </span>
                </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-3 pt-4 pb-2 px-4 items-center">
                <Label>To</Label>
                <Input
                    type="email"
                    className=" col-span-2"
                    defaultValue={clientDetails?.email}
                    disabled
                />
            </div>
            <div className="grid gap-2 sm:grid-cols-3 py-2 px-4">
                <Label className="py-2">Cc</Label>
                <div className="flex flex-col gap-2 col-span-2">
                    {cc.map((email: string, index: number) => (
                        <div className="flex gap-2" key={index}>
                            <Input
                                type="email"
                                value={email}
                                readOnly={editIndex !== index}
                                onChange={(e) =>
                                    updateCc(index, e.target.value)
                                }
                                disabled={!isBalanceBelowThreshold}
                            />
                            <button type="button" onClick={() => editCc(index)}>
                                <Edit className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => removeCc(index)}
                            >
                                <Trash className="w-4 h-4 text-red-500" />
                            </button>
                        </div>
                    ))}
                    <Input
                        type="email"
                        placeholder="Enter a valid email address"
                        onBlur={(e) => {
                            if (emailRegex.test(e.target.value)) {
                                addCc(e.target.value);
                                e.target.value = "";
                            } else if (e.target.value !== "") {
                                toast.error(
                                    "Please enter a valid email address"
                                );
                            }
                        }}
                        disabled={!isBalanceBelowThreshold}
                    />
                </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-3 py-2 px-4 items-center">
                <Label>Subject</Label>
                <Input
                    type="text"
                    value={subject}
                    className="col-span-2"
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={!isBalanceBelowThreshold}
                />
            </div>
            <div className="grid gap-2 sm:grid-cols-3 py-2 px-4 items-start">
                <Label className="py-2">Body</Label>
                <Textarea
                    rows={14}
                    className="col-span-2"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    disabled={!isBalanceBelowThreshold}
                />
            </div>
            <div className="flex justify-end px-4">
                <Button type="button" onClick={sendEmail} className="gap-2">
                    {loading ? (
                        <>
                            Sending <Loader2 className="h-4 w-4 animate-spin" />
                        </>
                    ) : (
                        <>
                            Send{" "}
                            <HiPaperAirplane className="h-4 w-4 rotate-90" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

const MailForm = ({ clientDetails }: { clientDetails: any }) => {
    return (
        <>
            <Accordion
                type="single"
                collapsible
                className="w-full max-w-2xl  border rounded-lg"
                defaultValue="low-balance"
            >
                <AccordionItem value="low-balance">
                    <AccordionTrigger className="px-4">
                        Low Balance Notification
                    </AccordionTrigger>
                    <AccordionContent>
                        <LowBalanceEmail clientDetails={clientDetails} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    );
};

export default MailForm;
