'use client';
import AddDoctor from "@/components/AddDoctor";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import { AppDispatch } from "@/utlis/redux/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function page() {
    const dispatch: AppDispatch = useDispatch();
    
    
      useEffect(() => {
       dispatch(setHeaderData({ title: "Add New Doctor",subtitle: "Doctors > Add New Doctor"  }));
      }, []);
  return (
    <div>
      <AddDoctor />
    </div>
  );
}
