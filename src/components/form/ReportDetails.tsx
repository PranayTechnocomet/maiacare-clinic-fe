import React from "react";
import ContentContainer from "../ui/ContentContainer";
import Image from "next/image";
import report from "../../assets/images/medical-reports.png";
import Button from "../ui/Button";
import upload from "../../assets/images/Uploadimg.png";
export default function ReportDetails() {
  return (
    <div>
      <ContentContainer>
        <div className="contact-details-heading m-0">Payment Details</div>
        <div className="d-flex flex-column justify-content-center align-items-center my-4">
          <Image src={report} alt="Payment" width={80} height={80} />
          <span className="doctor-profile-subheading fst-italic mt-2">
            No Reports
          </span>
          <Button
            className="maiacare-button maiacare-button-medium d-flex justify-content-center align-items-center gap-2 outline-layout mt-4  btn btn-primary"
            // onClick={handleOpenModal}
          >
            <Image src={upload} alt="upload" width={18} height={18} />
            Upload Report
          </Button>
        </div>
      </ContentContainer>
    </div>
  );
}
