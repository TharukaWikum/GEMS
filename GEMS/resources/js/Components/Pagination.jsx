import React from "react";

export default function Pagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 text-gray-700"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`px-3 py-1 rounded border ${page === i + 1 ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 text-gray-700"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
