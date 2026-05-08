import fs from "fs";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractTextFromResume = async (filePath, originalName) => {
  const lowerName = originalName.toLowerCase();

  if (lowerName.endsWith(".pdf")) {
    const buffer = fs.readFileSync(filePath);
    const uint8Array = new Uint8Array(buffer);

    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(" ");
      fullText += pageText + "\n";
    }
    return fullText.trim();
  }

  if (lowerName.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value ? result.value.trim() : "";
  }

  if (lowerName.endsWith(".doc")) {
    return "";
  }

  return "";
};