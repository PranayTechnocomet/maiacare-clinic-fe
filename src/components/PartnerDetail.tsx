import React, { FormEvent, useEffect, useState } from "react";

import { IoAdd } from "react-icons/io5";
import Modal from "./ui/Modal";
import {
  FertilityAssessment,
  MedicalHistoryForm,
  PhysicalAssessment,
} from "../components/form/AddPartnerDetailsForm";
import { Accordion, Col, Dropdown, Row } from "react-bootstrap";
import Image from "next/image";

import ContentContainer from "./ui/ContentContainer";

// import { PartnerData, partnerData } from '@/data/partnerData';
import hiegthImg from "../assets/images/Physical-assement-hiegth-icons.png";
import weightImg from "../assets/images/Physical-assement-weight-icons.png";
import BMIIMG from "../assets/images/Physical-assement-bmi.png";
import BloodGroup from "../assets/images/Physical-assement-blod-group-icons.png";
import BloodPressure from "../assets/images/Physical-assement-presure-icons.png";
import HeartRate from "../assets/images/Physical-assement-heart-rate-icons.png";
import MedicalHistory from "./form/MedicalHistory";
// import PhysicalAssessment from '../assets/images/Pluse Sine.png';
import Simpleeditpro from "@/assets/images/Simpleeditpro.png";
import { PartnerDetailData, partnerDetailData } from "../utlis/StaticData";
import Button from "./ui/Button";
import {
  AddPartnerDetails,
  PartnerDetailsData,
} from "../components/AddPartnerDetails";
import {
  EditFertilityAssessment,
  FertilityAssessmentType,
  MedicalHistoryShow,
  MedicalHistoryType,
  PartnerBasicDetailsForm,
  PartnerDetails,
  partnerMedicalHistory,
  PhysicalAssessmentData,
  PhysicalAssessmentDataModel,
} from "../utlis/types/interfaces";
import toast from "react-hot-toast";
import { BsInfoCircle } from "react-icons/bs";
import {
  addPatientPartnerPhysicalAssessment,
  updatePatientPartnerFertilityAssessment,
} from "@/utlis/apis/apiHelper";
interface Allergy {
  id?: number; // depending on your actual id type
  value: string;
}
interface LifestyleItem {
  id?: string | number;
  value: string;
}
interface PhysicalAssessmentItem {
  patientId?: string;
  date: string;
  bloodGroup: string;
  height: string; // changed to string
  weight: string; // changed to string
  bmi: string; // changed to string
  bloodPressureSystolic: string; // changed to string
  bloodPressureDiastolic: string; // changed to string
  heartRate?: string; // add if API returns it
}
interface FertilityAssessmentItem {
  semenAnalysis: string;
  fertilityIssues: string;
  fertilityTreatment: string;
  surgeries: string;

  semenAnalysisContent?: string;
  fertilityIssuesContent?: string;
  fertilityTreatmentContent?: string;
  surgeriesContent?: string;
}

export default function PartnerDetail({
  setActiveTab,

  patientId,
  showData,
  fetchPatientData,
}: {
  setActiveTab: (tab: string) => void;
  patientId: string | number | undefined;
  showData: PartnerDetails | null;
  fetchPatientData?: () => void;
}) {
  const [addPartner, setAddPartner] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showPartnerDetail, setShowPartnerDetail] = useState(true);
  const [loading, setLoading] = useState({});
  const [eventKey, setEventKey] = useState(0);
  const [modalEditTab, setModalEditTab] = useState<string | null>("basic");
  const [AddPhysicalAssessment, setAddPhysicalAssessment] = useState(false);
  const [EditFertilityAssessment, setEditFertilityAssessment] = useState(false);
  const [EditMedicalHistory, setEditMedicalHistory] = useState<boolean>(false);

  // const [showData, setShowData] =
  //   useState<PartnerDetailData>(partnerDetailData);
  // const handleSetShowData: React.Dispatch<
  //   React.SetStateAction<PartnerDetailsData>
  // > = (value) => {
  //   if (typeof value === "function") {
  //     // value(prev) callback form
  //     setShowData(
  //       (prev) => value(prev as PartnerDetailsData) as PartnerDetailData
  //     );
  //   } else {
  //     // direct object form
  //     setShowData(value as PartnerDetailData);
  //   }
  // };

  const initialFormDataAddPhysicalAssessment: PhysicalAssessmentDataModel = {
    patientId: "",
    height: "",
    weight: "",
    bmi: "",
    bloodGroup: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    heartRate: "",
  };
  const initialFormDataEditFertilityAssessment: EditFertilityAssessment = {
    semenAnalysis: "",
    semenAnalysisContent: "",
    fertilityIssues: "",
    fertilityIssuesContent: "",
    fertilityTreatment: "",
    fertilityTreatmentContent: "",
    surgeries: "",
    surgeriesContent: "",
  };

  const [formDataAddPhysicalAssessment, setFormDataAddPhysicalAssessment] =
    useState<PhysicalAssessmentDataModel>(initialFormDataAddPhysicalAssessment);
  type FormErrorAddPhysicalAssessment = Partial<
    Record<keyof PhysicalAssessmentDataModel, string>
  >;
  const initialFormErrorAddPhysicalAssessment: FormErrorAddPhysicalAssessment =
    {};
  const [formErrorAddPhysicalAssessment, setFormErrorAddPhysicalAssessment] =
    useState<FormErrorAddPhysicalAssessment>(
      initialFormErrorAddPhysicalAssessment
    );

  const [formDataEditFertilityAssessment, setFormDataEditFertilityAssessment] =
    useState<EditFertilityAssessment>(initialFormDataEditFertilityAssessment);
  type FormErrorEditFertilityAssessment = Partial<
    Record<keyof EditFertilityAssessment, string>
  >;
  const initialFormErrorEditFertilityAssessment: FormErrorEditFertilityAssessment =
    {};
  const [
    formErrorEditFertilityAssessment,
    setFormErrorEditFertilityAssessment,
  ] = useState<FormErrorEditFertilityAssessment>(
    initialFormErrorEditFertilityAssessment
  );

  const [formDataMedicalHistory, setFormDataMedicalHistory] =
    useState<MedicalHistoryShow>();
  const [partnerBasicDetails, setPartnerBasicDetails] =
    useState<PartnerBasicDetailsForm | null>(null);
  const [partnerMedicalHistory, setPartnerMedicalHistory] =
    useState<partnerMedicalHistory | null>(null);
  const formatDate = (dateString?: string) => {
    const date = dateString ? new Date(dateString) : new Date();
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const validateForm = (
    data: PhysicalAssessmentDataModel
  ): FormErrorAddPhysicalAssessment => {
    const errors: FormErrorAddPhysicalAssessment = {};

    if (!data.height.trim()) errors.height = "Height is required";
    if (!data.weight.trim()) errors.weight = "Weight is required";
    if (!data.bmi.trim()) errors.bmi = "BMI is required";
    if (!data.bloodGroup.trim()) errors.bloodGroup = "Blood group is required";
    if (!data.bloodPressureSystolic.trim())
      errors.bloodPressureSystolic = "Blood pressure is required";

    if (!data.heartRate.trim()) errors.heartRate = "Heart rate is required";

    return errors;
  };

  const validateForm2 = (
    data: EditFertilityAssessment
  ): FormErrorEditFertilityAssessment => {
    const errors: FormErrorEditFertilityAssessment = {};

    if (!data.semenAnalysis.trim())
      errors.semenAnalysis = "Seminal Analysis is required";
    if (data.semenAnalysis === "yes" && !data.semenAnalysisContent.trim())
      errors.semenAnalysisContent = "Seminal Analysis Content is required";
    if (!data.fertilityIssues.trim())
      errors.fertilityIssues = "Fertility Issues is required";
    if (data.fertilityIssues === "yes" && !data.fertilityIssuesContent.trim())
      errors.fertilityIssuesContent = "Fertility Issues Content is required";
    if (!data.fertilityTreatment.trim())
      errors.fertilityTreatment = "Fertility Treatment is required";
    if (
      data.fertilityTreatment === "yes" &&
      !data.fertilityTreatmentContent.trim()
    )
      errors.fertilityTreatmentContent =
        "Fertility Treatment Content is required";
    if (!data.surgeries.trim()) errors.surgeries = "Surgeries is required";
    if (data.surgeries === "yes" && !data.surgeriesContent.trim())
      errors.surgeriesContent = "Surgeries Content is required";

    return errors;
  };

  const handleAddPhysicalAssessment = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    // console.log("click ", formDataAddPhysicalAssessment);

    const errors = validateForm(formDataAddPhysicalAssessment);
    // console.log("Form submitted", formDataAddPhysicalAssessment);
    setFormErrorAddPhysicalAssessment(errors);

    if (Object.keys(errors).length === 0) {
      const updatedFormData = {
        ...formDataAddPhysicalAssessment,
        patientId,
      };

      console.log("formDataAddPhysicalAssessment : ", updatedFormData);
      addPatientPartnerPhysicalAssessment(updatedFormData)
        .then((response) => {
          console.log("physicalassessmentpost response : ", response.data);
          // console.log("add api");

          if (response.data.status) {
            toast.success(response.data.message, {
              icon: <BsInfoCircle size={22} color="white" />,
            });

            fetchPatientData?.(); // FETCH UPDATED PATIENT DATA
            setAddPhysicalAssessment(false);
          } else {
            console.log("error");
          }
        })
        .catch((err) => {
          console.log("physicalassessmentpost err : ", err);
        });
      setFormDataAddPhysicalAssessment(initialFormDataAddPhysicalAssessment);
    }
  };

  const handleEditFertilityAssessment = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const errors = validateForm2(formDataEditFertilityAssessment);
    setFormErrorEditFertilityAssessment(errors);

    if (Object.keys(errors).length === 0) {
      const updatedFormData = {
        patientId,

        semenAnalysis: {
          status: formDataEditFertilityAssessment.semenAnalysis,
          semenAnalysisDetails:
            formDataEditFertilityAssessment.semenAnalysisContent,
        },

        fertilityIssues: {
          status: formDataEditFertilityAssessment.fertilityIssues,
          fertilityIssuesDetails:
            formDataEditFertilityAssessment.fertilityIssuesContent,
        },

        fertilityTreatments: {
          status: formDataEditFertilityAssessment.fertilityTreatment,
          fertilityTreatmentsDetails:
            formDataEditFertilityAssessment.fertilityTreatmentContent,
        },

        surgeries: {
          status: formDataEditFertilityAssessment.surgeries,
          surgeriesDetails: formDataEditFertilityAssessment.surgeriesContent,
        },
      };

      // console.log("formDataEditFertilityAssessment api : ", updatedFormData);

      updatePatientPartnerFertilityAssessment(updatedFormData)
        .then((response) => {
          if (response.data.status) {
            console.log("partnerfertilityAssessmentput response : ", response);

            setEditFertilityAssessment(false);
            fetchPatientData?.();
            setFormErrorEditFertilityAssessment(
              initialFormErrorEditFertilityAssessment
            );
            toast.success(response.data.message, {
              icon: <BsInfoCircle size={22} color="white" />,
            });
          } else {
            console.log("error");
          }
        })
        .catch((err) => {
          console.log("Error putting medical history:", err);
        });
    }
  };

  const convertHeightToCm = (heightStr: string): string => {
    if (!heightStr) return "";

    // Remove any whitespace
    const cleanHeight = heightStr.trim();

    // Check if it's already in cm
    if (cleanHeight.toLowerCase().includes("cm")) {
      return cleanHeight.replace(/[^\d.]/g, "");
    }

    // Match feet and inches format (e.g., "5'8", "5'8"", "5 ft 8 in")
    const feetInchesMatch = cleanHeight.match(/(\d+)['′]?\s*(\d+)["″]?/);
    if (feetInchesMatch) {
      const feet = parseInt(feetInchesMatch[1], 10);
      const inches = parseInt(feetInchesMatch[2], 10);
      const totalInches = feet * 12 + inches;
      return (totalInches * 2.54).toFixed(0);
    }

    // Match feet only format (e.g., "5'", "5 ft")
    const feetOnlyMatch = cleanHeight.match(/(\d+)['′]?\s*(ft|feet)?$/i);
    if (feetOnlyMatch) {
      const feet = parseInt(feetOnlyMatch[1], 10);
      const totalInches = feet * 12;
      return (totalInches * 2.54).toFixed(0);
    }

    // Check if it's just inches (numeric value)
    const numericValue = parseFloat(cleanHeight);
    if (!isNaN(numericValue)) {
      // Assume it's inches if it's a reasonable height value (24-96 inches)
      if (numericValue >= 24 && numericValue <= 96) {
        return (numericValue * 2.54).toFixed(0);
      }
      // If it's a small number, assume it's already in feet (convert to inches first)
      if (numericValue >= 3 && numericValue <= 8) {
        return (numericValue * 12 * 2.54).toFixed(0);
      }
    }

    return "";
  };
 

  return (
    <>
      {showPartnerDetail && (
        <div className="d-flex align-items-center justify-content-center partner-detail-main ">
          <div className="text-center">
            <svg
              width="86"
              height="79"
              viewBox="0 0 86 79"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.387 52.6988L31.187 56.6988C29.587 58.5988 26.687 58.5988 25.087 56.6988L21.887 52.6988L23.4869 44.8984H32.7869L34.387 52.6988Z"
                fill="#F3F4F6"
              />
              <path
                d="M22.7916 48.2969L23.5231 44.7734H32.7604L33.4557 48.1524C31.8557 49.7524 25.7916 50.2969 22.7916 48.2969Z"
                fill="#D7D7D7"
                fillOpacity="0.4"
              />
              <path
                d="M42.787 29.8984V46.7984C42.787 51.0984 78.787 51.0984 78.787 46.7984V29.8984H42.787Z"
                fill="#9CA3AF"
              />
              <path
                d="M67.025 52.9059L63.825 56.9059C62.225 58.8059 59.325 58.8059 57.725 56.9059L54.525 52.9059L56.125 45.1055H65.425L67.025 52.9059Z"
                fill="#F3F4F6"
              />
              <path
                d="M55.4297 48.5039L56.1612 44.9805H65.3984L66.0938 48.3594C64.4937 49.9594 58.4297 50.5039 55.4297 48.5039Z"
                fill="#D7D7D7"
                fillOpacity="0.4"
              />
              <path
                d="M85.6869 78.2992H35.9869V70.1992C35.9869 64.3992 39.6869 59.1992 45.1869 57.2992L54.5869 52.6992C57.7869 56.6992 63.7869 56.6992 66.9869 52.6992L76.3869 57.2992C81.8869 59.1992 85.5869 64.3992 85.5869 70.1992V78.2992H85.6869Z"
                fill="#9CA3AF"
              />
              <path
                opacity="0.1"
                d="M62.3869 70.1992C62.3869 63.2992 58.9869 56.9992 53.4869 53.1992L45.1869 57.1992C39.6869 59.0992 35.9869 64.2992 35.9869 70.0992V78.1992H62.3869V70.1992Z"
                fill="#676767"
              />
              <path
                opacity="0.1"
                d="M43.0869 29.8984H42.7869V46.9984C45.8869 43.5984 48.0869 39.4984 49.5869 36.1984C53.4869 34.5984 56.2869 30.9984 56.3869 26.4984C56.4869 22.9984 54.9869 19.8984 52.5869 17.8984C52.0869 13.0984 50.787 8.89844 48.787 5.39844C45.187 8.99844 43.0869 14.6984 43.0869 22.4984C38.1869 22.7984 38.4869 29.3984 43.0869 29.8984Z"
                fill="#926892"
              />
              <path
                d="M78.487 22.3992C78.487 7.99922 71.287 0.699219 60.787 0.699219C50.287 0.699219 43.187 7.99922 43.187 22.3992C37.787 22.7992 38.587 30.5992 44.387 29.8992C49.287 43.5992 56.187 47.1992 60.787 47.1992C65.487 47.1992 72.287 43.5992 77.187 29.8992C83.087 30.5992 83.887 22.7992 78.487 22.3992Z"
                fill="#F3F4F6"
              />
              <path
                d="M60.7869 0.699219C50.2869 0.699219 43.0869 8.09922 43.0869 22.3992C43.7869 20.4992 44.5869 19.0992 45.3869 17.9992C52.4869 8.49922 62.5869 27.0992 78.3869 22.3992C78.4869 7.99922 71.2869 0.699219 60.7869 0.699219Z"
                fill="#9CA3AF"
              />
              <path
                opacity="0.1"
                d="M43.0869 29.8984H42.7869V46.9984C45.8869 43.5984 48.0869 39.4984 49.5869 36.1984C53.4869 34.5984 56.2869 30.9984 56.3869 26.4984C56.4869 22.9984 54.9869 19.8984 52.5869 17.8984C52.0869 13.0984 50.787 8.89844 48.787 5.39844C45.187 8.99844 43.0869 14.6984 43.0869 22.4984C38.1869 22.7984 38.4869 29.3984 43.0869 29.8984Z"
                fill="#676767"
              />
              <path
                d="M55.2869 78.2992H0.986938V70.1992C0.986938 64.3992 4.68694 59.1992 10.1869 57.2992L21.8869 52.6992C25.0869 56.6992 31.0869 56.6992 34.2869 52.6992L45.9869 57.2992C51.4869 59.1992 55.1869 64.3992 55.1869 70.1992V78.2992H55.2869Z"
                fill="#DDE1E8"
              />
              <path
                d="M45.7869 22.3992C45.7869 7.99922 38.5869 0.699219 28.0869 0.699219C17.5869 0.699219 10.4869 7.99922 10.4869 22.3992C5.08689 22.7992 5.88689 30.5992 11.6869 29.8992C16.5869 43.5992 23.4869 47.2992 28.0869 47.2992C32.6869 47.2992 39.5869 43.6992 44.4869 29.9992C50.3869 30.5992 51.1869 22.7992 45.7869 22.3992Z"
                fill="#F3F4F6"
              />
              <path
                d="M28.0869 0.699219C38.5869 0.699219 45.7869 8.09922 45.7869 22.3992C38.5869 3.99922 28.0869 27.5992 10.4869 22.3992C10.4869 7.99922 17.6869 0.699219 28.0869 0.699219Z"
                fill="#AFB6C3"
              />
              <path
                d="M42.3369 70.832C42.3369 70.2797 42.7846 69.832 43.3369 69.832C43.8892 69.832 44.3369 70.2797 44.3369 70.832V78.2979H42.3369V70.832Z"
                fill="#C5C9D0"
              />
              <path
                d="M75.7197 70.832C75.7197 70.2797 76.1674 69.832 76.7197 69.832C77.272 69.832 77.7197 70.2797 77.7197 70.832V78.2979H75.7197V70.832Z"
                fill="#8D929C"
              />
              <path
                d="M10.7008 70.832C10.7008 70.2797 11.1485 69.832 11.7008 69.832C12.2531 69.832 12.7008 70.2797 12.7008 70.832V78.2979H10.7008V70.832Z"
                fill="#C5C9D0"
              />
            </svg>

            <p className="patient-accordion-content-subtitle my-3">
              No partner details
            </p>
            <Button
              variant="outline"
              disabled={false}
              contentSize="medium"
              onClick={() => setAddPartner(true)}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.1641 8C15.1641 8.16576 15.0982 8.32473 14.981 8.44194C14.8638 8.55915 14.7048 8.625 14.5391 8.625H8.28906V14.875C8.28906 15.0408 8.22322 15.1997 8.10601 15.3169C7.9888 15.4342 7.82982 15.5 7.66406 15.5C7.4983 15.5 7.33933 15.4342 7.22212 15.3169C7.10491 15.1997 7.03906 15.0408 7.03906 14.875V8.625H0.789063C0.623302 8.625 0.464331 8.55915 0.347121 8.44194C0.229911 8.32473 0.164062 8.16576 0.164062 8C0.164062 7.83424 0.229911 7.67527 0.347121 7.55806C0.464331 7.44085 0.623302 7.375 0.789063 7.375H7.03906V1.125C7.03906 0.95924 7.10491 0.800269 7.22212 0.683058C7.33933 0.565848 7.4983 0.5 7.66406 0.5C7.82982 0.5 7.9888 0.565848 8.10601 0.683058C8.22322 0.800269 8.28906 0.95924 8.28906 1.125V7.375H14.5391C14.7048 7.375 14.8638 7.44085 14.981 7.55806C15.0982 7.67527 15.1641 7.83424 15.1641 8Z"
                  fill="#2B4360"
                />
              </svg>
              <span className="ms-1">Add Partner Details</span>
            </Button>
          </div>
        </div>
      )}

      <Modal
        show={addPartner}
        onHide={() => setAddPartner(false)}
        header="Add Partner "
        closeButton={true}
        size="lg"
      >
        <AddPartnerDetails
          setAddPartner={setAddPartner}
          patientId={patientId}
          fetchPatientData={fetchPatientData}
          setPartnerBasicDetails={setPartnerBasicDetails}
          setPartnerMedicalHistory={setPartnerMedicalHistory}
          partnerBasicDetails={partnerBasicDetails}
          partnerMedicalHistory={partnerMedicalHistory}
        />
      </Modal>
      <Modal
        show={AddPhysicalAssessment}
        onHide={() => setAddPhysicalAssessment(false)}
        header="Add New Physical Assessment"
        closeButton={true}
        size="lg"
      >
        {/* <h1>forms</h1> */}
        <PhysicalAssessment
          formData={formDataAddPhysicalAssessment}
          setFormData={setFormDataAddPhysicalAssessment}
          formError={formErrorAddPhysicalAssessment}
          setFormError={setFormErrorAddPhysicalAssessment}
        />

        <div className="d-flex gap-3">
          <Button
            className="w-100 mt-3"
            variant="outline"
            disabled={false}
            onClick={() => setAddPhysicalAssessment(false)}
          >
            Cancel
          </Button>
          <Button
            className="w-100 mt-3"
            variant="default"
            disabled={false}
            type="button"
            onClick={handleAddPhysicalAssessment}
          >
            Save
          </Button>
        </div>
      </Modal>

      <Modal
        show={EditFertilityAssessment}
        onHide={() => setEditFertilityAssessment(false)}
        header="Edit Fertility Assessment"
        closeButton={true}
        size="lg"
      >
        {/* <h1>forms</h1> */}
        <FertilityAssessment
          formData={formDataEditFertilityAssessment}
          setFormData={setFormDataEditFertilityAssessment}
          setFormError={setFormErrorEditFertilityAssessment}
          formError={formErrorEditFertilityAssessment}
        />

        <div className="d-flex gap-3">
          <Button
            className="w-100 mt-3"
            variant="outline"
            disabled={false}
            onClick={() => setEditFertilityAssessment(false)}
          >
            Cancel
          </Button>
          <Button
            className="w-100 mt-3"
            variant="default"
            disabled={false}
            type="button"
            onClick={
              handleEditFertilityAssessment
            }
          >
            Save
          </Button>
        </div>
      </Modal>

      <Modal
        show={EditMedicalHistory}
        onHide={() => setEditMedicalHistory(false)}
        header="Edit Medical History"
        closeButton={true}
        size="lg"
      >
        <MedicalHistoryForm
          setEditMedicalHistory={setEditMedicalHistory}
          setAddPartner={setAddPartner}
          setActiveTab={setActiveTab}
          formDataMedicalHistory={formDataMedicalHistory}
          patientId={patientId}
          fetchPatientData={fetchPatientData}
        />
      </Modal>
    </>
  );
}
