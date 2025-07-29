export default function generatePriceScheduleTable(doc, data) {
  // Initial coordinates and column setup
  const startX = doc.page.margins.left;
  const startY = doc.y;
  const columnWidths = [30, 55, 50, 200, 25, 65, 70];
  const defaultRowHeight = 15;
  let uniformRowHeight = 0;
  // ======================
  // PHASE 1: BUILD TABLE ROWS
  // ======================
  // This table object will hold headers and rows before rendering
  const table = {
    headers: [
      "Item",
      "Bay Area",
      "Crane",
      "Technical Description",
      "Qty",
      "Unit Price – INR",
      "Total Price – INR",
    ],
    rows: [],
  };

  let craneColorIndex = 0; // Used to alternate row colors
  let itemNo = 1; // Serial number for table
  let grandTotal = 0; // Track total amount

  // Loop through each Bay Area to process its cranes
  data.annexure1?.bayAreas?.forEach((bay, bayIndex) => {
    // Then immediately render that bay
    const bayRowSpan = bay.cranes.reduce((acc, crane, craneIndex) => {
      const key = `${bayIndex}-${craneIndex}`;
      const descCount = data.annexure4?.cranePrices?.[key]?.length || 4;
      return acc + descCount;
    }, 0);

    bay.cranes?.forEach((crane, craneIndex) => {
      const key = `${bayIndex}-${craneIndex}`;
      const priceData = data.annexure4?.cranePrices?.[key] || [];

      const descriptions = priceData.map((row) => row.description || "—");
      const quantities = priceData.map((row) => row.qty || 0);
      const unitPrices = priceData.map((row) => row.unitPrice || 0);
      const craneRowSpan = descriptions.length;

      let maxDescHeight = 0;
      descriptions.forEach((desc) => {
        const h = doc.heightOfString(desc, { width: columnWidths[3] - 10 });
        if (h > maxDescHeight) maxDescHeight = h;
      });

      const craneNameHeight = doc.heightOfString(crane.name || "New Crane", {
        width: columnWidths[2] - 10,
      });

      uniformRowHeight = Math.max(defaultRowHeight, maxDescHeight) - 12;

      descriptions.forEach((desc, descIndex) => {
        const qty = quantities[descIndex] || 1;
        const unit = unitPrices[descIndex] || 0;
        const total = qty * unit;
        grandTotal += total;

        const rowData = [
          `${itemNo++}`,
          craneIndex === 0 && descIndex === 0
            ? {
                text: `Bay ${bayIndex + 1}\n(${bay.name})`,
                rowSpan: bayRowSpan,
              }
            : "",
          descIndex === 0
            ? { text: crane.name || "New Crane", rowSpan: craneRowSpan }
            : "",
          desc,
          qty,
          unit.toLocaleString("en-IN"),
          total.toLocaleString("en-IN"),
        ];

        const rowHeight = uniformRowHeight;

        table.rows.push({
          data: rowData,
          height: rowHeight,
          craneColorIndex,
        });
      });

      craneColorIndex++;
    });
  });

  // ======================
  // PHASE 2: DRAW TABLE
  // ======================
  // This matrix tracks which cells have been drawn already
  const drawnCells = Array(table.rows.length + 1)
    .fill(0)
    .map(() => Array(columnWidths.length).fill(false));

  // Draw the table header
  drawRow(table.headers, -1, true, 25);

  let lastCraneColorIndex = craneColorIndex;

  // ======================
  // Add extra charges rows (transport, load, others)
  // ======================
  // Utility to add a single charge row to table
  const addRow = (label, amount, colorIndex) => {
    table.rows.push({
      data: [
        `${itemNo++}`,
        "",
        "",
        label,
        1,
        amount.toLocaleString("en-IN"),
        amount.toLocaleString("en-IN"),
      ],
      height: uniformRowHeight,
      craneColorIndex: colorIndex,
    });
    grandTotal += amount;
  };

  const extraChargeColorIndex = lastCraneColorIndex;

  const transportCharge = data.annexure4?.transport?.unit || 0;
  if (transportCharge > 0)
    addRow("Transportation Charges", transportCharge, extraChargeColorIndex);

  const loadTestCharge = data.annexure4?.load?.unit || 0;
  if (loadTestCharge > 0)
    addRow("Load Test Charges", loadTestCharge, extraChargeColorIndex);

  const otherCharges = data.annexure4?.other || [];
  if (Array.isArray(otherCharges)) {
    otherCharges.forEach((row) => {
      if (row.label && row.unit) {
        addRow(row.label, row.unit, extraChargeColorIndex);
      }
    });
  }

  // ======================
  // Draw all rows (cranes + extra charges)
  // ======================
  table.rows.forEach((row, rowIndex) => {
    drawRow(row.data, rowIndex, false, row.height);
  });

  // ======================
  // Add Grand Total row
  // ======================
  const totalRowText =
    "Above prices are basic supply, erection and commissioning excluding GST taxes";
  const formattedGrandTotal = grandTotal.toLocaleString("en-IN");

  const totalRowData = [
    "",
    "",
    "",
    { text: totalRowText },
    "",
    "Total",
    formattedGrandTotal,
  ];

  const totalRowHeight =
    doc.heightOfString(totalRowText, {
      width: columnWidths[3] + columnWidths[4] + columnWidths[5] - 10,
    }) + 10;

  drawRow(totalRowData, table.rows.length, true, totalRowHeight);

  // ======================
  // Add Total Amount in Words
  // ======================
  const amountInWords = numberToWords(grandTotal);

  const amountWordsRowData = [
    { text: `Total Amount (in words): ${amountInWords}`, colSpan: 7 },
  ];

  const amountWordsRowHeight =
    doc.heightOfString(`Total Amount (in words): ${amountInWords}`, {
      width: columnWidths.slice(0, 6).reduce((a, b) => a + b, 0) - 10,
    }) + 10;

  drawRow(
    amountWordsRowData,
    table.rows.length + 2,
    true,
    amountWordsRowHeight
  );

  // ======================
  // Converts a number to Indian Rupee words
  // ======================
  function numberToWords(num) {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if ((num = num.toString()).length > 9) return "Overflow";
    let n = ("000000000" + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    let str = "";
    str +=
      n[1] != 0
        ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + " Crore "
        : "";
    str +=
      n[2] != 0
        ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + " Lakh "
        : "";
    str +=
      n[3] != 0
        ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + " Thousand "
        : "";
    str +=
      n[4] != 0
        ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + " Hundred "
        : "";
    str +=
      n[5] != 0
        ? (str != "" ? "and " : "") +
          (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
          " "
        : "";
    return str.trim() + " Rupees Only";
  }

  // ======================
  // Core function to draw a single row on PDF
  // ======================
  function drawRow(rowData, rowIndex, isHeader, specificHeight) {
    // console.log("First", doc.y);

    const rowHeight = specificHeight || defaultRowHeight;
    const pageBottom = doc.page.height - (doc.page.margins.bottom + 50);
    if (!isHeader && doc.y + rowHeight > pageBottom) {
      doc.addPage().moveDown(2);
    }

    const y = doc.y;
    let x = startX;

    rowData.forEach((cell, colIndex) => {
      if (drawnCells[rowIndex]?.[colIndex]) {
        if (colIndex < columnWidths.length - 1) {
          x += columnWidths[colIndex];
        }
        return;
      }
      const bgColor = isHeader
        ? "#d9e2f3"
        : colIndex === 0
        ? "#ffffff"
        : colIndex === 1
        ? "#ffffff"
        : table.rows?.[rowIndex]?.craneColorIndex % 2 === 0
        ? "#ffffff"
        : "#d9e2f3";
      const cellObj =
        typeof cell === "object" && cell !== null ? cell : { text: cell };
      const { text = "", rowSpan = 1, colSpan = 1 } = cellObj;
      const spanWidth = columnWidths
        .slice(colIndex, colIndex + colSpan)
        .reduce((a, b) => a + b, 0);
      let spanHeight = rowHeight;

      if (!isHeader && rowSpan > 1) {
        spanHeight = 0;
        for (let i = 0; i < rowSpan; i++) {
          spanHeight += table.rows[rowIndex + i]?.height || 0;
        }
      }

      for (let r = 0; r < rowSpan; r++) {
        for (let c = 0; c < colSpan; c++) {
          if (drawnCells[rowIndex + r]) {
            drawnCells[rowIndex + r][colIndex + c] = true;
          }
        }
      }

      doc.lineWidth(0.5);
      doc.rect(x, y, spanWidth, spanHeight).fillAndStroke(bgColor, "#a0b4d8");

      const textOptions = {
        width: spanWidth - 10,
        align: colIndex === 3 ? "left" : "center",
        lineGap: 0,
      };

      const textHeight = doc.heightOfString(String(text), textOptions);
      const textY = y + (spanHeight - textHeight) / 2;

      doc
        .font(isHeader ? "Calibri-Bold" : "Calibri")
        .fontSize(8)
        .fillColor("black")
        .text(String(text), x + 5, textY + 1, textOptions);

      x += spanWidth;
      if (colSpan > 1) {
        colIndex += colSpan - 1;
      }
    });

    doc.y = y + rowHeight;
  }
}
