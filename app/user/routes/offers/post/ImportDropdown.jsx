"use client";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { HiOutlineCloudUpload } from "react-icons/hi";
import ExcelJS from "exceljs";

const ImportDropdown = ({ onDataImport }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [importedData, setImportedData] = useState(null);

    useEffect(() => {
        if (importedData !== null) {
            onDataImport(importedData);
        }
    }, [importedData, onDataImport]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileExtension = file.name.split(".").pop().toLowerCase();
            if (fileExtension === "csv") {
                // Handle CSV file
                const reader = new FileReader();
                reader.onload = (event) => {
                    const fileData = event.target.result;
                    const data = parseCSV(fileData); // Custom function to parse CSV data
                    setImportedData(data);
                };
                reader.readAsText(file);
            } else if (fileExtension === "xlsx") {
                // Handle XLSX file
                const workbook = new ExcelJS.Workbook();
                let headers = [];

                await workbook.xlsx.load(file);

                const worksheet = workbook.getWorksheet(1); // Assuming the data is in the first worksheet
                const jsonData = [];
                worksheet.eachRow((row, rowNumber) => {
                    if (rowNumber === 1) {
                        // Assuming the first row contains the headers
                        headers = row.values.map((header) => header.toString());
                        return;
                    }

                    const rowData = {};
                    row.eachCell((cell, colNumber) => {
                        const header = headers[colNumber];
                        const cellValue = cell.value;
                        rowData[header] = cellValue;
                    });

                    jsonData.push(rowData);
                });

                setImportedData(jsonData);
            }
            event.target.value = "";
            onDataImport(importedData); // Clear the file input value
            setIsOpen(false);
        }
    };

    // console.log(importedData);

    const parseCSV = (dataString, delimiter = ",") => {
        const headers = dataString
            .slice(0, dataString.indexOf("\r"))
            .split(delimiter);
        // console.log(headers);
        const rows = dataString
            .slice(dataString.indexOf("\n") + 1)
            .split("\r\n");
        // console.log(rows);
        const arr = rows.map(function (row) {
            const values = row.split(delimiter);
            // console.log(values);
            const el = headers.reduce(function (object, header, index) {
                object[header] = values[index];
                // console.log(object);
                return object;
            }, {});
            // console.log(el);
            return el;
        });
        // console.log(arr);
        setImportedData(arr);
        return arr;
    };
    // console.log(importedData);

    const handleCLick = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="relative inline-block text-left">
            <button
                onClick={handleCLick}
                className="flex relative shadow-sm items-center transition-all ease-in-out justify-center rounded-lg hover:bg-primary hover:bg-opacity-5 border px-3 py-2 text-sm font-medium text-primary"
            >
                <HiOutlineCloudUpload className="mr-1.5 h-4 w-4" />
                Import
            </button>
            <Transition
                show={isOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div className="border rounded-xl mt-1 shadow bg-white p-5 absolute right-0">
                    <label
                        htmlFor="file-upload"
                        className="flex flex-col cursor-pointer items-center justify-center"
                    >
                        <div className="bg-primary-500/20 flex items-center justify-center p-2 rounded-full">
                            <HiOutlineCloudUpload className="w-10 h-10 rounded-full p-2 text-primary bg-primary bg-opacity-10" />
                        </div>
                        <p className="whitespace-nowrap text-primary font-semibold mt-2">
                            Click to Upload
                        </p>
                        <span className="text-gray-500 text-xs">
                            CSV or XLS
                        </span>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept=".csv, .xlsx"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
            </Transition>
        </div>
    );
};

export default ImportDropdown;
