import fs from "fs";
import mammoth from "mammoth";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export const extractTextFromResume = async (filePath, originalName) => {
  const lowerName = originalName.toLowerCase();

  if (lowerName.endsWith(".pdf")) {
    const buffer = fs.readFileSync(filePath);

    const data = await pdfParse(buffer);

    console.log("PDF Extracted Length:", data.text ? data.text.length : 0);
    console.log("PDF Extracted Preview:", data.text ? data.text.slice(0, 300) : "");

    return data.text ? data.text.trim() : "";
  }

  if (lowerName.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ path: filePath });

    console.log("DOCX Extracted Length:", result.value ? result.value.length : 0);
    console.log("DOCX Extracted Preview:", result.value ? result.value.slice(0, 300) : "");

    return result.value ? result.value.trim() : "";
  }

  if (lowerName.endsWith(".doc")) {
    return "";
  }

  return "";
};