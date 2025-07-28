function createTable(
  doc,
  tableData,
  columnWidths = [100, 380],
  borderColor = "#bbbbbb",
  borderWidth = 0.5
) {
  const startX = 50;
  let currentY = doc.y;
  const rowHeight = 16;

  doc.fontSize(10);
  doc.lineWidth(borderWidth).strokeColor(borderColor);

  tableData.forEach(([col1, col2]) => {
    doc
      .rect(startX, currentY, columnWidths[0], rowHeight)
      .stroke()
      .rect(startX + columnWidths[0], currentY, columnWidths[1], rowHeight)
      .stroke();

    doc
      .fillColor("black")
      .text(col1, startX + 3, currentY + 3, { width: columnWidths[0] - 10 })
      .text(col2, startX + columnWidths[0] + 3, currentY + 4, {
        width: columnWidths[1] - 10,
      });

    currentY += rowHeight;
  });

  doc.x = doc.page.margins.left;
}

function createTableSub(
  doc,
  tableData,
  columnWidths = [100, 380],
  borderColor = "#bbbbbb",
  borderWidth = 0
) {
  const startX = 50;
  let currentY = doc.y;
  const rowHeight = 16;

  doc.fontSize(10);
  doc.lineWidth(borderWidth).strokeColor(borderColor);

  tableData.forEach(([col1, col2]) => {
    doc
      .rect(startX, currentY, columnWidths[0], rowHeight)
      .stroke()
      .rect(startX + columnWidths[0], currentY, columnWidths[1], rowHeight)
      .stroke();

    doc
      .fillColor("black")
      .font("calibri-bold")
      .text(col1, startX, currentY + 3, { width: columnWidths[0] - 10 })
      .font("calibri")
      .text(col2, startX + columnWidths[0] + 3, currentY + 4, {
        width: columnWidths[1] - 10,
      });

    currentY += rowHeight;
  });

  doc.x = doc.page.margins.left;
}

export { createTable, createTableSub };
