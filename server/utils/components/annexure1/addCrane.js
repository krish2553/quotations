import { createTable } from "./tableUtils.js";

// SECTION: Render a crane with multi-section 2-column tables
export default function addCrane(doc, crane, craneNumber = "") {
  console.log("addCrane : ", crane);
  doc
    .font("calibri")
    .fillColor("#3c59a8")
    .fontSize(10)
    .text(
      `${craneNumber} Technical data for ${
        crane.name || `${crane.capacity} ${crane.type}`
      }`
    )
    .moveDown(0.5);

  // 🔧 Helper: check available space and optionally add a new page
  const checkPageSpace = (neededHeight = 100) => {
    const availableSpace = doc.page.height - doc.y - doc.page.margins.bottom;
    if (availableSpace < neededHeight) {
      doc.addPage().moveDown(1);
    }
  };

  // 🔧 Render section label and 2-column table
  const renderSection = (title, entries = []) => {
    if (!entries.length) return;

    // Estimate height: title + table rows
    const estimatedHeight = 30 + entries.length * 20;
    checkPageSpace(estimatedHeight);

    doc
      .fillColor("#3c59a8")
      .font("calibri")
      .fontSize(8)
      .text(title)
      .moveDown(0.5);

    createTable(doc, entries ?? [], [140, 360], "#eeeeee", 0.5);
  };

  renderSection("References", crane.references || []);
  renderSection("General Info", crane.generalInfo || []);
  renderSection("Crane Groups", crane.craneGroups || []);
  renderSection("Bridge", crane.bridge || []);
  renderSection("Main Hoist", crane.mainHoist || []);
  renderSection("Cross Traversing", crane.crossTraversing || []);
  renderSection("Long Travelling", crane.longTravelling || []);
  renderSection("Power Supply", crane.powerSupply || []);
  renderSection("Weights", crane.weights || []);
  renderSection("Component Data - Main Hoist", crane.componentMainHoist || []);
  renderSection("Component Data - Main Trolley", crane.componentTrolley || []);
  renderSection("Component Data - Bridge", crane.componentBridge || []);

  doc
    .font("calibri")
    .fontSize(8)
    .text(
      "The above details are based on the preliminary design, input data, and cycle calculations provided. We reserve the right to make modifications in the final design as needed. However, any such changes will not impact the crane's stated performance ratings. Please note that alterations to the input data or plant capacity may affect the pricing."
    )
    .addPage()
    .moveDown(1);
}
