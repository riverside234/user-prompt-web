import { promises as fs } from "fs";
import path from "path";

export const fetchAndParseJSONL = async (filePath) => {
  try {
    // Resolve the full path to the file
    const absolutePath = path.resolve(process.cwd(), filePath);

    // Read the file content
    const jsonlData = await fs.readFile(absolutePath, "utf-8");

    // Split the file content by newline to get individual JSON objects
    const lines = jsonlData.split("\n").filter((line) => line.trim() !== "");

    // Parse each line as JSON
    const parsedData = lines.map((line) => JSON.parse(line));

    return parsedData;
  } catch (error) {
    console.error("Error reading or parsing JSONL file:", error);
    return [];
  }
};
