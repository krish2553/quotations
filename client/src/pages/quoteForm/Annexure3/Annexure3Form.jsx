import React, { useEffect } from "react";
import { useQuote } from "../../../context/quoteContext";

// Default initial rows for each table (with Sr. No.)
const defaultData = {
  mechanical: [
    ["Sr. No.", "Item Description", "Vendor(s)"],
    ["1", "Gearbox", "Bonfiglioli"],
    ["2", "Motor", "ABB"],
    ["3", "Brake", "Electromag"],
    ["4", "Coupling", "Fenner"],
    ["5", "Rope", "Usha Martin"],
  ],
  electrical: [
    ["Sr. No.", "Item Description", "Vendor(s)"],
    ["1", "VFD", "ABB"],
    ["2", "PLC", "Siemens"],
    ["3", "Contractors", "L&T"],
    ["4", "Cables", "Polycab"],
    ["5", "Sensors", "Pepperl+Fuchs"],
  ],
  controlSafety: [
    ["Sr. No.", "Item Description", "Vendor(s)"],
    ["1", "Radio Remote", "Telecrane"],
    ["2", "Pendant", "Pizzato"],
    ["3", "Anti-collision", "Omron"],
    ["4", "Limit Switch", "Schneider"],
  ],
};

const Annexure3Form = () => {
  const { quoteData, updateQuote } = useQuote();
  const annexure3 = quoteData.annexure3;

  useEffect(() => {
    if (
      !annexure3 ||
      !Object.keys(annexure3).length ||
      Object.values(annexure3).every((arr) => arr.length === 0)
    ) {
      updateQuote("annexure3", defaultData);
    }
  }, []);

  const handleCellChange = (category, rowIndex, colIndex, value) => {
    const updatedRows = [...quoteData.annexure3[category]];
    updatedRows[rowIndex][colIndex] = value;
    updateQuote("annexure3", {
      ...quoteData.annexure3,
      [category]: updatedRows,
    });
  };

  const handleAddRow = (category) => {
    const updatedRows = [...quoteData.annexure3[category]];
    const srNo = String(updatedRows.length); // skip header
    updatedRows.push([srNo, "", ""]);
    updateQuote("annexure3", {
      ...quoteData.annexure3,
      [category]: updatedRows,
    });
  };

  const handleRemoveRow = (category, rowIndex) => {
    const updatedRows = quoteData.annexure3[category]
      .filter((_, idx) => idx !== rowIndex)
      .map((row, idx) => {
        if (idx === 0) return row; // keep header
        return [String(idx), row[1], row[2]]; // reassign Sr. No.
      });

    updateQuote("annexure3", {
      ...quoteData.annexure3,
      [category]: updatedRows,
    });
  };

  return (
    <div className="p-6 bg-white/60 backdrop-blur-md rounded-xl shadow-md">
      {quoteData.annexure3 &&
        Object.keys(quoteData.annexure3).map((category) => (
          <div key={category} className="mb-6">
            <h4 className="text-lg font-semibold mb-4 capitalize text-gray-700">
              {category === "mechanical"
                ? "Mechanical / Structural Components"
                : category === "electrical"
                ? "Electrical Components"
                : "Control & Safety Components"}
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-200/80 rounded-lg">
                <tbody>
                  {quoteData.annexure3[category]?.map((row, rowIndex) => (
                    <tr key={rowIndex} className="even:bg-gray-50/50">
                      {rowIndex === 0 ? (
                        <>
                          <td className="border-b border-gray-200/80 px-4 py-2 font-semibold text-center bg-gray-100/70">
                            {row[0]}
                          </td>
                          <td className="border-b border-gray-200/80 px-4 py-2 font-semibold text-center bg-gray-100/70">
                            {row[1]}
                          </td>
                          <td className="border-b border-gray-200/80 px-4 py-2 font-semibold text-center bg-gray-100/70">
                            {row[2]}
                          </td>
                          <td className="border-b border-gray-200/80 px-4 py-2 font-semibold text-center bg-gray-100/70">
                            Action
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="border-b border-gray-200/80 px-4 py-2 text-center">
                            {row[0]}
                          </td>
                          <td className="border-b border-gray-200/80 px-4 py-2">
                            <input
                              type="text"
                              value={row[1]}
                              onChange={(e) =>
                                handleCellChange(
                                  category,
                                  rowIndex,
                                  1,
                                  e.target.value
                                )
                              }
                              className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                            />
                          </td>
                          <td className="border-b border-gray-200/80 px-4 py-2">
                            <input
                              type="text"
                              value={row[2]}
                              onChange={(e) =>
                                handleCellChange(
                                  category,
                                  rowIndex,
                                  2,
                                  e.target.value
                                )
                              }
                              className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                            />
                          </td>
                          <td className="border-b border-gray-200/80 px-4 py-2 text-center">
                            <button
                              onClick={() =>
                                handleRemoveRow(category, rowIndex)
                              }
                              className="text-red-600 text-sm font-medium hover:text-red-800 transition-all"
                            >
                              Remove
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => handleAddRow(category)}
              className="mt-3 text-blue-600 text-sm font-medium hover:text-blue-800 transition-all"
            >
              + Add Row
            </button>
          </div>
        ))}
    </div>
  );
};

export default Annexure3Form;
