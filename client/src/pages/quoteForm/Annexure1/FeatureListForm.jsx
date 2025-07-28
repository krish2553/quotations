import React from "react";
import { useQuote } from "../../../context/quoteContext";

const predefinedFeatures = [
];

const FeatureListForm = () => {
  const { quoteData, updateQuote } = useQuote();
  const selected = quoteData.annexure1?.features || [];

  const handleToggle = (feature) => {
    let updated = [];
    if (selected.includes(feature)) {
      updated = selected.filter((item) => item !== feature);
    } else {
      updated = [...selected, feature];
    }
    updateQuote("annexure1", {
      ...quoteData.annexure1,
      features: updated,
    });
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Feature List Selection</h3>
      <div className="space-y-2">
        {predefinedFeatures.map((feature, idx) => (
          <label key={idx} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(feature)}
              onChange={() => handleToggle(feature)}
            />
            {feature}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FeatureListForm;