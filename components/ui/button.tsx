"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

/** shadcn-style CVA with custom variants tuned for this site. */
const buttonStyles = cva(
  "inline-flex cursor-pointer items-center gap-3 rounded-full font-medium uppercase tracking-[0.12em] transition-[background,box-shadow,color,transform] duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-accent)]",
  {
    variants: {
      variant: {
        primary:
          "bg-[color:var(--color-accent)] text-[color:var(--color-bg)] hover:bg-white hover:shadow-[0_0_40px_var(--color-glow)]",
        ghost:
          "glass text-[color:var(--color-ink)] hover:bg-[rgba(255,255,255,0.06)] hover:border-[color:var(--color-accent)]",
      },
      size: {
        sm: "px-5 py-3 text-[12px]",
        md: "px-7 py-4 text-[13px]",
        lg: "px-9 py-5 text-[14px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children">,
    VariantProps<typeof buttonStyles> {
  children: ReactNode;
  withArrow?: boolean;
  magnetic?: boolean;
  href: string;
}

export function Button({
  children,
  variant,
  size,
  className,
  withArrow,
  magnetic = true,
  href,
  ...rest
}: ButtonProps) {
  const node = (
    <a href={href} className={cn(buttonStyles({ variant, size }), className)} {...rest}>
      <span>{children}</span>
      {withArrow && <ArrowRight size={14} strokeWidth={1.5} />}
    </a>
  );
  return magnetic ? <Magnetic>{node}</Magnetic> : node;
}
