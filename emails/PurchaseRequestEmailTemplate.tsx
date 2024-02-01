import {
    Body,
    Container,
    Font,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text
} from "@react-email/components";
export default function PurchaseRequestEmailTemplate({
    selectedRoutes,
    user,
    request,
}: {
    selectedRoutes: any;
    user: any;
    request: {
        ip: string;
        payment_type: string;
        whatsapp_no: string;
        buying_rate?: string | undefined;
    };
}) {
    return (
        <Html>
            <Head>
                <title>LCRTel</title>
                <Font
                    fontFamily="Inter"
                    fallbackFontFamily="Verdana"
                    fontStyle="normal"
                />
            </Head>
            <Preview>
                Purchase Request Confirmation: Selected Routes Details
            </Preview>
            <Body className="bg-surface ">
                <Container className="bg-white rounded-md shadow mt-8">
                    <Hr className="h-1.5 w-full bg-primary rounded-t-md m-0"></Hr>
                    <Section className=" mx-auto w-full max-w-[90%]">
                        <Img
                            className="block mx-auto my-8"
                            src="https://lh3.googleusercontent.com/fife/AKsag4OcMTjzbyBhu1UDQgtjRueER2qtmRDsxFklcGNweRGOaITvrfe74cbZBVSwbgV4C1OK0XWUWHrfhlB9K8wj_IbTEgkci53IHzzPKg9TZtjr23h6llkrBNQWeOXChZyfnEFLDrkGqj1uuq0omRzNsDhw6GBqEM5XdS1hHnjdGNr-fkkYnNhOWHH26Av1D9V_VrASSUQ4sCbhEbr7_ch3MpcYk8qm8fs9dcPwfvGSCJugohL5fN6Fxp4OMbRRNQSJmqe9FUHibSFsuWhugWH8b4hCVJw_9wgc39tapw_EXgESUJm_2E8FhXDrQdZMQyXjTGCcvXvrpCspv_cgaF-dYNhP1xTSS-9zU4A-y37QXBJsVsiUyF15z8DC6XZIYqcRx0rYlFrzJ3HhLSS438KFvwR3Kex5p2WPaUkteouhfHeEnt0jz3nwZbVz5G2eCjhXae2Fo6HJrKxqgtGVVQB0nwBUrjrZMa7cct4aZWGE1jurYzBj-uuwCGPmxwUUj5B-kVW5SW1sq4FHkmIjJxgJsYE_OxHN0EXJH1OqDAwfrxNknVKtZZwfJNJhFxfrnH82uyYxH9fBTFj9GwtHuQOHqkN_OeIhl8hFq-Ju2r_e7SkaSN8IzvAgkz_9G-ZECaF91ZCCHXtRVAKwYX7kXyKhpaoPiHpPe8VtcYC5bOFVcsfAiDTdDXH0FgOQY-J6VM0qQ0bMDYk3jekv7Q8CPaboI7DOQs-wGIfVfWny9vWXWak_YG6p2MOysQ9nu-MRurHPkIILfXmP1sRLspeWoObMv9C05zUBwiyok7VG_EqfsuQz0Azi-EPFVlVQ68xW69R5SyY4kQe6SWmtKxiEcFgLwGo1mgI7tfiCgqkFSEAEtn_bulZqZRAkILRbpzbEf-wAIrwktE1itDEk0xPuOtsVxouMhlPIt69LTEmEaDDzzCeSy1lc7NCNJlAxGx5XSsJazlnu2ntj94rZpY_dDCuCP4wIqyM8vglvSDQvmyF4aya5K1y4assFPCXVrU3L17sTCBVfMh7bkr1fwmtrP5SBRAG1K3_agY4uAF_jyKu7j_basPctUPolUnhDL2JIhH6WJkMz6q5jYuvZfRogIWYLQ0AZpPPjiD2akej4FdqSmJMzxcmcmHrSQ-i3KlJnteKwo_Gp50-qgGi-D3xZIiTK7KdYBs2WPWVbHVmu2lRnIvFfsNkY0EhmzTi1y4rxNnMSnS1ll0I8-K0Nx2FDx2pZenFbN7scsBtviMSVdwNg0roB7YO62CQkVLT2P8rCnIH6BeUlApZuVAwd2l4eoOOslCylOsLRykpm18iAFKAqbVcbUqm4MMErCIfXLTBo4_Ic6i_J8gDWbTo3lBLHviOX1DFhMB0SJOKRjKXKfpFAf2GBnK-wUDecyWCTAzRxA9qwZO8RuWRiabq_Gk-uObob9mnV1sF4ugZFdJko5m4cLNrn7xaiXB5m182ip-it2uEglLf28rcKIkWb9T-WenFMWDsGNvQ-OptsQxqLve4ZesBYTiZqNOtQUsU7dx4Cw18le5yE9BSUBpBmEZ4uac9SEVXN9aJ4_vbPyO3bPf23g70=w3840-h1924"
                            width="180"
                            alt="LCRTel"
                        />
                    </Section>
                    <Section className="mx-auto w-full max-w-[90%]">
                        <Text className="text-primary mt-6 font-bold tracking-tight text-xl">
                            Purchase Request Confirmation: Selected Routes
                            Details
                        </Text>
                        <Text className="text-gray-500  font-medium ">
                            Dear {user?.name},
                        </Text>
                        <Text className="text-gray-500  font-medium ">
                            Thank you for choosing LCRTel for your route
                            purchasing needs. We're delighted to confirm that
                            your purchase request has been successfully
                            received. Please find the details of your selected
                            routes attached below:
                        </Text>
                    </Section>
                    <Section className="bg-white mx-auto w-full max-w-[90%]">
                        <Text className="text-gray-500 font-semibold mb-2 ">
                            Selected Routes Details:
                        </Text>

                        <table className="w-full  text-primary ">
                            <thead>
                                <tr className=" ">
                                    <th className="py-2 px-3 rounded-md bg-surface text-left">
                                        Destination
                                    </th>
                                    <th className="py-2 px-3 rounded-md bg-surface  text-left">
                                        Type
                                    </th>
                                    <th className="py-2 px-3 rounded-md bg-surface text-left">
                                        Rate
                                    </th>
                                    <th className="py-2 px-3 rounded-md bg-surface text-left">
                                        Capacity
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=" ">
                                {selectedRoutes?.map((route: any) => (
                                    <tr
                                        key={route.routes.id}
                                        className="font-medium text-slate-500"
                                    >
                                        <td className="py-2  rounded-md px-3 bg-slate-100">
                                            {route.routes.destination}
                                        </td>{" "}
                                        <td className="py-2  rounded-md px-3 bg-slate-100">
                                            {route.routes.route_type}
                                        </td>
                                        <td className="py-2  rounded-md px-3 bg-slate-100">
                                            ${route.routes.rate}
                                        </td>
                                        <td className="py-2  rounded-md px-3 bg-slate-100">
                                            {route.routes.capacity}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Text className="text-gray-500 font-medium m-0">
                            <b>Prefered payment method:</b>{" "}
                            {request.payment_type}
                        </Text>
                        <Text className="text-gray-500 font-medium m-0">
                            <b>WhatsApp No:</b> {request.whatsapp_no}
                        </Text>
                        <Text className="text-gray-500 font-medium m-0">
                            <b>IP Address:</b> {request.ip}
                        </Text>
                    </Section>
                    <Section className="mx-auto w-full max-w-[90%]">
                        <Text className="text-gray-500  font-medium ">
                            Please review the attached details to ensure
                            accuracy. If you have any questions or if there are
                            changes you'd like to make, please reach out to our
                            support team at lcrtel@gmail.com.
                        </Text>
                        <Text className="text-gray-500  font-medium ">
                            We appreciate your trust in LCRTel. Our team is
                            committed to providing you with excellent service
                            throughout this process.
                        </Text>
                        <Text className="text-gray-500  font-medium ">
                            Thank you for being a valued client.
                        </Text>
                        <Text className="text-gray-500 mb-5  font-medium ">
                            Best regards, The LCRTel Team
                        </Text>
                    </Section>
                </Container>
                <Container>
                    <Text className=" font-medium text-xs my-8 text-gray-500 text-center">
                        &copy; 2023 (1445 AH) LCRTel, All Rights Reserved
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}
