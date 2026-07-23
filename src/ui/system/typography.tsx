import type { HTMLAttributes } from "react";
export function H1({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) { return <h1 className={`font-bold text-[var(--text)] ${className}`} {...props} />; }
export function H2({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) { return <h2 className={`font-bold text-[var(--text)] ${className}`} {...props} />; }
export function H3({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) { return <h3 className={`font-semibold text-[var(--text)] ${className}`} {...props} />; }
export function Body({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) { return <p className={`text-base leading-7 text-[var(--text)] ${className}`} {...props} />; }
export function Caption({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) { return <p className={`text-xs leading-5 text-[var(--text-muted)] ${className}`} {...props} />; }
export function Label({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) { return <span className={`text-sm font-semibold text-[var(--text)] ${className}`} {...props} />; }
