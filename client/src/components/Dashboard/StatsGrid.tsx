import {
  FaCircleCheck,
  FaClock,
  FaTriangleExclamation,
  FaVideo,
} from "react-icons/fa6";

export function StatsGrid({
  onlineCount,
  alertCount,
  cameraCount,
  time,
}: {
  onlineCount: number;
  alertCount: number;
  cameraCount: number;
  time: Date;
}) {
  const stats = [
    { icon: FaVideo, label: "Telecamere", value: cameraCount },
    { icon: FaCircleCheck, label: "Online", value: onlineCount },
    { icon: FaTriangleExclamation, label: "Avvisi attivi", value: alertCount },
    {
      icon: FaClock,
      label: "Ora corrente",
      value: time.toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      mono: true,
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-3.5 max-sm:gap-2 lg:grid-cols-4">
      {stats.map(({ icon: Icon, label, value, mono }) => (
        <div
          key={label}
          className="rounded-2xl border border-(--line) bg-(--surface) p-4"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-[10px] border border-(--line) bg-(--page)">
              <Icon className="text-[11px] text-(--muted)" />
            </div>
            <span className="text-xs text-(--muted)">{label}</span>
          </div>
          <p
            className={`text-2xl font-semibold text-(--ink) ${mono ? "font-mono" : ""}`}
          >
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
