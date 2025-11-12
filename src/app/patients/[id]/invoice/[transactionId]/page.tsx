"use client";

import { useParams } from "next/navigation";

import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";

import { PaymentHistoryData } from "../../../../../utlis/StaticData";
import PatientPaymentInvoice from "@/components/PatientPaymentInvoice";
import { AppDispatch } from "@/utlis/redux/store";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";

export default function PatientDetailPage() {
 const params = useParams();
const PatientPaymentHistoryId = params?.transactionId;

    const dispatch: AppDispatch = useDispatch();

    const PaymentHistory = useMemo(
        () => PaymentHistoryData.find(p => String(p.transactionId) === String(PatientPaymentHistoryId)),
        [PatientPaymentHistoryId]
    );

    useEffect(() => {
        dispatch(setHeaderData({ title: PaymentHistory ? PaymentHistory.actions : "Payment History Not Found" }));
    }, [PaymentHistory, dispatch]);

    if (!PaymentHistory) {
        return <div className="p-4">PaymentHistory not found</div>;
    }

    return (
        <div>
            <PatientPaymentInvoice />
        </div>
    );
}
