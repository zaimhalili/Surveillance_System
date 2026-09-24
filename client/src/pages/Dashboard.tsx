import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertsPanel } from "../components/Dashboard/AlertsPanel";
import { CameraGrid } from "../components/Dashboard/CameraGrid";
import { CameraModal } from "../components/Dashboard/CameraModal";
import { ALERTS, CAMERAS } from "../components/Dashboard/data/cameras";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { StatsGrid } from "../components/Dashboard/StatsGrid";
import { TopBar } from "../components/Dashboard/TopBar";
import type { Alert, Camera } from "../components/Dashboard/types/dashboard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Camera | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [detectionActive, setDetectionActive] = useState(false);
  const [liveAlerts, setLiveAlerts] = useState<Alert[]>(ALERTS);
  const [time, setTime] = useState(new Date());
  const [collapsed, setCollapsed] = useState(false);
  const alertIdRef = useRef(10);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!detecting) {
      setDetectionActive(false);
      return;
    }
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
          msg: "Persona rilevata",
        },
        ...previous.slice(0, 9),
      ]);
    }, 900);
    return () => clearTimeout(timer);
  }, [detecting, selected]);

  const onlineCount = CAMERAS.filter(
    (camera) => camera.status === "online",
  ).length;
  const alertCount = CAMERAS.filter((camera) => camera.hasAlert).length;
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
        alertCount={alertCount}
        onToggle={() => setCollapsed((value) => !value)}
        onExit={() => navigate("/")}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar alertCount={alertCount} time={time} />
        <main className="flex-1 overflow-y-auto p-6 max-sm:p-4">
          <div className="flex flex-col gap-5">
            <StatsGrid
              onlineCount={onlineCount}
              alertCount={alertCount}
              cameraCount={CAMERAS.length}
              time={time}
            />
            <div className="flex items-start gap-4 max-xl:flex-col">
              <CameraGrid
                cameras={CAMERAS}
                onlineCount={onlineCount}
                onSelect={setSelected}
              />
              <div className="w-60 shrink-0 max-xl:w-full">
                <AlertsPanel alerts={liveAlerts} />
              </div>
            </div>
          </div>
        </main>
      </div>
      {selected && (
        <CameraModal
          camera={selected}
          alerts={liveAlerts}
          detecting={detecting}
          detectionActive={detectionActive}
          time={time}
          cameras={CAMERAS}
          onDetect={() => setDetecting((value) => !value)}
          onClose={closeCamera}
          onSelectCamera={selectCamera}
        />
      )}
    </div>
  );
}
