export interface Electron {
  ipcRenderer: {
    send: (channel: string, ...args: any[]) => void;
  };
}

declare global {
  interface Window {
    electron: Electron;
  }
}
