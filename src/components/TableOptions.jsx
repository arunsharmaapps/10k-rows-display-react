import { useCallback } from "react";
import * as XLSX from "xlsx";
import { faker } from "@faker-js/faker";

export default function TableOptions({
  rows,
  setRows,
  originalRows,
  setOriginalRows,
  setModifiedRows,
  filterInput,
  onFilterChange,
}) {
  const handleFileUpload = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { defval: "" });
        const processed = data.map((row) => ({
          id: row.id || faker.string.uuid(),
          Title: row.Title || "",
          Author: row.Author || "",
          Genre: row.Genre || "",
          PublishedYear: Number(row.PublishedYear) || 0,
          ISBN: row.ISBN || "",
        }));
        setRows(processed);
        setOriginalRows(processed);
        setModifiedRows(new Set());
      };
      reader.readAsBinaryString(file);
    },
    [setRows, setOriginalRows, setModifiedRows]
  );

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Books");
    XLSX.writeFile(wb, "edited_books.xlsx");
  };

  const handleReset = () => {
    setRows(originalRows);
    setModifiedRows(new Set());
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 10,
        alignItems: "center",
      }}
    >
      <label>
        {/* <button className="button">Upload</button> */}
        <input
          type="file"
          //   hidden
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={handleFileUpload}
        />
      </label>
      <button className="button" onClick={handleDownload}>
        Download
      </button>
      <button className="button" onClick={handleReset}>
        Reset
      </button>
      <input
        placeholder="Search Anything..."
        value={filterInput}
        onChange={(e) => onFilterChange(e.target.value)}
        style={{ padding: 4 }}
      />
    </div>
  );
}
