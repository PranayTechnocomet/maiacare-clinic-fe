import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "../../style/basetable.css";

import arrowup from "../../assets/images/ArrowUpRight.png";

import Pdfimg from "../../assets/images/Pdfimg.png";
import Download from "../../assets/images/Download.png";
import Image, { StaticImageData } from "next/image";

import photo1 from "../../assets/images/profilephoto1.png";
import photo2 from "../../assets/images/profilephoto2.png";
import photo3 from "../../assets/images/profilephoto3.png";
import photo4 from "../../assets/images/profilephoto4.png";
import photo5 from "../../assets/images/profilephoto5.png";
import ContentContainer from "../ui/ContentContainer";
import img1 from "../../assets/images/Img-1.png";
import img2 from "../../assets/images/Img-2.png";
import img3 from "../../assets/images/Img-3.png";
import img4 from "../../assets/images/Img-4.png";
import img5 from "../../assets/images/Img-5.png";

import phone from "../../assets/images/Phone.png";
import email from "../../assets/images/Email.png";
import stars from "../../assets/images/stars.png";
// import "../../style/profile.css";
import reviewimg from "../../assets/images/reviewimg.png";

import verifiedreviewcard from "../../assets/images/verifiedreview.png";
import reviewcardimg from "../../assets/images/reviewcardimg.png";
import { clinicData } from "@/utlis/types/interfaces";
import { profile } from "console";
// import Button from "../ui/Button";
import DummyPatientImage from "@/assets/images/Active Patients.png";

const ProfileBasicDetails = ({
  profileData,
}: {
  profileData?: clinicData | null;
}) => {
  type Service = {
    id: number;
    service: string;
  };
  interface OperationalHour {
    _id: string;
    day: string;
    openTime: string;
    closeTime: string;
  }
  type Detail_card = {
    id: number;
    img: string | StaticImageData;
    name: string;
  };
  console.log("profileData:--", profileData);

  const documents = [
    { name: "Certificate.pdf", date: "October 20, 2024" },
    { name: "Aadhar Card.pdf", date: "October 20, 2024" },
    { name: "License.pdf", date: "October 20, 2024" },
    { name: "Certificate.pdf", date: "October 20, 2024" },
  ];

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name; // 👈 download name set
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const operationalHours = [
    { days: "Mon to Fri", time: "10 AM – 5 PM" },
    { days: "Sat & Sun", time: "10 AM – 2 PM" },
  ];

  //   servicess
  const services: Service[] = [
    {
      id: 1,
      service: "Fertility Support",
    },
    {
      id: 2,
      service: "IUI",
    },
    {
      id: 3,
      service: "IVF",
    },
    {
      id: 4,
      service: "Egg Freezing",
    },
    {
      id: 5,
      service: "ICSI",
    },
    {
      id: 6,
      service: "Sperm Freezing",
    },
    {
      id: 7,
      service: "Preimplantation Genetic Testing",
    },
    {
      id: 8,
      service: "Laparoscopy",
    },
    {
      id: 9,
      service: "Hysteroscopy",
    },
    {
      id: 10,
      service: "Tubal Surgery",
    },
    {
      id: 11,
      service: "Endometrial Biposy",
    },
    {
      id: 12,
      service: "Immunological Testing",
    },
  ];

  // contact_person_detail_cards
  const detail_card: Detail_card[] = [
    {
      id: 1,
      img: img1,
      name: "Rani Desai",
    },
    {
      id: 2,
      name: "Ruhi Sharma",
      img: img2,
    },
    {
      id: 3,
      name: "Vishwa Desai",
      img: img3,
    },
    {
      id: 4,
      name: "Zeel Shah",
      img: img4,
    },
    {
      id: 5,
      name: "Reema Desai",
      img: img5,
    },
  ];
  type Review_data = {
    id: number;
    img: string | StaticImageData;
    name: string;

    date: string | number;
    visiting_for: string;
    process_first: string;
    process_second: string;
    text: string;
  };
  // review_data
  const review_data: Review_data[] = [
    {
      id: 1,
      img: reviewimg,
      name: "Samriddhi Singh ",

      date: "December 30, 2024",
      visiting_for: "Visited For High-Risk Pregnancy Care",
      process_first: "Fertility Support",
      process_second: "IVF",
      text: `Dr. Kort practices the exact opposite of a "one size fits all" approach to medicine. He took my fears seriously - primarily about the hormone injections - and worked with me to create a schedule that I was comfortable with, but that also got great results. He's one of the kindest and most knowledgeable doctors I've ever had.`,
    },
    {
      id: 2,
      img: reviewimg,
      name: "Samriddhi Singh ",

      date: "December 30, 2024",
      visiting_for: "Visited For High-Risk Pregnancy Care",
      process_first: "Fertility Support",
      process_second: "Egg Freezing",
      text: `Dr. Kort practices the exact opposite of a "one size fits all" approach to medicine. He took my fears seriously - primarily about the hormone injections - and worked with me to create a schedule that I was comfortable with, but that also got great results. He's one of the kindest and most knowledgeable doctors I've ever had.`,
    },
    {
      id: 3,
      img: reviewimg,
      name: "Samriddhi Singh ",

      date: "December 30, 2024",
      visiting_for: "Visited For High-Risk Pregnancy Care",
      process_first: "Fertility Support",
      process_second: "Egg Freezing",
      text: `Dr. Kort practices the exact opposite of a "one size fits all" approach to medicine. He took my fears seriously - primarily about the hormone injections - and worked with me to create a schedule that I was comfortable with, but that also got great results. He's one of the kindest and most knowledgeable doctors I've ever had.`,
    },
    {
      id: 4,
      img: reviewimg,
      name: "Samriddhi Singh ",

      date: "December 30, 2024",
      visiting_for: "Visited For High-Risk Pregnancy Care",
      process_first: "Fertility Support",
      process_second: "Egg Freezing",
      text: `Dr. Kort practices the exact opposite of a "one size fits all" approach to medicine. He took my fears seriously - primarily about the hormone injections - and worked with me to create a schedule that I was comfortable with, but that also got great results. He's one of the kindest and most knowledgeable doctors I've ever had.`,
    },
    {
      id: 5,
      img: reviewimg,
      name: "Samriddhi Singh ",

      date: "December 30, 2024",
      visiting_for: "Visited For High-Risk Pregnancy Care",
      process_first: "Fertility Support",
      process_second: "Egg Freezing",
      text: `Dr. Kort practices the exact opposite of a "one size fits all" approach to medicine. He took my fears seriously - primarily about the hormone injections - and worked with me to create a schedule that I was comfortable with, but that also got great results. He's one of the kindest and most knowledgeable doctors I've ever had.`,
    },
  ];
  const [allReviews, setAllReviews] = useState(review_data);
  const [displayedReviewCount, setDisplayedReviewCount] = useState(2); // Initial reviews to show
  const reviewsToShow = allReviews.slice(0, displayedReviewCount);
  const handleShowMore = () => {
    setDisplayedReviewCount((prevCount) => prevCount + 4); // Add 5 more reviews
  };
  return (
    // <Container fluid className="mt-3">
    <div>
      <Row>
        {/* =====LEFT COLUMN PART ======== */}

        <Col lg={7} xxl={8}>
          {/* address*/}
          <div>
            <ContentContainer className="mt-4">
              <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center text-center text-md-start mb-3">
                <h5 className="profile-card-main-titile mb-2 mb-md-0">
                  Address & Operational Hours
                </h5>
              </div>
              <div>
                <div className="profiledetails_heading">Address</div>
                <div style={{ width: "70%" }} className="profiledetails_text">
                  {profileData?.address}
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3 flex-column flex-sm-row">
                {/* Availability */}
                <div>
                  <div className="profiledetails_heading">Availability</div>
                  {profileData?.operationalHours?.map(
                    (item: OperationalHour) => (
                      <p key={item._id} className="mb-0">
                        <span
                          className="maiacare-radio-label me-1"
                          style={{ fontSize: "14px" }}
                        >
                          {item.day} :
                        </span>
                        <span style={{ fontSize: "13px" }}>
                          {item.openTime} – {item.closeTime}
                        </span>
                      </p>
                    )
                  )}
                </div>
                {/* Emergency Services */}
                <div>
                  <div className="profiledetails_heading">
                    Emergency Services
                  </div>
                  <div
                    style={{ width: "95%" }}
                    className="profiledetails_text "
                  >
                    {profileData?.emergencyDoctorsAvailable_24_7
                      ? "Emergency doctors are available 24/7"
                      : "Emergency doctors are not available 24/7"}
                  </div>
                </div>
              </div>
            </ContentContainer>
          </div>
          {/* Services Offered */}

          <div>
            <ContentContainer className="mt-4">
              <h5 className="profile-card-main-titile mb-2 mb-md-0">
                Services Offered
              </h5>
              <div className="d-flex gap-3 flex-wrap mt-4">
                {profileData?.servicesOffered?.length ? (
                  profileData.servicesOffered.map((service, idx) => (
                    <div key={idx} className="servicename">
                      {service}
                    </div>
                  ))
                ) : (
                  <div>No services listed</div>
                )}
              </div>
            </ContentContainer>
          </div>
          {/* Photos */}
          <div>
            <ContentContainer className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="profile-card-main-titile">Photos</h5>
              </div>
              <div className="d-flex gap-3 flex-wrap">
                {profileData?.photos?.length ? (
                  profileData.photos.map((photo, idx) =>
                    photo?.url ? (
                      <img
                        src={photo.src || DummyPatientImage.src}
                        alt="Profile"
                        width={100}
                        height={100}
                        className="rounded"
                        onError={({ currentTarget }) =>
                          (currentTarget.src = DummyPatientImage.src)
                        }
                      />
                    ) : // <Image
                    //   key={idx}
                    //   src={photo}
                    //   alt="Clinic Photo"
                    //   width={100}
                    //   height={100}
                    //   className="rounded"
                    // />
                    null
                  )
                ) : (
                  <div>No photos uploaded</div>
                )}
              </div>
            </ContentContainer>
          </div>
        </Col>

        {/* ======RIGHT COLUMN =========== */}
        {/* About */}

        <Col lg={5} xxl={4}>
          <div>
            <ContentContainer className="mt-4">
              <h5 className="profile-card-main-titile">
                Contact Person Details
              </h5>
              <div
                className="overflow-y-auto my-scrollable-div"
                style={{ height: "162px" }}
              >
                <div className="contact_person_detail_cards mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <Image src={img1} alt="Profile" width={60} height={60} />
                    <div>
                      <div className="fw-semibold detail_card">
                        {profileData?.contactPerson?.name || "—"}
                      </div>
                      <div className="card_admin">Super Admin</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <div>
                      <div className="d-flex align-items-center">
                        <Image src={phone} alt="phone" width={20} height={20} />
                        <span className="card_text">Phone</span>
                      </div>
                      <div>
                        {profileData?.contactPerson?.contactNumber || "—"}
                      </div>
                    </div>

                    <div>
                      <div className="d-flex align-items-center">
                        <Image src={email} alt="email" width={20} height={20} />
                        <span className="card_text">Email</span>
                      </div>
                      <div>{profileData?.contactPerson?.email || "—"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </ContentContainer>
          </div>

          {/* Documents */}
          <div>
            <ContentContainer className="mt-4">
              <div>
                <h5 className="mb-4 profile-card-main-titile">Documents</h5>
                {profileData?.documents?.length ? (
                  <div
                    className="d-flex justify-content-between align-items-center border profile-card-boeder document-main-border mb-3"
                    style={{ padding: "11px" }}
                  >
                    <div className="d-flex align-items-center">
                      <Image
                        src={Pdfimg}
                        alt="pdf"
                        width="40"
                        className="me-3"
                      />
                      <div>
                        <div className="card-feild">
                          {profileData.documents[0].name}
                        </div>
                        <div className="card-year">
                          {profileData.documents[0].date}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>No documents uploaded</div>
                )}
              </div>
            </ContentContainer>
          </div>
        </Col>
      </Row>
      {/* reviews */}
      <div>
        <ContentContainer className="mt-4">
          <div>
            <h5 className="mb-4 profile-card-main-titile">Reviews</h5>
            <div className="fs-2 fw-bold d-flex align-items-center gap-2 mb-4">
              <span>4.5</span>
              <Image
                src={stars}
                alt="stars"
                style={{ width: "128px", height: "auto" }}
              />
              <span
                className=" fw-normal"
                style={{ fontSize: "14px", color: "rgba(133, 139, 149, 1)" }}
              >
                (653 reviews)
              </span>
            </div>
            {/* review text */}
            <div>
              {reviewsToShow.map((item, idx) => (
                <div key={idx}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex gap-2 align-items-center">
                      <Image
                        src={item.img}
                        alt="image"
                        style={{ width: "32px", height: "auto" }}
                      />
                      <span className="fw-semibold ">{item.name}</span>
                      <Image
                        src={verifiedreviewcard}
                        alt="verifiedreviewcard"
                        style={{ width: "22px", height: "auto" }}
                      />
                    </div>
                    <div
                      style={{
                        color: "rgba(133, 139, 149, 1)",
                        fontSize: "13px",
                      }}
                    >
                      9 months ago
                    </div>
                  </div>
                  <div>
                    <Image
                      src={reviewcardimg}
                      alt="star"
                      style={{ width: "98px", height: "auto" }}
                    />
                    <span
                      className="ms-2"
                      style={{
                        color: "rgba(133, 139, 149, 1)",
                        fontSize: "14px",
                      }}
                    >
                      {item.date}
                    </span>
                  </div>
                  <div className="my-2">
                    <span
                      style={{ color: "rgba(62, 74, 87, 1)", fontSize: "15px" }}
                    >
                      {item.visiting_for}
                    </span>
                  </div>
                  <div className="my-3">
                    <span
                      style={{ color: "rgba(62, 74, 87, 1)", fontSize: "15px" }}
                    >
                      Happy with:
                    </span>
                    <span className="review_text_box mx-2">
                      {item.process_first}
                    </span>
                    <span className="review_text_box">
                      {item.process_second}
                    </span>
                  </div>
                  <div
                    className="w-75 mt-3"
                    style={{ color: "rgba(62, 74, 87, 1)", fontSize: "13px" }}
                  >
                    {item.text}
                  </div>
                  {idx !== reviewsToShow.length - 1 && (
                    <div
                      style={{
                        background: "rgba(221, 225, 232, 1)",
                        padding: "1px",
                      }}
                      className="my-4"
                    ></div>
                  )}
                </div>
              ))}
              {/* shiw more & show less */}
              {displayedReviewCount < allReviews.length ? (
                <div className="allreviews" onClick={handleShowMore}>
                  Show All Reviews ({allReviews.length - displayedReviewCount})
                </div>
              ) : (
                <div
                  className="allreviews"
                  onClick={() => setDisplayedReviewCount(2)}
                >
                  Show Less
                </div>
              )}
            </div>
          </div>
        </ContentContainer>
      </div>
    </div>
    // </Container>
  );
};

export default ProfileBasicDetails;
