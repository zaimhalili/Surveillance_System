import {
    FaAnglesLeft,
    FaAnglesRight,
    FaArrowRightFromBracket,
    FaBell,
    FaChartLine,
    FaGear,
    FaGrip,
    FaUser,
    FaVideo,
} from "react-icons/fa6";

interface SidebarProps {
    collapsed: boolean;
    alertCount: number;
    onToggle: () => void;
    onExit: () => void;
}

export function Sidebar({
    collapsed,
    alertCount,
    onToggle,
    onExit,
}: SidebarProps) {
    const items = [
        { icon: FaGrip, label: "Telecamere", active: true },
        { icon: FaBell, label: "Avvisi", badge: alertCount },
        { icon: FaChartLine, label: "Attività", badge: 0 },
        { icon: FaGear, label: "Impostazioni", badge: 0 },
    ];

    return (
        <aside
            className={`flex min-h-screen shrink-0 flex-col overflow-hidden border-r border-(--line) bg-(--surface) transition-[width] duration-200 ${collapsed ? "w-16" : "w-55"} max-md:fixed max-md:inset-y-0 max-md:z-50 ${collapsed ? "max-md:-translate-x-full" : "max-md:translate-x-0"}`}
        >
            <div className="flex h-16 shrink-0 items-center gap-2.5 overflow-hidden border-b border-(--line) px-3.5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-(--ink)">
                    <FaVideo className="text-xs text-(--surface)" />
                </div>
                {!collapsed && (
                    <span className="whitespace-nowrap text-[13px] font-semibold text-(--ink)">
                        Surveillance
                    </span>
                )}
            </div>
            <nav className="flex flex-1 flex-col gap-0.5 p-2">
                {items.map(({ icon: Icon, label, active, badge }) => (
                    <div
                        key={label}
                        className={`flex items-center gap-2.5 overflow-hidden rounded-xl px-3 py-2.5 ${active ? "bg-(--ink)" : "bg-transparent"}`}
                    >
                        <Icon
                            className={`w-3.5 shrink-0 text-center text-[13px] ${active ? "text-(--surface)" : "text-(--muted)"}`}
                        />
                        {!collapsed && (
                            <>
                                <span
                                    className={`flex-1 whitespace-nowrap text-[13px] ${active ? "text-(--surface)" : "text-(--muted)"}`}
                                >
                                    {label}
                                </span>
                                {!!badge && !active && (
                                    <span className="rounded-lg bg-(--ink) px-1.5 py-px font-mono text-[10px] text-(--surface)">
                                        {badge}
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </nav>
            <div className="flex flex-col gap-0.5 border-t border-(--line) p-2">
                <button
                    onClick={onToggle}
                    className="flex w-full items-center gap-2.5 overflow-hidden rounded-xl bg-transparent px-3 py-2.5 text-left"
                >
                    {collapsed ? (
                        <FaAnglesRight className="w-3.5 shrink-0 text-xs text-(--muted)" />
                    ) : (
                        <FaAnglesLeft className="w-3.5 shrink-0 text-xs text-(--muted)" />
                    )}
                    {!collapsed && (
                        <span className="text-[13px] text-(--muted)">Riduci</span>
                    )}
                </button>
                <div className="flex items-center gap-2.5 overflow-hidden px-3 py-2.5">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-(--line)">
                        <FaUser className="text-[11px] text-(--muted)" />
                    </div>
                    {!collapsed && (
                        <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-(--ink)">
                                Marco Rossi
                            </p>
                            <p className="font-mono text-[10px] text-(--muted)">
                                Casa Milano
                            </p>
                        </div>
                    )}
                </div>
                <button
                    onClick={onExit}
                    className="flex w-full items-center gap-2.5 overflow-hidden rounded-xl bg-transparent px-3 py-2.5 text-left"
                >
                    <FaArrowRightFromBracket className="w-3.5 shrink-0 text-xs text-(--muted)" />
                    {!collapsed && (
                        <span className="text-[13px] text-(--muted)">Esci</span>
                    )}
                </button>
            </div>
        </aside>
    );
}
