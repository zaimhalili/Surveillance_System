import {
    FaAnglesLeft,
    FaAnglesRight,
    FaArrowRightFromBracket,
    // FaBell,
    FaChartLine,
    FaGear,
    FaGrip,
    FaUser,
    FaVideo,
} from "react-icons/fa6";

export type DashboardSection = "cameras" | "activity" | "settings";

interface SidebarProps {
    collapsed: boolean;
    activeSection: DashboardSection;
    alertCount: number;
    onToggle: () => void;
    onNavigate: (section: DashboardSection) => void;
    onExit: () => void;
}

export function Sidebar({
    collapsed,
    activeSection,
    alertCount,
    onToggle,
    onNavigate,
    onExit,
}: SidebarProps) {
    const items = [
        { icon: FaGrip, label: "Cameras", section: "cameras" as const },
        { icon: FaChartLine, label: "Activity", section: "activity" as const, badge: alertCount },
        { icon: FaGear, label: "Settings", section: "settings" as const },
    ];

    return (
        <aside
            className={`flex min-h-screen max-h-screen shrink-0 flex-col overflow-hidden border-r border-(--line) bg-(--surface) transition-[width] duration-200 ${collapsed ? "w-16" : "w-55"} max-md:inset-y-0 max-md:z-50`}
        >
            <div className="flex h-16 shrink-0 items-center gap-2.5 overflow-hidden border-b border-(--line) px-3.5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-(--ink)">
                    <FaVideo className="text-xs text-(--surface)" />
                </div>
                {!collapsed && (
                    <span className="whitespace-nowrap text-[13px] font-semibold text-(--ink)">
                        CCTV System
                    </span>
                )}
            </div>
            <nav className="flex flex-1 flex-col gap-0.5 p-2">
                {items.map(({ icon: Icon, label, section, badge }) => (
                    <button
                        key={label}
                        type="button"
                        aria-label={label}
                        title={collapsed ? label : undefined}
                        aria-current={activeSection === section ? "page" : undefined}
                        onClick={() => onNavigate(section)}
                        className={`flex items-center overflow-hidden active:scale-95 justify-center gap-2.5 rounded-xl transition-all px-3 py-2.5 ${activeSection === section ? "bg-(--ink) text-(--white)" : "bg-transparent hover:bg-(--page)"}`}
                    >
                        <Icon className="w-3.5 shrink-0 text-center text-[13px]" />
                        {!collapsed && (
                            <>
                                <span className="flex-1 whitespace-nowrap text-left text-[13px]">
                                    {label}
                                </span>
                                {!!badge && (
                                    <span className="rounded-lg bg-(--ink) px-1.5 py-px font-mono text-[10px] text-(--surface)">
                                        {badge}
                                    </span>
                                )}
                            </>
                        )}
                    </button>
                ))}
            </nav>
            <div className="flex flex-col gap-0.5 border-t border-(--line) p-2">
                <button
                    onClick={onToggle}
                    type="button"
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-transparent px-3 py-2.5 text-left hover:bg-(--black) hover:text-(--white)! transition-all active:scale-95"
                >
                    {collapsed ? (
                        <FaAnglesRight className="w-3.5 shrink-0 text-xs" />
                    ) : (
                        <FaAnglesLeft className="w-3.5 shrink-0 text-xs" />
                    )}
                    {!collapsed && (
                        <span className="text-xs flex-1">Collapse</span>
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => onNavigate("settings")}
                    title={collapsed ? "Profile and settings" : undefined}
                    className="flex w-full items-center gap-2.5 overflow-hidden justify-center px-3 py-2.5 hover:bg-(--page) transition-all active:scale-95 rounded-xl"
                >
                    <div className="flex items-center justify-center rounded-full text-xs">
                        <FaUser />
                    </div>
                    {!collapsed && (
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold">
                                Demo Operator
                            </p>
                            <p className="font-mono text-xs">
                                Main Villa
                            </p>
                        </div>
                    )}
                </button>
                <button
                    onClick={onExit}
                    type="button"
                    title={collapsed ? "Sign out" : undefined}
                    className="flex w-full items-center gap-2.5 overflow-hidden rounded-xl bg-transparent px-3 py-2.5 text-left hover:bg-(--black) hover:text-(--white)! transition-all justify-center active:scale-95"
                >
                    <FaArrowRightFromBracket className="w-3.5 shrink-0 text-xs" />
                    {!collapsed && (
                        <span className="text-xs flex-1 text-left">Sign out</span>
                    )}
                </button>
            </div>
        </aside>
    );
}
