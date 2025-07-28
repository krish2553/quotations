import React from "react";
import { useEffect } from "react";
import { useQuote } from "../../../context/quoteContext";

const craneComponents = [
  "Hoisting Machinery",
  "Hoisting Motor",
  "Gear Reducer",
  "Hoisting Brake",
  "Hoist Drum and Rope",
  "Traversing Machinery",
  "Traversing Motor",
  "Traversing Gear",
  "Traversing Brake",
  "Trolley Wheels",
  "Bridge",
  "Travelling Motor",
  "Travelling Gear",
  "Travelling Brake",
  "Bridge End Carriages",
  "Travelling Wheels",
  "Rubber Buffers",
  "Steel Structures",
  "Girder",
  "Service Platform",
  "Electrical",
  "Limit Switch",
  "Limit Switch for Hoisting",
  "Limit Switch for Traversing and Travelling",
  "Bridge Anti-Collision System",
  "Audio-Visual Alarm",
  "Enclosures/Electrical Panels",
  "Variable Frequency Drives/Inverters",
  "Dynamic Braking Resistors",
  "Contactors",
  "Movable Pendant and RRC",
];


const CraneComponentsForm = () => {
  const { quoteData, updateQuote } = useQuote();
  const selected = quoteData.annexure1?.craneComponentNames || [];

  useEffect(() => {
    // If the component list hasn't been initialized yet, select all by default.
    // This runs only once when the form is first seen.
    if (quoteData.annexure1?.craneComponentNames === undefined) {
      updateQuote("annexure1", {
        ...quoteData.annexure1,
        craneComponentNames: craneComponents,
      });
    }
  }, []);
  const handleToggle = (name) => {
    const updated = selected.includes(name)
      ? selected.filter((item) => item !== name)
      : [...selected, name];

    updateQuote("annexure1", {
      ...quoteData.annexure1,
      craneComponentNames: updated,
    });
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Crane Components Selection
      </h3>
      <div className="space-y-3">
        {craneComponents.map((comp, idx) => (
          <label
            key={idx}
            className="flex items-center gap-3 p-3 bg-white/70 rounded-lg shadow-sm hover:bg-gray-50/70 transition-all cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.includes(comp)}
              onChange={() => handleToggle(comp)}
              className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-gray-700">{comp}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CraneComponentsForm;
