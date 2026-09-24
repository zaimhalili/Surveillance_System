import { FaPerson, FaTriangleExclamation, FaVideoSlash } from "react-icons/fa6";
import type { Camera } from "./types/dashboard";

interface CameraCardProps {
    cam: Camera;
    onClick: () => void;
}

export function CameraCard({ cam, onClick }: CameraCardProps) {
    return (
        <button
            onClick={onClick}
            className="group overflow-hidden rounded-2xl border border-(--line) bg-(--surface) text-left transition hover:-translate-y-0.5 hover:border-(--muted) focus:outline-2 focus:outline-offset-2 focus:outline-(--ink)"
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
                    <>
                        <img
                            src={cam.imgSrc}
                            alt={cam.name}
                            className="size-full object-cover opacity-60"
                        />
                        {cam.detectionBox && <DetectionBox camId={cam.id} />}
                        <div className="absolute left-2 top-2 flex items-center gap-1.5 rounded-[7px] bg-(--black)/45 px-1.5 py-0.5">
                            <span className="rec-dot size-1.5 rounded-full bg-(--success)" />
                            <span className="font-mono text-[8px] text-(--surface)">
                                LIVE
                            </span>
                        </div>
                        {cam.hasAlert && (
                            <div className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-md bg-(--danger)">
                                <FaTriangleExclamation className="text-[8px] text-(--surface)" />
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-(--ink)">
                        {cam.name}
                    </p>
                    <p className="font-mono text-[10px] text-(--muted)">{cam.location}</p>
                </div>
                <span
                    className={`size-1.5 shrink-0 rounded-full ${cam.status === "online" ? "bg-(--success)" : "bg-(--line)"}`}
                />
            </div>
        </button>
    );
}

export function DetectionBox({ camId }: { camId: number }) {
    return (
        <div className={`detect-box camera-${camId}-box`}>
            <div className="absolute -top-4 left-0 rounded-md bg-(--success) px-1.5 py-0.5 font-mono text-[8px] text-(--surface)">
                <FaPerson className="mr-1 inline" />
                Persona
            </div>
        </div>
    );
}
