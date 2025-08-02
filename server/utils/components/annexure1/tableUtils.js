function createTable(
  doc,
  tableData ,
  columnWidths = [180, 300],
  borderColor = "#bbbbbb",
  borderWidth = 0.5
) {
  if (!Array.isArray(tableData)) {
tableData = [];
  } // Safeguard for non-array/null data
  // console.log("createTable : ", tableData);
  const startX = doc.page.margins.left;
  let currentY = doc.y;

  doc.fontSize(8);
  doc.lineWidth(borderWidth).strokeColor(borderColor);

  tableData.forEach(([col1, col2]) => {
    // 🔧 Calculate dynamic row height
    const height1 = doc.heightOfString(col1 || "", {
      width: columnWidths[0] - 10,
    });
    const height2 = doc.heightOfString(col2 || "", {
      width: columnWidths[1] - 10,
    });
    const rowHeight = Math.max(height1, height2) + 5; // add padding

    const bottomMargin = doc.page.margins.bottom;
    const availableSpace = doc.page.height - currentY - bottomMargin;

    if (availableSpace < rowHeight + 10) {
      doc.addPage();
      currentY = doc.y;
    }

    doc
      .rect(startX, currentY, columnWidths[0], rowHeight)
      .stroke()
      .rect(startX + columnWidths[0], currentY, columnWidths[1], rowHeight)
      .stroke();

    doc
      .fillColor("#000000")
      .font("calibri")
      .fontSize(8)
      .text(col1 || "", startX + 5, currentY + 4, {
        width: columnWidths[0] - 10,
      });

    doc
      .fillColor("#000000")
      .font("calibri")
      .fontSize(8)
      .text(col2 || "", startX + columnWidths[0] + 5, currentY + 4, {
        width: columnWidths[1] - 10,
      });

    currentY += rowHeight;
  });

  doc.y = currentY + 10;
  doc.x = doc.page.margins.left;
}

export { createTable };
