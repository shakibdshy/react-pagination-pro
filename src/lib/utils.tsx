import { twMerge } from "tailwind-merge";
import { type VariantProps, cva, cx } from "class-variance-authority";
import { ClassValue } from "class-variance-authority/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(cx(inputs));
}

export { cva, type VariantProps };
