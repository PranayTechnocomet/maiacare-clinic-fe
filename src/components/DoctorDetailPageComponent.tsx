import React, { ChangeEvent, useState } from "react";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import Profiledoctor from "../assets/images/Profile-doctor.png";
import Stethoscope from "../assets/images/Stethoscope.png";
import Expirence from "../assets/images/Expirence.png";
import Bithdate from "../assets/images/Bithdate.png";
import Gender from "../assets/images/Gender.png";
import Phone from "../assets/images/Phone.png";
import Email from "../assets/images/Email.png";
import MaiaVerify from "../assets/images/verifiedreview.png";
import EditProfile from "../assets/images/edit.png";
import Image from "next/image";
import Arrowup from "../assets/images/ArrowUpRight.png";
import { useRouter } from "next/navigation";
import ContentContainer from "./ui/ContentContainer";
import { HiOutlineDotsVertical } from "react-icons/hi";
import power from "../assets/images/Power.png";
import Modal from "./ui/Modal";
import DoctorImg from "../assets/images/Profile-doctor.png";
import Verified from "../assets/images/verifiedreview.png";
import phone from "../assets/images/Phone.png";
import email from "../assets/images/Email.png";
import sthetoscope from "../assets/images/Stethoscope.png";
import patient from "../assets/images/patient.png";
import { RadioButtonGroup } from "../components/ui/RadioField";
import { InputFieldGroup } from "./ui/InputField";
import activation from "../assets/images/activation.png";
import deactivation from "../assets/images/deactivation.png";
import { useDoctor } from "./DoctorContext";
import { DoctorDetails } from "@/utlis/types/interfaces";
import DummyPatientImage from "@/assets/images/Active Patients.png";
import toast from "react-hot-toast";
import { getProfileStatus } from "@/utlis/apis/apiHelper";
// import { profile } from "console";
interface ProfileStatusForm {
  profile: "Active" | "Deactive";
  reason: string;
  note: string;
  notifyAdmin: boolean;
}
const DoctorDetailPageComponent = ({
  DoctorData,
}: {
  DoctorData?: DoctorDetails | null;
}) => {
  const router = useRouter();

  const doctorIdShow = DoctorData?._id;
  const [showModal, setShowModal] = useState(false);
  type FormData = {
    profile: string; // default will be "female"
  };

  const initialFormData: FormData = {
    profile: "activate", // default value
  };
  interface FormError {
    [key: string]: string;
  }
  const initialFormError: FormError = {};
  const [formData, setFormData] = useState<ProfileStatusForm>({
    profile: "Active",
    reason: "",
    note: "",
    notifyAdmin: false,
  });
  const [formError, setFormError] = useState<FormError>(initialFormError);

  const handleActive = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev: FormError) => ({ ...prev, [name]: "" }));
  };
  type Reason = {
    id: number;
    reason: string;
  };
  const reason: Reason[] = [
    {
      id: 1,
      reason: "Resignation/Termination",
    },
    {
      id: 2,
      reason: "Retirement",
    },
    {
      id: 3,
      reason: "Decseased",
    },
    {
      id: 4,
      reason: "Change in specialisation",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCancel = () => {
    setShowModal(false);
  };

  const [showResultModal, setShowResultModal] = useState(false);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setShowModal(false);
  //   setShowResultModal(true);
  // };
  const validateForm = (data: ProfileStatusForm) => {
    const errors: FormError = {};

    if (!data.profile) {
      errors.profile = "Action is required";
    }

    if (!data.reason) {
      errors.reason = "Reason is required";
    }

    // note is optional → no validation required

    return errors;
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    console.log("Submit clicked", formData);
    const errors = validateForm(formData);
    setFormError(errors);

    if (Object.keys(errors).length !== 0) return;

    try {
      const payload = {
        doctorId: String(doctorIdShow),
        status: formData.profile, // activate | deactivate
        reason: formData.reason,
        notes: formData.note,
        notifyAdmin: formData.notifyAdmin,
      };

      await getProfileStatus(payload);

      toast.success(
        formData.profile === "Active"
          ? "Profile activated successfully!"
          : "Profile deactivated successfully!"
      );

      setShowModal(false);
      setShowResultModal(true);

      setFormError({});
      setFormData({
        profile: "Active",
        reason: "",
        note: "",
        notifyAdmin: false,
      });
    } catch (error: unknown) {
      console.error("Profile status error:", error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleresultclose = () => {
    setShowResultModal(false);
  };

  const DoctorProfileCard: React.FC<{ doctor: typeof DoctorData }> = ({
    doctor,
  }) => (
    <ContentContainer>
      <Row className="justify-content-between">
        <Col
          lg={7}
          md={9}
          className="d-flex flex-md-row flex-column align-items-center"
        >
          <div className="col-4 col-md-3 col-lg-3  col-xl-2">
            <img
              src={doctor?.profilePicture || DummyPatientImage.src}
              alt="Profile"
              className="profile-img"
              onError={({ currentTarget }) =>
                (currentTarget.src = DummyPatientImage.src)
              }
            />
          </div>

          <div className="col-12 ms-4 mt-3 mt-md-0">
            <div>
              <div className="d-flex flex-md-row align-items-start align-items-md-center gap-1">
                <div className="profile-name-font">{doctor?.name}</div>
                {/* {doctor.isVerified && ( */}
                <Image src={MaiaVerify} alt="verified" width={18} height={18} />
                {/* )} */}
              </div>

              <div className="profile-details">
                <div className="detail-row profile-sub-title">
                  <span className="d-flex align-items-center gap-1">
                    <Image
                      src={Stethoscope}
                      alt="Specialization"
                      width={18}
                      height={18}
                    />
                    {doctor?.specialty}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <Image
                      src={Expirence}
                      alt="experience"
                      width={16}
                      height={15}
                    />
                    {doctor?.memberSince}
                    <span className="me-2">
                      {doctor?.memberSince ? "years" : "year"}{" "}
                    </span>
                  </span>
                </div>

                <div className="profile-sub-title">
                  <span className="d-flex align-items-center gap-1">
                    <Image src={Bithdate} alt="dob" width={18} height={18} />
                    {doctor?.dob}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <Image src={Gender} alt="gender" width={18} height={18} />
                    {doctor?.gender}
                  </span>
                </div>

                <div className="detail-row profile-sub-title">
                  <span className="d-flex align-items-center gap-1">
                    <Image src={Phone} alt="phone" width={18} height={18} />
                    {doctor?.contactNumber}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <Image src={Email} alt="email" width={18} height={18} />
                    {doctor?.email}
                  </span>
                </div>
              </div>

              <div className="mt-3 profile-member-since profile-sub-title">
                Member since {doctor?.yearsOfExperience}
                <span className="me-2">
                  {doctor?.yearsOfExperience ? "years" : "year"}
                </span>
                {/* membersince  */}
              </div>
            </div>
          </div>
        </Col>

        <Col lg={5} md={3} className="text-md-end text-center mt-4 mt-md-0">
          <Dropdown
            align="end"
            className="d-flex justify-content-end align-items-center"
          >
            <Dropdown.Toggle
              as="button"
              className="bg-transparent border-0 p-1 no-caret"
            >
              <div className="patient-profile-dot">
                <HiOutlineDotsVertical />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-end">
              <Dropdown.Item
                onClick={() => {
                  // setDoctor(DoctorData);
                  router.push("/editDoctor");
                }}
              >
                <Image
                  src={EditProfile}
                  alt="edit"
                  width={18}
                  height={18}
                  className="me-2"
                />
                Edit Profile
              </Dropdown.Item>
              <Dropdown.Item className="text-danger" onClick={handleActive}>
                <Image
                  src={power}
                  alt="power"
                  width={18}
                  height={18}
                  className="me-2"
                />
                Activate/Deactivate
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Modal
        show={showModal}
        onHide={handleClose}
        header={
          formData.profile === "Active"
            ? "Activate Profile Request"
            : "Deactivate Profile Request"
        }
        closeButton
        dialogClassName="custom-modal-width"
      >
        <div className="kycmodal_info">
          <div className="d-flex align-items-center justify-content-between">
            <div className="kycmodal_profile">
              <Image src={DoctorImg} alt="doctor" width={50} height={50} />
              <h6 className="mb-0 fw-semibold">Dr.Riya Dharang</h6>
              <Image src={Verified} alt="Verified" width={22} height={22} />
            </div>
            <Button
              className="maiacare-button-large  default-layout profile-card-boeder  bg-transparent btn btn-primary"
              // onClick={() => router.push("/profile")}
            >
              <Image src={Arrowup} alt="Arrow" width={12} height={12} />
            </Button>
          </div>
          <div className="kycmodal_info_text mt-3">
            <div>
              <Image
                src={phone}
                alt="phone"
                width={18}
                height={18}
                className="me-1"
              />
              <span>+91 12345 67890</span>
            </div>
            <div>
              <Image
                src={email}
                alt="email"
                width={18}
                height={18}
                className="me-1"
              />
              <span>riyadharang@miacare.com</span>
            </div>
          </div>
          <div className="kycmodal_info_text mt-2 gap-5">
            <div>
              <Image
                src={sthetoscope}
                alt="sthetoscope"
                width={18}
                height={18}
                className="me-1"
              />
              <span>Gynecologist</span>
            </div>
            <div>
              <Image
                src={patient}
                alt="patient"
                width={18}
                height={13}
                className="me-1"
              />
              <span>22 Patients</span>
            </div>
          </div>
        </div>
        <div>
          <Col md={6} className="mt-3 ">
            <RadioButtonGroup
              label="Select Action"
              name="profile"
              value={formData.profile}
              onChange={handleRadioChange} // ✅ now the correct type
              error={formError.profile}
              required
              options={[
                { label: "Activate", value: "Active" },
                { label: "Deactivate", value: "Deactive" },
              ]}
            />
          </Col>
        </div>
        <div className="mt-3">
          <label className="maiacare-input-field-label">Reason</label>
          <Form.Select
            name="reason"
            value={formData.reason}
            onChange={(e) =>
              setFormData({ ...formData, reason: e.target.value })
            }
            className="radio_options form-select"
          >
            <option value="" disabled>
              Select
            </option>

            {reason.map((r) => (
              <option key={r.id} value={r.reason}>
                {r.reason}
              </option>
            ))}
          </Form.Select>

          {formError.reason && (
            <div className="text-danger small">{formError.reason}</div>
          )}
        </div>
        <div className="mt-3">
          <Form.Check
            type="checkbox"
            label="Notify admin via email"
            checked={formData.notifyAdmin}
            onChange={(e) =>
              setFormData({ ...formData, notifyAdmin: e.target.checked })
            }
            className="text-nowrap check-box input "
            style={{ fontSize: "13px", color: "#3E4A57" }}
          />
        </div>
        <div>
          <InputFieldGroup
            name="note"
            type="text"
            label="Any additional note"
            value={formData.note}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, note: e.target.value })
            }
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
            placeholder="Placeholder Text"
            required={true}
            disabled={false}
            readOnly={false}
            // error={formError.Name}
            className="position-relative "
          ></InputFieldGroup>
        </div>
        <div className="mt-3">
          <Row>
            <Col md={6} className="pe-0">
              <Button
                variant="outline"
                className="edit-profile-btn w-100 fw-semibold"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Col>
            <Col md={6}>
              <Button
                variant="dark"
                className="maiacare-button common-btn-blue w-100 fw-semibold"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>

      {/* --- Result Modal (After Submit) --- */}
      <Modal
        show={showResultModal}
        onHide={handleresultclose}
        centered
        className="activateModal"
      >
        <div className="text-center ">
          <Image
            src={formData.profile === "Active" ? activation : deactivation}
            alt="Result Image"
            width={200}
            height={150}
          />
          <h6 className="mt-3 modal-custom-header">
            {formData.profile === "Active"
              ? "Activation Request Sent!"
              : "Deactivation Request Sent!"}
          </h6>
          <p style={{ fontSize: "14px", color: "#3E4A57" }}>
            The Admin will be informed about your request and will react out to
            you for confirmation.
          </p>
          <Button
            className="maiacare-button common-btn-blue w-100"
            onClick={() => {
              setShowResultModal(false);
              setShowModal(false);
            }}
          >
            Done
          </Button>
        </div>
      </Modal>
    </ContentContainer>
  );

  return <DoctorProfileCard doctor={DoctorData} />;
};

export default DoctorDetailPageComponent;
