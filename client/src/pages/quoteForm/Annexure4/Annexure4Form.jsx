import React from "react";
import { useQuote } from "../../../context/quoteContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Annexure4Form = () => {
  const { quoteData, updateQuote } = useQuote();
  const annexure4 = quoteData.annexure4 || {
    cranePrices: {},
    transport: { unit: 0 },
    load: { unit: 0 },
  };

  const handleChange = (bayIndex, craneIndex, rowIndex, field, value) => {
    const key = `${bayIndex}-${craneIndex}`;
    let existingRows = annexure4.cranePrices?.[key] || [];

    // Initialize with default rows only once
    if (existingRows.length === 0) {
      existingRows = getDefaultRows(bayIndex, craneIndex);
    }

    // Extend rows if needed
    while (existingRows.length <= rowIndex) {
      existingRows.push({ description: "", qty: 1, unitPrice: 0 });
    }

    existingRows[rowIndex] = {
      ...existingRows[rowIndex],
      [field]: field === "description" ? value : parseFloat(value || 0),
    };

    updateQuote("annexure4", {
      ...annexure4,
      cranePrices: {
        ...annexure4.cranePrices,
        [key]: existingRows,
      },
    });
  };
  const getValue = (array, label) => {
    if (!Array.isArray(array)) return "";
    const found = array.find(([key]) =>
      key.toLowerCase().includes(label.toLowerCase())
    );
    return found ? found[1] : "";
  };

  const handleAddRow = (bayIndex, craneIndex) => {
    const key = `${bayIndex}-${craneIndex}`;
    const customRows = annexure4.cranePrices?.[key] || [];

    const newRow = { description: "", qty: 1, unitPrice: 0 };

    const newData = {
      ...annexure4,
      cranePrices: {
        ...annexure4.cranePrices,
        [key]: [...customRows, newRow],
      },
    };
    updateQuote("annexure4", newData);
  };

  const handleRemoveRow = (bayIndex, craneIndex, rowIndex) => {
    const key = `${bayIndex}-${craneIndex}`;
    const rows = annexure4.cranePrices?.[key] || [];

    const updated = [...rows];
    updated.splice(rowIndex, 1);

    updateQuote("annexure4", {
      ...annexure4,
      cranePrices: {
        ...annexure4.cranePrices,
        [key]: updated,
      },
    });
  };

  const getDefaultRows = (bayIndex, craneIndex) => {
    const crane =
      quoteData.annexure1?.bayAreas?.[bayIndex]?.cranes?.[craneIndex];

    if (!crane) return [];

    const span = getValue(crane.bridge, "span") || "XX";
    const hol = getValue(crane.mainHoist, "lifting height") || "YY";
    const railSize = getValue(crane.bridge, "rail size") || "ZZ";

    return [
      {
        description: `Supply of ${
          crane.name || "Crane"
        } ${span}m Span ${hol}m HOL.`,
        qty: 1,
        unitPrice: 0,
      },
      {
        description: `LT Rails ${railSize} for bay length`,
        qty: 1,
        unitPrice: 0,
      },
      {
        description: "DSL System",
        qty: 1,
        unitPrice: 0,
      },
      {
        description: "Erection & Commissioning",
        qty: 1,
        unitPrice: 0,
      },
    ];
  };

  return (
    <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow space-y-6">
      {quoteData.annexure1?.bayAreas?.map((bay, bayIndex) => (
        <div key={bayIndex} className="bg-white/70 p-4 rounded-xl shadow-inner">
          <h4 className="text-lg font-bold mb-4 text-gray-700">
            Bay Area: {bay.name}
          </h4>

          {bay.cranes?.map((crane, craneIndex) => {
            const craneKey = `${bayIndex}-${craneIndex}`;
            const span = getValue(crane.bridge, "span");
            const hol = getValue(crane.mainHoist, "lifting height");
            const railSize = getValue(crane.bridge, "rail size");

            const defaultSpecs = [
              {
                description: `Supply of ${crane.name || "Crane"} ${
                  span || "XX"
                }m Span ${hol || "YY"}m HOL.`,
                qty: 1,
                unitPrice: 0,
              },
              {
                description: `LT Rails ${railSize || "ZZ"} for bay length`,
                qty: 1,
                unitPrice: 0,
              },
              {
                description: "DSL System",
                qty: 1,
                unitPrice: 0,
              },
              {
                description: "Erection & Commissioning",
                qty: 1,
                unitPrice: 0,
              },
            ];

            const savedRows = annexure4.cranePrices?.[craneKey];
            let rows = annexure4.cranePrices?.[craneKey];

            // If no rows saved yet, initialize with defaults once
            if (!rows) {
              rows = getDefaultRows(bayIndex, craneIndex);
              updateQuote("annexure4", {
                ...annexure4,
                cranePrices: {
                  ...annexure4.cranePrices,
                  [craneKey]: rows,
                },
              });
            }

            return (
              <div key={craneIndex} className="mb-4 ">
                <h5 className="font-medium mb-2 text-gray-600">
                  Crane: {crane.name}
                </h5>
                <div className="overflow-x-auto">
                  <table className="w-full tabel-auto text-sm mb-2 border-collapse border border-blue-200/80 rounded-xl">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="p-2 text-left">Sr. No.</th>
                        <th className="p-2 text-left">Technical Description</th>
                        <th className="p-2 text-left">Qty</th>
                        <th className="p-2 text-left">Unit Price (INR)</th>
                        <th className="p-2 text-left">Total Price (INR)</th>
                        <th className="p-2 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="even:bg-blue-50/50">
                          <td className="border-b border-blue-200/80 p-2 text-center">
                            {rowIndex + 1}
                          </td>
                          <td className="border-b border-blue-200/80 p-2">
                            <input
                              className="w-full border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                              value={row.description}
                              onChange={(e) =>
                                handleChange(
                                  bayIndex,
                                  craneIndex,
                                  rowIndex,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="border-b border-blue-200/80 p-2">
                            <input
                              type="number"
                              className="w-full border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                              value={row.qty}
                              min={0}
                              onChange={(e) =>
                                handleChange(
                                  bayIndex,
                                  craneIndex,
                                  rowIndex,
                                  "qty",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="border-b border-blue-200/80 p-2">
                            <input
                              type="number"
                              className="w-full border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                              value={row.unitPrice}
                              min={0}
                              onChange={(e) =>
                                handleChange(
                                  bayIndex,
                                  craneIndex,
                                  rowIndex,
                                  "unitPrice",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="border-b border-blue-200/80 p-2 text-center pr-2">
                            {(row.qty * row.unitPrice).toLocaleString()}
                          </td>
                          <td className="border-b border-blue-200/80 p-2 text-center">
                            <button
                              onClick={() =>
                                handleRemoveRow(bayIndex, craneIndex, rowIndex)
                              }
                              className="text-red-500 text-xs font-medium hover:text-red-700 transition-all"
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="text-blue-500 hover:text-red-500 cursor-pointer"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={() => handleAddRow(bayIndex, craneIndex)}
                  className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md font-medium hover:bg-blue-600 transition-all"
                >
                  Add Row
                </button>
              </div>
            );
          })}
        </div>
      ))}

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Transportation Charges
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={annexure4.transport?.unit || ""}
            min={0}
            onChange={(e) =>
              updateQuote("annexure4", {
                ...annexure4,
                transport: { unit: parseFloat(e.target.value || 0) },
              })
            }
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Load Test Charges
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={annexure4.load?.unit || ""}
            min={0}
            onChange={(e) =>
              updateQuote("annexure4", {
                ...annexure4,
                load: { unit: parseFloat(e.target.value || 0) },
              })
            }
          />
        </div>
        <div className="col-span-2 mt-4">
          <label className="block font-medium mb-1 text-gray-700">
            Other Charges
          </label>

          {(annexure4.other || []).map((charge, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Label (e.g., Installation)"
                value={charge.label || ""}
                onChange={(e) => {
                  const updatedOther = [...(annexure4.other || [])];
                  updatedOther[index].label = e.target.value;
                  updateQuote("annexure4", {
                    ...annexure4,
                    other: updatedOther,
                  });
                }}
              />
              <input
                type="number"
                className="w-1/3 border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Amount"
                min={0}
                value={charge.unit || ""}
                onChange={(e) => {
                  const updatedOther = [...(annexure4.other || [])];
                  updatedOther[index].unit = parseFloat(e.target.value || 0);
                  updateQuote("annexure4", {
                    ...annexure4,
                    other: updatedOther,
                  });
                }}
              />
              <button
                className="text-red-500 px-2 font-medium hover:text-red-700 transition-all"
                onClick={() => {
                  const updatedOther = [...(annexure4.other || [])];
                  updatedOther.splice(index, 1);
                  updateQuote("annexure4", {
                    ...annexure4,
                    other: updatedOther,
                  });
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            className="mt-2 text-blue-600 text-sm underline font-medium hover:text-blue-800 transition-all"
            onClick={() => {
              const updatedOther = [
                ...(annexure4.other || []),
                { label: "", unit: 0 },
              ];
              updateQuote("annexure4", {
                ...annexure4,
                other: updatedOther,
              });
            }}
          >
            + Add Other Charge
          </button>
        </div>
      </div>
    </div>
  );
};

export default Annexure4Form;
