"use client";
import React, { useState } from "react";
import Modal from "../ui/Modal";
import { InputFieldGroup } from "../ui/InputField";
import Button from "../ui/Button";
import { Form } from "react-bootstrap";

interface RescheduleAppointmentRequestProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: { date: string; time: string; reason: string }) => void;
  title?: string; // Optional custom modal title
}
const RescheduleAppointmentRequest: React.FC<
  RescheduleAppointmentRequestProps
> = ({ show, onClose, onSubmit, title = "Reschedule Appointment" }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.reason) return;
    onSubmit(formData);
    onClose();
    setFormData({ date: "", time: "", reason: "" });
  };

  return (
    <Modal show={show} onHide={onClose} header={title} closeButton>
      <Form onSubmit={handleSubmit}>
        {/* <div className="d-flex flex-column gap-3">
          <InputFieldGroup
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <InputFieldGroup
            label="Time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
          <Form.Group>
            <Form.Label>Reason</Form.Label>
            <Form.Select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
            >
              <option value="">Select reason</option>
              <option value="Doctor unavailable">Doctor unavailable</option>
              <option value="Patient request">Patient request</option>
              <option value="Emergency">Emergency</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="default" type="submit">
              Save
            </Button>
          </div>
        </div> */}
        <div>
          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="dark"
              className="px-4 maiacare-button edit-profile-btn w-50"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="dark"
              className="px-4 maiacare-button common-btn-blue w-50"
              type="submit"
              onClick={onClose}
            >
              Save and Next
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default RescheduleAppointmentRequest;


