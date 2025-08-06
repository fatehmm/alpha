import React from "react";
import { IconLoader2 } from "@tabler/icons-react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      default: "size-8",
      sm: "size-6",
      lg: "size-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function Spinner({
  size,
  show,
  children,
  className,
}: SpinnerContentProps) {
  return (
    <span className={cn(spinnerVariants({ show }), className)}>
      <IconLoader2 className={loaderVariants({ size })} />
      {children}
    </span>
  );
}
