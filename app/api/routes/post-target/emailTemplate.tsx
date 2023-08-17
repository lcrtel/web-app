import {
    Body,
    Column,
    Font,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import * as React from "react";

export default function Email({ data }: { data: any }) {
    return (
        <Tailwind
            config={{
                theme: {
                    extend: {
                        colors: {
                            brand: "#007291",
                        },
                    },
                },
            }}
        >
            <Html>
                <Head>
                    <title>LCRTel</title>
                    <Font
                        fontFamily="Roboto"
                        fallbackFontFamily="Verdana"
                        webFont={{
                            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                            format: "woff2",
                        }}
                        fontStyle="normal"
                    />
                </Head>
                <Preview>Posted Route Offers </Preview>
                <Body>{JSON.stringify(data)}</Body>
            </Html>
        </Tailwind>
    );
}
