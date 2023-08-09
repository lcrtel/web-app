export default function formatTimestamptz(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = `${day} ${month}, ${year} ${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    return formattedDate;
}
