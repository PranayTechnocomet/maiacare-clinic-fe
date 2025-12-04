import React, { useState } from "react";
import ContentContainer from "../ui/ContentContainer";
import { Accordion, Col, Row } from "react-bootstrap";
import Button from "../ui/Button";
import treatment from "../../assets/images/treatment.png";
import Image from "next/image";
export default function TreatmentPatientProfileDetails() {
  const [step, setStep] = useState(0);
  const handleClick = () => {
    setStep(1);
  };
  return (
    <div>
      <ContentContainer>
        <div className="contact-details-heading m-0">Treatment Details</div>
        {step === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center flex-column my-4"
            onClick={handleClick}
          >
            <Image src={treatment} alt="treatment" width={185} height={111} />
            <span className="doctor-profile-subheading fst-italic mt-3">
              No treatment plan
            </span>
          </div>
        ) : (
          <div className="mt-4">hy</div>
        )}
      </ContentContainer>
    </div>
  );
}
function setShowModal(arg0: boolean) {
  throw new Error("Function not implemented.");
}
