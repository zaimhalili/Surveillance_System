import type { IconType } from "react-icons";

export interface Camera {
  id: number;
  name: string;
  location: string;
  status: "online" | "offline";
  hasAlert: boolean;
  imgSrc: string;
  resolution: string;
  fps: string;
  detectionBox?: boolean;
}

export interface Alert {
  id: number;
  cam: string;
  time: string;
  msg: string;
}

export interface NavItem {
  icon: IconType;
  label: string;
  active?: boolean;
  badge?: number;
}
