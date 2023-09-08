export default function formatTimestamptz(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
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
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = `${day} ${monthName}, ${year} ${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    return formattedDate;
}
