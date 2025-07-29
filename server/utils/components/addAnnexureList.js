import { createTable } from "./createTable.js";

// SECTION: Annexure List Table with borders
export default function addAnnexureList(doc) {
  const tableData = [
    ["Annexure-1", "Technical Data Sheet, Features List and Crane Component"],
    ["Annexure-2", "Scope of Supply"],
    ["Annexure-3", "List of Make of Bought out Items"],
    ["Annexure-4", "Price Schedule"],
    ["Annexure-5", "General Terms and Conditions for Sales/Warranty"],
  ];

  doc.moveDown(); // small spacing before table
  createTable(doc, tableData);
}