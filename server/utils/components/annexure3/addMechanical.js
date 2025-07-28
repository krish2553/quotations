import makeTable from "./makeOfItemsTable.js";

export default function addMechanical(doc, data) {
  const table = data.annexure3.mechanical;
  if (!table || !table.length) return;

  const estimatedHeight = 30 + table.length * 18; // 30 for title, 18 per row
  const availableSpace = doc.page.height - doc.y - doc.page.margins.bottom;

  if (availableSpace < estimatedHeight) {
    doc.addPage().moveDown(); // 📄 start fresh if not enough space for heading + table
  }

  // 🔹 Title
  doc
    .font("calibri-bold")
    .fontSize(10)
    .fillColor("black")
    .text("C.1 : Mechanical / Structural Components", { underline: true })
    .moveDown(0.5);

  // 🧾 Table
  makeTable(doc, table, 40); // 40 = width of "Sr. No."
}
