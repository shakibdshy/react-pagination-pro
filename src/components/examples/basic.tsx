"use client";

import { useState } from "react";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/components/ui/Pagination";

const ITEMS = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`,
}));

export function BasicExample() {
  const [currentItems, setCurrentItems] = useState(ITEMS.slice(0, 10));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Basic Pagination Example</h2>

      <div className="space-y-2">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50"
          >
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-neutral-600">{item.description}</p>
          </div>
        ))}
      </div>

      <Pagination
        totalItems={ITEMS.length}
        defaultPageSize={10}
        isLoop={true}
        initialPage={3}
        showPageSize={true}
        onChange={({ currentPage, pageSize }) => {
          const start = (currentPage - 1) * pageSize;
          const end = start + pageSize;
          setCurrentItems(ITEMS.slice(start, end));
        }}
      />
    </div>
  );
}

export function CustomExample() {
  const [{ currentPage, totalPages, pageSize, startIndex, endIndex }, actions] =
    usePagination({
      totalItems: ITEMS.length,
      defaultPageSize: 5,
    });

  const currentItems = ITEMS.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Custom Pagination Example</h2>

      <div className="flex items-center gap-2">
        <span className="text-sm">Items per page:</span>
        <select
          value={pageSize}
          onChange={(e) => actions.setPageSize(Number(e.target.value))}
          className="rounded border p-1 text-sm"
        >
          {[5, 10, 15, 20].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {currentItems.map((item) => (
          <div key={item.id} className="rounded-lg bg-primary-50 p-4">
            <h3 className="font-semibold text-primary-900">{item.title}</h3>
            <p className="text-sm text-primary-700">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-neutral-600">
          Showing {startIndex + 1} to {endIndex} of {ITEMS.length} items
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={actions.firstPage}
            disabled={currentPage === 1}
            className="rounded px-2 py-1 text-sm hover:bg-neutral-100 disabled:opacity-50"
          >
            First
          </button>
          <button
            onClick={actions.previousPage}
            disabled={currentPage === 1}
            className="rounded px-3 py-1 font-bold hover:bg-neutral-100 disabled:opacity-50"
          >
            ←
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={actions.nextPage}
            disabled={currentPage === totalPages}
            className="rounded px-3 py-1 font-bold hover:bg-neutral-100 disabled:opacity-50"
          >
            →
          </button>
          <button
            onClick={actions.lastPage}
            disabled={currentPage === totalPages}
            className="rounded px-2 py-1 text-sm hover:bg-neutral-100 disabled:opacity-50"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
}
