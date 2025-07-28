import path from "path";
import fs from "fs";
import { type } from "os";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SECTION: Multi-style header based on page type
export default function addHeader(doc, data = {}, pageType = "default") {
  const margin = 50;

  // ❌ 1. Skip header completely on cover page
  if (pageType === "cover") return;

  // ✅ 2. Logo-only header (for intro letter)
  if (pageType === "logo") {
    const logoPath = path.join(__dirname, "../assets/logo.png");
    const logoWidth = 200;
    const xPosition = doc.page.width - logoWidth - margin;

    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, xPosition, 20, { width: logoWidth });
    }

    doc.moveTo(margin, 65);

    return;
  }

  // ✅ 3. Styled header with quotation info + KRISH CRANE (default for annexures)
  const contentTop = 40;
  const logoText = "KRISH CRANE";
  const logoColor = "#3d5aa9";

  // LEFT SIDE: Quotation info
  doc
    .font("calibri-bold")
    .fontSize(10)
    .fillColor("black")
    .text(data.quotationId, doc.x, doc.y - 12);

  doc
    .font("calibri")
    .fontSize(10)
    .fillColor("black")
    .text(data.client.name)
    .text(data.date);

  // RIGHT SIDE: KRISH CRANE
  doc
    .font("outfit")
    .fontSize(24)
    .fillColor(logoColor)
    .text(logoText, doc.page.width - margin - 200, contentTop, {
      width: 200,
      align: "right",
    });

  // Horizontal line
  doc
    .moveTo(margin, doc.y + 20)
    .lineTo(doc.page.width - margin, doc.y + 20)
    .lineWidth(1)
    .strokeColor(logoColor)
    .stroke();

  // Reset style for body
  doc.fillColor("black").font("calibri");
  doc.x = doc.page.margins.left;
}
