import { url } from "../constants/url";

export async function send(message: string, files: File[] | null) {
  const data = new FormData();
  data.append("message", message);
  if (files) {
    files.forEach((file) => {
      data.append("file", file);
    });
  }

  try {
    const response = await fetch(`${url}/photo`, {
      method: "POST",
      body: data,
    });
    return await response.text();
  } catch (e) {
    return "Unexpected error occurred";
  }
}
