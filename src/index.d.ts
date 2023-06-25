export interface Electron {
  ipcRenderer: {
    send: (channel: string, ...args: any[]) => void;
    on: (channel: string, listener: (...args: any[]) => void) => void;
  };
}

declare global {
  interface Window {
    electron: Electron;
  }
}
