# React Pagination Pro

A powerful and flexible pagination library for React applications with both controlled and uncontrolled components, supporting client-side and server-side pagination.

[![npm version](https://img.shields.io/npm/v/@shakibdshy/react-pagination-pro.svg)](https://www.npmjs.com/package/@shakibdshy/react-pagination-pro)
[![npm downloads](https://img.shields.io/npm/dm/@shakibdshy/react-pagination-pro.svg)](https://www.npmjs.com/package/@shakibdshy/react-pagination-pro)
[![License](https://img.shields.io/npm/l/@shakibdshy/react-pagination-pro.svg)](https://github.com/shakibdshy/react-pagination-pro/blob/main/LICENSE)

## Features

- 🚀 Modern React Hooks API
- 🎨 Highly customizable UI
- 🔄 Client & Server-side pagination
- 📱 Fully responsive
- 🎯 TypeScript support
- 🎨 Built with Tailwind CSS
- 🎭 Flexible styling with [class-variance-authority](https://www.npmjs.com/package/class-variance-authority)
- 🔧 Controlled & Uncontrolled components

## Installation

```bash
npm install @shakibdshy/react-pagination-pro
# or
yarn add @shakibdshy/react-pagination-pro
# or
pnpm add @shakibdshy/react-pagination-pro
```

## Quick Start

### Basic Usage

```tsx
import { Pagination } from '@shakibdshy/react-pagination-pro';

function MyComponent() {
  return (
    <Pagination
      totalItems={100}
      defaultPageSize={10}
      onChange={({ currentPage, pageSize }) => {
        // Handle page change
      }}
    />
  );
}
```

### Using the Hook (Custom UI)

```tsx
import { usePagination } from '@shakibdshy/react-pagination-pro';

function CustomPagination() {
  const [
    { currentPage, totalPages, pageSize, startIndex, endIndex },
    actions
  ] = usePagination({
    totalItems: 100,
    defaultPageSize: 10
  });

  return (
    <div>
      <div>
        Showing {startIndex + 1} to {endIndex} of {totalItems} items
      </div>
      
      <div>
        <button onClick={actions.previousPage}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={actions.nextPage}>Next</button>
      </div>
    </div>
  );
}
```

## API Reference

### Pagination Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| totalItems | number | required | Total number of items to paginate |
| defaultPageSize | number | 10 | Number of items per page |
| initialPage | number | 1 | Initial active page |
| className | string | - | Additional class name for the root element |
| buttonClassName | string | - | Additional class name for pagination buttons |
| activeButtonClassName | string | - | Additional class name for the active page button |
| showPageSize | boolean | false | Show page size selector |
| pageSizeOptions | number[] | [10, 20, 30, 40, 50] | Available options for page size selector |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' | 'md' | Size of the pagination buttons |
| activeVariant | 'primary' \| 'outline' \| 'flat' \| 'light' \| 'ghost' \| 'text' | 'primary' | Variant for the active page button |
| variant | 'primary' \| 'outline' \| 'flat' \| 'light' \| 'ghost' \| 'text' | 'outline' | Variant for inactive page buttons |
| activeColor | 'primary' \| 'secondary' \| 'neutral' \| 'info' \| 'error' \| 'warning' \| 'success' | 'primary' | Color for the active page button |
| color | 'primary' \| 'secondary' \| 'neutral' \| 'info' \| 'error' \| 'warning' \| 'success' | 'neutral' | Color for inactive page buttons |
| navigationButtonVariant | 'primary' \| 'outline' \| 'flat' \| 'light' \| 'ghost' \| 'text' | 'outline' | Variant for navigation buttons (prev/next) |
| navigationButtonColor | 'primary' \| 'secondary' \| 'neutral' \| 'info' \| 'error' \| 'warning' \| 'success' | 'neutral' | Color for navigation buttons (prev/next) |
| rounded | 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full' \| 'none' | 'md' | Rounded size for all buttons |
| previousIcon | React.ReactNode | - | Custom previous button icon |
| nextIcon | React.ReactNode | - | Custom next button icon |
| isLoop | boolean | false | Enable pagination loop - when reaching last page, next goes to first page and vice versa |
| siblingCount | number | 1 | Number of siblings to show on each side of the current page |
| boundaries | number | 1 | Number of pages to show at the beginning and end of the pagination |
| dots | React.ReactNode | - | Custom dots/ellipsis element to show between page numbers |
| onChange | (state: PaginationState) => void | - | Callback when pagination state changes |
| mode | 'client' \| 'server' | 'client' | Pagination mode |
| onPageChange | (page: number, pageSize: number) => Promise<void> | - | Server-side data fetching function |
| isLoading | boolean | false | Loading state |
| isDisabled | boolean | false | Disable all pagination actions |
| isDisabledPrevious | boolean | false | Disable only the previous page button |
| isDisabledNext | boolean | false | Disable only the next page button |

### usePagination Hook

```typescript
const [state, actions] = usePagination(options);
```

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| totalItems | number | required | Total number of items |
| defaultCurrentPage | number | 1 | Initial page number |
| defaultPageSize | number | 10 | Initial page size |
| onChange | (state: PaginationState) => void | - | State change callback |
| mode | 'client' \| 'server' | 'client' | Pagination mode |
| onPageChange | (page: number, pageSize: number) => Promise<void> | - | Server-side fetching |
| isLoading | boolean | false | Loading state |

#### State

| Property | Type | Description |
|----------|------|-------------|
| currentPage | number | Current active page |
| pageSize | number | Items per page |
| totalPages | number | Total number of pages |
| hasNextPage | boolean | Whether there's a next page |
| hasPreviousPage | boolean | Whether there's a previous page |
| isFirstPage | boolean | Whether current page is first |
| isLastPage | boolean | Whether current page is last |
| startIndex | number | Start index of current page |
| endIndex | number | End index of current page |
| isLoading | boolean | Loading state |

#### Actions

| Action | Type | Description |
|--------|------|-------------|
| setCurrentPage | (page: number) => void | Set specific page |
| setPageSize | (size: number) => void | Change items per page |
| nextPage | () => void | Go to next page |
| previousPage | () => void | Go to previous page |
| firstPage | () => void | Go to first page |
| lastPage | () => void | Go to last page |

## Accessibility

The pagination component is built with accessibility in mind:

- Full keyboard navigation support
- ARIA labels and roles for screen readers
- Proper tab indexing for interactive elements
- Disabled states properly communicated to assistive technologies
- Semantic HTML structure with navigation landmarks

## Examples

### Disabled States

```tsx
import { Pagination } from '@shakibdshy/react-pagination-pro';

function DisabledExample() {
  return (
    <>
      {/* Fully disabled pagination */}
      <Pagination
        totalItems={100}
        defaultPageSize={10}
        isDisabled={true}
      />

      {/* Disable specific navigation buttons */}
      <Pagination
        totalItems={100}
        defaultPageSize={10}
        isDisabledPrevious={true} // Disable previous button
        isDisabledNext={true}     // Disable next button
      />
    </>
  );
}
```

### Basic Usage with Boundaries

```tsx
import { Pagination } from '@shakibdshy/react-pagination-pro';

function MyComponent() {
  return (
    <Pagination
      totalItems={100}
      defaultPageSize={10}
      // Show 2 pages at the start and end
      // Example: 1 2 ... 4 5 [6] 7 8 ... 9 10
      boundaries={2}
      // Show 2 siblings on each side of current page
      siblingCount={2}
      onChange={({ currentPage, pageSize }) => {
        // Handle page change
      }}
    />
  );
}
```

### Client-side Pagination

```tsx
import { Pagination } from '@shakibdshy/react-pagination-pro';

function ClientSidePagination() {
  const [items, setItems] = useState(allItems);
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
      
      <Pagination
        totalItems={allItems.length}
        defaultPageSize={10}
        onChange={({ currentPage, pageSize }) => {
          const start = (currentPage - 1) * pageSize;
          const end = start + pageSize;
          setItems(allItems.slice(start, end));
        }}
      />
    </div>
  );
}
```

### Server-side Pagination

```tsx
import { Pagination } from '@shakibdshy/react-pagination-pro';

function ServerSidePagination() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchItems = async (page: number, pageSize: number) => {
    setLoading(true);
    const data = await fetchFromAPI(page, pageSize);
    setItems(data.items);
    setLoading(false);
  };
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
      
      <Pagination
        totalItems={1000} // Total count from API
        defaultPageSize={10}
        mode="server"
        isLoading={loading}
        onPageChange={fetchItems}
      />
    </div>
  );
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Md Habibur Rahman](https://github.com/shakibdshy)
