"use client";
import Doctor from "@/components/Doctor";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import { AppDispatch } from "@/utlis/redux/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function page() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Doctors", subtitle: "Doctors" }));
  }, []);
  return (
    <div>
      <Doctor />
    </div>
  );
}
