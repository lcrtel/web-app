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
import {
    sendGatewayAccountDetails,
    sendLowBalanceNotification,
    sendPaymentReminder,
    sendRateNotification,
} from "./actions";

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
        Number(clientDetails?.over_draft) -
        Number(clientDetails?.balance?.replace(/\-/g, ""));
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
                    {isBalanceBelowThreshold && (
                        <span className=" text-slate-400 text-xs bg-white px-2 py-1 rounded-full">
                            The balance is not low
                        </span>
                    )}
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
                <Button
                    type="button"
                    disabled={!isBalanceBelowThreshold}
                    onClick={sendEmail}
                    className="gap-2"
                >
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

const PaymentReminder = ({ clientDetails }: { clientDetails: any }) => {
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
    const [subject, setSubject] = useState("Payment Reminder: Action Required");
    const [loading, setLoading] = useState(false);
    const message = `Dear ${clientDetails.name} (${clientDetails.company_name}),

We hope this message finds you well. We would like to remind you about an upcoming payment that is due on [Due Date]. Your prompt attention to this matter is greatly appreciated.

Invoice Details:

Invoice Number: [Invoice Number]
Amount Due: [Amount Due]
Due Date: [Due Date]
Please ensure that the payment is made by the due date to avoid any late fees or service interruptions. 

If you have already made the payment, please disregard this message.

Thank you for your cooperation.
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
        await sendPaymentReminder(data);
        setLoading(false);
        toast.success("Email sent successfully");
    };

    return (
        <div>
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
                />
            </div>
            <div className="grid gap-2 sm:grid-cols-3 py-2 px-4 items-start">
                <Label className="py-2">Body</Label>
                <Textarea
                    rows={22}
                    className="col-span-2"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
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

const RateNotification = ({ clientDetails }: { clientDetails: any }) => {
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
    const [subject, setSubject] = useState("Rate Notification");
    const [loading, setLoading] = useState(false);
    const message1 = `Dear ${clientDetails.name} (${clientDetails.company_name}),

We wanted to inform you that new rates have been applied to the following destinations. We believe that with these updated rates, you will find it more favorable to send us additional traffic. Your business is highly valued, and we appreciate your continued partnership.

Here are the details of the rate changes:`;
    const message2 = `If you have any questions or need further clarification, please feel free to reach out. We look forward to continuing our successful collaboration.

Best regards,
LCRTel`;
    const [body1, setBody1] = useState(message1);
    const [body2, setBody2] = useState(message2);
    const [rateConfig, setRateConfig] = useState({
        prefix: "",
        description: "",
        old_rate: "",
        new_rate: "",
        applicable_from: "",
    });

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

    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            to: clientDetails.email,
            cc: cc,
            subject: subject,
            body: { body1, body2, rateConfig: rateConfig },
        };
        setLoading(true);
        await sendRateNotification(data);
        setLoading(false);
        toast.success("Email sent successfully");
    };

    return (
        <form onSubmit={sendEmail}>
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
                    required
                />
            </div>
            <div className="grid gap-2 sm:grid-cols-3 py-2 px-4 items-start">
                <Label className="py-2">Body</Label>
                <div className="col-span-2 grid gap-2">
                    <Textarea
                        rows={9}
                        className=""
                        value={body1}
                        onChange={(e) => setBody1(e.target.value)}
                        required
                    />
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <Label>Prefix</Label>
                            <Input
                                value={rateConfig.prefix}
                                onChange={(e) =>
                                    setRateConfig((prevRateConfig: any) => ({
                                        ...prevRateConfig,
                                        prefix: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <Label>Description</Label>
                            <Input
                                value={rateConfig.description}
                                onChange={(e) =>
                                    setRateConfig((prevRateConfig: any) => ({
                                        ...prevRateConfig,
                                        description: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <div>
                            <Label>Old Rate</Label>
                            <Input
                                value={rateConfig.old_rate}
                                onChange={(e) =>
                                    setRateConfig((prevRateConfig: any) => ({
                                        ...prevRateConfig,
                                        old_rate: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <div>
                            <Label>New Rate</Label>
                            <Input
                                value={rateConfig.new_rate}
                                onChange={(e) =>
                                    setRateConfig((prevRateConfig: any) => ({
                                        ...prevRateConfig,
                                        new_rate: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <div>
                            <Label>Applicable From</Label>
                            <Input
                                value={rateConfig.applicable_from}
                                onChange={(e) =>
                                    setRateConfig((prevRateConfig: any) => ({
                                        ...prevRateConfig,
                                        applicable_from: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                    </div>
                    <Textarea
                        rows={6}
                        className=""
                        value={body2}
                        onChange={(e) => setBody2(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="flex justify-end px-4">
                <Button type="submit" className="gap-2">
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
        </form>
    );
};
const GatewayAccount = ({ clientDetails }: { clientDetails: any }) => {
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
    const [subject, setSubject] = useState("Verify Your Gateway Account Details");
    const [loading, setLoading] = useState(false);
    const [body, setBody] =
        useState(`Dear ${clientDetails.name} (${clientDetails.company_name}),

We hope this message finds you well. To ensure the continued smooth operation of your services, we kindly request you to review your Gateway Account details.

Here are the key details we need you to verify:`);
    const [gatewayAccountDetails, setGatewayAccountDetails] = useState({
        company_name: "",
        address: "",
        mail_id: "",
        cdr_link: "",
        username: "",
        password: "",
        skype_id: "",
        sip: "",
    });

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

    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            to: clientDetails.email,
            cc: cc,
            subject: subject,
            body: { body, gateway_details: gatewayAccountDetails },
        };
        setLoading(true);
        await sendGatewayAccountDetails(data);
        setLoading(false);
        toast.success("Email sent successfully");
    };

    return (
        <form onSubmit={sendEmail}>
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
                    required
                />
            </div>
            <div className="grid gap-2 sm:grid-cols-3 py-2 px-4 items-start">
                <Label className="py-2">Body</Label>
                <div className="col-span-2 grid gap-2">
                    <Textarea
                        rows={7}
                        className=""
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                    <div className="grid gap-2">
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                value={gatewayAccountDetails.company_name}
                                onChange={(e) =>
                                    setGatewayAccountDetails(
                                        (prev: any) => ({
                                            ...prev,
                                            company_name: e.target.value,
                                        })
                                    )
                                }
                            />
                        </div>
                        <div>
                            <Label>Address</Label>
                            <Input
                                value={gatewayAccountDetails.address}
                                onChange={(e) =>
                                    setGatewayAccountDetails(
                                        (prev: any) => ({
                                            ...prev,
                                            address: e.target.value,
                                        })
                                    )
                                }
                            />
                        </div>
                        <div>
                            <Label>Mail ID</Label>
                            <Input
                                value={gatewayAccountDetails.mail_id}
                                onChange={(e) =>
                                    setGatewayAccountDetails(
                                        (prev: any) => ({
                                            ...prev,
                                            mail_id: e.target.value,
                                        })
                                    )
                                }
                            />
                        </div>
                        <div>
                            <Label>CDR Link</Label>
                            <Input
                                value={gatewayAccountDetails.cdr_link}
                                onChange={(e) =>
                                    setGatewayAccountDetails(
                                        (prev: any) => ({
                                            ...prev,
                                            cdr_link: e.target.value,
                                        })
                                    )
                                }
                            />
                        </div>
                        <div>
                            <Label>Username</Label>
                            <Input
                                value={gatewayAccountDetails.username}
                                onChange={(e) =>
                                    setGatewayAccountDetails(
                                        (prev: any) => ({
                                            ...prev,
                                            username: e.target.value,
                                        })
                                    )
                                }
                            />
                        </div>
                        <div>
                            <Label>Password</Label>
                            <Input
                                value={gatewayAccountDetails.password}
                                onChange={(e) =>
                                    setGatewayAccountDetails(
                                        (prev: any) => ({
                                            ...prev,
                                            password: e.target.value,
                                        })
                                    )
                                }
                            />
                        </div>
                        <div>
                            <Label>Skype ID</Label>
                            <Input
                                value={gatewayAccountDetails.skype_id}
                                onChange={(e) =>
                                    setGatewayAccountDetails(
                                        (prev: any) => ({
                                            ...prev,
                                            skype_id: e.target.value,
                                        })
                                    )
                                }
                            />
                        </div>
                        <div>
                            <Label>SIP</Label>
                            <Input
                                value={gatewayAccountDetails.sip}
                                onChange={(e) =>
                                    setGatewayAccountDetails(
                                        (prev: any) => ({
                                            ...prev,
                                            sip: e.target.value,
                                        })
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end px-4">
                <Button type="submit" className="gap-2">
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
        </form>
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
                <AccordionItem value="payment-reminder">
                    <AccordionTrigger className="px-4">
                        Payment Reminder
                    </AccordionTrigger>
                    <AccordionContent>
                        <PaymentReminder clientDetails={clientDetails} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="rate-notification">
                    <AccordionTrigger className="px-4">
                        Rate Notification
                    </AccordionTrigger>
                    <AccordionContent>
                        <RateNotification clientDetails={clientDetails} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="gateway-account">
                    <AccordionTrigger className="px-4">
                        Gateway account setup
                    </AccordionTrigger>
                    <AccordionContent>
                        <GatewayAccount clientDetails={clientDetails} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    );
};

export default MailForm;
