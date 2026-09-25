import { FaBell } from "react-icons/fa6";

export function TopBar({
  alertCount,
  time,
}: {
  alertCount: number;
  time: Date;
}) {
  return (
    <header className="flex min-h-16 shrink-0 items-center justify-between gap-4 border-b border-(--line) bg-(--surface) px-6 max-sm:px-4">
      <div>
        <p className="text-sm font-semibold text-(--ink)">Main Villa</p>
        <p className="font-mono text-[11px] capitalize text-(--muted)">
          {time.toLocaleDateString("it-IT", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          aria-label="Apri avvisi"
          className="relative flex size-9 items-center justify-center rounded-xl border border-(--line) bg-(--surface)"
        >
          <FaBell className="text-sm text-(--muted)" />
          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-(--ink) font-mono text-[9px] text-(--surface)">
            {alertCount}
          </span>
        </button>
      </div>
    </header>
  );
}
