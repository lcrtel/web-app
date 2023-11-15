import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "LCRTel",
        short_name: "LCRTel",
        description: "Match your LCR",
        start_url: "/",
        display: "standalone",
        background_color: "#fff",
        theme_color: "#276DB4",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}
