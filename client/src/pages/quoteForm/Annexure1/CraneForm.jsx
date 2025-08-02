import React from "react";
import { useQuote } from "../../../context/quoteContext";
import { useState } from "react";

const CraneForm = ({ bayIndex, craneIndex }) => {
  const { quoteData, updateQuote } = useQuote();
  const crane = quoteData.annexure1.bayAreas[bayIndex].cranes[craneIndex];
  const [hasAuxHoist, setHasAuxHoist] = useState(false);

  const handleInputChange = (section, rowIndex, value, field = "value") => {
    const updatedSection = [...crane[section]];
    const entry = [...updatedSection[rowIndex]];
    entry[field === "label" ? 0 : 1] = value;
    updatedSection[rowIndex] = entry;

    const updatedCrane = { ...crane, [section]: updatedSection };
    const updatedBayAreas = [...quoteData.annexure1.bayAreas];
    updatedBayAreas[bayIndex].cranes[craneIndex] = updatedCrane;

    updateQuote("annexure1", {
      ...quoteData.annexure1,
      bayAreas: updatedBayAreas,
    });
  };

  const addInputField = (section) => {
    const updatedSection = [...(crane[section] || []), ["", ""]];
    const updatedCrane = { ...crane, [section]: updatedSection };
    const updatedBayAreas = [...quoteData.annexure1.bayAreas];
    updatedBayAreas[bayIndex].cranes[craneIndex] = updatedCrane;

    updateQuote("annexure1", {
      ...quoteData.annexure1,
      bayAreas: updatedBayAreas,
    });
  };

  const removeInputField = (section, index) => {
    const updatedSection = [...(crane[section] || [])];
    updatedSection.splice(index, 1); // remove the row at index

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
      <div className="grid grid-cols-1 gap-4">
        {crane[section] &&
          crane[section].map((item, index) => {
            const [label, value] = item;
            const isHoistingUnit =
              section === "generalInfo" && label === "Hoisting unit";
            const isQuotationRef =
              section === "references" &&
              label === "Quotation reference number";

            return (
              <div key={index} className="w-full relative">
                <input
                  type="text"
                  value={label}
                  readOnly={isQuotationRef}
                  onChange={(e) =>
                    handleInputChange(section, index, e.target.value, "label")
                  }
                  className={`text-sm font-semibold text-gray-700 bg-slate-100 border border-slate-300 rounded-t-xl px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-400 focus:z-10 ${
                    isQuotationRef ? "cursor-default" : ""
                  }`}
                  placeholder="Label"
                />

                {isHoistingUnit ? (
                  <select
                    value={value}
                    onChange={(e) =>
                      handleInputChange(section, index, e.target.value)
                    }
                    className="block w-full px-3 py-2 bg-white border border-t-0 border-slate-300 rounded-b-xl focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm focus:z-10"
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
                    tabIndex="-1"
                    className="block w-full px-3 py-2 bg-gray-100 border border-t-0 border-slate-300 rounded-b-xl sm:text-sm"
                  />
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      handleInputChange(section, index, e.target.value)
                    }
                    className="block w-full px-3 py-2 bg-white border border-t-0 border-slate-300 rounded-b-xl focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm focus:z-10"
                  />
                )}

                {!isQuotationRef && (
                  <button
                    type="button"
                    onClick={() => removeInputField(section, index)}
                    className="absolute top-2 right-3 text-red-500 hover:text-red-700 text-sm"
                    title="Remove this field"
                    tabIndex={-1}
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}

        <div className="col-span-1 mt-2">
          <button
            type="button"
            onClick={() => addInputField(section)}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add Input
          </button>
        </div>
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
        <div className="flex items-center space-x-2 my-4">
          <input
            id="auxHoist"
            type="checkbox"
            checked={hasAuxHoist}
            onChange={(e) => setHasAuxHoist(e.target.checked)}
            className="accent-blue-600 w-4 h-4"
          />
          <label
            htmlFor="auxHoist"
            className="text-gray-800 text-sm font-medium"
          >
            Include Auxiliary Hoist
          </label>
        </div>
      </div>

      {renderSection("References", "references")}
      {renderSection("General Information", "generalInfo")}
      {renderSection("Crane Groups", "craneGroups")}
      {renderSection("Bridge", "bridge")}
      {renderSection("Main Hoist", "mainHoist")}
      {hasAuxHoist && renderSection("Auxiliary Hoist", "auxHoist")}
      {renderSection("Cross Traversing", "crossTraversing")}
      {renderSection("Long Travelling", "longTravelling")}
      {renderSection("Power Supply", "powerSupply")}
      {renderSection("Weights", "weights")}
      {renderSection("Component: Main Hoist", "componentMainHoist")}
      {hasAuxHoist &&
        renderSection("Component: Auxiliary Hoist", "componentAuxHoist")}
      {renderSection("Component: Trolley", "componentTrolley")}
      {renderSection("Component: Bridge", "componentBridge")}
    </div>
  );
};

export default CraneForm;
