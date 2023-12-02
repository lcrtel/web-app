import {
    Body,
    Container,
    Font,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
export default function InvoiceTemplate({
    data,
}: {
    data: any;
}) {

    function formatDate(timestamp: any) {
        const dateObj = new Date(timestamp);

        // Get the day, month, and year from the date object
        const day = dateObj.getDate();
        const month = dateObj.getMonth();
        const monthName = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ][month];
        const year = dateObj.getFullYear();

        // Format the date string as dd/mm/yyyy
        const formattedDate = `${day} ${monthName}, ${year}`;

        return formattedDate;
    }

    return (
        <Tailwind
            config={{
                theme: {
                    extend: {
                        colors: {
                            primary: "#276DB4",
                            surface: "#EEF5FB",
                        },
                    },
                },
            }}
        >
            <Html>
                <Head>
                    <title>LCRTel</title>
                    <Font
                        fontFamily="Inter"
                        fallbackFontFamily="Verdana"
                        fontStyle="normal"
                    />
                </Head>
                <Preview>Route Usage Invoice</Preview>
                <Body className="bg-surface ">
                    <Container className="bg-white rounded-md shadow mt-5">
                        <Section className=" mx-auto w-full max-w-[90%]">
                            <Hr className="h-1.5 w-full bg-primary rounded-t-md m-0"></Hr>
                            <Img
                                className="block mx-auto my-8"
                                src="https://lh3.googleusercontent.com/fife/AKsag4OcMTjzbyBhu1UDQgtjRueER2qtmRDsxFklcGNweRGOaITvrfe74cbZBVSwbgV4C1OK0XWUWHrfhlB9K8wj_IbTEgkci53IHzzPKg9TZtjr23h6llkrBNQWeOXChZyfnEFLDrkGqj1uuq0omRzNsDhw6GBqEM5XdS1hHnjdGNr-fkkYnNhOWHH26Av1D9V_VrASSUQ4sCbhEbr7_ch3MpcYk8qm8fs9dcPwfvGSCJugohL5fN6Fxp4OMbRRNQSJmqe9FUHibSFsuWhugWH8b4hCVJw_9wgc39tapw_EXgESUJm_2E8FhXDrQdZMQyXjTGCcvXvrpCspv_cgaF-dYNhP1xTSS-9zU4A-y37QXBJsVsiUyF15z8DC6XZIYqcRx0rYlFrzJ3HhLSS438KFvwR3Kex5p2WPaUkteouhfHeEnt0jz3nwZbVz5G2eCjhXae2Fo6HJrKxqgtGVVQB0nwBUrjrZMa7cct4aZWGE1jurYzBj-uuwCGPmxwUUj5B-kVW5SW1sq4FHkmIjJxgJsYE_OxHN0EXJH1OqDAwfrxNknVKtZZwfJNJhFxfrnH82uyYxH9fBTFj9GwtHuQOHqkN_OeIhl8hFq-Ju2r_e7SkaSN8IzvAgkz_9G-ZECaF91ZCCHXtRVAKwYX7kXyKhpaoPiHpPe8VtcYC5bOFVcsfAiDTdDXH0FgOQY-J6VM0qQ0bMDYk3jekv7Q8CPaboI7DOQs-wGIfVfWny9vWXWak_YG6p2MOysQ9nu-MRurHPkIILfXmP1sRLspeWoObMv9C05zUBwiyok7VG_EqfsuQz0Azi-EPFVlVQ68xW69R5SyY4kQe6SWmtKxiEcFgLwGo1mgI7tfiCgqkFSEAEtn_bulZqZRAkILRbpzbEf-wAIrwktE1itDEk0xPuOtsVxouMhlPIt69LTEmEaDDzzCeSy1lc7NCNJlAxGx5XSsJazlnu2ntj94rZpY_dDCuCP4wIqyM8vglvSDQvmyF4aya5K1y4assFPCXVrU3L17sTCBVfMh7bkr1fwmtrP5SBRAG1K3_agY4uAF_jyKu7j_basPctUPolUnhDL2JIhH6WJkMz6q5jYuvZfRogIWYLQ0AZpPPjiD2akej4FdqSmJMzxcmcmHrSQ-i3KlJnteKwo_Gp50-qgGi-D3xZIiTK7KdYBs2WPWVbHVmu2lRnIvFfsNkY0EhmzTi1y4rxNnMSnS1ll0I8-K0Nx2FDx2pZenFbN7scsBtviMSVdwNg0roB7YO62CQkVLT2P8rCnIH6BeUlApZuVAwd2l4eoOOslCylOsLRykpm18iAFKAqbVcbUqm4MMErCIfXLTBo4_Ic6i_J8gDWbTo3lBLHviOX1DFhMB0SJOKRjKXKfpFAf2GBnK-wUDecyWCTAzRxA9qwZO8RuWRiabq_Gk-uObob9mnV1sF4ugZFdJko5m4cLNrn7xaiXB5m182ip-it2uEglLf28rcKIkWb9T-WenFMWDsGNvQ-OptsQxqLve4ZesBYTiZqNOtQUsU7dx4Cw18le5yE9BSUBpBmEZ4uac9SEVXN9aJ4_vbPyO3bPf23g70=w3840-h1924"
                                width="180"
                                alt="LCRTel"
                            />
                        </Section>
                        <Section className="mx-auto w-full max-w-[90%]">
                            <Heading
                                as="h1"
                                className="text-primary mt-6 font-bold tracking-tight text-2xl"
                            >
                                Route Usage Invoice
                            </Heading>
                            <Text className="text-gray-500  font-medium ">
                                Dear{" "}
                                {data.profiles.name}
                            </Text>
                            <Text className="text-gray-500  font-medium ">
                                We are pleased to provide you with the following
                                invoice for your recent usages of our services.
                            </Text>
                        </Section>
                        <Section className="bg-white mx-auto w-full max-w-[90%]">
                            {/* <Text className="text-primary font-semibold my-0">
                                Billed to: {data.profiles.email}
                            </Text> */}
                            <Text className="text-primary font-semibold my-0">
                                Date Issued: {formatDate(data.date_issued)}
                            </Text>
                            <Text className="text-primary font-semibold mt-0">
                                Date Due: {formatDate(data.date_due)}
                            </Text>
                        </Section>
                        <Section className="bg-surface px-4 rounded-lg mx-auto w-full max-w-[90%]">
                            <Text className=" mb-0 text-primary font-medium">
                                Description:
                            </Text>
                            <Text className="mt-0 text-gray-500">
                                {data.description}
                            </Text>
                            <Text className=" mb-0 text-primary  font-medium">
                                Total Amount
                            </Text>
                            <Text className="mt-0 text-gray-500">
                                ${data.total_amount} Only
                            </Text>
                        </Section>
                        <Section className="bg-white mx-auto w-full max-w-[90%]">
                            <Text className="mb-0 text-primary font-semibold">
                                Pay to
                            </Text>
                            <Text className="my-0  text-gray-500">
                                Bank Name: {data.bill_to.bankName}
                            </Text>
                            <Text className="my-0  text-gray-500">
                                Name: {data.bill_to.accountHolderName}
                            </Text>
                            <Text className="my-0  text-gray-500">
                                Number: {data.bill_to.accountNumber}
                            </Text>
                            <Text className="my-0  text-gray-500">
                                IFSC Code: {data.bill_to.IFSCCode}
                            </Text>
                            <Text className="my-0  text-gray-500">
                                Branch: {data.bill_to.branchName}
                            </Text>
                        </Section>
                        <Section className="bg-white mx-auto w-full max-w-[90%]">
                            <Text className="text-gray-500 font-medium">
                                This invoice is based on your recent usage of
                                our route. Please review the details and make
                                the payment by the due date to ensure
                                uninterrupted service.
                            </Text>
                            <Text className="text-gray-500 font-medium">
                                If you have any questions or need further
                                assistance, please don't hesitate to contact us.
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
        </Tailwind>
    );
}
