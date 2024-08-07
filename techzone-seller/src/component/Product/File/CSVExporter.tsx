import { Button, Select, Space } from "antd";
import { saveAs } from "file-saver";
import { useState } from "react";
import { GoDownload } from "react-icons/go";
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

  // const convertToCSV = (dataArray: any) => {
  //   // Helper function to flatten an object
  //   const flattenObject = (obj: any, parent: string = '', res: any = {}) => {
  //     for (let key in obj) {
  //       const propName = parent ? `${parent}.${key}` : key;
  //       if (typeof obj[key] === 'object' && obj[key] !== null) {
  //         flattenObject(obj[key], propName, res);
  //       } else {
  //         res[propName] = obj[key];
  //       }
  //     }
  //     return res;
  //   };

  //   // Flatten all objects in the array
  //   const flattenedArray = dataArray.map((item: any) => flattenObject(item));

  //   // Create CSV header
  //   const header = Object.keys(flattenedArray[0]).join(',');

  //   // Create CSV rows
  //   const rows = flattenedArray.map((item: any) =>
  //     Object.values(item).map(value =>
  //       (typeof value === 'string' && value.includes(',')) ? `"${value}"` : value
  //     ).join(',')
  //   );

  //   // Combine header and rows
  //   return `${header}\n${rows.join('\n')}`;
  // };

  return (
    <Space className="form-control">
      <div className="label">
        <span className="label-text">Định dạng</span>
      </div>

      <Select
        className="select select-bordered"
        value={fileType}
        onChange={(e) => setFileType(e)}
      >
        <option value="csv">CSV</option>
        <option value="xlsx">Excel (XLSX)</option>
      </Select>
      <div className="label">
        <span className="label-text-alt"></span>
        <Button
          className="label-text-alt btn btn-info flex flex-row"
          onClick={fileType === "csv" ? exportToCSV : exportToExcel}
        >
          <div className="flex flex-row items-center gap-1">
            <div>Tải dữ liệu</div>
            <GoDownload />
          </div>
        </Button>
      </div>
    </Space>
  );
}
