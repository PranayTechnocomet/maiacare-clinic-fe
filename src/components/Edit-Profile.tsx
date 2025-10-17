"use client";
import React, { useEffect, useState } from "react";
import Editbasicdetails from "../components/form/Edit-Basic-Details";

// import Editkycdetails from "./form/Edit-Kyc-Details";

import CustomTabs from "./ui/CustomTabs";
import EditOperationalHours from "./form/Edit-Operational-Hours";
import EditContactDetails from "./form/Edit-Contact-Details";
// import ContentContainer from './ui/ContentContainer';
const EditProfile = () => {
  const [activeTab, setActiveTab] = useState<string>("basic");
  const handleNextClick = () => {
    setActiveTab("operational");
  };
  const handleoperationalNextClick = () => {
    setActiveTab("contact");
  };
  const handlePrevious = () => {
    setActiveTab("basic");
  };

  const tabOptions = [
    {
      key: "basic",
      label: "Basic Details",
      content: <></>,
    },

    {
      key: "operational",
      label: "Operational Hours",
      content: <></>,
    },
    {
      key: "contact",
      label: "Contact Details",
      content: <></>,
    },
  ];
  const handleContactPrevious = () => {
    setActiveTab("operational");
  };
  const handleSave = () => {};

  return (
    <div>
      <CustomTabs
        activeKey={activeTab}
        setActiveKey={setActiveTab}
        tabOptions={tabOptions}
      />

      {activeTab === "basic" && (
        <div>
          <Editbasicdetails onNext={handleNextClick} />
        </div>
      )}

      {activeTab === "operational" && (
        <div>
          <EditOperationalHours
            onNext={handleoperationalNextClick}
            onPrevious={handlePrevious}
          />
        </div>
      )}
      {activeTab === "contact" && (
        <div>
          <EditContactDetails
            onNext={handleSave}
            onPrevious={handleContactPrevious}
          />
        </div>
      )}
    </div>
  );
};
export default EditProfile;
