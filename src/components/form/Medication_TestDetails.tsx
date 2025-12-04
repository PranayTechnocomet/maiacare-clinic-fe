import React, { useState } from "react";
import ContentContainer from "../ui/ContentContainer";
import Button from "../ui/Button";
import medication from "../../assets/images/medication.png";
import Image from "next/image";
import { PiPill } from "react-icons/pi";
import { PiDownloadSimpleBold } from "react-icons/pi";
import test from "node:test";
export default function Medication_TestDetails() {
  const Tests = [
    { name: "Progesterone", mg: "200 mg", type: "Tablet", day: "Twice a day" },
    { name: "Follistim", mg: "200 mg", type: "Tablet", day: "Daily" },
    { name: "Progesterone", mg: "200 mg", type: "Tablet", day: "Twice a day" },
    {
      name: "Follistim",
      mg: "200 mg",
      type: "Tablet",
      day: "Twice a day",
    },
  ];
  const handleDownload = () => {
    console.log("download");
  };
  const [step, setStep] = useState(0);
  const handleClick = () => {
    setStep(1);
  };
  return (
    <div>
      <ContentContainer>
        <div className="contact-details-heading m-0">Medication & Tests </div>
        {step === 0 ? (
          <div
            className="d-flex flex-column cursor-pointer justify-content-center align-items-center my-4"
            onClick={handleClick}
          >
            <Image src={medication} alt="medication" width={80} height={80} />
            <span className="doctor-profile-subheading fst-italic mt-2">
              No medication & tests
            </span>
          </div>
        ) : (
          <div className="mt-4">
            {Tests.map((test, index) => (
              <div
                key={index}
                className={`d-flex justify-content-between align-items-center border profile-card-boeder document-main-border ${
                  index !== Tests.length - 1 ? "mb-3" : ""
                }`}
                style={{ padding: "11px" }}
              >
                <div className="d-flex align-items-center">
                  <div className="test-pill">
                    <PiPill fontSize={24} />
                  </div>
                  <div>
                    <div className="card-feild">{test.name}</div>
                    <div className="d-flex gap-2 align-items-center">
                      <div className="card-year ">{test.mg}</div>
                      <div className="test-card">|</div>
                      <div className="card-year">{test.type}</div>
                      <div className="test-card">|</div>
                      <div className="card-year">{test.day}</div>
                    </div>
                  </div>
                </div>

                {/* <button
                className="d-flex  bg-white justify-content-center align-items-center border profile-card-boeder rounded Download-border"
                onClick={() =>
                  handleDownload(`/files/${doc.name}.pdf`, doc.name)
                }
              >
                <Image src={Download} alt="experience" width={25} height={25} />
              </button> */}
              </div>
            ))}
            <div
              className="maiacare-button d-flex gap-2 justify-content-center maiacare-button-large default-layout maiacare-button maiacare-button-medium outline-layout mt-4 w-100 btn btn-primary"
              onClick={handleDownload}
            >
              <PiDownloadSimpleBold fontSize={24} />
              Download All Prescriptions
            </div>
          </div>
        )}
      </ContentContainer>
    </div>
  );
}
