import React from "react";
import BayAreaSection from "./BayAreaSection";

const Annexure1Form = () => {
  return (
    
    <div className="space-y-6">

      {/* Bay Areas and Cranes */}
      <div className="bg-white backdrop-blur-md rounded-3xl shadow">
        <BayAreaSection />
      </div>

      {/* Crane Components */}
      {/* <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow">
        <CraneComponentsForm />
      </div> */}
    </div>
  );
};

export default Annexure1Form;
