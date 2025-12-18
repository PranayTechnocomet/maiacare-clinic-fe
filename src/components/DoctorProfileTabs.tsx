"use client";
import React, { useEffect, useState } from "react";

import CustomTabs from "./ui/CustomTabs";

import DoctorDetailPageComponent from "./DoctorDetailPageComponent";
import DoctorBasicDetails from "./form/Doctor-Basic-Details";
import DoctorManageLeave from "./form/Doctor-Manage-Leave";
import DoctorAssignedPatients from "./form/Doctor-Assigned-Patients";

import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import { AppDispatch } from "@/utlis/redux/store";
import { useDispatch } from "react-redux";
import DoctorAppointment from "./form/Doctor-Appointment";
import { useParams } from "next/navigation";

const ProfileTabes = () => {
  const params = useParams<{ id?: string }>();
  const DoctorId = "params?.id";
  // 6943a7e6a55e888c3f9fa264
  console.log("DoctorId",DoctorId);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeaderData({
        title: "Dr. Riya Dharang",
        subtitle: "Doctors > Dr. Riya Dharang ",
      })
    );
  }, []);
  const [activeTab, setActiveTab] = useState<string>("basic");

  const tabOptions = [
    {
      key: "basic",
      label: "Basic Details",
      content: (
        <>
          <DoctorBasicDetails />
        </>
      ),
    },
    {
      key: "leaves",
      label: "Manage Leaves",
      content: <>{<DoctorManageLeave />}</>,
    },
    {
      key: "assignedpatients",
      label: "Assigned Patients",
      content: <>{<DoctorAssignedPatients />}</>,
    },
    {
      key: "appointments",
      label: "Appointments",
      content: <>{<DoctorAppointment />}</>,
    },
  ];

  return (
    <>
      <DoctorDetailPageComponent />
      <div className="mt-4">
        <CustomTabs
          activeKey={activeTab}
          setActiveKey={setActiveTab}
          tabOptions={tabOptions}
        />

        {activeTab === "basic" && <div></div>}
      </div>
    </>
  );
};

export default ProfileTabes;
