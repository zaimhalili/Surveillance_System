import { CameraCard } from "./CameraCard";
import type { Camera } from "./types/dashboard";

export function CameraGrid({
    cameras,
    playbackOffset,
    playbackSyncAt,
    onlineCount,
    onSelect,
}: {
    cameras: Camera[];
    playbackOffset: number;
    playbackSyncAt: number;
    onlineCount: number;
    onSelect: (camera: Camera) => void;
}) {
    return (
        <section className="min-w-0 flex-1">
            <div className="mb-3.5 flex items-center justify-between gap-3">
                <p className="text-[13px] font-semibold text-(--ink)">
                    Live cameras
                </p>
                <span className="font-mono text-[11px] text-(--muted)">
                    {onlineCount}/{cameras.length} online
                </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {cameras.map((camera) => (
                    <CameraCard
                        key={camera.id}
                        cam={camera}
                        playbackOffset={playbackOffset}
                        playbackSyncAt={playbackSyncAt}
                        onClick={() => onSelect(camera)}
                    />
                ))}
            </div>
        </section>
    );
}
