"use client"
import Dashboard from '@/components/Dashboard'
import { setHeaderData } from '@/utlis/redux/slices/headerSlice';
import { AppDispatch } from '@/utlis/redux/store';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

export default function page() {
     const dispatch: AppDispatch = useDispatch();
      useEffect(() => {
        dispatch(setHeaderData({ title: "Dashboard", subtitle: "Dashboard" }));
      }, []);
  return (
    <div>
        <Dashboard/>
    </div>
  )
}
