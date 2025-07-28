// SECTION: B – Annexure 2: Scope of Supply
export default function addAnnexure2(doc, data) {
  doc.font("calibri").fontSize(10).fillColor("black");
  doc.addPage();

  // 🔹 Main Title: B
  doc
    .font("calibri-bold")
    .moveDown()
    .fontSize(10)
    .text("B : Annexure 2 – Scope of Supply", {
      underline: true,
      align: "center",
    })
    .moveDown(0.5);

  // ✅ Pull scope of supply from user input in quoteData
  const krishText = data?.annexure2?.krishCraneScope || "";
  const buyerText = data?.annexure2?.buyerScope || "";

  const forKrishCrane = krishText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  const forBuyer = buyerText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  // 🔹 B.1 – Scope for Krish Crane
  doc
    .font("calibri-bold")
    .fontSize(12)
    .fillColor("#000000")
    .text("B.1 : Scope for Krish Crane", { underline: true })
    .fontSize(10)
    .moveDown(0.5)
    .font("calibri")
    .fillColor("black");

  let kCounter = 1;
  forKrishCrane.forEach((item) => {
    if (item.startsWith("-")) {
      doc.text(`   - ${item.slice(1).trim()}`).moveDown(0.2); // sub-point
    } else {
      doc.text(`${kCounter}. ${item}`).moveDown(0.2); // numbered point
      kCounter++;
    }
  });

  doc.moveDown(1);

  // 🔹 B.2 – Scope for Buyer
  doc
    .addPage()
    .moveDown()
    .font("calibri-bold")
    .fontSize(10)
    .fillColor("#000000")
    .text("B.2 : Scope for Buyer", { underline: true })
    .moveDown(0.5)
    .font("calibri")
    .fillColor("black");

  let bCounter = 1;
  forBuyer.forEach((item) => {
    if (item.startsWith("-")) {
      doc.text(`   • ${item.slice(1).trim()}`).moveDown(0.2); // sub-point
    } else {
      doc.text(`${bCounter}. ${item}`).moveDown(0.2); // numbered point
      bCounter++;
    }
  });

  doc
    .moveDown(1)
    .font("calibri-bold")
    .fillColor("black")
    .text("For Krish Crane Manufacture")
    .moveDown(2)
    .text("Govind Vishvakarma")
    .moveDown(1);
}
