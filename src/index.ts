import fs from "fs";

export const writeFile = (path: string, data: string) => {
  try {
    return fs.writeFileSync(path, data);
  } catch (_) {
    throw new Error("Не удалось записать файл");
  }
};
