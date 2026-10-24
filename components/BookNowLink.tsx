import type { ReactNode } from "react";
import { site } from "@/lib/site";

export default function BookNowLink({ className, children = "Book now" }: { className: string; children?: ReactNode }) {
  return <a href={site.bookingFormUrl} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
}
