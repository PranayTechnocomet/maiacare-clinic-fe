'use client';
import React, { useEffect } from 'react'
import DoctorDetailPageComponent from "../../../components/DoctorDetailPageComponent";
import { setHeaderData } from '@/utlis/redux/slices/headerSlice';
import { AppDispatch } from '@/utlis/redux/store';
import { useDispatch } from 'react-redux';
export default function page() {
    const dispatch: AppDispatch = useDispatch();
  
  
    useEffect(() => {
     dispatch(setHeaderData({ title: "Edit Doctor",subtitle: "Doctors > Edit Doctor "  }));
    }, []);
  return (
    <div>
      <DoctorDetailPageComponent/>
    </div>
  )
}
