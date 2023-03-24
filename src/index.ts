import { generator } from "./zodOpenApi";
import fs from "fs";

export const writeFile = (path: string, data: string) => {
  try {
    return fs.writeFileSync(path, data);
  } catch (_) {
    throw new Error("Не удалось записать файл");
  }
};

export const generate = () => {
  const openApi = generator.generateDocument({
    info: {
      version: "1.0.0",
      title: "My API",
      description: "This is the API"
    },
    servers: [{ url: "v1" }]
  });
  writeFile("../openApi.json", openApi.openapi);
};
