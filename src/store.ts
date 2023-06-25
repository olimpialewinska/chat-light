import Store, { Schema } from "electron-store";

interface UserData {
  userData: {
    theme: string;
    autostart: boolean;
  };
}

const schema: Schema<UserData> = {
  userData: {
    type: "object",
    properties: {
      theme: {
        type: "string",
        default: "light",
        enum: ["light", "dark"],
      },
      autostart: {
        type: "boolean",
        default: true,
      },
    },
  },
};

export const store = new Store<UserData>({ schema });
