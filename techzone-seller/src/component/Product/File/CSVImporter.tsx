// CSVImporter.js
import React, { useState } from "react";
import { FaFileImport } from "react-icons/fa6";
import { read, utils } from "xlsx";

interface ImporterProps {
  onFileUpload: (data: any) => void;
}

export default function CSVImporter(props: ImporterProps) {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setErrorMessage("Please select a CSV file first!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      var range = utils.decode_range(sheet["!ref"]!);
      range.s.r = 0; // <-- zero-indexed, so setting to 1 will skip row 0
      sheet["!ref"] = utils.encode_range(range);
      const jsonData = utils.sheet_to_json(sheet, { header: 1 });

      // Explicitly specify the type for headerRow
      const headerRow = jsonData[0] as string[];

      const dataRows = jsonData.slice(1);

      // Map the parsed data to the desired structure
      const result = dataRows.map((row: any) => {
        const mappedData: Record<string, any> = {};

        // Assuming T has properties class_id, user_id, fullname, role, student_id
        headerRow.forEach((key: string, index: number) => {
          const propertyName = key.trim();
          mappedData[propertyName] = row[index];
        });

        return mappedData;
      });

      // console.log("RESULT: ", result);

      // Handle parsed CSV data
      props.onFileUpload(result);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <React.Fragment>
      {errorMessage ? (
        <div className="toast toast-end z-[100]">
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        </div>
      ) : null}
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Pick a file</span>
          <span className="label-text-alt">Must be a .csv or .xlsx file</span>
        </div>
        <input
          type="file"
          accept=".csv, .xls, .xlsx"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileChange}
        />
        <div className="label">
          <span className="label-text-alt"></span>
          <button
            className="label-text-alt btn btn-info text-white flex flex-row"
            onClick={handleFileUpload}
          >
            <span className="text-white text-xl">
              <FaFileImport />
            </span>
            <span>Import</span>
          </button>
        </div>
      </label>
    </React.Fragment>
  );
}
