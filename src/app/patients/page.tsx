"use client";
import { Suspense } from "react";
import Consultation from "@/components/Consultation";

export default function PatientsPage() {


  return (
   <div>
      <Suspense fallback={<div>Loading consultations...</div>}>
        <Consultation />
      </Suspense>
    </div>
  );
  
}

