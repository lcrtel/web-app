"use client";

import { RowData } from "@tanstack/react-table";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { insertRoutesInDb } from "@/app/(dashboards)/user/_actions/routeActions";
import { PostRoutesTable } from "@/components/PostRoutesTable";
import { toast } from "react-hot-toast";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export function PostOffersTable() {
  const [posting, setPosting] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<any>([
    {
      id: uuidv4(),
      destination: "",
      rate: "",
      route_type: "cli",
      asr: "",
      acd: "",
      ports: "",
      pdd: "",
      capacity: "",
    },
  ]);

  const postRoutes = async () => {
    localStorage.setItem("pendingRouteOffersData", JSON.stringify(data));
    setPosting(true);
    const { data: route, error } = await insertRoutesInDb(data);
    console.log(route);
    if (error) {
      setPosting(false);
      toast.error(error.message);
      return;
    } else {
      router.refresh();
      router.push("/user/my-routes");
      toast.success("Route offers posted");
      setPosting(false);
      setData([]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await postRoutes();
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-primary text-2xl font-bold tracking-tight">
          Post your route offers
        </h2>
        <ImportDropdown setData={setData} />
      </div>
      <PostRoutesTable
        data={data}
        handleSubmit={handleSubmit}
        posting={posting}
        setData={setData}
      />
    </div>
  );
}

const ImportDropdown = ({ setData }: { setData: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const generateExcelSheet = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
      [
        "destination",
        "destination_code",
        "route_type",
        "rate",
        "asr",
        "acd",
        "ports",
        "pdd",
        "capacity",
      ],
    ]);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Create a binary blob from the workbook
    const ExcelSheet = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([ExcelSheet], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    return blob;
  };

  const EmptyFile = () => {
    const handleDownload = async () => {
      const excelBlob = generateExcelSheet();
      if (excelBlob) {
        const url = URL.createObjectURL(excelBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "empty_file.xlsx";
        a.click();
      }
    };

    return (
      <span
        className="cursor-pointer whitespace-nowrap text-primary-500 underline"
        onClick={handleDownload}
      >
        Download empty file
      </span>
    );
  };

  const handleFileChange = async (e: any) => {
    e.preventDefault();
    const file: File | null = e.target.files?.[0]; // Use optional chaining

    if (!file) {
      // Handle the case where no file is selected
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      if (e.target?.result) {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        let headers: string[] = [];
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: Record<string, any>[] = [];

        XLSX.utils
          .sheet_to_json(worksheet)
          .forEach((row: any, rowIndex: number) => {
            if (rowIndex === 0) {
              headers = Object.keys(row);
            }

            const rowData: Record<string, any> = {};

            headers.forEach((header: string) => {
              rowData[header] = row[header];
            });

            jsonData.push(rowData);
          });

        // Clear the input value
        if (e.target) {
          (e.target as HTMLInputElement).value = "";
        }

        // Assuming you have a `setData` and `setIsOpen` function in your component
        setData([]);
        setData((prevData: any) => [...prevData, ...jsonData]);
        setIsOpen(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleCLick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative  text-left">
      <div
        onClick={handleCLick}
        className="hover:bg-primary text-primary relative flex cursor-pointer items-center justify-center rounded-full border px-3 py-2 text-sm font-medium shadow-sm transition-all ease-in-out hover:bg-opacity-5"
      >
        <HiOutlineCloudUpload className="mr-1.5 h-4 w-4" />
        Import
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="absolute  right-0 top-10 z-10  w-60  rounded-xl border-2 border-surface  bg-white shadow-xl"
              initial={{ opacity: 0, y: "-10%" }}
              animate={{ opacity: 1, y: "0%" }}
              exit={{ opacity: 0, y: "-10%" }}
            >
              <div className="flex flex-col  items-center justify-center p-4">
                <label
                  htmlFor="file-upload"
                  className=" text-primary mt-2 flex cursor-pointer flex-col items-center font-semibold"
                >
                  <div className="mb-1 rounded-lg border-2 border-surface p-2">
                    <HiOutlineCloudUpload className="h-5 w-5" />
                  </div>
                  Click to Upload{" "}
                </label>
                <span className="text-xs text-gray-500">.xlsx only</span>
                <p className="mt-2 text-center text-xs text-slate-400">
                  To import from a filled spreadsheet, you have to <EmptyFile />{" "}
                  and edit it, then upload.
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
