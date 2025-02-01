"use client";

import { useState } from "react";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/components/ui/Pagination";

// Mock data for examples
const ITEMS = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`,
}));

/**
 * Basic example demonstrating the minimal setup required for pagination
 * Features shown:
 * - Default styling
 * - Simple page navigation
 * - Automatic page size handling
 */
export function BasicExample() {
  const [currentItems, setCurrentItems] = useState(ITEMS.slice(0, 10));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Basic Pagination</h2>
      <p className="text-neutral-600">Simple pagination with default settings</p>

      <div className="rounded-lg border p-4">
        <p>Current Items: {currentItems.length}</p>
      </div>

      <Pagination
        totalItems={ITEMS.length}
        defaultPageSize={10}
        onChange={({ currentPage, pageSize }) => {
          const start = (currentPage - 1) * pageSize;
          const end = start + pageSize;
          setCurrentItems(ITEMS.slice(start, end));
        }}
      />
    </div>
  );
}

/**
 * Example showcasing different styling options
 * Features shown:
 * - Custom button sizes
 * - Different variants
 * - Custom colors
 * - Custom rounded corners
 */
export function StyledExample() {
  const [, setCurrentItems] = useState(ITEMS.slice(0, 5));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Styled Pagination</h2>
      <p className="text-neutral-600">Custom styling with different variants and colors</p>

      <div className="flex flex-col gap-4">
        {/* Large size, primary variant */}
        <Pagination
          totalItems={ITEMS.length}
          defaultPageSize={5}
          size="lg"
          variant="primary"
          color="primary"
          onChange={({ currentPage, pageSize }) => {
            const start = (currentPage - 1) * pageSize;
            setCurrentItems(ITEMS.slice(start, start + pageSize));
          }}
        />

        {/* Medium size, outline variant, secondary color */}
        <Pagination
          totalItems={ITEMS.length}
          defaultPageSize={5}
          size="md"
          variant="outline"
          color="secondary"
          rounded="full"
          onChange={({ currentPage, pageSize }) => {
            const start = (currentPage - 1) * pageSize;
            setCurrentItems(ITEMS.slice(start, start + pageSize));
          }}
        />
      </div>
    </div>
  );
}

/**
 * Example with custom navigation controls
 * Features shown:
 * - Custom navigation icons
 * - Custom navigation button styling
 */
export function CustomNavigationExample() {
  const [, setCurrentItems] = useState(ITEMS.slice(0, 10));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Custom Navigation</h2>
      <p className="text-neutral-600">Pagination with custom navigation controls</p>

      <Pagination
        totalItems={ITEMS.length}
        defaultPageSize={10}
        previousIcon="⟨"
        nextIcon="⟩"
        navigationButtonVariant="primary"
        navigationButtonColor="secondary"
        onChange={({ currentPage, pageSize }) => {
          const start = (currentPage - 1) * pageSize;
          setCurrentItems(ITEMS.slice(start, start + pageSize));
        }}
      />
    </div>
  );
}

/**
 * Example demonstrating dynamic page size selection
 * Features shown:
 * - Dynamic page size changes
 * - Page size selector integration
 */
export function DynamicPageSizeExample() {
  const [{ currentPage, pageSize }, actions] = usePagination({
    totalItems: ITEMS.length,
    defaultPageSize: 5,
  });

  const currentItems = ITEMS.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Dynamic Page Size</h2>
      <p className="text-neutral-600">Pagination with adjustable items per page</p>

      <div className="flex items-center gap-2">
        <span>Items per page:</span>
        <select
          value={pageSize}
          onChange={(e) => actions.setPageSize(Number(e.target.value))}
          className="rounded border p-1"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-lg border p-4">
        <p>Showing {currentItems.length} items</p>
      </div>

      <Pagination
        totalItems={ITEMS.length}
        defaultPageSize={pageSize}
        onChange={({ currentPage }) => {
          actions.setCurrentPage(currentPage);
        }}
      />
    </div>
  );
}

/**
 * Example showing server-side pagination integration
 * Features shown:
 * - Server-side mode
 * - Loading states
 * - Error handling
 */
export function ServerSideExample() {
  const [items, setItems] = useState<typeof ITEMS>([]);
  const [loading, setLoading] = useState(false);

  // Simulate API call
  const fetchItems = async (page: number, pageSize: number) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setItems(ITEMS.slice(start, end));
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Server-side Pagination</h2>
      <p className="text-neutral-600">Pagination with server-side data fetching</p>

      <div className="rounded-lg border p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>Loaded {items.length} items</p>
        )}
      </div>

      <Pagination
        totalItems={ITEMS.length}
        defaultPageSize={10}
        mode="server"
        isLoading={loading}
        onPageChange={fetchItems}
      />
    </div>
  );
}

/**
 * Example demonstrating various disabled states
 * Features shown:
 * - Fully disabled pagination
 * - Disabled previous/next buttons
 * - Conditional disabling
 */
export function DisabledStatesExample() {
  const [, setCurrentItems] = useState(ITEMS.slice(0, 10));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Disabled States</h2>
      <p className="text-neutral-600">Pagination with various disabled states</p>

      <div className="flex flex-col gap-4">
        {/* Fully disabled */}
        <Pagination
          totalItems={ITEMS.length}
          defaultPageSize={10}
          isDisabled={true}
          onChange={({ currentPage, pageSize }) => {
            const start = (currentPage - 1) * pageSize;
            setCurrentItems(ITEMS.slice(start, start + pageSize));
          }}
        />

        {/* Disabled navigation */}
        <Pagination
          totalItems={ITEMS.length}
          defaultPageSize={10}
          isDisabledPrevious={true}
          isDisabledNext={true}
          onChange={({ currentPage, pageSize }) => {
            const start = (currentPage - 1) * pageSize;
            setCurrentItems(ITEMS.slice(start, start + pageSize));
          }}
        />
      </div>
    </div>
  );
}

/**
 * Example showing loop mode functionality
 * Features shown:
 * - Infinite loop navigation
 * - Custom styling for loop mode
 */
export function LoopModeExample() {
  const [currentItems, setCurrentItems] = useState(ITEMS.slice(0, 5));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Loop Mode</h2>
      <p className="text-neutral-600">Pagination with infinite loop navigation</p>

      <div className="rounded-lg border p-4">
        <p>Current page items: {currentItems.length}</p>
      </div>

      <Pagination
        totalItems={ITEMS.length}
        defaultPageSize={5}
        isLoop={true}
        onChange={({ currentPage, pageSize }) => {
          const start = (currentPage - 1) * pageSize;
          setCurrentItems(ITEMS.slice(start, start + pageSize));
        }}
      />
    </div>
  );
}

/**
 * Example demonstrating custom boundaries and siblings
 * Features shown:
 * - Custom boundary pages
 * - Custom sibling count
 * - Custom dots/ellipsis
 */
export function CustomBoundariesExample() {
  const [, setCurrentItems] = useState(ITEMS.slice(0, 5));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Custom Boundaries</h2>
      <p className="text-neutral-600">Pagination with custom boundaries and siblings</p>

      <Pagination
        totalItems={ITEMS.length}
        defaultPageSize={5}
        boundaries={2}
        siblingCount={2}
        dots="•••"
        onChange={({ currentPage, pageSize }) => {
          const start = (currentPage - 1) * pageSize;
          setCurrentItems(ITEMS.slice(start, start + pageSize));
        }}
      />
    </div>
  );
}
