"use server";
import TableToJSON from "@/app/test/HtmlToJson";
import { buttonVariants } from "@/components/ui/button";
import { unstable_noStore } from "next/cache";
import Link from "next/link";

export default async function Loading({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    unstable_noStore();
    let tablContent = null;
    // if (searchParams.type) {
    //     process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    //     const data = await fetch(
    //         `https://23.106.253.237/${searchParams.type}`,
    //         {
    //             headers: {
    //                 Cookie: "XSRF-TOKEN=eyJpdiI6IlwvOE1waU5GUWxkR1BMeHFYU0U2MnFnPT0iLCJ2YWx1ZSI6IkVcLzBLZHJQWStQZnU5MmE5TmdiY0pWM1ZWQlh2TzRwUVF1WWt6RndkNjgwOEdZQUU4ZXRcL0NXWmFZM2Ftc0hxWmtDeCs1NzVHU1lrZzFYNmxpazBUaVE9PSIsIm1hYyI6IjgxZmYyNGZlYzgwOTdjMzc3NDgzMGUzOTg3NmU2YTM1YTQzNDhiZDcxOTkxOTlkODUyMmU1YWE0OGZmYTcyNmQifQ%3D%3D; laravel_session=eyJpdiI6IjRYajFQaTdKaHZsKzdnWnRWNHhJTVE9PSIsInZhbHVlIjoiblA0ZDByUWk0NnBoNTdNQ1dFRnp4YThUMWNDeHRLNUxHY1lzbkdSelZnbnRzMzllUzljVUo3S2NpejhkQ2g4UXJ0dEo1encwNlZBWTN5RE5VZ0FvTGc9PSIsIm1hYyI6IjhjYTQ1MmM5MTZmN2UwYTUzMDE3NzE5MjNjZTM1M2ZkNGUyNjU1ZGUxMmNiNWViMTMwYWU1ZTdjYjA0NTc4MjQifQ%3D%3D",
    //                 Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    //                 Connection: "keep-alive",
    //             },
    //         }
    //     );

    //     const htmlString = await data.text();
    //     const tableStartIndex = htmlString?.indexOf("<table");

    //     const tableEndIndex = htmlString?.indexOf("</table>", tableStartIndex);
    //     const tableElement = htmlString?.substring(
    //         tableStartIndex,
    //         tableEndIndex + "</table>".length
    //     );
    //     const markup = { __html: tableElement };
    //     tablContent = markup;
    // }

    const links = [
        ["Mapping Management", "mapping_management"],
        ["CDR Report", "reports"],
        ["Live Calls", "calls"],
        ["Today Stats", "today_stats"],
        ["Mapping Analysis", "mapping_analysis"],
        ["Connect Routing Analysis", "routing_analysis"],
        ["Vendor Management", "routing_management"],
        ["Customers Management", "customers"],
        ["Rates Group Management", "rate_management"],
        ["Route Gateway Management", "routing_management/view_routing_gateway"],
    ].map(([title, url]) => (
        <Link
            key={url}
            href={`/admin/vos?type=${url}`}
            className={` ${buttonVariants({
                variant: searchParams.type === url ? "default" : "secondary",
            })}  duration-200 ease-in`}
        >
            {title}
        </Link>
    ));

    const data = await fetch(
        `http://localhost:3000/api/test?type=${searchParams?.type}`
    );
    const res = await data.json();
    const htmlString = await res.data;
    const tableStartIndex = htmlString?.indexOf("<table");

    const tableEndIndex = htmlString?.indexOf("</table>", tableStartIndex);
    const tableElement = htmlString?.substring(
        tableStartIndex,
        tableEndIndex + "</table>".length
    );
    const markup = { __html: tableElement };
    tablContent = markup;
    // console.log(res);

    return (
        <div className="w-full">
            <div className="flex gap-2">{links}</div>
            {/* {tablContent && (
                <div
                    id="dataTable"
                    dangerouslySetInnerHTML={tablContent}
                    className="mt-5 w-full border rounded-lg"
                />
            )} */}

            <TableToJSON htmlString={tableElement} />

            {/* <pre>{JSON.stringify(htmlString, null, 2)}</pre> */}
        </div>
    );
}
