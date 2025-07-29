import features from "./features.js";
import { createTable } from "./tableUtils.js";

// SECTION: Add Hoisting Unit Features at end of Annexure 1 with A.2 numbering
export default function addFeatures(doc, data) {
  const hoistingUnits = new Set();

  // 🔹 Step 1: Extract all valid hoisting unit names from cranes
  data.annexure1.bayAreas.forEach((bay) => {
    bay.cranes.forEach((crane) => {
      const entry = crane.generalInfo?.find(
        ([label]) => label === "Hoisting unit"
      );
      const unitName = entry?.[1]?.trim();
      if (unitName && features[unitName]) {
        hoistingUnits.add(unitName);
      }
    });
  });

  const unitArray = Array.from(hoistingUnits);

  if (unitArray.length === 0) return;

  // 🔹 Step 2: Always start features section on a new page
  // doc.addPage();

  // 🔹 Step 3: Main section heading A.2
  doc
    .font("calibri-bold")
    .fontSize(10)
    .fillColor("black")
    .text("1.3 : Features")
    .moveDown(0.5);

  // 🔹 Step 4: Render each unique hoisting unit with A.2.X numbering
  unitArray.forEach((unitName, index) => {
    const unitFeatures = features[unitName];
    if (!unitFeatures || !unitFeatures.length) return;

    const featureNumber = `1.3.${index + 1}`;
    const tableData = [
      ["No.", "Description"],
      ...unitFeatures.map((desc, i) => [String(i + 1), desc]),
    ];

    const estimatedHeight = 40 + tableData.length * 20;
    const availableSpace = doc.page.height - doc.y - doc.page.margins.bottom;

    // 🔁 Start a new page if there's not enough space for full block
    if (availableSpace < estimatedHeight) {
      doc.addPage();
    }

    // 🖊️ Subsection heading
    doc
      .font("calibri")
      .fillColor("#3c59a8")
      .fontSize(10)
      .text(`${featureNumber} : ${unitName}`)
      .moveDown(0.5);

    // 📋 Features table
    createTable(doc, tableData ?? [], [40, 440], "#eeeeee", 0.5);
  });
}
