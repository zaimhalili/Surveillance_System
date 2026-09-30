import { useEffect, useRef, useState } from "react";
import {
    FaBackwardStep,
    FaDownload,
    FaExpand,
    FaForwardStep,
    FaPause,
    FaPlay,
    FaPerson,
    FaTowerBroadcast,
    FaShieldHalved,
    FaVideoSlash,
    FaVolumeHigh,
    FaVolumeXmark,
    FaXmark,
} from "react-icons/fa6";
import { CameraPreview } from "./CameraCard";
import type { Alert, Camera } from "./types/dashboard";

interface CameraModalProps {
    camera: Camera;
    playbackOffset: number;
    playbackSyncAt: number;
    initialMuted?: boolean;
    alerts: Alert[];
    detectionEnabled: boolean;
    time: Date;
    cameras: Camera[];
    onClose: () => void;
    onSelectCamera: (camera: Camera) => void;
}

export function CameraModal({
    camera,
    playbackOffset,
    playbackSyncAt,
    initialMuted = true,
    alerts,
    detectionEnabled,
    time,
    cameras,
    onClose,
    onSelectCamera,
}: CameraModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const escapeExitsFullscreenRef = useRef(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [isMuted, setIsMuted] = useState<boolean>(initialMuted);
    const [isLive, setIsLive] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [videoError, setVideoError] = useState(false);

    const cameraAlerts = alerts.filter((alert) => alert.cam === camera.name);

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (escapeExitsFullscreenRef.current) {
                    escapeExitsFullscreenRef.current = false;
                    if (document.fullscreenElement) {
                        void document.exitFullscreen().catch(() => undefined);
                    }
                } else {
                    onClose();
                }
            }
        };
        const handleFullscreenChange = () => {
            const isVideoFullscreen = document.fullscreenElement === videoRef.current;
            if (!isVideoFullscreen) {
                window.setTimeout(() => {
                    escapeExitsFullscreenRef.current = false;
                }, 1000);
            }
            setIsFullscreen(isVideoFullscreen);
        };
        window.addEventListener("keydown", handleKeyDown);
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, [onClose]);

    // Fullscreen toggle handler
    const handleToggleFullscreen = () => {
        const video = videoRef.current;
        if (!video) return;

        if (!document.fullscreenElement) {
            escapeExitsFullscreenRef.current = true;
            void video.requestFullscreen().catch(() => {
                escapeExitsFullscreenRef.current = false;
            });
        } else {
            void document.exitFullscreen().catch(() => undefined);
        }
    };

    const handleTogglePlayback = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            void video.play().catch(() => setIsPlaying(false));
        } else {
            video.pause();
        }
        setIsLive(false);
    };

    const handleGoLive = () => {
        const video = videoRef.current;
        if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
        const elapsed = playbackOffset + Math.max(0, Date.now() - playbackSyncAt) / 1000;
        video.currentTime = elapsed % video.duration;
        setIsLive(true);
        void video.play().catch(() => setIsPlaying(false));
    };

    const handleSeek = (seconds: number) => {
        const video = videoRef.current;
        if (!video || !Number.isFinite(video.duration)) return;
        video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
        setIsLive(false);
    };

    return (
        <div
            className="fixed inset-0 z-200 flex items-center justify-center bg-(--black)/85 p-2 sm:p-6"
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                ref={modalRef}
                className="flex max-h-[94vh] w-full max-w-275 flex-col overflow-hidden rounded-2xl bg-(--surface) sm:rounded-3xl"
            >
                {/* Modal Header */}
                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-(--line) px-4 py-3.5 sm:px-5">
                    <div className="flex min-w-0 items-center gap-3">
                        <span
                            className={`size-2 shrink-0 rounded-full ${camera.status === "online" ? "rec-dot bg-(--success)" : "bg-(--line)"
                                }`}
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
                        <button
                            aria-label="Close camera"
                            onClick={onClose}
                            className="flex size-9 items-center justify-center rounded-xl border border-(--line) bg-(--surface) text-(--muted) hover:text-(--ink)"
                        >
                            <FaXmark className="text-sm" />
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex min-h-0 flex-1 flex-col overflow-auto lg:flex-row">
                    {/* Stream View */}
                    <div className="relative min-h-70 flex-1 bg-(--black) sm:min-h-100">
                        {camera.status === "offline" ? (
                            <div className="flex min-h-70 flex-col items-center justify-center gap-3 sm:min-h-100">
                                <FaVideoSlash className="text-4xl text-(--muted-dark)" />
                                <p className="font-mono text-sm text-(--muted-dark)">
                                    Camera disconnected
                                </p>
                            </div>
                        ) : (
                            <>
                                <video
                                    ref={videoRef}
                                    src={camera.videoUrl}
                                    aria-label={`${camera.name} recording`}
                                    autoPlay
                                    loop
                                    controls={isFullscreen}
                                    muted={isMuted}
                                    playsInline
                                    preload="auto"
                                    className="size-full min-h-70 object-contain sm:min-h-100"
                                    onLoadedMetadata={(event) => {
                                        const video = event.currentTarget;
                                        if (Number.isFinite(video.duration) && video.duration > 0) {
                                            const elapsed = playbackOffset + Math.max(0, Date.now() - playbackSyncAt) / 1000;
                                            video.currentTime = elapsed % video.duration;
                                        }
                                        setIsLive(true);
                                        setVideoError(false);
                                        void video.play().catch(() => setIsPlaying(false));
                                    }}
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                    onError={() => setVideoError(true)}
                                />
                                {videoError && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-(--black)">
                                        <p className="font-mono text-sm text-(--muted-dark)">Recording unavailable</p>
                                    </div>
                                )}
                                <div className="absolute left-3.5 top-3.5 flex gap-2">
                                    {detectionEnabled && (
                                        <div className="rounded-[10px] bg-(--success) px-2.5 py-1.5">
                                            <span className="font-mono text-[10px] text-(--surface)">Detection demo active</span>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute right-3.5 top-3.5 rounded-[10px] bg-(--black)/50 px-2.5 py-1.5 backdrop-blur">
                                    <span className="font-mono text-[10px] text-(--surface)">
                                        {isLive ? "LIVE" : time.toLocaleTimeString("en-US")}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Sidebar Details Panel */}
                    <DetailsPanel
                        camera={camera}
                        playbackOffset={playbackOffset}
                        playbackSyncAt={playbackSyncAt}
                        alerts={cameraAlerts}
                        cameras={cameras}
                        onSelectCamera={onSelectCamera}
                        detectionEnabled={detectionEnabled}
                    />
                </div>

                {/* Video Controls Footer */}
                <div className="flex shrink-0 items-center justify-between border-t border-(--line) px-4 py-3 sm:px-5">
                    <div className="flex gap-1.5">
                        <button
                            type="button"
                            aria-label="Back 10 seconds"
                            title="Back 10 seconds"
                            onClick={() => handleSeek(-10)}
                            className="flex size-8 items-center justify-center rounded-[10px] border border-(--line) bg-(--surface) text-(--muted) transition-colors hover:text-(--ink)"
                        >
                            <FaBackwardStep className="text-[11px]" />
                        </button>
                        <button
                            type="button"
                            aria-label={isPlaying ? "Pause" : "Play"}
                            title={isPlaying ? "Pause" : "Play"}
                            onClick={handleTogglePlayback}
                            className="flex size-8 items-center justify-center rounded-[10px] border border-(--line) bg-(--surface) text-(--muted) transition-colors hover:text-(--ink)"
                        >
                            {isPlaying ? (
                                <FaPause className="text-[11px]" />
                            ) : (
                                <FaPlay className="text-[11px]" />
                            )}
                        </button>
                        <button
                            type="button"
                            aria-label="Forward 10 seconds"
                            title="Forward 10 seconds"
                            onClick={() => handleSeek(10)}
                            className="flex size-8 items-center justify-center rounded-[10px] border border-(--line) bg-(--surface) text-(--muted) transition-colors hover:text-(--ink)"
                        >
                            <FaForwardStep className="text-[11px]" />
                        </button>
                    </div>

                    <div className="flex gap-1.5">
                        <button
                            type="button"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                            title={isMuted ? "Unmute" : "Mute"}
                            onClick={() => setIsMuted((prev) => !prev)}
                            className="flex size-8 items-center justify-center rounded-[10px] border border-(--line) bg-(--surface) text-(--muted) transition-colors hover:text-(--ink)"
                        >
                            {isMuted ? (
                                <FaVolumeXmark className="text-[11px]" />
                            ) : (
                                <FaVolumeHigh className="text-[11px]" />
                            )}
                        </button>
                        {!isLive && (
                            <button
                                type="button"
                                aria-label="Go live"
                                title="Go live"
                                onClick={handleGoLive}
                                className="flex h-8 items-center gap-1.5 rounded-[10px] border border-(--success) px-2 text-[10px] font-semibold text-(--success)"
                            >
                                <FaTowerBroadcast />
                                <span className="hidden sm:inline">Go Live</span>
                            </button>
                        )}
                        <a
                            aria-label="Download recording"
                            title="Download recording"
                            href={camera.videoUrl}
                            download
                            className="flex size-8 items-center justify-center rounded-[10px] border border-(--line) bg-(--surface) text-(--muted) transition-colors hover:text-(--ink)"
                        >
                            <FaDownload className="text-[11px]" />
                        </a>
                        <button
                            type="button"
                            aria-label="Full screen video"
                            title="Full screen video"
                            onClick={handleToggleFullscreen}
                            className="flex size-8 items-center justify-center rounded-[10px] border border-(--line) bg-(--surface) text-(--muted) transition-colors hover:text-(--ink)"
                        >
                            <FaExpand className="text-[11px]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailsPanel({
    camera,
    playbackOffset,
    playbackSyncAt,
    alerts,
    cameras,
    onSelectCamera,
    detectionEnabled,
}: {
    camera: Camera;
    playbackOffset: number;
    playbackSyncAt: number;
    alerts: Alert[];
    cameras: Camera[];
    onSelectCamera: (camera: Camera) => void;
    detectionEnabled: boolean;
}) {
    return (
        <aside className="w-full shrink-0 overflow-y-auto border-t border-(--line) bg-(--surface) lg:w-65 lg:border-l lg:border-t-0">
            <div className="border-b border-(--line) p-4">
                <SectionTitle>Information</SectionTitle>
                {[
                    ["Resolution", camera.resolution],
                    ["Frame rate", `${camera.fps} fps`],
                    ["Location", camera.location],
                    ["Status", camera.status === "online" ? "Online" : "Offline"],
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
                <SectionTitle>Playback</SectionTitle>
                {[
                    ["Timeline", "Shared"],
                    ["Recording", "Looping sample"],
                    ["Detection demo", detectionEnabled ? "On" : "Off"],
                ].map(([label, value]) => (
                    <div
                        key={String(label)}
                        className="flex items-center justify-between gap-3 pb-2 last:pb-0"
                    >
                        <span className="text-xs text-(--muted-dark)">{label}</span>
                        <span className="font-mono text-[10px] text-(--ink)">{value}</span>
                    </div>
                ))}
            </div>
            <div className="p-4">
                <SectionTitle>Alert log</SectionTitle>
                {alerts.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 pt-5">
                        <FaShieldHalved className="text-2xl text-(--line)" />
                        <p className="font-mono text-[11px] text-(--muted-light)">
                            No alerts
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
                <SectionTitle>Other cameras</SectionTitle>
                <div className="flex flex-col gap-1.5">
                    {cameras
                        .filter((item) => item.id !== camera.id)
                        .slice(0, 3)
                        .map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onSelectCamera(item)}
                                className="flex items-center gap-2.5 rounded-[10px] border border-(--line) bg-(--surface) p-2 text-left transition-colors hover:bg-(--line)/20"
                            >
                                <div className="flex h-8 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-(--black)">
                                    <CameraPreview
                                        camera={item}
                                        playbackOffset={playbackOffset}
                                        playbackSyncAt={playbackSyncAt}
                                        className="size-full object-cover opacity-70"
                                    />
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