"use client";

import { useParams } from "next/navigation";

import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";

import { consultationData, treatmentPlanData } from "../../../utlis/StaticData";
import { TreatmentMonthView } from "../../../components/AppointmentsMonth";
import { AppDispatch } from "@/utlis/redux/store";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";

export default function PatientDetailPage() {
    const params = useParams();
    const treatmentplan = params?.id;
    const dispatch: AppDispatch = useDispatch();

 const treatment = useMemo(
  () => treatmentPlanData.find(p => String(p.id) === String(treatmentplan)),
  [treatmentplan]
);

    useEffect(() => {
        dispatch(setHeaderData({ title: treatment ? treatment.patientName: "treatment-plan Not Found" }));

    }, [treatment, dispatch]);

    if (!treatmentplan) {
        return <div className="p-4">treatmentplan not found</div>;
    }

    return (
        <div>
            {/* Pass the data to the component */}
            {/* <AppointmentsMonth /> */}

            <TreatmentMonthView />

        </div>
    );
}
