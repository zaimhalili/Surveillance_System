import {
    FaBackwardStep,
    FaDownload,
    FaExpand,
    FaForwardStep,
    FaPause,
    FaPerson,
    FaPersonRays,
    FaScissors,
    FaShieldHalved,
    FaTriangleExclamation,
    FaVideoSlash,
    FaVolumeHigh,
    FaXmark,
} from "react-icons/fa6";
import { DetectionBox } from "./CameraCard";
import type { Alert, Camera } from "./types/dashboard";

interface CameraModalProps {
    camera: Camera;
    alerts: Alert[];
    detecting: boolean;
    detectionActive: boolean;
    time: Date;
    cameras: Camera[];
    onDetect: () => void;
    onClose: () => void;
    onSelectCamera: (camera: Camera) => void;
}

export function CameraModal({
    camera,
    alerts,
    detecting,
    detectionActive,
    time,
    cameras,
    onDetect,
    onClose,
    onSelectCamera,
}: CameraModalProps) {
    const cameraAlerts = alerts.filter((alert) => alert.cam === camera.name);
    return (
        <div
            className="fixed inset-0 z-200 flex items-center justify-center bg-(--black)/85 p-2 sm:p-6"
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div className="flex max-h-[94vh] w-full max-w-275 flex-col overflow-hidden rounded-2xl bg-(--surface) sm:rounded-3xl">
                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-(--line) px-4 py-3.5 sm:px-5">
                    <div className="flex min-w-0 items-center gap-3">
                        <span
                            className={`size-2 shrink-0 rounded-full ${camera.status === "online" ? "rec-dot bg-(--success)" : "bg-(--line)"}`}
                        />
                        <div className="min-w-0">
                            <p className="truncate text-[15px] font-semibold text-(--ink)">
                                {camera.name}
                            </p>
                            <p className="truncate font-mono text-[11px] text-(--muted)">
                                {camera.location} · CAM-0{camera.id} · {camera.resolution} ·{" "}
                                {camera.fps}fps
                            </p>
                        </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                        {camera.status === "online" && (
                            <button
                                onClick={onDetect}
                                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium ${detecting ? "border-(--ink) bg-(--ink) text-(--surface)" : "border-(--line) bg-(--surface) text-(--ink)"}`}
                            >
                                <FaPersonRays className="text-xs" />
                                <span className="hidden sm:inline">
                                    {detecting ? "Stop rilevamento" : "Avvia rilevamento"}
                                </span>
                            </button>
                        )}
                        <button
                            aria-label="Chiudi"
                            onClick={onClose}
                            className="flex size-9 items-center justify-center rounded-xl border border-(--line) bg-(--surface) text-(--muted)"
                        >
                            <FaXmark className="text-sm" />
                        </button>
                    </div>
                </div>
                <div className="flex min-h-0 flex-1 flex-col overflow-auto lg:flex-row">
                    <div className="relative min-h-70 flex-1 bg-(--black) sm:min-h-100">
                        {camera.status === "offline" ? (
                            <div className="flex min-h-70 flex-col items-center justify-center gap-3 sm:min-h-100">
                                <FaVideoSlash className="text-4xl text-(--muted-dark)" />
                                <p className="font-mono text-sm text-(--muted-dark)">
                                    Telecamera disconnessa
                                </p>
                            </div>
                        ) : (
                            <>
                                <img
                                    src={camera.imgSrc}
                                    alt={camera.name}
                                    className="size-full min-h-70 object-cover opacity-65 sm:min-h-100"
                                />
                                {detectionActive && camera.detectionBox && (
                                    <>
                                        <DetectionBox camId={camera.id} />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="hidden" />
                                        </div>
                                    </>
                                )}
                                {detecting && !detectionActive && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="flex items-center gap-2.5 rounded-[14px] bg-(--black)/60 px-5 py-3">
                                            <span className="spin size-3.5 rounded-full border-2 border-(--surface)/30 border-t-(--surface)" />
                                            <span className="font-mono text-xs text-(--surface)">
                                                Analisi in corso...
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <div className="absolute left-3.5 top-3.5 flex gap-2">
                                    <div className="flex items-center gap-1.5 rounded-[10px] bg-(--black)/50 px-2.5 py-1.5 backdrop-blur">
                                        <span className="rec-dot size-1.5 rounded-full bg-(--success)" />
                                        <span className="font-mono text-[10px] text-(--surface)">
                                            LIVE
                                        </span>
                                    </div>
                                    {detectionActive && (
                                        <div className="flex items-center gap-1.5 rounded-[10px] bg-(--success) px-2.5 py-1.5">
                                            <FaTriangleExclamation className="text-[9px] text-(--surface)" />
                                            <span className="font-mono text-[10px] text-(--surface)">
                                                Persona rilevata
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute right-3.5 top-3.5 rounded-[10px] bg-(--black)/50 px-2.5 py-1.5 backdrop-blur">
                                    <span className="font-mono text-[10px] text-(--surface)">
                                        {time.toLocaleTimeString("it-IT")}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                    <DetailsPanel
                        camera={camera}
                        alerts={cameraAlerts}
                        cameras={cameras}
                        onSelectCamera={onSelectCamera}
                        detecting={detecting}
                    />
                </div>
                <div className="flex shrink-0 items-center justify-between border-t border-(--line) px-4 py-3 sm:px-5">
                    <div className="flex gap-1.5">
                        {[FaBackwardStep, FaPause, FaForwardStep].map((Icon, index) => (
                            <button
                                aria-label={`Controllo ${index + 1}`}
                                key={index}
                                className="flex size-8 items-center justify-center rounded-[10px] border border-(--line) bg-(--surface) text-(--muted)"
                            >
                                <Icon className="text-[11px]" />
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-1.5">
                        {[FaVolumeHigh, FaDownload, FaScissors, FaExpand].map(
                            (Icon, index) => (
                                <button
                                    aria-label={`Azione ${index + 1}`}
                                    key={index}
                                    className="flex size-8 items-center justify-center rounded-[10px] border border-(--line) bg-(--surface) text-(--muted)"
                                >
                                    <Icon className="text-[11px]" />
                                </button>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailsPanel({
    camera,
    alerts,
    cameras,
    onSelectCamera,
    detecting,
}: {
    camera: Camera;
    alerts: Alert[];
    cameras: Camera[];
    onSelectCamera: (camera: Camera) => void;
    detecting: boolean;
}) {
    return (
        <aside className="w-full shrink-0 overflow-y-auto border-t border-(--line) bg-(--surface) lg:w-65 lg:border-l lg:border-t-0">
            <div className="border-b border-(--line) p-4">
                <SectionTitle>Informazioni</SectionTitle>
                {[
                    ["Risoluzione", camera.resolution],
                    ["Frame rate", `${camera.fps} fps`],
                    ["Posizione", camera.location],
                    ["Stato", camera.status === "online" ? "Online" : "Offline"],
                ].map(([label, value]) => (
                    <div
                        key={label}
                        className="flex justify-between gap-3 pb-2 last:pb-0"
                    >
                        <span className="text-xs text-(--muted)">{label}</span>
                        <span className="font-mono text-xs font-medium text-(--ink)">
                            {value}
                        </span>
                    </div>
                ))}
            </div>
            <div className="border-b border-(--line) p-4">
                <SectionTitle>Rilevamento</SectionTitle>
                {[
                    ["Persone", detecting],
                    ["Notifiche push", true],
                    ["Registrazione", true],
                ].map(([label, on]) => (
                    <div
                        key={String(label)}
                        className="flex items-center justify-between gap-3 pb-2 last:pb-0"
                    >
                        <span className="text-xs text-(--muted-dark)">{label}</span>
                        <span
                            className={`relative h-4.5 w-8 rounded-full ${on ? "bg-(--ink)" : "bg-(--line)"}`}
                        >
                            <span
                                className={`absolute top-0.75 size-3 rounded-full bg-(--surface) transition-[left] ${on ? "left-4.25" : "left-0.75"}`}
                            />
                        </span>
                    </div>
                ))}
            </div>
            <div className="p-4">
                <SectionTitle>Registro avvisi</SectionTitle>
                {alerts.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 pt-5">
                        <FaShieldHalved className="text-2xl text-(--line)" />
                        <p className="font-mono text-[11px] text-(--muted-light)">
                            Nessun avviso
                        </p>
                    </div>
                ) : (
                    alerts.map((alert) => (
                        <div key={alert.id} className="flex gap-2 pb-2.5">
                            <div className="flex size-5 shrink-0 items-center justify-center rounded-md border border-(--danger-line) bg-(--danger-soft)">
                                <FaPerson className="text-[8px] text-(--danger)" />
                            </div>
                            <div>
                                <p className="text-[11px] text-(--ink)">{alert.msg}</p>
                                <p className="font-mono text-[10px] text-(--muted-light)">
                                    {alert.time}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="border-t border-(--line) p-4">
                <SectionTitle>Altre telecamere</SectionTitle>
                <div className="flex flex-col gap-1.5">
                    {cameras
                        .filter((item) => item.id !== camera.id)
                        .slice(0, 3)
                        .map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onSelectCamera(item)}
                                className="flex items-center gap-2.5 rounded-[10px] border border-(--line) bg-(--surface) p-2 text-left"
                            >
                                <div className="flex h-8 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-(--black)">
                                    {item.imgSrc && (
                                        <img
                                            src={item.imgSrc}
                                            alt={item.name}
                                            className="size-full object-cover opacity-60"
                                        />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-[11px] font-medium text-(--ink)">
                                        {item.name}
                                    </p>
                                    <p className="font-mono text-[10px] text-(--muted)">
                                        {item.location}
                                    </p>
                                </div>
                            </button>
                        ))}
                </div>
            </div>
        </aside>
    );
}

function SectionTitle({ children }: { children: string }) {
    return (
        <p className="pb-3 text-[11px] font-semibold uppercase tracking-[1px] text-(--ink)">
            {children}
        </p>
    );
}
