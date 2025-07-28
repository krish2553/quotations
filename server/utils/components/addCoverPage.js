export default function addCoverPage(doc, data) {
  doc.fontSize(16).text(data.date, { align: "center" });

  doc.addPage();
}
