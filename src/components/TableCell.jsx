export default function TableCell({
  row,
  col,
  isModified,
  editingCell,
  setEditingCell,
  onCellUpdate,
}) {
  const isEditing =
    editingCell?.rowId === row.id && editingCell?.dataKey === col.dataKey;
  const cellValue = row[col.dataKey];

  return (
    <td
      style={{
        padding: "4px",
        width: col.width,
        textAlign: col.numeric ? "right" : "left",
        cursor: "pointer",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        border: "1px solid #ccc",
        background: isModified ? "#fff3e0" : "white",
      }}
      onDoubleClick={() =>
        setEditingCell({ rowId: row.id, dataKey: col.dataKey })
      }
    >
      {isEditing ? (
        <input
          autoFocus
          defaultValue={cellValue}
          onBlur={(e) => onCellUpdate(row.id, col.dataKey, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              onCellUpdate(row.id, col.dataKey, e.target.value);
            if (e.key === "Escape") setEditingCell(null);
          }}
          style={{ width: "100%", border: "1px solid #ccc", padding: "2px" }}
        />
      ) : (
        cellValue
      )}
    </td>
  );
}
