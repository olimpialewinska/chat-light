import Store, { Schema } from "electron-store";

interface UserData {
  userData: {
    theme: string;
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
    },
  },
};

export const store = new Store<UserData>({ schema });
