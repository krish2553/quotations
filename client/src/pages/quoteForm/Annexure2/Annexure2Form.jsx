import React, { useEffect } from "react";
import { useQuote } from "../../../context/quoteContext";

const defaultKrishCraneScope = `Complete crane as mentioned in the technical data as per Annex. 1, generally as follows:
- Complete hoist unit.
- End carriage with following items:
- Travelling wheels
- Travelling mechanisms including geared brake motor
- Rubber buffer
- Travelling limit switch
Complete electrical supply and control system for the crane with:
- Electrical panel mounted on crane girder with switchgears, VFDs, panel light, transformer, current collector, accessories and enclosure.
- Pendant control system (moveable) & RRC
- Fixed and movable cable for crane
- DSL busbar system with indicating lamp including installation
- Load Cell and its allied equipment.
- Current Collectors
Heavy duty C-Rail for movable pendant system.
Quality control and shop inspection.
Crane steel structures including following items:
- Double box-girder and Single box girder as per specifications
- Maintenance platform and walkway
- Surface preparation and painting including final touch of crane at site
Crane LT Rails.
Isolator switch and cable up to DSL.
Mobile cranes and sky lifts for erection and commissioning.
Unloading, internal transportation, of the equipment at the site.
Necessary load blocks, cradle, slings at site for load testing.
Erection supervision and commissioning.`;

const defaultBuyerScope = `Providing of crane runway/gantry girders with accessories and alignment to the required tolerances.
End stoppers for the crane.
Attachment below hook (like C hook, Magnet, Lifting beam, etc.)
Erection/site insurance of the supplied items/materials.
Transit insurance in buyer’s scope.
Inspection and witness of the load test.
Storage and security of the equipment at the site.
Facilitation of essential power for the installation, assembly, erection and commissioning of the crane and accessibility.
Buyer’s responsibility to attend the erection and commissioning at site can happen without interruptions.
During erection if sufficient head room is not available for the mobile crane boom, then roof openings are to be prepared in advance by the buyer.`;
const Annexure2Form = () => {
  const { quoteData, updateQuote } = useQuote();
  const { annexure2 = {} } = quoteData;

  useEffect(() => {
    // Initialize default values if not already present
    if (!annexure2.krishCraneScope || !annexure2.buyerScope) {
      updateQuote("annexure2", {
        krishCraneScope: annexure2.krishCraneScope || defaultKrishCraneScope,
        buyerScope: annexure2.buyerScope || defaultBuyerScope,
      });
    }
  }, []);

  const handleChange = (field, value) => {
    updateQuote("annexure2", { ...annexure2, [field]: value });
  };

  return (
    <div className="p-6 bg-white backdrop-blur-md rounded-2xl shadow space-y-6">
      {/* Krish Crane Scope */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="font-medium text-blue-700">For Krish Crane</label>
          <span className="text-sm text-gray-500">
            Note: Enter for new point and - for subpoint
          </span>
        </div>
        <textarea
          value={annexure2.krishCraneScope}
          onChange={(e) => handleChange("krishCraneScope", e.target.value)}
          rows={20}
          className="max-h-[80vh] overflow-auto scrollbar-minimal w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      {/* Buyer Scope */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="font-medium text-blue-700">For Buyer</label>
          <span className="text-sm text-gray-500">
            Note: Enter for new point and - for subpoint
          </span>
        </div>
        <textarea
          value={annexure2.buyerScope}
          onChange={(e) => handleChange("buyerScope", e.target.value)}
          rows={20}
          className="max-h-[80vh] overflow-auto scrollbar-minimal w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>
    </div>
  );
};

export default Annexure2Form;
