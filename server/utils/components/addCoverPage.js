import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function addCoverPage(doc, data) {
  // Set text first so it appears on top of the image
  doc.fontSize(16).text(data.date, { align: "center" });

  const logoPath = path.join(__dirname, "../assets/qoutes.png");

  if (fs.existsSync(logoPath)) {
    // Make the image cover the entire page width, from edge to edge
    doc.image(logoPath, 0, 0, {
      width: doc.page.width,
      height: doc.page.height,
      align: "center",
      valign: "center",
    });
  }

  doc.addPage();
}
