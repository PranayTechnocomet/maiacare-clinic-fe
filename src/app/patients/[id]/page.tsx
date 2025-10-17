"use client";

import { useParams } from "next/navigation";
import PatientDetailPageComponent from "../../../components/PatientDetailPage";

import { AppDispatch } from "../../../utlis/redux/store";

import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { setHeaderData } from "../../../utlis/redux/slices/headerSlice";

import { DoctorData } from "../../../utlis/StaticData";

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = params?.id;
  const dispatch: AppDispatch = useDispatch();

  const patient = useMemo(
    () => DoctorData.find((p) => String(p.id) === String(patientId)),
    [patientId]
  );

  useEffect(() => {
    dispatch(
      setHeaderData({ title: patient ? patient.name : "Patient Not Found" })
    );
  }, [patient, dispatch]);

  if (!patient) {
    return <div className="p-4">Patient not found</div>;
  }

  return (
    <div>
      {/* Pass the data to the component */}
      <PatientDetailPageComponent />
    </div>
  );
}
