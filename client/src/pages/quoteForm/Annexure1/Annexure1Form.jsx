import React from "react";
import BayAreaSection from "./BayAreaSection";
import FeatureListForm from "./FeatureListForm";
import CraneComponentsForm from "./CraneComponentsForm";

const Annexure1Form = () => {
  return (
    <div className="space-y-6">
      {/* <h2 className="text-xl font-bold text-gray-800">
        Annexure 1 – Technical Details
      </h2> */}

      {/* Bay Areas and Cranes */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-md">
        <BayAreaSection />
      </div>

      {/* Crane Components */}
      {/* <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-md">
        <CraneComponentsForm />
      </div> */}
    </div>
  );
};

export default Annexure1Form;
