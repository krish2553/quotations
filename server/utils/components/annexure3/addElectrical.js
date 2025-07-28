import makeTable from "./makeOfItemsTable.js";

export default function addElectrical(doc, data) {
  const table = data.annexure3.electrical;

  if (!table || !table.length) return;

  const estimatedHeight = 30 + table.length * 18; // 30 for title, 18 per row
  const availableSpace = doc.page.height - doc.y - doc.page.margins.bottom;

  if (availableSpace < estimatedHeight) {
    doc.addPage().moveDown(); // 📄 start fresh if not enough space for heading + table
  }

  doc
    .font("calibri-bold")
    .fontSize(10)
    .fillColor("black")
    .text("C.2 : Electrical Components", { underline: true })
    .moveDown(0.5);

  makeTable(doc, table, 40);
}
