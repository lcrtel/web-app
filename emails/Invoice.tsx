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
    Text,
} from "@react-email/components";
export default function InvoiceTemplate({ data }: { data: any }) {
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
        <Body className="bg-surface">
          <Container className="mt-5 rounded-md bg-white shadow">
            <Hr className="bg-primary m-0 h-1.5 w-full rounded-t-md"></Hr>
            <Section className="mx-auto w-full max-w-[90%]">
              <Img
                className="mx-auto my-8 block"
                src="https://www.lcrtel.com/lcrtelcom_logo.png"
                width="180"
                alt="LCRTel"
              />
            </Section>
            <Section className="mx-auto w-full max-w-[90%]">
              <Heading
                as="h1"
                className="text-primary mt-6 text-2xl font-bold tracking-tight"
              >
                Route Usage Invoice
              </Heading>
              <Text className="font-medium text-gray-500">
                Hi
              </Text>
              <Text className="font-medium text-gray-500">
                We are pleased to provide you with the following invoice for
                your recent usages of our services.
              </Text>
            </Section>
            <Section className="mx-auto w-full max-w-[90%] bg-white">
              {/* <Text className="text-primary font-semibold my-0">
                                Billed to: {data.profiles.email}
                            </Text> */}
              <Text className="text-primary my-0 font-semibold">
                Date Issued: {formatDate(data.date_issued)}
              </Text>
              <Text className="text-primary mt-0 font-semibold">
                Date Due: {formatDate(data.date_due)}
              </Text>
            </Section>
            <Section className="mx-auto w-full max-w-[90%] rounded-lg bg-surface px-4">
              <Text className="text-primary mb-0 font-medium">
                Description:
              </Text>
              <Text className="mt-0 text-gray-500">{data.description}</Text>
              <Text className="text-primary mb-0 font-medium">
                Total Amount
              </Text>
              <Text className="mt-0 text-gray-500">
                ${data.total_amount} Only
              </Text>
            </Section>
            <Section className="mx-auto w-full max-w-[90%] bg-white">
              <Text className="text-primary mb-0 font-semibold">Pay to</Text>
              <Text className="my-0 text-gray-500">
                Bank Name: {data.bill_to.bankName}
              </Text>
              <Text className="my-0 text-gray-500">
                Name: {data.bill_to.accountHolderName}
              </Text>
              <Text className="my-0 text-gray-500">
                Number: {data.bill_to.accountNumber}
              </Text>
              <Text className="my-0 text-gray-500">
                IFSC Code: {data.bill_to.IFSCCode}
              </Text>
              <Text className="my-0 text-gray-500">
                Branch: {data.bill_to.branchName}
              </Text>
            </Section>
            <Section className="mx-auto w-full max-w-[90%] bg-white">
              <Text className="font-medium text-gray-500">
                This invoice is based on your recent usage of our route. Please
                review the details and make the payment by the due date to
                ensure uninterrupted service.
              </Text>
              <Text className="font-medium text-gray-500">
                If you have any questions or need further assistance, please
                don&apos;t hesitate to contact us.
              </Text>
            </Section>
          </Container>
          <Container>
            <Text className="my-8 text-center text-xs font-medium text-gray-500">
              &copy; 2023 (1445 AH) LCRTel, All Rights Reserved
            </Text>
          </Container>
        </Body>
      </Html>
    );
}
