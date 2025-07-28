import React from "react";
import { useQuote } from "../../../context/quoteContext";
import CraneForm from "./CraneForm";

const BayAreaSection = () => {
  const { quoteData, updateQuote } = useQuote();
  const bayAreas = quoteData.annexure1?.bayAreas || [];

  const handleUpdate = (newBayAreas) => {
    updateQuote("annexure1", {
      ...quoteData.annexure1,
      bayAreas: newBayAreas,
    });
  };

  const addBayArea = () => {
    const newBay = {
      name: `Bay Area ${bayAreas.length + 1}`,
      cranes: [],
    };
    handleUpdate([...bayAreas, newBay]);
  };

  const removeBayArea = (e, bayIndex) => {
    e.stopPropagation();
    const updatedBayAreas = bayAreas.filter((_, index) => index !== bayIndex);
    handleUpdate(updatedBayAreas);
  };

  const addCrane = (bayIndex) => {
    const newCrane = {
      name: "New Crane",
      references: [
        ["Client's Reference", ""],
        ["Quotation reference number", ""],
        ["Application", ""],
        ["Note", ""],
      ],
      generalInfo: [
        ["Total Crane Quantity", "1 Units"],
        ["Crane Quantity", "1 Unt"],
        ["Hoisting unit", "KHX Series Hoist"],
        ["Crane Control", "Radio Control and Movable Pendant"],
        ["Ambient Temperature", "0–50 °C"],
        ["Pendant Controller", "1 pc(s) for each crane"],
        ["Radio Remote Controller", "1 pc(s) for each crane"],
        ["Operation Environment", "Indoor, non-Dusty"],
        ["Note", ""],
      ],
      craneGroups: [
        ["Construction", "Class II, IS 807"],
        ["Mechanism Class", "M5, IS 3177: IS 807"],
        ["Note", ""],
      ],
      bridge: [
        ["Construction", "Single Girder - Double web welded"],
        ["Bridge Capacity", "5 tons"],
        ["Span (c-c)", "14.300 M"],
        ["Runway Length", "59.1 M"],
        ["Rail Size", "50x40 M"],
        ["Max. Static Wheel Load", "33.46 kN"],
        ["Note", ""],
      ],
      mainHoist: [
        ["Load", "5 tons"],
        ["Duty", "M5, IS 3177:2020; IS 807:2006"],
        ["Lifting Height", "10 M"],
        ["Main Hoisting Speed", "4.2 M/Min"],
        ["Creep Hoisting Speed", "10–100% of Main Speed"],
        ["Hoisting Motor", "1 x 5.5 kW"],
        ["Note", ""],
      ],
      crossTraversing: [
        ["Cross traversing speed", "20 M/Min"],
        ["Creep traversing speed", "10–100% of Main Speed"],
        ["Cross traversing motor", "2 x 0.37 kW"],
        ["Note", ""],
      ],
      longTravelling: [
        ["Long Travelling Speed", "20 M/Min"],
        ["Creep travelling speed", "10–100% of main speed"],
        ["Long Travelling Motor", "2 x 0.75 kW"],
        ["Note", ""],
      ],
      powerSupply: [
        ["Power Supply", "3 Ph. ~ 415 V, 50 Hz"],
        ["Crane Motor Voltage", "415 V"],
        ["Control Voltage", "110 VAC"],
        ["Note", ""],
      ],
      weights: [
        ["Weight of Hoist (Approx.)", "610 kgs"],
        ["Weight of Bridge (Approx.)", "3200 kgs"],
        ["Note", ""],
      ],
      componentMainHoist: [
        ["Rope Reeving / Fall System", "4"],
        ["Rope Diameter", "10mm"],
        ["Hook", "Single Shank"],
        ["Rope drum", "Machine grooved"],
        ["Note", ""],
      ],
      componentTrolley: [["Wheel Quantity X Diameter", "4 x 125 mm"]],
      componentBridge: [["Wheel Quantity X Diameter", "4 x 200 mm"]],
    };

    const updatedBayAreas = bayAreas.map((bay, index) => {
      if (index === bayIndex) {
        return {
          ...bay,
          cranes: [...bay.cranes, newCrane],
        };
      }
      return bay;
    });

    handleUpdate(updatedBayAreas);
  };

  const removeCrane = (e, bayIndex, craneIndex) => {
    e.stopPropagation();
    const updatedBayAreas = bayAreas.map((bay, index) => {
      if (index === bayIndex) {
        return {
          ...bay,
          cranes: bay.cranes.filter((_, cIndex) => cIndex !== craneIndex),
        };
      }
      return bay;
    });
    handleUpdate(updatedBayAreas);
  };

  const updateBayAreaName = (index, value) => {
    const updatedBayAreas = bayAreas.map((bay, i) => {
      if (i === index) {
        return { ...bay, name: value };
      }
      return bay;
    });
    handleUpdate(updatedBayAreas);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Bay Areas</h3>
        <button
          className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors duration-300"
          onClick={addBayArea}
        >
          + Bay
        </button>
      </div>

      {bayAreas.map((bay, bayIdx) => (
        <details
          key={bayIdx}
          className="mb-4 border border-gray-200/80 rounded-lg overflow-hidden"
        >
          <summary className="cursor-pointer px-4 py-3 font-medium bg-gray-100/70 flex justify-between items-center hover:bg-gray-200/70 transition-all">
            <span className="text-gray-800">
              Bay Area {bayIdx + 1}: {bay.name || "(Unnamed)"}
            </span>
            <button
              className="border border-red-600 text-red-600 text-sm px-3 py-1 rounded-md font-medium hover:bg-red-600 hover:text-white transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                const confirmDelete = window.confirm(
                  "Are you sure you want to remove this Bay Area and all its cranes?"
                );
                if (confirmDelete) removeBayArea(e, bayIdx);
              }}
            >
              - Bay
            </button>
          </summary>
          <div className="p-4 space-y-4 bg-white/50">
            <input
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Bay Area Name"
              value={bay.name}
              onChange={(e) => updateBayAreaName(bayIdx, e.target.value)}
            />

            {bay.cranes.map((crane, craneIdx) => (
              <details
                key={craneIdx}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <summary className="cursor-pointer px-3 py-2 bg-gray-50/70 font-medium flex justify-between items-center hover:bg-gray-100/70 transition-all">
                  <span className="text-gray-700">
                    Crane {craneIdx + 1}: {crane.name || "(Unnamed)"}
                  </span>
                  <button
                    className="border border-red-600 text-red-600 text-sm px-3 py-1 rounded-md font-medium hover:bg-red-600 hover:text-white transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      const confirmDelete = window.confirm(
                        "Are you sure you want to remove this Crane?"
                      );
                      if (confirmDelete) removeCrane(e, bayIdx, craneIdx);
                    }}
                  >
                    - Crane
                  </button>
                </summary>
                <div className="p-4 bg-white/40">
                  <CraneForm bayIndex={bayIdx} craneIndex={craneIdx} />
                </div>
              </details>
            ))}

            <button
              className="border border-green-600 text-green-600 text-sm px-3 py-1 rounded-md font-medium hover:bg-green-600 hover:text-white transition-colors duration-300"
              onClick={() => addCrane(bayIdx)}
            >
              + Crane
            </button>
          </div>
        </details>
      ))}
    </div>
  );
};

export default BayAreaSection;
