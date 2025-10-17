"use client";

import { AppDispatch } from "../../utlis/redux/store";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHeaderData } from "../../utlis/redux/slices/headerSlice";

import { Suspense } from "react";
import Consultation from "@/components/Consultation";

export default function PatientsPage() {
  const dispatch: AppDispatch = useDispatch();


  useEffect(() => {
   dispatch(setHeaderData({ title: "Patients",subtitle: "Patients"  }));
  }, []);

  return (
   <div>
      <Suspense fallback={<div>Loading consultations...</div>}>
        <Consultation />
      </Suspense>
    </div>
  );
  
}

