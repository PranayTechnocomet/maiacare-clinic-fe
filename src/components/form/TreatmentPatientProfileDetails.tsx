import React, { useState } from "react";
import ContentContainer from "../ui/ContentContainer";
import { Accordion, Col, Row } from "react-bootstrap";
import Button from "../ui/Button";
import treatment from "../../assets/images/treatment.png";
import Image from "next/image";
import Arrowup from "../../assets/images/ArrowUpRight.png";
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
          <div className="mt-4">
            <Accordion defaultActiveKey="0">
              <Accordion.Item
                eventKey="0"
                className="phisical-assessment-accordion-item mb-3"
              >
                <Accordion.Header>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <span className="patient-report-box-title">
                      IVF Cycle 1
                    </span>
                    <span className="status-pill status-pending">Ongoing</span>
                    <Button
                      className="maiacare-button-large   profile-card-boeder  bg-transparent btn btn-primary"
                      // onClick={() => router.push("/profile")}
                      variant="dark"
                    >
                      <Image src={Arrowup} alt="Arrow" width={14} height={14} />
                    </Button>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="pt-0">
                  <Row className="g-2">
                    <Col sm={6} className="mt-3">
                      <div className="d-flex flex-column gap-1">
                        <span className="contact-details-emergency">
                          Start Date
                        </span>
                        <span className="accordion-title-detail">
                          7 Feb 2025
                        </span>
                      </div>
                    </Col>
                    <Col sm={6} className="mt-3">
                      <div className="d-flex flex-column gap-1">
                        <span className="contact-details-emergency">
                          Expected End Date
                        </span>
                        <span className="accordion-title-detail">
                          7 April 2025
                        </span>
                      </div>
                    </Col>

                    <Col sm={6} className="mt-3">
                      <div className="d-flex flex-column gap-1">
                        <span className="contact-details-emergency">
                          Duration
                        </span>
                        <span className="accordion-title-detail">3 Months</span>
                      </div>
                    </Col>
                    <Col sm={6} className="mt-3">
                      <div className="d-flex flex-column gap-1">
                        <span className="contact-details-emergency">
                          Ongoing Step
                        </span>
                        <span className="accordion-title-detail">
                          1. Fertility Assessment
                        </span>
                      </div>
                    </Col>
                    <Col sm={6} className="mt-3">
                      <div className="d-flex flex-column gap-1">
                        <span className="contact-details-emergency">Fees</span>
                        <span className="accordion-title-detail total_text">
                          ₹12000
                        </span>
                      </div>
                    </Col>
                    <Col sm={6} className="mt-3">
                      <div className="d-flex flex-column gap-1">
                        <span className="contact-details-emergency">
                          Amount Status
                        </span>
                        <div className="d-flex gap-2">
                          <span className="amountstatus w-auto">Half Paid</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item
                eventKey="1"
                className="phisical-assessment-accordion-item mb-3"
              >
                <Accordion.Header>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <span className="patient-report-box-title">
                      Egg Freezing
                    </span>
                    <span className="status-pill status-pending">Ongoing</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="pt-0">
                  <Row className="g-2">
                    <Col sm={6} className="mt-3">
                      <div className="d-flex flex-column gap-1">
                        <span className="contact-details-emergency">
                          Start Date
                        </span>
                        <span className="accordion-title-detail">
                          7 Feb 2025
                        </span>
                      </div>
                    </Col>
                    <Col sm={6} className="mt-3">
                      <div className="d-flex flex-column gap-1">
                        <span className="contact-details-emergency">
                          Expected End Date
                        </span>
                        <span className="accordion-title-detail">
                          7 April 2025
                        </span>
                      </div>
                    </Col>

                    <Col sm={6} className="mt-3">
                      <div className="d-flex flex-column gap-1">
                        <span className="contact-details-emergency">
                          Duration
                        </span>
                        <span className="accordion-title-detail">3 Months</span>
                      </div>
                    </Col>
                    <Col sm={6} className="mt-3">
                      <div className="d-flex flex-column gap-1">
                        <span className="contact-details-emergency">
                          Ongoing Step
                        </span>
                        <span className="accordion-title-detail">
                          1. Fertility Assessment
                        </span>
                      </div>
                    </Col>
                    <Col sm={6} className="mt-3">
                      <div className="d-flex flex-column gap-1">
                        <span className="contact-details-emergency">Fees</span>
                        <span className="accordion-title-detail total_text">
                          ₹12000
                        </span>
                      </div>
                    </Col>
                    <Col sm={6} className="mt-3">
                      <div className="d-flex flex-column gap-1">
                        <span className="contact-details-emergency">
                          Amount Status
                        </span>
                        <div className="d-flex gap-2">
                          <span className="amountstatus w-auto">Half Paid</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        )}
      </ContentContainer>
    </div>
  );
}
function setShowModal(arg0: boolean) {
  throw new Error("Function not implemented.");
}
