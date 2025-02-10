import React, { useState } from "react";
import * as XLSX from "xlsx";
import FilterModal from "../FilterModal/FilterModal";

const FileUploadTable = () => {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
      setFilteredData(jsonData); // Initialize filtered data
    };
    reader.readAsBinaryString(file);
  };

  const handleFilterApply = (value) => {
    setFilterValue(value);
    const newData = data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(newData);
  };

  return (
    <div className="file-upload-main">
      <div className="file-upload-container whitebox-card">
        <h4 className="text-title-upload">Upload File</h4>
        <div className="upload-box">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            id="file-upload-input"
          />
          <label htmlFor="file-upload-input" className="upload-label">
            {fileName || "Drag & drop your file here or click to upload"}
          </label>
        </div>
      </div>
      <div className="table-responsive whitebox-card">
        <div className="table-title-row">
          <div className="table-title">
            Table Data
          </div>
          <button className="btn" onClick={() => setModalOpen(true)}>Filter</button>
        </div>
        <FilterModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onApply={handleFilterApply}
        />
        {filteredData.length > 0 && (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  {Object.keys(filteredData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, idx) => (
                      <td key={idx}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadTable;
