import React from "react";
import ContentContainer from "../ui/ContentContainer";
import Image from "next/image";
import payment from "../../assets/images/payment.png";
import Button from "../ui/Button";
export default function PaymentPatientProfileDetails() {
  return (
    <div>
      <ContentContainer>
        <div className="contact-details-heading m-0">Payment Details</div>
        <div className="d-flex flex-column justify-content-center align-items-center my-4">
          <Image src={payment} alt="Payment" width={80} height={80} />
          <span className="doctor-profile-subheading fst-italic mt-2">
            No bills generated
          </span>
          <Button className="maiacare-button maiacare-button-medium outline-layout mt-4  btn btn-primary">
            Generate Bill
          </Button>
        </div>
      </ContentContainer>
    </div>
  );
}
