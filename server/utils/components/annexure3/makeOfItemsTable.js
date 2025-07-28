export default function makeOfItemsTable(
  doc,
  tableData,
  fixedFirstColWidth = 40
) {
  const startX = doc.page.margins.left;
  let currentY = doc.y;
  const rowHeight = 18;

  const numCols = tableData[0].length;
  const remainingCols = numCols - 1;

  const usableWidth =
    doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const remainingWidth = usableWidth - fixedFirstColWidth;
  const remainingColWidth =
    remainingCols > 0 ? remainingWidth / remainingCols : 0;

  const columnWidths = [
    fixedFirstColWidth,
    ...Array(remainingCols).fill(remainingColWidth),
  ];

  doc.lineWidth(0.5);

  tableData.forEach((row, rowIndex) => {
    const isHeader = rowIndex === 0;
    const bgColor = rowIndex % 2 === 0 ? "#ffffff" : "#d9e2f3";

    doc.rect(startX, currentY, usableWidth, rowHeight).fill(bgColor).stroke();

    let x = startX;
    row.forEach((cell, colIndex) => {
      // 🔒 Ensure column width is valid
      if (
        typeof columnWidths[colIndex] !== "number" ||
        isNaN(columnWidths[colIndex])
      ) {
        throw new Error(
          `Invalid column width: ${columnWidths[colIndex]} at col ${colIndex}`
        );
      }

      doc
        .fillColor("black")
        .font(isHeader ? "calibri-bold" : "calibri")
        .fontSize(8)
        .text(String(cell), x + 5, currentY + 5, {
          width: columnWidths[colIndex] - 10,
          align: colIndex === 0 ? "center" : "left",
        });

      doc
        .strokeColor("#93a9d3")
        .rect(x, currentY, columnWidths[colIndex], rowHeight)
        .stroke();

      x += columnWidths[colIndex];
    });

    currentY += rowHeight;
  });

  doc.y = currentY + 10;
  doc.x = doc.page.margins.left;
}
