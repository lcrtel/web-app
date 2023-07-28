export default function formatDate(timestamp) {
    const dateObj = new Date(timestamp);

    // Get the day, month, and year from the date object
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    // Format the date string as dd/mm/yyyy
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}
