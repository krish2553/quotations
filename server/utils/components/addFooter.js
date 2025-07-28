// SECTION: FOOTER with centered page number (starts AFTER cover page)
export default function addFooter(doc) {
  const pageCount = doc.bufferedPageRange().count;

  for (let i = 1; i < pageCount; i++) {
    doc.switchToPage(i);

    // Page number shown as "Page 1" starting from 2nd physical page
    doc.fontSize(10).fillColor("gray").text(`${i}`, 0, 760, {
      align: "center",
      width: doc.page.width,
    });

    // Legal disclaimer
    doc
      .fontSize(6)
      .fillColor("gray")
      .text(
        `This document and the information contained herein are the exclusive property of Krish Crane Mfg. and constitute confidential, proprietary trade secrets. They must not be reproduced, disclosed to third parties, altered, or used in any manner without the explicit written consent of Krish Crane Mfg.. Copyright © 2025 Krish Crane Manufacture. All rights reserved.`,
        50,
        775,
        {
          align: "justify",
          width: 500,
        }
      );
  }
}
