import { saveAs } from "file-saver";
import { useState } from "react";
import { FaFileExport } from "react-icons/fa6";
import { WritingOptions, utils, write } from "xlsx";

interface CSVExporterProps {
  data: any;
  filename: string;
}

export default function CSVExporter(props: CSVExporterProps) {
  const [fileType, setFileType] = useState("csv");
  const exportToCSV = () => {
    const csvData = convertToCSV(props.data);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `${props.filename}.${fileType}`);
  };

  const exportToExcel = () => {
    var wopts: WritingOptions = {
      bookType: "xlsx",
      bookSST: false,
      type: "array",
    };

    const ws = utils.json_to_sheet(props.data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = write(wb, wopts);
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      `${props.filename}.${fileType}`
    );
  };

  const convertToCSV = (dataArray: any) => {
    const header = Object.keys(dataArray[0]).join(",");
    const rows = dataArray.map((item: any) => Object.values(item).join(","));
    return `${header}\n${rows.join("\n")}`;
  };

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Export to</span>
      </div>

      <select
        className="select select-bordered"
        value={fileType}
        onChange={(e) => setFileType(e.target.value)}
      >
        <option value="csv">CSV</option>
        <option value="xlsx">Excel (XLSX)</option>
      </select>
      <div className="label">
        <span className="label-text-alt"></span>
        <button
          className="label-text-alt btn btn-info text-white flex flex-row"
          onClick={fileType === "csv" ? exportToCSV : exportToExcel}
        >
          <span className="text-white text-xl">
            <FaFileExport />
          </span>
          <span>Export</span>
        </button>
      </div>
    </label>
  );
}
