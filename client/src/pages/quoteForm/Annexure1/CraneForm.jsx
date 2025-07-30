import React from "react";
import { useQuote } from "../../../context/quoteContext";

const CraneForm = ({ bayIndex, craneIndex }) => {
  const { quoteData, updateQuote } = useQuote();
  const crane = quoteData.annexure1.bayAreas[bayIndex].cranes[craneIndex];

  const handleInputChange = (section, rowIndex, value) => {
    const updatedSection = [...crane[section]];
    updatedSection[rowIndex][1] = value;

    const updatedCrane = { ...crane, [section]: updatedSection };
    const updatedBayAreas = [...quoteData.annexure1.bayAreas];
    updatedBayAreas[bayIndex].cranes[craneIndex] = updatedCrane;

    updateQuote("annexure1", {
      ...quoteData.annexure1,
      bayAreas: updatedBayAreas,
    });
  };

  const handleNameChange = (value) => {
    const updatedCrane = { ...crane, name: value };
    const updatedBayAreas = [...quoteData.annexure1.bayAreas];
    updatedBayAreas[bayIndex].cranes[craneIndex] = updatedCrane;

    updateQuote("annexure1", {
      ...quoteData.annexure1,
      bayAreas: updatedBayAreas,
    });
  };

  const renderSection = (title, section) => (
    <div className="mb-4">
      <h4 className="text-lg font-semibold mb-2 text-gray-700">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {crane[section] &&
          crane[section].map((item, index) => {
            // Special case for "Hoisting unit" in General Information
            const isHoistingUnit =
              section === "generalInfo" && item[0] === "Hoisting unit";

            // Special case for "Quotation reference number" in References
            const isQuotationRef =
              section === "references" &&
              item[0] === "Quotation reference number";

            return (
              <div key={index} className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">
                  {item[0]}
                </label>

                {isHoistingUnit ? (
                  <select
                    value={item[1]}
                    onChange={(e) =>
                      handleInputChange(section, index, e.target.value)
                    }
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
                  >
                    <option value="">Select hoisting unit</option>
                    <option value="KHX Series Hoist">KHX Series Hoist</option>
                    <option value="Standard Series Hoist">
                      Standard Series Hoist
                    </option>
                    <option value="Crab/Trolley">Crab/Trolley</option>
                  </select>
                ) : isQuotationRef ? (
                  <input
                    type="text"
                    value={quoteData.quotationId}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-xl sm:text-sm"
                  />
                ) : (
                  <input
                    type="text"
                    value={item[1]}
                    onChange={(e) =>
                      handleInputChange(section, index, e.target.value)
                    }
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-gray-700">Crane Name</label>
        <input
          type="text"
          value={crane.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
        />
      </div>

      {renderSection("References", "references")}
      {renderSection("General Information", "generalInfo")}
      {renderSection("Crane Groups", "craneGroups")}
      {renderSection("Bridge", "bridge")}
      {renderSection("Main Hoist", "mainHoist")}
      {renderSection("Cross Traversing", "crossTraversing")}
      {renderSection("Long Travelling", "longTravelling")}
      {renderSection("Power Supply", "powerSupply")}
      {renderSection("Weights", "weights")}
      {renderSection("Component: Main Hoist", "componentMainHoist")}
      {renderSection("Component: Trolley", "componentTrolley")}
      {renderSection("Component: Bridge", "componentBridge")}
    </div>
  );
};

export default CraneForm;
