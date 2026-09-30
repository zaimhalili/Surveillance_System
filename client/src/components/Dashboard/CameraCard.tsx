import { FaPerson, FaVideoSlash } from "react-icons/fa6";
import type { Camera } from "./types/dashboard";

interface CameraCardProps {
    cam: Camera;
    detectionEnabled: boolean;
    scanning: boolean;
    onClick: () => void;
}

export function CameraCard({ cam, detectionEnabled, scanning, onClick }: CameraCardProps) {
    return (
        <button
            onClick={onClick}
            className="group overflow-hidden rounded-2xl border border-(--line) bg-(--surface) text-left transition-all hover:shadow-2xl active:scale-99 focus:outline-2 focus:outline-offset-2 focus:outline-(--ink)"
        >
            <div className="relative aspect-video bg-(--black)">
                {cam.status === "offline" ? (
                    <div className="flex size-full flex-col items-center justify-center gap-1.5">
                        <FaVideoSlash className="text-xl text-(--muted-dark)" />
                        <span className="font-mono text-[10px] text-(--muted-dark)">
                            Offline
                        </span>
                    </div>
                ) : (
                    <img
                        src={cam.imgSrc}
                        alt={`${cam.name} camera preview`}
                        loading="lazy"
                        className="size-full object-cover"
                    />
                )}
                {detectionEnabled && cam.status === "online" && (
                    <span className="absolute left-2 top-2 rounded-md bg-(--success) px-2 py-1 font-mono text-[9px] text-(--surface)">
                        {scanning ? "Demo scan" : "Detection on"}
                    </span>
                )}
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-(--ink)">
                        {cam.name}
                    </p>
                    <p className="font-mono text-[10px] text-(--muted)">{cam.location}</p>
                </div>
                {/* <span
                    className={`size-1.5 shrink-0 rounded-full ${cam.status === "online" ? "bg-(--success)" : "bg-(--line)"}`}
                /> */}
            </div>
        </button>
    );
}

export function CameraPreview({
    camera,
    className,
}: {
    camera: Camera;
    playbackOffset?: number;
    playbackSyncAt?: number;
    className: string;
}) {
    return (
        <img
            src={camera.imgSrc}
            alt={`${camera.name} camera preview`}
            loading="lazy"
            className={className}
        />
    );
}

export function DetectionBox({ camId }: { camId: number }) {
    return (
        <div className={`detect-box camera-${camId}-box`}>
            <div className="absolute -top-4 left-0 rounded-md bg-(--success) px-1.5 py-0.5 font-mono text-[8px] text-(--surface)">
                <FaPerson className="mr-1 inline" />
                Person
            </div>
        </div>
    );
}
