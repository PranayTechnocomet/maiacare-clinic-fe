"use client";
import Profile from "../../components/Profile";

import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import { AppDispatch } from "@/utlis/redux/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function page() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Profile", subtitle: "Profile" }));
  }, []);
  return (
    <div>
      <Profile />
    </div>
  );
}
