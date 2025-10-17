"use client";

import { AppDispatch } from "../../utlis/redux/store";
import { useDispatch } from "react-redux";
import { Suspense, useEffect } from "react";
import { setHeaderData } from "../../utlis/redux/slices/headerSlice";

import EditProfile from "../../components/Edit-Profile";

function Page() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeaderData({
        title: "Clinic Profile",
        subtitle: " profile >  EditProfile",
      })
    );
  }, []);
  
  return (
    <Suspense fallback={<div></div>}>
      <EditProfile />
    </Suspense>
  );
}

export default Page;
