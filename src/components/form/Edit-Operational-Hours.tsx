import React, { useState } from "react";
import Button from "../ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TimePickerFieldGroup } from "../ui/CustomTimePicker";
import { Col, Form, Row } from "react-bootstrap";
import ContentContainer from "../ui/ContentContainer";
export default function EditOperationalHours({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) {
  type FormData = {
    MF: string;
    SS: string;
    Time: string;
    Timer: string;

    // selection
    M: string;
    T: string;
    W: string;
    Th: string;
    F: string;
    S: string;
    Sun: string;
  };

  const initialFormData: FormData = {
    MF: "",
    SS: "",
    Time: "",
    Timer: "",

    // selection
    M: "",
    T: "",
    W: "",
    Th: "",
    F: "",
    S: "",
    Sun: "",
  };
  const days = [
    { key: "M", label: "Monday" },
    { key: "T", label: "Tuesday" },
    { key: "W", label: "Wednesday" },
    { key: "Th", label: "Thursday" },
    { key: "F", label: "Friday" },
    { key: "S", label: "Saturday" },
    { key: "Sun", label: "Sunday" },
  ];
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedDays, setSelectedDays] = useState({
    M: true,
    T: true,
    W: true,
    Th: true,
    F: true,
    S: true,
    Sun: true,
  });
  const toggleDay = (day: keyof typeof selectedDays) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };
  const [custome, setCustome] = useState(0);
  const handleSelect = () => {
    setCustome(custome === 0 ? 1 : 0);
  };

  return (
    <div>
      <ContentContainer className="mt-4">
        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center text-center text-md-start mb-3">
          <h5 className="profile-card-main-titile mb-2 mb-md-0">
            Operational hours & Days
          </h5>
          <div className="d-flex gap-3">
            <Form.Check
              type="checkbox"
              label="Select custom Hours and Days?"
              onClick={handleSelect}
              className="text-nowrap check-box input"
            />
            <Form.Check
              type="checkbox"
              label="Open 24/7"
              className="text-nowrap check-box input"
            />
          </div>
        </div>
        {custome === 0 ? (
          <>
            {/* monday-friday */}
            <Row className="mb-3">
              <Col md={6}>
                <TimePickerFieldGroup
                  label="Monday–Friday"
                  name="MF"
                  value={formData.MF}
                  onChange={(e) => {
                    setFormData({ ...formData, MF: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
            {/* saturday-sunday */}
            <Row className="mb-3">
              <Col md={6}>
                <TimePickerFieldGroup
                  label="Saturday–Sunday"
                  name="SS"
                  value={formData.SS}
                  onChange={(e) => {
                    setFormData({ ...formData, SS: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Timer"
                  value={formData.Timer}
                  onChange={(e) => {
                    setFormData({ ...formData, Timer: e.target.value });
                  }}
                />
              </Col>
            </Row>
          </>
        ) : (
          <>
            {days.map((day) => (
              <div key={day.key} className="mb-3">
                {/* Checkbox + Day Name */}
                <div className="d-flex align-items-center gap-2 ">
                  <Form.Check
                    type="checkbox"
                    checked={selectedDays[day.key as keyof typeof selectedDays]}
                    onChange={() =>
                      toggleDay(day.key as keyof typeof selectedDays)
                    }
                  />
                  <div className="maiacare-input-field-label">{day.label}</div>
                </div>

                {/* Time fields */}
                <Row>
                  <Col md={6}>
                    <TimePickerFieldGroup
                      placeholder="Start Time"
                      value={formData[day.key as keyof FormData]}
                      disabled={
                        !selectedDays[day.key as keyof typeof selectedDays]
                      }
                      onChange={(e: { target: { value: string } }) =>
                        setFormData({
                          ...formData,
                          [day.key]: e.target.value,
                        })
                      }
                    />
                  </Col>

                  <Col md={6}>
                    <TimePickerFieldGroup
                      placeholder="End Time"
                      value={formData.Time}
                      disabled={
                        !selectedDays[day.key as keyof typeof selectedDays]
                      }
                      onChange={(e) =>
                        setFormData({ ...formData, Time: e.target.value })
                      }
                    />
                  </Col>
                </Row>
              </div>
            ))}
          </>
        )}

        <div>
          <Form.Check
            type="checkbox"
            label="Emergency Doctors Available 24/7"
            className="text-nowrap check-box input"
          />
        </div>
      </ContentContainer>

      {/* Next Button */}
      <div className="d-flex justify-content-end mt-4 gap-3">
        <Button
          variant="dark"
          className="maiacare-button edit-profile-btn"
          onClick={onPrevious}
        >
          <ArrowLeft size={16} /> Previous
        </Button>
        <Button
          variant="dark"
          className="maiacare-button common-btn-blue"
          onClick={onNext}
        >
          Next <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
