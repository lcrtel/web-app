import { ImageResponse } from "next/server";
import Image from "next/image";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "LCRTelcom";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function ImageGeneration() {

    const interBold = fetch(
        new URL("/font/Inter-Bold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const imageData: any = await fetch(
        new URL("/public/lcrtelcom_logo-01.png", import.meta.url)
    ).then((res) => res.arrayBuffer());

    
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    backgroundColor: "white",
                    backgroundImage:
                        "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
                    backgroundSize: "100px 100px",
                }}
            >
                <img width="256" src={imageData} />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontSize: 60,
                        fontStyle: "normal",
                        color: "#276DB4",
                        fontWeight: 600,
                        marginTop: 30,
                        letterSpacing: "-0.025em",
                    }}
                >
                    <b>Streamline Your</b>
                    <b>VoIP Trading Experience</b>
                </div>
            </div>
        ),
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
            fonts: [
                {
                    name: "Inter",
                    data: await interBold,
                    style: "normal",
                    weight: 400,
                },
            ],
        }
    );
}
