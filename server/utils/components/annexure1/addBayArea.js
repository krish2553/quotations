import addCrane from "./addCrane.js";

// SECTION: Render one bay area and all cranes within it with Annexure A.1 numbering
export default function addBayArea(doc, bayData, bayIndex = 1) {
  const bayNumber = `1.${bayIndex}`;
  // console.log("addBayArea : ", bayData);
  // 🔹 Bay Area Heading: 1.1
  doc
    .font("calibri-bold")
    .fontSize(10)
    .fillColor("black")
    .text(`${bayNumber} : ${bayData.name}`)
    .moveDown(0.5);

  // 🔹 Each crane within bay: 1.1.1, 1.1.2, etc.
  bayData.cranes.forEach((crane, craneIndex) => {
    const craneNumber = `${bayNumber}.${craneIndex + 1}`;
    addCrane(doc, crane, craneNumber);
  });
}
