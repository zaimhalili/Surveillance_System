import type { Camera } from "../components/Dashboard/types/dashboard";

interface SyncTimeResponse {
    playbackOffset: number;
}

export interface CameraData {
    cameras: Camera[];
    playbackOffset: number;
}

export async function fetchCameraData(signal: AbortSignal): Promise<CameraData> {
    const [camerasResponse, syncResponse] = await Promise.all([
        fetch("/api/cameras", { signal }),
        fetch("/api/sync-time", { signal }),
    ]);

    if (!camerasResponse.ok || !syncResponse.ok) {
        throw new Error("The camera server could not be reached.");
    }

    const cameras: Camera[] = await camerasResponse.json();
    const syncTime: SyncTimeResponse = await syncResponse.json();
    return { cameras, playbackOffset: syncTime.playbackOffset };
}