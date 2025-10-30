"use client";
import React, { useEffect, useState } from "react";
import CustomTabs from "./ui/CustomTabs";
import AddDoctorBasicDetails from "./form/Add-Doctor-Basic-Details";
import EditKycDetails from "./form/Add-Doctor-Kyc-Details";
import AddDoctorClinicdetails from "./form/Add-Doctor-Clinic-details";

const AddDoctor = () => {
  const [activeTab, setActiveTab] = useState<string>("basic");

  const handlebasicNextClick = () => {
    setActiveTab("Clinic");
  };
  const handleNextClick = () => {
    setActiveTab("KYC");
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
      key: "Clinic",
      label: "Clinic Details",
      content: <></>,
    },
    {
      key: "KYC",
      label: "KYC Details",
      content: <></>,
    },
  ];
  const [doctors, setDoctors] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState("add"); // or 'list'
  const handleAddDoctor = (newDoctor: any) => {
    setDoctors((prev) => [...prev, newDoctor]);
    setCurrentStep("list"); // go to list page after add
  };
  return (
    <div>
      <CustomTabs
        activeKey={activeTab}
        setActiveKey={setActiveTab}
        tabOptions={tabOptions}
      />

      {activeTab === "basic" && (
        <div>
          <AddDoctorBasicDetails
            onNext={handlebasicNextClick}
            onSaveDoctor={handleAddDoctor}
          />
        </div>
      )}
      {activeTab === "Clinic" && (
        <div>
          <AddDoctorClinicdetails
            onNext={handleNextClick}
            onPrevious={handlePrevious}
          />
        </div>
      )}
      {activeTab === "KYC" && (
        <div>
          <EditKycDetails
            onNext={handleNextClick}
            onPrevious={handlePrevious}
          />
        </div>
      )}
    </div>
  );
};
export default AddDoctor;
