"use client";
import { useEffect, useState } from "react";
import { HiOutlineCloudUpload } from "react-icons/hi";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { AnimatePresence, motion } from "framer-motion";

const ImportDropdown = ({ onDataImport }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [importedData, setImportedData] = useState(null);

    useEffect(() => {
        if (importedData !== null) {
            onDataImport(importedData);
        }
    }, [importedData, onDataImport]);

    const generateExcelSheet = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sheet1");
        worksheet.addRow([
            "prefix",
            "destination",
            "destination_code",
            "route_type",
            "rate",
            "asr",
            "acd",
            "ports",
            "pdd",
            "capacity",
        ]);
        const blob = await workbook.xlsx.writeBuffer();
        return new Blob([blob], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
    };

    const EmptyFile = () => {
        const handleDownload = async () => {
            const excelBlob = await generateExcelSheet();
            saveAs(excelBlob, "empty_file.xlsx");
        };
        return (
            <span
                className="text-primary-500 underline whitespace-nowrap cursor-pointer"
                onClick={handleDownload}
            >
                download empty file
            </span>
        );
    };

    const handleFileChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const workbook = new ExcelJS.Workbook();
        let headers = [];
        await workbook.xlsx.load(file);
        const worksheet = workbook.getWorksheet(1);
        const jsonData = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) {
                headers = row.values.map((header) => header.toString());
                return;
            }
            const rowData = {};
            row.eachCell((cell, colNumber) => {
                const header = headers[colNumber];
                const cellValue = cell.value;
                rowData[header] = cellValue;
            });
            e.target.value = null;
            jsonData.push(rowData);
            setImportedData(jsonData);
        });
        setIsOpen(false);
    };

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
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="z-10 max-w-md w-60 absolute border-2  border-surface  right-0 top-10 rounded-lg  shadow-xl bg-white"
                            initial={{ opacity: 0, y: "-10%" }}
                            animate={{ opacity: 1, y: "0%" }}
                            exit={{ opacity: 0, y: "-10%" }}
                        >
                            <div className="flex flex-col  items-center justify-center p-4">
                                <label
                                    htmlFor="file-upload"
                                    className=" cursor-pointer text-primary font-semibold mt-2 flex flex-col items-center"
                                >
                                    <div className="p-2 mb-1 rounded-lg border-2 border-surface">
                                        <HiOutlineCloudUpload className="w-5 h-5" />
                                    </div>
                                    Click to Upload{" "}
                                </label>
                                <span className="text-gray-500 text-xs">
                                    .xlsx only
                                </span>
                                <p className="text-slate-400 mt-2 text-xs text-center">
                                    To import from a filled spreadsheet, you
                                    have to <EmptyFile /> and edit it, then
                                    upload.
                                </p>
                            </div>
                            <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                accept=".xlsx"
                                onChange={handleFileChange}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ImportDropdown;
