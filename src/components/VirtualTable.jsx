import { forwardRef } from "react";
import { TableVirtuoso } from "react-virtuoso";
import TableCell from "./TableCell";

export default function VirtualTable({
  rows,
  columns,
  modifiedRows,
  editingCell,
  setEditingCell,
  onCellUpdate,
}) {
  const VirtuosoComponents = {
    Scroller: forwardRef((props, ref) => (
      <div ref={ref} style={{ height: "100%", overflow: "auto" }} {...props} />
    )),
    Table: (props) => (
      <table
        {...props}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      />
    ),
    TableHead: "thead",
    TableRow: "tr",
    TableBody: forwardRef((props, ref) => <tbody ref={ref} {...props} />),
  };

  const fixedHeader = () => (
    <tr>
      {columns.map((col) => (
        <th
          key={col.dataKey}
          style={{
            width: col.width,
            textAlign: col.numeric ? "right" : "left",
            position: "sticky",
            top: 0,
            background: "#f0f0f0",
            border: "1px solid #ccc",
            padding: "4px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {col.label}
        </th>
      ))}
    </tr>
  );

  const rowContent = (_index, row) =>
    columns.map((col) => (
      <TableCell
        key={col.dataKey}
        row={row}
        col={col}
        isModified={modifiedRows.has(row.id)}
        editingCell={editingCell}
        setEditingCell={setEditingCell}
        onCellUpdate={onCellUpdate}
      />
    ));

  return (
    <TableVirtuoso
      data={rows}
      components={VirtuosoComponents}
      fixedHeaderContent={fixedHeader}
      itemContent={rowContent}
      style={{ height: "100%" }}
    />
  );
}
