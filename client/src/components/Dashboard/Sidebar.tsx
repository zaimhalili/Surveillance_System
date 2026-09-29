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
import { Link } from "react-router-dom";

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    onExit: () => void;
}

export function Sidebar({
    collapsed,
    onToggle,
    onExit,
}: SidebarProps) {
    const items = [
        { icon: FaGrip, label: "Cameras", active: true },
        { icon: FaChartLine, label: "Activity", badge: 0 },
        { icon: FaGear, label: "Settings", badge: 0 },
    ];

    return (
        <aside
            className={`flex min-h-screen max-h-screen shrink-0 flex-col overflow-hidden border-r border-(--line) bg-(--surface) transition-[width] duration-200 ${collapsed ? "w-16" : "w-55"} max-md:inset-y-0 max-md:z-50 ${collapsed ? "max-md:-translate-x-full" : "max-md:translate-x-0"}`}
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
                {items.map(({ icon: Icon, label, active, badge }) => (
                    <button
                        key={label}
                        className={`flex items-center overflow-hidden active:scale-95 justify-center rounded-xl transition-all px-3 py-2.5 ${active ? "bg-(--ink) hover:bg-(--ink)/80 text-(--white)" : "bg-transparent hover:bg-(--black) hover:text-(--white)"}`}
                    >
                        <Icon
                            className={`w-3.5 shrink-0 text-center text-[13px]`}
                        />
                        {!collapsed && (
                            <>
                                <span
                                    className={`flex-1 whitespace-nowrap text-[13px]`}
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
                    </button>
                ))}
            </nav>
            <div className="flex flex-col gap-0.5 border-t border-(--line) p-2">
                <button
                    onClick={onToggle}
                    className="flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-transparent px-3 py-2.5 text-left hover:bg-(--black) hover:text-(--white)! transition-all active:scale-95"
                >
                    {collapsed ? (
                        <FaAnglesRight className="w-3.5 shrink-0 text-xs" />
                    ) : (
                        <FaAnglesLeft className="w-3.5 shrink-0 text-xs" />
                    )}
                    {!collapsed && (
                        <span className="text-xs flex-1">Reduce</span>
                    )}
                </button>
                <div className="flex items-center gap-2.5 overflow-hidden justify-center px-3 py-2.5 hover:bg-(--black) hover:text-(--white)! transition-all active:scale-95 rounded-xl">
                    <div className="flex items-center justify-center rounded-full text-xs">
                        <FaUser />
                    </div>
                    {!collapsed && (
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold">
                                John Pork
                            </p>
                            <p className="font-mono text-xs">
                                Main Villa
                            </p>
                        </div>
                    )}
                </div>
                <button
                    onClick={onExit}
                    className="flex w-full items-center gap-2.5 overflow-hidden rounded-xl bg-transparent px-3 py-2.5 text-left hover:bg-(--black) hover:text-(--white)! transition-all justify-center active:scale-95"
                >
                    <FaArrowRightFromBracket className="w-3.5 shrink-0 text-xs" />
                    {!collapsed && (
                        <Link to="/" className="text-xs flex-1">
                            Sign out
                        </Link>
                    )}
                </button>
            </div>
        </aside>
    );
}
