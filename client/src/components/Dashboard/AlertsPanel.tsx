import { FaPerson } from "react-icons/fa6";
import type { Alert } from "./types/dashboard";

export function AlertsPanel({
    alerts,
    onSelectCamera,
}: {
    alerts: Alert[];
    onSelectCamera?: (cameraName: string) => void;
}) {
    return (
        <section className="overflow-hidden rounded-2xl border border-(--line) bg-(--surface)">
            <div className="flex items-center justify-between border-b border-(--line) px-4 py-3.5">
                <p className="text-xs font-semibold text-(--ink)">Recent alerts</p>
                <span className="font-mono text-[10px] text-(--muted)">
                    {alerts.length}
                </span>
            </div>
            <div className="max-h-100 overflow-y-auto">
                {alerts.map((alert) => (
                    <button
                        key={alert.id}
                        type="button"
                        onClick={() => onSelectCamera?.(alert.cam)}
                        disabled={!onSelectCamera}
                        className="flex w-full items-start gap-2.5 border-b border-(--line) px-4 py-3 text-left last:border-b-0 enabled:hover:bg-(--page) disabled:cursor-default"
                    >
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-(--danger-line) bg-(--danger-soft)">
                            <FaPerson className="text-[9px] text-(--danger)" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] font-medium text-(--ink)">
                                {alert.msg}
                            </p>
                            <p className="truncate text-[11px] text-(--muted)">{alert.cam}</p>
                            <p className="font-mono text-[10px] text-(--muted-light)">
                                {alert.time}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
}
