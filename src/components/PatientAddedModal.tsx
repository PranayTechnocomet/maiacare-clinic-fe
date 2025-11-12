import React, { useEffect, useState } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import Image from "next/image";
import dummyPatientImg from "../assets/images/dummy-patient-sucess.png";
export default function PatientAddedModal() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Check flag from localStorage
    const isSuccess = localStorage.getItem("patientAddedSuccess");
    if (isSuccess === "true") {
      setShowSuccessModal(true);
      localStorage.removeItem("patientAddedSuccess"); // clear after showing
    }
  }, []);
  return (
    <Modal
      show={showSuccessModal}
      onHide={() => setShowSuccessModal(false)}
      closeButton={true}
    >
      <div className="text-center">
        <Image
          src={dummyPatientImg}
          alt="dummyPatientImg"
          width={200}
          height={200}
        />
        <h3 className="modal-custom-header mt-2">
          Patient Added Successfully!!
        </h3>
        <p className="modal-custom-content">
          You can now view their profile & manage consultations seamlessly.
        </p>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <Button
          variant="outline"
          disabled={false}
          className="w-100"
          onClick={() => setShowSuccessModal(false)}
        >
          Okay
        </Button>
        <Button
          variant="default"
          disabled={false}
          className="w-100"
          onClick={() => setShowSuccessModal(false)}
        >
          View Details
        </Button>
      </div>
    </Modal>
  );
}
