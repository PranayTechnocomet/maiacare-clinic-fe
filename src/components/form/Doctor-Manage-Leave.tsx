import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import BookCalendar from "../../assets/images/BookCalendar.png";
import Image from "next/image";
import {
  leaveData as defaultLeaveData,
  leaveColumns as defaultLeaveColumns,
  LeaveEntry,
} from "../../utlis/StaticData";
import BaseTable from "@/components/ui/BaseTable";
import Trash from "../../assets/images/Trash.png";
import LightEditimg from "../../assets/images/LightEditimg.png";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import DoctorImg from "../../assets/images/Profile-doctor.png";
import Verified from "../../assets/images/verifiedreview.png";
import phone from "../../assets/images/Phone.png";
import email from "../../assets/images/Email.png";
import { InputFieldGroup } from "../ui/InputField";
const DoctorManageLeave = () => {
  const [leaveData, setLeaveData] = useState<LeaveEntry[]>(defaultLeaveData);

  // delete function
  const handleDelete = (id: string) => {
    const updated = leaveData.filter((item) => item.id !== id);
    setLeaveData(updated);
  };

  const leaveColumns = [
    ...defaultLeaveColumns,
    {
      header: "Action",
      cell: ({ row }: any) => (
        <div className="d-flex gap-2">
          {/* Edit Button */}
          <button className="btn  profile-card-boeder rounded-2">
            <Image src={LightEditimg} alt="Edit" width={18} height={20} />
          </button>

          {/* Delete Button */}
          <button
            className="btn profile-card-boeder rounded-2"
            onClick={() => handleDelete(row.original.id)}
          >
            <Image src={Trash} alt="Delete" width={18} height={20} />
          </button>
        </div>
      ),
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  const handleopen = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  type Reason = {
    id: number;
    reason: string;
  };
  const reason: Reason[] = [
    {
      id: 1,
      reason: "Holi",
    },
    {
      id: 2,
      reason: "Family reasons",
    },
    {
      id: 3,
      reason: "Casual Leave",
    },
    {
      id: 4,
      reason: "Vacation",
    },
    {
      id: 5,
      reason: "Sick leave",
    },
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setShowResultModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="mt-4">
        {/* Header Row */}
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <h4 className="mb-2 mb-md-0 profile-card-main-titile">
            Leave History
          </h4>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2">
              <span className="about-text ">Sort by:</span>
              <Button className="last-month " variant="outline">
                Last 6 Months
              </Button>
            </div>
            <Button
              className="d-flex align-items-center border-none gap-2 px-2 py-2 maiacare-button"
              variant="default"
              onClick={handleopen}
            >
              <Image
                src={BookCalendar}
                alt="Specialization"
                width={22}
                height={22}
              />
              Block Calendar
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-4">
          <BaseTable data={leaveData} columns={leaveColumns} />
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleClose}
        header="Schedule time off"
        closeButton
        dialogClassName="custom-modal-width leave_modal"
      >
        <div className="leavemodal_info">
          <div className="d-flex align-items-center gap-3">
            <Image
              src={DoctorImg}
              alt="doctor"
              width={50}
              height={50}
              className="rounded"
            />
            <div className=" ">
              <div className="d-flex gap-2">
                <h6 className="mb-0 fw-semibold">Dr.Riya Dharang</h6>
                <Image src={Verified} alt="Verified" width={20} height={20} />
              </div>
              <div className="kycmodal_info_text mt-1 gap-3">
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
            </div>
          </div>
        </div>
        <div className="mt-3">
          <label className="maiacare-input-field-label">Reason</label>
          <Form.Select defaultValue="" className="radio_options form-select">
            <option value="" disabled>
              Select
            </option>
            {reason.map((r) => (
              <option key={r.id} value={r.id}>
                {r.reason}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="mt-3">
          <InputFieldGroup
            label=" Any additional note"
            name=" Any additional note"
            type="text"
            // value={formData.Name}
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //   setFormData({ ...formData, Name: e.target.value });
            //   if (formError.Name) {
            //     // typing in hide error
            //     setFormError({ ...formError, Name: "" });
            //   }
            // }}
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
                // onClick={handleSubmit}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default DoctorManageLeave;
