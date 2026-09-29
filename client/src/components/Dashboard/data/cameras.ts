import type { Alert, Camera } from "../types/dashboard";

export const CAMERAS: Camera[] = [
    {
        id: 1,
        name: "Main Entrance",
        location: "First Floor",
        status: "online",
        hasAlert: true,
        imgSrc:
            "https://images.unsplash.com/photo-1765766599670-a625d0fef258?w=1200&h=900&fit=crop&auto=format",
        resolution: "1920×1080",
        fps: "30",
        detectionBox: true,
    },
    {
        id: 2,
        name: "Garage",
        location: "Outside",
        status: "online",
        hasAlert: false,
        imgSrc:
            "https://images.unsplash.com/photo-1496368077930-c1e31b4e5b44?w=1200&h=900&fit=crop&auto=format",
        resolution: "1920×1080",
        fps: "25",
    },
    {
        id: 3,
        name: "Backyard",
        location: "Outside",
        status: "online",
        hasAlert: false,
        imgSrc:
            "https://images.unsplash.com/photo-1582903032034-1e3f9c8f6bb9?w=1200&h=900&fit=crop&auto=format",
        resolution: "2560×1440",
        fps: "30",
    },
    {
        id: 4,
        name: "Corridor",
        location: "Second Floor",
        status: "offline",
        hasAlert: false,
        imgSrc: "",
        resolution: "1280×720",
        fps: "20",
    },
    {
        id: 5,
        name: "Living Room",
        location: "First Floor",
        status: "online",
        hasAlert: true,
        imgSrc:
            "https://images.unsplash.com/photo-1786455588540-a3a5238c7924?w=1200&h=900&fit=crop&auto=format",
        resolution: "1920×1080",
        fps: "30",
        detectionBox: true,
    },
    {
        id: 6,
        name: "Kitchen",
        location: "First Floor",
        status: "online",
        hasAlert: false,
        imgSrc:
            "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&h=900&fit=crop&auto=format",
        resolution: "1920×1080",
        fps: "25",
    },
];

export const ALERTS: Alert[] = [
    { id: 1, cam: "Main Entrance", time: "14:32", msg: "Person detected" },
    { id: 2, cam: "Living Room", time: "14:18", msg: "Person detected" },
    { id: 3, cam: "Backyard", time: "13:54", msg: "Movement detected" },
    { id: 4, cam: "Main Entrance", time: "13:20", msg: "Person detected" },
];
