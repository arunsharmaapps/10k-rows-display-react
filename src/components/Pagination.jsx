export default function Pagination({
  page,
  setPage,
  pageSize,
  setPageSize,
  totalRows,
}) {
  const totalPages = Math.ceil(totalRows / pageSize);
  return (
    <div
      style={{
        marginBottom: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        gap: 10,
      }}
    >
      <span>Page Size:</span>
      <input
        type="number"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setPage(0);
        }}
        style={{ width: 60, padding: 4 }}
      />
      <button
        className="button"
        onClick={() => setPage((p) => Math.max(0, p - 1))}
        disabled={page === 0}
      >
        Prev
      </button>
      <button
        className="button"
        onClick={() => setPage((p) => (p < totalPages - 1 ? p + 1 : p))}
        disabled={page >= totalPages - 1}
      >
        Next
      </button>
      <span>
        Page {page + 1} of {totalPages}
      </span>
    </div>
  );
}
