import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import componentDetails from "./componentDetails.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SECTION: A.3 — Crane Components with optional images and numbered titles
export default function addCraneComponents(doc, data) {
  const selectedNames = data.annexure1?.craneComponentNames || [];

  // Get full details for selected components only
  const components = selectedNames
    .map((name) => {
      const details = componentDetails[name];
      return details ? { name, ...details } : null;
    })
    .filter(Boolean);

  if (!components.length) return;

  doc.addPage();

  // 🔹 Section Title A.3
  doc
    .font("calibri-bold")
    .fontSize(10)
    .moveDown(2)
    .fillColor("black")
    .text("1.4 : Crane Components", { underline: true })
    .moveDown(0.5);

  components.forEach((section, index) => {
    const { name, description, image } = section;
    const hasImage =
      image && fs.existsSync(path.join(__dirname, "../../assets", image));

    const imageWidth = hasImage ? 180 : 0;
    const imageHeight = hasImage ? 135 : 0;
    const spacing = hasImage ? 10 : 0;

    const textWidth =
      doc.page.width -
      doc.page.margins.left -
      doc.page.margins.right -
      imageWidth -
      spacing;

    const estimatedHeight =
      40 +
      doc.heightOfString(description, { width: textWidth, fontSize: 9 }) +
      (hasImage ? imageHeight : 0);

    const availableSpace = doc.page.height - doc.y - doc.page.margins.bottom;
    if (availableSpace < estimatedHeight) {
      doc.addPage().moveDown();
    }

    const sectionTop = doc.y;
    const xText = doc.page.margins.left;
    const xImage = xText + textWidth + spacing;

    // 🔹 Numbered Component Title: A.3.X
    const sectionNumber = `1.4.${index + 1}`;
    doc
      .font("calibri")
      .fontSize(10)
      .fillColor("#3c59a8")
      .text(`${sectionNumber} : ${name}`, xText, sectionTop, {
        width: textWidth,
      })
      .moveDown(0.5);

    // 🔹 Description
    doc
      .font("calibri")
      .fontSize(9)
      .fillColor("black")
      .text(description, xText, doc.y, {
        width: textWidth,
        align: "justify",
      });

    // 🔹 Optional Image
    if (hasImage) {
      try {
        const imagePath = path.join(__dirname, "../../assets", image);
        doc.image(imagePath, xImage, sectionTop, {
          width: imageWidth,
        });

        const imageBottom = sectionTop + imageHeight;
        if (doc.y < imageBottom) {
          doc.y = imageBottom + 10;
        }
      } catch (err) {
        console.error("Error loading image:", err.message);
      }
    }

    doc.moveDown(1.5);
  });
}
