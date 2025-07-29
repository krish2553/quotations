import generatePriceScheduleTable from "./priceScheduleTable.js";

export default function addAnnexure4(doc, data) {
  doc.addPage();
  doc.font("calibri").fontSize(10).fillColor("black");

  // 🔹 Title
  doc
    .font("calibri-bold")
    .fontSize(12)
    .moveDown(2)
    .text("Annexure 4 – Price Schedule", { underline: true, align: "center" })
    .moveDown(0.5)
    .font("calibri-bold")
    .fontSize(10)
    .text("4.1: Price Schedule (Krish Crane Format)")
    .moveDown(0.5);

  // 🧾 Table Generation
  generatePriceScheduleTable(doc, data);
}
