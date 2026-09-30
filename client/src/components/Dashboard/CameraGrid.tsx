import { CameraCard } from "./CameraCard";
import type { Camera } from "./types/dashboard";
import { FaPersonRays } from "react-icons/fa6";

export function CameraGrid({
    cameras,
    onlineCount,
    detectionEnabled,
    scanningCameraId,
    onToggleDetection,
    onSelect,
}: {
    cameras: Camera[];
    onlineCount: number;
    detectionEnabled: boolean;
    scanningCameraId: number | null;
    onToggleDetection: () => void;
    onSelect: (camera: Camera) => void;
}) {
    return (
        <section className="min-w-0 flex-1">
            <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[13px] font-semibold text-(--ink)">
                    Live cameras
                </p>
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        aria-pressed={detectionEnabled}
                        aria-label={detectionEnabled ? "Stop detection demo on all cameras" : "Start detection demo on all cameras"}
                        onClick={onToggleDetection}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${detectionEnabled ? "border-(--success) bg-(--success) text-(--surface)" : "border-(--line) bg-(--surface) text-(--ink) hover:bg-(--page)"}`}
                    >
                        <FaPersonRays />
                        <span>{detectionEnabled ? "Stop all detections" : "Start all detection (demo)"}</span>
                    </button>
                    <span className="font-mono text-[11px] text-(--muted)">
                        {onlineCount}/{cameras.length} online
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {cameras.map((camera) => (
                    <CameraCard
                        key={camera.id}
                        cam={camera}
                        detectionEnabled={detectionEnabled}
                        scanning={camera.id === scanningCameraId}
                        onClick={() => onSelect(camera)}
                    />
                ))}
            </div>
        </section>
    );
}
