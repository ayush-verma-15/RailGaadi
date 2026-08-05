import { create } from 'zustand';

interface TelemetryState {
  followCameraMode: boolean;
  activeViewTab: 'map' | 'weather' | 'analytics' | 'eco';
  autoRefreshIntervalSec: number;
  setFollowCameraMode: (enabled: boolean) => void;
  setActiveViewTab: (tab: 'map' | 'weather' | 'analytics' | 'eco') => void;
  setAutoRefreshIntervalSec: (sec: number) => void;
}

export const useTelemetryStore = create<TelemetryState>((set) => ({
  followCameraMode: true,
  activeViewTab: 'map',
  autoRefreshIntervalSec: 30,
  setFollowCameraMode: (enabled) => set({ followCameraMode: enabled }),
  setActiveViewTab: (tab) => set({ activeViewTab: tab }),
  setAutoRefreshIntervalSec: (sec) => set({ autoRefreshIntervalSec: sec }),
}));
