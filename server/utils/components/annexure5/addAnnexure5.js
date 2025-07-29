export default function addAnnexure5(doc, data) {
  const drawBankDetailsTable = (
    doc,
    startX,
    startY,
    columnWidth,
    rowHeight
  ) => {
    const column2X = startX + columnWidth;

    // Row labels and values
    const leftColumn = [
      { label: "Bank Name", value: "Union Bank of India" },
      { label: "Account Number", value: process.env.ACC_NUM },
      { label: "IFSC", value: "UBIN0531235" },
    ];
    const rightColumn = [
      { label: "Account Name", value: "Krish Crane Manufacture" },
      { label: "Account Type", value: "Current A/c" },
      { label: "Branch", value: "V.V. Nagar" },
    ];

    // Draw headers and values
    for (let i = 0; i < 3; i++) {
      const y = startY + i * rowHeight;

      // Left column
      doc.rect(startX, y, columnWidth, rowHeight);
      doc
        .fontSize(8)
        .text(
          `${leftColumn[i].label}: ${leftColumn[i].value}`,
          startX + 5,
          y + 5,
          {
            width: columnWidth - 10,
          }
        );

      // Right column
      doc.rect(column2X, y, columnWidth, rowHeight);
      doc
        .fontSize(9)
        .text(
          `${rightColumn[i].label}: ${rightColumn[i].value}`,
          column2X + 5,
          y + 5,
          {
            width: columnWidth - 10,
          }
        );
    }
  };

  doc.addPage();

  // Title
  doc
    .font("calibri-bold")
    .fontSize(12)
    .moveDown(2)
    .fillColor("black")
    .text("Annexure 5 - General Terms and Conditions for Sales/Warranty", {
      underline: true,
      align: "center",
    })
    .moveDown(0.5);

  // Section Title
  doc
    .font("calibri-bold")
    .fontSize(10)
    .text("5.1 General Terms and Conditions");

  // Content for 5.1
  doc.font("calibri").fontSize(9).moveDown(0.5);
  doc.text(
    "GST & Taxes: Quotation (price) is exclusive of any taxes. Any applicable taxes are charged extra. (At present 18% GST extra)."
  );
  doc.moveDown(0.5);
  doc.text("Bank Guarantee: 10% ABG and same shall be converted to PBG");
  doc.moveDown(0.5);
  doc.text(
    "Payment Terms: 10% advance against ABG with PO, 20% advance against PI after GAD approval, 50% after FAT and prior to dispatch whichever occurs earlier, 15% after erection, commissioning and testing & 5% against PBG after commissioning"
  );
  drawBankDetailsTable(doc, 50, doc.y + 10, 245, 17);
  doc.x = doc.page.margins.left;

  doc.moveDown(0.5);
  doc.text("Delivery Terms: FOR Narsanda, Kheda WORKS");

  // Section Title 5.2
  // doc.addPage(); // Move to new page for warranty section
  doc
    .moveDown(0.5)
    .font("calibri-bold")
    .fontSize(10)
    .text("5.2 Warranty Terms and Conditions (For EOT Crane)");

  doc.font("calibri").fontSize(9);

  const warrantyPoints = [
    'Warranty Period: This Warranty Coverage ("Warranty") is provided by Krish Crane Manufacture ("the Manufacturer" or "we") for the EOT Crane ("the Product") to ("the Customer" or "you"). We provide 12 Months warranty from the date of commissioning.',
    "Scope of Warranty: This Warranty covers manufacturing defects, poor workmanship, material defects, and poor design issues in mechanical components or sub-assemblies in the EOT Crane. During this period, we will, at our sole discretion, either repair or replace any above-mentioned kind of defects in the Product at Ex- our works Anand, G.I.D.C.",
    "Exclusions: This Warranty does not cover:\n" +
      "• Damage caused by improper installation, misuse, or negligence.\n" +
      "• Routine maintenance and consumable parts including but not limited to ropes, hooks, hook cover, brake liners, bearings, oil seal, etc.\n" +
      "• Modifications or repairs carried out by unauthorized personnel.\n" +
      "• Damage resulting from accidents, natural disasters, or other external factors beyond our control.\n" +
      "• Any electrical components, electrical systems, circuits or consumables (including but not limited to contactor, relays, fuses, lights, transformers, brake coil, solenoid coil, Toggle Switch, Push Button Switch, Circuit Breaker, Resistor, Transformer, Motor Starter, Rectifier etc.) Not explicitly covered in this Warranty.\n" +
      "• If the product is damaged during transportation, it is the responsibility of the shipping carrier and/or the receiving party to file a claim for compensation. Krish Crane Manufacture is not liable for any damages that occur during transportation or handling by third parties.",
    "Any claims made under this warranty for bought-out items are subjected to the supplier's/vendor’s policies, and the supplier/vendor retains full authority to accept or reject warranty claims based on their evaluation and terms.",
    "Customer’s Responsibility: To ensure the validity of this Warranty, the Customer is responsible for:\n• Proper installation and regular maintenance of the EOT Crane.\n• Promptly reporting any issues or defects to the Manufacturer.",
    "The delivery of the cranes will be affected as per Acceptance Letter. Further, the delivery period is specified in good faith. Every endeavour will be made to execute the work within that period. However, force majeure may cause delay in delivery as listed below.",
    "Force Majeure like war, riots, commotion, disturbances, strikes, lockouts, shortage of labour, famine, pestilence or epidemic sickness, earthquakes, fires, storms, floods, explosions, breakdown of Plant and Machinery, and any other cause of whatsoever nature and description beyond our control or power.",
    "Warranty Service: If the defect falls within the scope of this Warranty, the Warrantor will provide a replacement for the defective mechanical components or sub-assemblies Ex-our works in GIDC, Anand, free of charge.",
    "Limitation of Liability: The Manufacturer's liability under this Warranty is limited to the repair or replacement of the Product or its components as provided herein (coverage). In no event shall the Manufacturer be liable for any consequential, incidental, or indirect damages arising out of the use or inability to use the Product.",
    "Modification of Warranty: Krish Crane Manufacture reserves the right to modify or terminate this warranty policy at its discretion, provided that any changes will only apply to products purchased after the effective date of modification.",
    "Governing Law: This Warranty is governed by the laws of Anand Jurisdiction, and any disputes arising under or in connection with this Warranty shall be subject to the exclusive jurisdiction of the courts in Anand Jurisdiction.",
  ];

  warrantyPoints.forEach((point, index) => {
    doc.moveDown(0.2).text(`${index + 1}. ${point}`);
  });

  doc.moveDown(0.5);
  doc.font("calibri-bold").text("For Krish Crane Manufacture");
  doc.moveDown(2);
  doc.font("calibri").text("Authorized Signatory");
}
