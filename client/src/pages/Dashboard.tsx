import { startTransition, useEffect, useEffectEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertsPanel } from "../components/Dashboard/AlertsPanel";
import { CameraGrid } from "../components/Dashboard/CameraGrid";
import { CameraModal } from "../components/Dashboard/CameraModal";
import { ALERTS } from "../components/Dashboard/data/cameras";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { StatsGrid } from "../components/Dashboard/StatsGrid";
import { TopBar } from "../components/Dashboard/TopBar";
import type { Alert, Camera } from "../components/Dashboard/types/dashboard";
import { fetchCameraData, type CameraData } from "../services/cameras";

export default function Dashboard() {
    const navigate = useNavigate();
    const [cameras, setCameras] = useState<Camera[]>([]);
    const [serverError, setServerError] = useState("");
    const [retry, setRetry] = useState(0);
    const [playbackSync, setPlaybackSync] = useState({
        offset: 0,
        receivedAt: 0,
    });
    const [selected, setSelected] = useState<Camera | null>(null);
    const [detecting, setDetecting] = useState(false);
    const [detectionActive, setDetectionActive] = useState(false);
    const [liveAlerts, setLiveAlerts] = useState<Alert[]>(ALERTS);
    const [time, setTime] = useState(new Date());
    const [collapsed, setCollapsed] = useState(false);
    const alertIdRef = useRef(10);

    const handleCameraData = useEffectEvent((data: CameraData) => {
        startTransition(() => {
            setCameras(data.cameras);
            setPlaybackSync({ offset: data.playbackOffset, receivedAt: Date.now() });
            setServerError("");
        });
    });

    const handleCameraError = useEffectEvent((error: unknown) => {
        startTransition(() => {
            setServerError(error instanceof Error ? error.message : "Camera server unavailable.");
        });
    });

    useEffect(() => {
        const controller = new AbortController();
        fetchCameraData(controller.signal)
            .then(handleCameraData)
            .catch((error: unknown) => {
                if (!controller.signal.aborted) handleCameraError(error);
            });
        return () => controller.abort();
    }, [retry]);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!detecting) return;
        const timer = setTimeout(() => {
            setDetectionActive(true);
            alertIdRef.current += 1;
            setLiveAlerts((previous) => [
                {
                    id: alertIdRef.current,
                    cam: selected?.name ?? "Telecamera",
                    time: new Date().toLocaleTimeString("it-IT", {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                    msg: "Person detected",
                },
                ...previous.slice(0, 9),
            ]);
        }, 900);
        return () => clearTimeout(timer);
    }, [detecting, selected]);

    const onlineCount = cameras.filter(
        (camera) => camera.status === "online",
    ).length;
    const alertCount = cameras.filter((camera) => camera.hasAlert).length;
    const closeCamera = () => {
        setSelected(null);
        setDetecting(false);
        setDetectionActive(false);
    };
    const selectCamera = (camera: Camera) => {
        setSelected(camera);
        setDetecting(false);
        setDetectionActive(false);
    };

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeCamera();
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    });

    return (
        <div className="flex min-h-screen bg-(--page) font-sans text-(--ink)">
            <Sidebar
                collapsed={collapsed}
                onToggle={() => setCollapsed((value) => !value)}
                onExit={() => navigate("/")}
            />
            <div className="flex min-w-0 flex-1 flex-col overflow-y-auto max-h-screen">
                <TopBar alertCount={alertCount} time={time} />
                <main className="flex-1 overflow-y-auto p-6 max-sm:p-4">
                    <div className="flex flex-col gap-5">
                        <StatsGrid
                            onlineCount={onlineCount}
                            alertCount={alertCount}
                            cameraCount={cameras.length}
                            time={time}
                        />
                        {serverError ? (
                            <div className="flex items-center justify-between gap-4 border border-(--danger-line) bg-(--danger-soft) p-4" role="alert">
                                <p className="text-sm text-(--ink)">{serverError} Start the server on port 5000.</p>
                                <button className="shrink-0 text-sm font-semibold text-(--ink) underline" onClick={() => {
                                    setServerError("");
                                    setRetry((value) => value + 1);
                                }}>
                                    Retry
                                </button>
                            </div>
                        ) : cameras.length === 0 ? (
                            <p className="py-8 text-center text-sm text-(--muted)" role="status">Connecting to camera network...</p>
                        ) : (
                        <div className="flex items-start gap-4 max-xl:flex-col">
                            <CameraGrid
                                cameras={cameras}
                                onlineCount={onlineCount}
                                onSelect={setSelected}
                            />
                            <div className="w-60 shrink-0 max-xl:w-full">
                                <AlertsPanel alerts={liveAlerts} />
                            </div>
                        </div>
                        )}
                    </div>
                </main>
            </div>
            {selected && (
                <CameraModal
                    camera={selected}
                    playbackOffset={playbackSync.offset}
                    playbackSyncAt={playbackSync.receivedAt}
                    alerts={liveAlerts}
                    detecting={detecting}
                    detectionActive={detectionActive}
                    time={time}
                    cameras={cameras}
                    onDetect={() => {
                        setDetectionActive(false);
                        setDetecting((value) => !value);
                    }}
                    onClose={closeCamera}
                    onSelectCamera={selectCamera}
                />
            )}
        </div>
    );
}
