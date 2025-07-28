import addMechanical from "./addMechanical.js";
import addElectrical from "./addElectrical.js";
import addControlSafety from "./addControlSafety.js";

export default function addAnnexure3(doc, data) {
  doc.addPage();
  doc
    .font("calibri-bold")
    .fontSize(12)
    .moveDown(2)
    .fillColor("black")
    .text("C : Annexure 3 – Make of Bought Out Items", {
      underline: true,
      align: "center",
    })
    .fontSize(10)
    .moveDown(1);

  addMechanical(doc, data);
  doc.moveDown(1);
  addElectrical(doc, data);
  doc.moveDown(1);
  addControlSafety(doc, data);

  doc
    .font("calibri")
    .fillColor("#999999")
    .text(
      "NOTE: The above-mentioned makes are to be applied only where deemed appropriate and applicable to the equipment specifications."
    )
    .moveDown(1)
    .font("calibri-bold")
    .fillColor("black")
    .text("For Krish Crane Manufacture")
    .moveDown(2)
    .text("Govind Vishvakarma")
    .moveDown(1);
}
