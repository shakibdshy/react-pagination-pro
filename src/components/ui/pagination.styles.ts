import { tv } from 'tailwind-variants';

export const paginationStyles = {
  root: tv({
    base: 'flex flex-wrap items-center gap-2',
  }),

  button: tv({
    base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50',
    variants: {
      variant: {
        default: 'bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90',
        outline: 'border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900',
        ghost: 'hover:bg-neutral-100 hover:text-neutral-900',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),

  nav: tv({
    base: 'flex items-center gap-1',
  }),

  select: tv({
    base: 'h-9 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm outline-none hover:bg-neutral-100',
  }),
}; 