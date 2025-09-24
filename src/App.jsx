import { useState, useEffect, useMemo, useTransition } from "react";

import { generateFakeBooks } from "./utils/faker";
import { useDebounce } from "./hooks/useDebounce";

import TableOptions from "./components/TableOptions";
import Pagination from "./components/Pagination";
import VirtualTable from "./components/VirtualTable";

export default function App() {
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [modifiedRows, setModifiedRows] = useState(new Set());
  const [editingCell, setEditingCell] = useState(null);
  const [filterInput, setFilterInput] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(0);

  const columns = useMemo(
    () => [
      { dataKey: "Title", label: "Title", width: 100 },
      { dataKey: "Author", label: "Author", width: 150 },
      { dataKey: "Genre", label: "Genre", width: 120 },
      { dataKey: "PublishedYear", label: "Year", width: 80, numeric: true },
      { dataKey: "ISBN", label: "ISBN", width: 150 },
    ],
    []
  );

  useEffect(() => {
    const data = generateFakeBooks();
    setRows(data);
    setOriginalRows(data);
  }, []);

  const debouncedSetFilter = useDebounce((value) => {
    startTransition(() => setFilterQuery(value));
    setPage(0);
  }, 300);

  const handleFilterChange = (value) => {
    setFilterInput(value);
    debouncedSetFilter(value);
  };

  const filteredRows = useMemo(() => {
    if (!filterQuery) return rows;
    const query = filterQuery.toLowerCase();
    return rows.filter((row) =>
      columns.some((col) =>
        String(row[col.dataKey]).toLowerCase().includes(query)
      )
    );
  }, [rows, filterQuery, columns]);

  const paginatedRows = useMemo(() => {
    const start = page * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, page, pageSize]);

  const handleCellUpdate = (rowId, dataKey, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === rowId) {
          if (row[dataKey] !== value) {
            setModifiedRows((prev) => new Set(prev).add(rowId));
            return { ...row, [dataKey]: value };
          }
        }
        return row;
      })
    );
    setEditingCell(null);
  };

  return (
    <div
      style={{
        padding: 10,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TableOptions
        rows={rows}
        setRows={setRows}
        originalRows={originalRows}
        setOriginalRows={setOriginalRows}
        setModifiedRows={setModifiedRows}
        filterInput={filterInput}
        onFilterChange={handleFilterChange}
      />
      <Pagination
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalRows={filteredRows.length}
      />
      <div style={{ flex: 1, minHeight: 0 }}>
        <VirtualTable
          rows={paginatedRows}
          columns={columns}
          modifiedRows={modifiedRows}
          editingCell={editingCell}
          setEditingCell={setEditingCell}
          onCellUpdate={handleCellUpdate}
        />
      </div>
    </div>
  );
}
