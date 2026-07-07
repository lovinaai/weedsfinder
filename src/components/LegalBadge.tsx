import type { LegalStatus } from "@/data/countries";
import { statusLabel } from "@/data/countries";

const styles: Record<LegalStatus, string> = {
  legal: "bg-emerald/15 text-emerald border-emerald/30",
  medical: "bg-amber/15 text-amber border-amber/30",
  decriminalized: "bg-cyan-400/15 text-cyan-300 border-cyan-400/30",
  illegal: "bg-clay/15 text-clay border-clay/30",
};

export default function LegalBadge({ status }: { status: LegalStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${styles[status]}`}>
      {statusLabel[status]}
    </span>
  );
}
