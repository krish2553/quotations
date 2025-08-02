import React from "react";
import { useQuote } from "../../../context/quoteContext";
import CraneForm from "./CraneForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faChevronDown,
  faChevronUp,
  faClone,
} from "@fortawesome/free-solid-svg-icons";

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
        ["Quotation reference number", quoteData.quotationId], // FIX: Use quotationId from context
        ["Application", ""],
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
      ],
      craneGroups: [
        ["Construction", "Class II, IS 807"],
        ["Mechanism Class", "M5, IS 3177: IS 807"],
      ],
      bridge: [
        ["Construction", "Single Girder - Double web welded"],
        ["Bridge Capacity", "5 tons"],
        ["Span (c-c)", "14.300 M"],
        ["Runway Length", "59.1 M"],
        ["Rail Size", "50x40 M"],
        ["Max. Static Wheel Load", "33.46 kN"],
      ],
      mainHoist: [
        ["Load", "5 tons"],
        ["Duty", "M5, IS 3177:2020; IS 807:2006"],
        ["Lifting Height", "10 M"],
        ["Main Hoisting Speed", "4.2 M/Min"],
        ["Creep Hoisting Speed", "10–100% of Main Speed"],
        ["Hoisting Motor", "1 x 5.5 kW"],
      ],
      auxHoist: [
        ["Load", "5 tons"],
        ["Duty", "M5, IS 3177:2020; IS 807:2006"],
        ["Lifting Height", "10 M"],
        ["Main Hoisting Speed", "4.2 M/Min"],
        ["Creep Hoisting Speed", "10–100% of Main Speed"],
        ["Hoisting Motor", "1 x 5.5 kW"],
      ],
      crossTraversing: [
        ["Cross traversing speed", "20 M/Min"],
        ["Creep traversing speed", "10–100% of Main Speed"],
        ["Cross traversing motor", "2 x 0.37 kW"],
      ],
      longTravelling: [
        ["Long Travelling Speed", "20 M/Min"],
        ["Creep travelling speed", "10–100% of main speed"],
        ["Long Travelling Motor", "2 x 0.75 kW"],
      ],
      powerSupply: [
        ["Power Supply", "3 Ph. ~ 415 V, 50 Hz"],
        ["Crane Motor Voltage", "415 V"],
        ["Control Voltage", "110 VAC"],
      ],
      weights: [
        ["Weight of Hoist (Approx.)", "610 kgs"],
        ["Weight of Bridge (Approx.)", "3200 kgs"],
      ],
      componentMainHoist: [
        ["Rope Reeving / Fall System", "4"],
        ["Rope Diameter", "10mm"],
        ["Hook", "Single Shank"],
        ["Rope drum", "Machine grooved"],
      ],
      componentAuxHoist: [
        ["Rope Reeving / Fall System", "4"],
        ["Rope Diameter", "10mm"],
        ["Hook", "Single Shank"],
        ["Rope drum", "Machine grooved"],
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

  const duplicateBayArea = (e, bayIndex) => {
    e.stopPropagation();
    const clonedBay = JSON.parse(JSON.stringify(bayAreas[bayIndex]));
    clonedBay.name = `${clonedBay.name} Copy`;
    handleUpdate([...bayAreas, clonedBay]);
  };

  const duplicateCrane = (e, bayIndex, craneIndex) => {
    e.stopPropagation();
    const updatedBayAreas = bayAreas.map((bay, bIdx) => {
      if (bIdx === bayIndex) {
        const clonedCrane = JSON.parse(JSON.stringify(bay.cranes[craneIndex]));
        clonedCrane.name = `${clonedCrane.name} Copy`;
        return {
          ...bay,
          cranes: [...bay.cranes, clonedCrane],
        };
      }
      return bay;
    });
    handleUpdate(updatedBayAreas);
  };

  return (
    <div className="p-4 pb-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Bay Areas</h3>
        <button
          className="border focus:outline-blue-400 focus:rounded-xl border-blue-500 text-blue-400 px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-500 hover:text-white"
          onClick={addBayArea}
        >
          + Bay
        </button>
      </div>

      {bayAreas.map((bay, bayIdx) => (
        <details
          key={bayIdx}
          className="mb-4 border border-blue-200/80 rounded-xl overflow-hidden "
        >
          <summary className=" focus:outline-blue-400 focus:rounded-xl  cursor-pointer px-4 py-3 font-medium bg-blue-100/70 flex justify-between items-center hover:bg-blue-200/70">
            <div>
              <FontAwesomeIcon icon={faChevronDown} className="text-gray-500" />
            </div>
            <span className="text-gray-800">
              Bay Area {bayIdx + 1}: {bay.name || "(Unnamed)"}
            </span>
            <div className="gap-3 flex items-center">
              <button
                className="text-sm p-1 focus:outline-blue-400 focus:rounded-lg ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  duplicateBayArea(e, bayIdx);
                }}
                title="Duplicate Bay Area"
              >
                <span className="text-sm focus:outline-blue-400 focus:rounded-lg">
                  <FontAwesomeIcon
                    icon={faClone}
                    className="text-blue-500 hover:text-blue-900 cursor-pointer"
                  />
                </span>
              </button>
              <button
                className="text-sm p-1 focus:outline-blue-400 focus:rounded-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  const confirmDelete = window.confirm(
                    "Are you sure you want to remove this Bay Area and all its cranes?"
                  );
                  if (confirmDelete) removeBayArea(e, bayIdx);
                }}
                title="Delete Bay Area"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-blue-500 hover:text-red-500 cursor-pointer"
                />
              </button>
            </div>
          </summary>
          <div className="p-4 space-y-4 bg-blue-50/50">
            <input
              className="w-full border focus:outline-blue-400 focus:rounded-xl border-gray-300 bg-white p-2 rounded-xl"
              type="text"
              placeholder="Bay Area Name"
              value={bay.name}
              onChange={(e) => updateBayAreaName(bayIdx, e.target.value)}
            />

            {bay.cranes.map((crane, craneIdx) => (
              <details
                key={craneIdx}
                className="border border-blue-200 rounded-xl max-h-[80vh] overflow-auto scrollbar-minimal"
              >
                <summary className="sticky focus:outline-blue-400 focus:rounded-xl top-0 z-10 cursor-pointer px-3 py-2 bg-blue-50 font-medium flex justify-between items-center hover:bg-blue-100">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="text-gray-500"
                  />
                  <span className="text-gray-700">
                    Crane {craneIdx + 1}: {crane.name || "(Unnamed)"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      className="text-sm p-1 focus:outline-blue-400 focus:rounded-lg ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateCrane(e, bayIdx, craneIdx);
                      }}
                      title="Duplicate Crane"
                    >
                      <span className="focus:outline-blue-400 focus:rounded-lg cursor-pointer">
                        <FontAwesomeIcon
                          icon={faClone}
                          className="text-blue-500 hover:text-blue-900 cursor-pointer"
                        />
                      </span>
                    </button>
                    <button
                      className="text-sm p-1 focus:outline-blue-400 focus:rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        const confirmDelete = window.confirm(
                          "Are you sure you want to remove this Crane?"
                        );
                        if (confirmDelete) removeCrane(e, bayIdx, craneIdx);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-blue-500 hover:text-red-500 cursor-pointer transition-all"
                      />
                    </button>
                  </div>
                </summary>
                <div className="p-4 bg-white">
                  <CraneForm bayIndex={bayIdx} craneIndex={craneIdx} />
                </div>
              </details>
            ))}

            <button
              className="border border-green-600 text-green-600 text-sm px-3 py-1 rounded-xl font-medium hover:bg-green-600 hover:text-white transition-colors duration-300"
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
