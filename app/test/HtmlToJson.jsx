'use client'
import React, { useEffect, useState } from "react";

const TableToJSON = ({ htmlString }) => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        // Create a hidden DOM element
        const tempElement = document.createElement("div");
        tempElement.style.display = "none";

        // Set innerHTML to the provided HTML string
        tempElement.innerHTML = htmlString;

        // Extract table data
        const extractedTableData = [];
        const tableRows = tempElement.querySelectorAll("table tbody tr");
        tableRows.forEach((row) => {
            const rowData = {};
            const tableCells = row.querySelectorAll("td");
            tableCells.forEach((cell, cellIndex) => {
                const headerText = tempElement
                    .querySelector(`table thead th:nth-child(${cellIndex + 1})`)
                    .textContent.trim();
                rowData[headerText] = cell.textContent.trim();
            });
            extractedTableData.push(rowData);
        });

        // Update state with the extracted data
        setTableData(extractedTableData);
    }, [htmlString]);

    // Convert the tableData to JSON
    const jsonData = JSON.stringify(tableData, null, 2);

    return (
        <div>
            
            <pre>{jsonData}</pre>
        </div>
    );
};

export default TableToJSON;
