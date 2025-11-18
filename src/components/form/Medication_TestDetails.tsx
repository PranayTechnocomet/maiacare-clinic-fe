import React from "react";
import ContentContainer from "../ui/ContentContainer";
import Button from "../ui/Button";
import medication from "../../assets/images/medication.png";
import Image from "next/image";
export default function Medication_TestDetails() {
  return (
    <div>
      <ContentContainer>
        <div className="contact-details-heading m-0">Medication & Tests </div>
        <div className="d-flex flex-column justify-content-center align-items-center my-4">
          <Image src={medication} alt="medication" width={80} height={80} />
          <span className="doctor-profile-subheading fst-italic mt-2">
           No medication & tests 
          </span>
        </div>
      </ContentContainer>
    </div>
  );
}
