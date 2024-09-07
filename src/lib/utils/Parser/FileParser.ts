import { promises as fs } from "fs";
import * as path from "path";

export class FileProcessor {
  public getFilesRecursively = async (dir: string): Promise<string[]> => {
    const files = await this.getAllFiles(dir);
    return files;
  };

  // Helper method to get all files in a directory recursively
  private getAllFiles = async (dir: string): Promise<string[]> => {
    let files: string[] = [];
    const items = await fs.readdir(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        files = files.concat(await this.getAllFiles(fullPath));
      } else {
        files.push(fullPath);
      }
    }
    return files;
  };
}
