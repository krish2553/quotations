import addAnnexureList from "./addAnnexureList.js";
import { createTableSub } from "./createTable.js";

export default function addIntroLetter(doc, data) {
  doc
    .moveDown()
    .fontSize(10)
    .text(`${data.quotationId}`)
    .text(data.date)
    .moveDown()
    .font("calibri-bold")
    .text(`M/s. ${data.client.name}`, { align: "left" })
    .font("calibri");

  data.client.address.forEach((line) => doc.text(line));

  const tableDataSubject = [
    ["Kind Attention:", data.client.contactPerson],
    ["Subject:", data.client.subject],
    ["Reference:", data.client.reference || "N/A"],
  ];

  doc.moveDown();
  createTableSub(doc, tableDataSubject, [100, 400], "#ffffff"); // no visible border

  doc
    .moveDown()
    .text("Dear Sir,")
    .moveDown()
    .text(
      "We are grateful for your Request for Quotation. Enclosed are the documents comprising our Techno-Commercial offer for aforesaid subject."
    );

  addAnnexureList(doc);

  doc
    .moveDown(1)
    .fontSize(10)
    .text(
      "Thank you for entrusting us with your upcoming project. Please carefully examine the quotation provided. Should you require any assistance or clarification, rest assured, we stand ready to support you every step of the way."
    )
    .moveDown(1)
    .text(
      "We are committed to delivering the highest quality service and look forward to the opportunity to work with you."
    )
    .moveDown()
    .text("Best Regards,")
    .moveDown()
    .font("calibri-bold")
    .text("For Krish Crane Manufacture")
    .moveDown(2)
    .text("Govind Vishvakarma")
    .moveDown()
    .font("calibri")
    .text("Encl: As above");
}
