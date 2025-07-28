import addBayArea from "./addBayArea.js";
import addFeatures from "./addFeatures.js";
import addCraneComponents from "./addCraneComponents.js";

// SECTION: Annexure 1 — Multiple Bay Areas
export default function addAnnexure1(doc, data) {
  doc.font("calibri").fontSize(10).fillColor("black");

  console.log("addAnnexure1 : ", data);
  // First page for Annexure 1 heading
  doc.addPage();
  doc
    .font("calibri-bold")
    .fontSize(12)
    .fillColor("#000000")
    .moveDown(2)
    .text(
      "A : Annexure 1 – Technical Data Sheet, Features List and Crane Component",
      {
        underline: true,
        align: "center",
      }
    )
    .moveDown(0.5)
    .font("calibri");
  doc
    .font("calibri-bold")
    .fontSize(12)
    .fillColor("black")
    .text(`A.1 : Bay Area`, { underline: true })
    .fontSize(10)
    .moveDown(0.5);

  // Loop over all bay areas
  data.annexure1.bayAreas.forEach((bay, index) => {
    if (index !== 0) doc.addPage().moveDown();
    addBayArea(doc, bay, index + 1); // Pass bay number
  });

  addFeatures(doc, data);

  addCraneComponents(doc, data);
}
