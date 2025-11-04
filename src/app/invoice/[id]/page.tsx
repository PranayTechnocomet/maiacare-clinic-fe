"use client";
import ViewInvoice from "@/components/ViewInvoice";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import { AppDispatch } from "@/utlis/redux/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function page() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeaderData({
        title: "IN123",
        subtitle: "Patients > Rani Desai > IN123",
      })
    );
  }, []);
  return (
    <>
      <ViewInvoice />
    </>
  );
}
