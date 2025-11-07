"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import Appointments from "../assets/images/Appointments.png";
import ActivePatients from "../assets/images/Active Patients.png";
import NoShowRate from "../assets/images/No Show Rate.png";
import Doctors from "../assets/images/Doctors.png";
import rating from "../assets/images/rating.png";
import Emerygency from "../assets/images/emerygency.png";
import arrow from "../assets/images/ArrowUpRight.png";
import eye from "../assets/images/eyenotification.png";
import notificationdoctor from "../assets/images/patient2.png";
import emerygencydoctor from "../assets/images/patient1.png";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import doctor1 from "../assets/images/dashboard_doctor.png";
import doctor2 from "../assets/images/Profile-doctor.png";
import doctor3 from "../assets/images/doctor5.png";
import star from "../assets/images/ratingstart.png";
import { GoDotFill } from "react-icons/go";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  ArcElement,
  ChartData,
  ChartOptions,
} from "chart.js";

import Image, { StaticImageData } from "next/image";
import { InputSelect } from "./ui/InputSelect";

import dynamic from "next/dynamic";

const LineChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Line),
  { ssr: false }
);
const BarChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Bar),
  { ssr: false }
);
const DoughnutChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Doughnut),
  { ssr: false }
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  ArcElement
);
interface TreatmentData {
  id: string;
  name: string;
  patients: number;
  successRate: number;
  color: string;
  iconColor: string;
}

// ---------- Interfaces ----------
interface DashboardData {
  appointments: number;
  appointmentsChange: number;
  activePatients: number;
  activePatientsChange: number;
  newPatients: number;
  newPatientsChange: number;
  noShowRate: number;
  noShowRateChange: number;
  patientOverview: { male: number; female: number };
  appointmentData: {
    months: string[];
    ivfTreatment: number[];
    kitTreatment: number[];
    icsiTreatment: number[];
    gametefreezing: number[];
    pgtTesting: number[];
  };
  dropoutData: { labels: string[]; values: number[] };
}

interface WaveChartProps {
  width?: number;
  height?: number;
}
const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {};
//----- Appoitment Wavechart Component -----
const AppoitmentWaveChart: React.FC<WaveChartProps> = ({
  width = 800,
  height = 400,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const age = ["Jan", "Feb", "Mar", "Apr", "May", "June"];

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    const Month = [20, 58, 39, 70, 37, 65, 55];

    const chartData: ChartData<"line"> = {
      labels: age,
      datasets: [
        {
          label: "Month",
          data: Month,
          borderColor: "#3E5A91",
        
          backgroundColor: "transparent",
          borderWidth: 2,
          fill: true,
          tension: 0.5,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      ],
    };

    const chartOptions: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#6c757d", font: { size: 13 } },
        },
        y: {
          beginAtZero: true,
          min:20,
          max: 80,
          ticks: { stepSize: 10, color: "#6c757d", font: { size: 13 } },
          grid: { color: "rgba(0,0,0,0.05)" },
        },
      },
      animation: { duration: 1800, easing: "easeInOutQuart" },
    };

    chartInstanceRef.current = new ChartJS(ctx, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      chartInstanceRef.current?.destroy();
      chartInstanceRef.current = null;
    };
  }, [width, height]);

  return (
    <div className="card shadow-sm">
      <div className="px-3 pt-3 text-center">
        <div className="d-flex align-items-center justify-content-between px-2">
          <h6 className="mb-0 d-flex align-items-start justify-content-start dashboard-chart-heading">
            Appointment Overview
          </h6>
          <div className="patient-journey-up-icon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z"
                fill="#2B4360"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="d-flex px-3 gap-2">
        <div className="d-flex align-items-center">
          <GoDotFill fontSize={22} color="#70AAA4" />
          <span className="ageDistribution">Male</span>
        </div>
        <div className="d-flex align-items-center">
          <GoDotFill fontSize={22} color="#E29578" />
          <span className="ageDistribution">Female</span>
        </div>
      </div>

      <div className="card-body px-4">
        <div style={{ height: `${height}px`, width: "100%" }}>
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
};

// ---------- WaveChart Component ----------
const WaveChart: React.FC<WaveChartProps> = ({ width = 800, height = 400 }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const age = ["25 - 29", "30 - 34", "35 - 39", "40 - 44", "45 - 49", "50+"];

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    const maleData = [60, 5, 46, 32, 58, 46, 60];
    const femaleData = [0, 35, 65, 20, 60, 35];

    const chartData: ChartData<"line"> = {
      labels: age,
      datasets: [
        {
          label: "Male",
          data: maleData,
          borderColor: "#70AAA4",
          backgroundColor: "rgba(112, 170, 164, 0.15)",
          borderWidth: 2,
          fill: true,
          tension: 0.5,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
        {
          label: "Female",
          data: femaleData,
          borderColor: "#E29578",
          backgroundColor: "rgba(226, 149, 120, 0.15)",
          borderWidth: 2,
          fill: true,
          tension: 0.5,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      ],
    };

    const chartOptions: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#6c757d", font: { size: 13 } },
        },
        y: {
          beginAtZero: true,
          max: 105,
          ticks: { stepSize: 15, color: "#6c757d", font: { size: 13 } },
          grid: { color: "rgba(0,0,0,0.05)" },
        },
      },
      animation: { duration: 1800, easing: "easeInOutQuart" },
    };

    chartInstanceRef.current = new ChartJS(ctx, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      chartInstanceRef.current?.destroy();
      chartInstanceRef.current = null;
    };
  }, [width, height]);

  return (
    <div className="card shadow-sm">
      <div className="px-3 pt-3 text-center">
        <div className="d-flex align-items-center justify-content-between px-2">
          <h6 className="mb-0 d-flex align-items-start justify-content-start dashboard-chart-heading">
            Patient Age Distribution
          </h6>
          <div className="patient-journey-up-icon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z"
                fill="#2B4360"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="d-flex px-3 gap-2">
        <div className="d-flex align-items-center">
          <GoDotFill fontSize={22} color="#70AAA4" />
          <span className="ageDistribution">Male</span>
        </div>
        <div className="d-flex align-items-center">
          <GoDotFill fontSize={22} color="#E29578" />
          <span className="ageDistribution">Female</span>
        </div>
      </div>

      <div className="card-body px-4">
        <div style={{ height: `${height}px`, width: "100%" }}>
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
};

// ---------- Dashboard Component ----------
const Dashboard: React.FC = () => {
  const [formData, setFormData] = useState<FormData>();
  const initialData = {
    appointments: 18,
    appointmentsChange: 40,
    activePatients: 131,
    activePatientsChange: 25,
    newPatients: 32,
    newPatientsChange: 55,
    noShowRate: 24,
    noShowRateChange: -10,
    patientOverview: { male: 45, female: 55 },
    appointmentData: {
      months: ["Jan", "Feb", "Mar", "Apr"],
      ivfTreatment: [3800, 2600, 3300, 3500],
      kitTreatment: [1900, 3200, 2200, 1600],
      icsiTreatment: [3200, 2400, 1400, 2400],
      gametefreezing: [800, 1200, 800, 1000],
      pgtTesting: [600, 800, 400, 800],
    },
    dropoutData: {
      labels: [
        "Fertility Assessment ",
        "Stimulation",
        "Egg Retrieval",
        "Fertilisation",
        "IVF",
        "Embryo Culture",
        "Embryo Transfer",
        "Pregnancy Test",
      ],
      values: [20, 35, 25, 45, 40, 35, 30, 25],
    },
  };

  const [data, setData] = useState<DashboardData | any>(initialData);
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev: DashboardData | any) => ({
        ...prev,
        appointments: Math.floor(Math.random() * 50) + 10,
        Patients: Math.floor(Math.random() * 200) + 100,
        newPatients: Math.floor(Math.random() * 60) + 20,
        noShowRate: Math.floor(Math.random() * 40) + 10,
        appointmentsChange: Math.floor(Math.random() * 100) - 50,
        activePatientsChange: Math.floor(Math.random() * 60) - 30,
        newPatientsChange: Math.floor(Math.random() * 80) - 40,
        noShowRateChange: Math.floor(Math.random() * 40) - 20,
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatChange = (change: number) => {
    const isPositive = change >= 0;
    const color = isPositive ? "dashboard-card-green" : "dashboard-card-orange";
    const icon = isPositive ? "↗" : "↘";
    return (
      <span className={color}>
        {icon} {Math.abs(change)}%{" "}
        <span className="dashboard-card-subtitle">last month</span>
      </span>
    );
  };

  const appointmentChartData = {
    labels: data.appointmentData.months,
    datasets: [
      {
        label: "IVF Treatment",
        data: data.appointmentData.ivfTreatment,
        backgroundColor: "#D45F35",
      },
      {
        label: "Kit Treatment",
        data: data.appointmentData.kitTreatment,
        backgroundColor: "#DB7A57",
      },
      {
        label: "ICSI Treatment",
        data: data.appointmentData.icsiTreatment,
        backgroundColor: "#E29578",
      },
      {
        label: "Gamete Freezing",
        data: data.appointmentData.gametefreezing,
        backgroundColor: "#EAAF9A",
      },
      {
        label: "PGT Testing",
        data: data.appointmentData.pgtTesting,
        backgroundColor: "#F1CABB",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // ✅ this is allowed
        labels: {
          padding: 30,
          boxHeight: 10,
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: true,
        // text: "Appointment Overview",
        align: "start", // ✅ "start" | "center" | "end"
      },
    },
  };

  const patientChartData = {
    labels: ["Female", "Male"],
    datasets: [
      {
        data: [data.patientOverview.female, data.patientOverview.male],
        backgroundColor: ["#E29578", "#2B4360"],
        cutout: "70%",
      },
    ],
  };

  const treatmentData: TreatmentData[] = [
    {
      id: "ivf",
      name: "IVF",
      patients: 650,
      successRate: 55,
      color: "#5A94D9",
      iconColor: "#5A94D9",
    },
    {
      id: "gamete",
      name: "Gamete Freezing",
      patients: 300,
      successRate: 87,
      color: "#F4C47E",
      iconColor: "#F4C47E",
    },
    {
      id: "icsi",
      name: "ICSI",
      patients: 450,
      successRate: 66,
      color: "#869BB5",
      iconColor: "#869BB5",
    },
    {
      id: "pgt",
      name: "PGT Testing",
      patients: 280,
      successRate: 96,
      color: "#1CB384",
      iconColor: "#1CB384",
    },
  ];

  // 🔹 Instead of patients, now based on successRate
  const totalSuccessRate = treatmentData.reduce(
    (sum, treatment) => sum + treatment.successRate,
    0
  );

  const generateProgressSegments = () => {
    return treatmentData.map((treatment) => {
      const percentage = (treatment.successRate / totalSuccessRate) * 100;
      return {
        ...treatment,
        percentage,
      };
    });
  };

  const progressSegments = generateProgressSegments();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  type notification_card = {
    id: number;
    img: string | StaticImageData;
    name: string;
    emerygency?: string;
    AppointmentRequest?: string;
    arrow?: string | StaticImageData;
    emerygencyimg?: string | StaticImageData;
    eye?: string | StaticImageData;
  };
  const notification_card: notification_card[] = [
    {
      id: 1,
      img: emerygencydoctor,
      name: "Radhika More",
      emerygencyimg: Emerygency,
      eye: eye,
    },
    {
      id: 2,
      name: "Radhika More",
      img: notificationdoctor,
      AppointmentRequest: "Appointment Request",
      arrow: arrow,
    },
    {
      id: 3,
      name: "Radhika More",
      img: notificationdoctor,
      AppointmentRequest: "Appointment Request",
      arrow: arrow,
      eye: eye,
    },
    {
      id: 4,
      name: "Radhika More",
      img: emerygencydoctor,
      emerygencyimg: Emerygency,
      eye: eye,
    },
  ];
  type doctor = {
    id: number;
    img: string | StaticImageData;
    name: string;
    rating: string;
    speciality: string;
  };
  const doctor: doctor[] = [
    {
      id: 1,
      img: doctor1,
      name: "Dr. Harpreet Bedi ",
      rating: "4.6 / 5 (660 reviews)",
      speciality: "Fertility Specialist",
    },
    {
      id: 2,
      img: doctor2,
      name: "Dr. Sonia Advani ",
      rating: "4.6 / 5 (660 reviews)",
      speciality: "Fertility Specialist",
    },
    {
      id: 3,
      img: doctor3,
      name: "Dr. Sushant Patil",
      rating: "3.9 / 5 (228 reviews)",
      speciality: "Embryologist",
    },
  ];
  return (
    <>
      <div className="py-2">
        {/* Top Stats */}
        <Row className="mb-3">
          <Col md={3} xxl={2}>
            <Card className="">
              <Card.Body>
                <Card.Title className="phisical-assessment-accordion-title-showData">
                  <Image
                    src={Appointments}
                    alt="Appointments"
                    width={38}
                    height={38}
                    className="me-3"
                  ></Image>
                  Appointments
                </Card.Title>
                <h2 className="dashboard-subheader mt-3 mb-0">
                  {data.appointments}
                </h2>
                <h1 className="dashboard-card-subtitle mt-0">
                  {formatChange(data.appointmentsChange)}
                </h1>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} xxl={2}>
            <Card className="">
              <Card.Body>
                <Card.Title className="phisical-assessment-accordion-title-showData">
                  <Image
                    src={ActivePatients}
                    alt="Active Patients"
                    width={38}
                    height={38}
                    className="me-3"
                  ></Image>
                  Patients
                </Card.Title>
                <h2 className="dashboard-subheader mt-3 mb-0">
                  {data.activePatients}
                </h2>
                {formatChange(data.activePatientsChange)}
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} xxl={2}>
            <Card className="">
              <Card.Body>
                <Card.Title className="phisical-assessment-accordion-title-showData">
                  <Image
                    src={Doctors}
                    alt="Doctors"
                    width={38}
                    height={38}
                    className="me-3"
                  ></Image>{" "}
                  Doctors
                </Card.Title>
                <h2 className="dashboard-subheader mt-3 mb-0">
                  {data.newPatients}
                </h2>
                {formatChange(data.newPatientsChange)}
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} xxl={2}>
            <Card className="">
              <Card.Body>
                <Card.Title className="phisical-assessment-accordion-title-showData">
                  <Image
                    src={NoShowRate}
                    alt="NoShowRate"
                    width={38}
                    height={38}
                    className="me-3"
                  ></Image>
                  No Show Rate
                </Card.Title>
                <h2 className="dashboard-subheader mt-3 mb-0">
                  {data.newPatients}
                </h2>
                {formatChange(data.newPatientsChange)}
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} xxl={2}>
            <Card className="mt-lg-4 mt-xxl-0">
              <Card.Body>
                <Card.Title className="phisical-assessment-accordion-title-showData">
                  <Image
                    src={rating}
                    alt="Rating"
                    width={38}
                    height={38}
                    className="me-3"
                  ></Image>
                  Rating
                </Card.Title>
                <h2 className="dashboard-subheader mt-3 mb-0">
                  {data.noShowRate}%
                </h2>
                {formatChange(data.noShowRateChange)}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* second container */}
        <Row>
          <Col md={8}>
            <Row>
              <Col lg={6}>
                <div>
                  <div className="card border-0">
                    <div className="card-body treatment-success-rate-charts">
                      {/* Header */}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <p className="mb-0 dashboard-chart-heading">
                          Treatment Success Rate
                        </p>
                        {/* <div className="patient-journey-up-icon1">
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 0.75C8.07164 0.75 6.18657 1.32183 4.58319 2.39317C2.97982 3.46451 1.73013 4.98726 0.992179 6.76884C0.254225 8.55042 0.061142 10.5108 0.437348 12.4021C0.813554 14.2934 1.74215 16.0307 3.10571 17.3943C4.46928 18.7579 6.20656 19.6865 8.09787 20.0627C9.98919 20.4389 11.9496 20.2458 13.7312 19.5078C15.5127 18.7699 17.0355 17.5202 18.1068 15.9168C19.1782 14.3134 19.75 12.4284 19.75 10.5C19.7473 7.91498 18.7192 5.43661 16.8913 3.60872C15.0634 1.78084 12.585 0.75273 10 0.75ZM10 18.75C8.36831 18.75 6.77326 18.2661 5.41655 17.3596C4.05984 16.4531 3.00242 15.1646 2.378 13.6571C1.75358 12.1496 1.5902 10.4908 1.90853 8.8905C2.22685 7.29016 3.01259 5.82015 4.16637 4.66637C5.32016 3.51259 6.79017 2.72685 8.39051 2.40852C9.99085 2.09019 11.6497 2.25357 13.1571 2.87799C14.6646 3.50242 15.9531 4.55984 16.8596 5.91655C17.7661 7.27325 18.25 8.8683 18.25 10.5C18.2475 12.6873 17.3775 14.7843 15.8309 16.3309C14.2843 17.8775 12.1873 18.7475 10 18.75ZM11.5 15C11.5 15.1989 11.421 15.3897 11.2803 15.5303C11.1397 15.671 10.9489 15.75 10.75 15.75C10.3522 15.75 9.97065 15.592 9.68934 15.3107C9.40804 15.0294 9.25 14.6478 9.25 14.25V10.5C9.05109 10.5 8.86033 10.421 8.71967 10.2803C8.57902 10.1397 8.5 9.94891 8.5 9.75C8.5 9.55109 8.57902 9.36032 8.71967 9.21967C8.86033 9.07902 9.05109 9 9.25 9C9.64783 9 10.0294 9.15804 10.3107 9.43934C10.592 9.72064 10.75 10.1022 10.75 10.5V14.25C10.9489 14.25 11.1397 14.329 11.2803 14.4697C11.421 14.6103 11.5 14.8011 11.5 15ZM8.5 6.375C8.5 6.1525 8.56598 5.93499 8.6896 5.74998C8.81322 5.56498 8.98892 5.42078 9.19449 5.33564C9.40005 5.25049 9.62625 5.22821 9.84448 5.27162C10.0627 5.31502 10.2632 5.42217 10.4205 5.5795C10.5778 5.73684 10.685 5.93729 10.7284 6.15552C10.7718 6.37375 10.7495 6.59995 10.6644 6.80552C10.5792 7.01109 10.435 7.18679 10.25 7.3104C10.065 7.43402 9.84751 7.5 9.625 7.5C9.32664 7.5 9.04049 7.38147 8.82951 7.1705C8.61853 6.95952 8.5 6.67337 8.5 6.375Z"
                          fill="#2B4360"
                        />
                      </svg>
                    </div> */}
                      </div>

                      {/* Total Count */}
                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          <div className="me-2 patient-journey-up-icon1">
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.5 5.75V11.75C22.5 11.9489 22.421 12.1397 22.2803 12.2803C22.1397 12.421 21.9489 12.5 21.75 12.5C21.5511 12.5 21.3603 12.421 21.2197 12.2803C21.079 12.1397 21 11.9489 21 11.75V7.56031L13.2806 15.2806C13.211 15.3504 13.1282 15.4057 13.0372 15.4434C12.9461 15.4812 12.8486 15.5006 12.75 15.5006C12.6514 15.5006 12.5538 15.4812 12.4628 15.4434C12.3717 15.4057 12.289 15.3504 12.2194 15.2806L8.99999 12.0603L2.78061 18.2806C2.63988 18.4214 2.44901 18.5004 2.24999 18.5004C2.05097 18.5004 1.8601 18.4214 1.71936 18.2806C1.57863 18.1399 1.49957 17.949 1.49957 17.75C1.49957 17.551 1.57863 17.3601 1.71936 17.2194L8.46936 10.4694C8.53902 10.3996 8.62174 10.3443 8.71278 10.3066C8.80383 10.2688 8.90143 10.2494 8.99999 10.2494C9.09855 10.2494 9.19615 10.2688 9.2872 10.3066C9.37824 10.3443 9.46096 10.3996 9.53061 10.4694L12.75 13.6897L19.9397 6.5H15.75C15.5511 6.5 15.3603 6.42098 15.2197 6.28033C15.079 6.13968 15 5.94891 15 5.75C15 5.55109 15.079 5.36032 15.2197 5.21967C15.3603 5.07902 15.5511 5 15.75 5H21.75C21.9489 5 22.1397 5.07902 22.2803 5.21967C22.421 5.36032 22.5 5.55109 22.5 5.75Z"
                                fill="#6FA8DC"
                              />
                            </svg>
                          </div>
                          <div>
                            <span className="treatment-success-rate-datas">
                              {totalSuccessRate}%
                            </span>
                            <span className="treatment-success-rate-charts-patients">
                              + 215 Patients
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="dashboard-progress-bar">
                          {progressSegments.map((segment) => {
                            const numBars = Math.max(
                              1,
                              Math.round(segment.percentage / 2)
                            );
                            const bars = [];

                            for (let i = 0; i < numBars; i++) {
                              bars.push(
                                <div
                                  key={`${segment.id}-${i}`}
                                  style={{
                                    width: "6px",
                                    height: "36px",
                                    backgroundColor: segment.color,
                                    marginRight:
                                      i === numBars - 1 ? "0" : "1px",
                                  }}
                                />
                              );
                            }

                            return (
                              <div
                                key={segment.id}
                                className="dashboard-progress-bars"
                              >
                                {bars}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Treatment Items */}
                      <div>
                        {treatmentData.map((treatment, index) => (
                          <div key={index}>
                            <div key={treatment.id} className="mb-3">
                              <div className="d-flex align-items-center">
                                <div className="me-3">
                                  <div
                                    style={{
                                      width: "24px",
                                      height: "24px",
                                      borderRadius: "50%",
                                      backgroundColor: treatment.color,
                                    }}
                                  />
                                </div>
                                <div className="flex-grow-1">
                                  <div className="dashboard-treatment-success-title">
                                    {treatment.name}
                                  </div>
                                  <div className="dashboard-treatment-success-patients mt-2">
                                    {treatment.patients} Patients
                                  </div>
                                </div>

                                <div className="text-end">
                                  <div className="d-flex align-items-center">
                                    <svg
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#4caf50"
                                      strokeWidth="2"
                                      className="dashboard-treatment-success-icon"
                                    >
                                      <path d="M7 17l9.2-9.2M17 17H7V7"></path>
                                    </svg>
                                    <span className="dashboard-treatment-success-rate">
                                      {treatment.successRate}%
                                    </span>
                                    <span className="dashboard-treatment-success ps-1">
                                      Success
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {index !== treatmentData.length - 1 && (
                              <div
                                style={{ border: "1px solid #DDE1E8" }}
                                className="my-3"
                              ></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <AppoitmentWaveChart height={330} />
                {/* <Card>
                  <Card.Body>
                    <div className="">
                      <Card.Title className="dashboard-chart-heading">
                        Appointment Overview
                      </Card.Title>
                    </div>
                    <div className="appointment-overview-charts">
                      <Bar data={appointmentChartData} options={options} />
                    </div>
                  </Card.Body>
                </Card> */}
              </Col>
            </Row>
            {/* Charts & doctors*/}
            <Row className="mb-4 mt-4">
              <Col lg={6}>
                <Card className="">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <Card.Title className="dashboard-chart-heading">
                        Top Doctors
                      </Card.Title>
                      <div className="patient-journey-up-icon1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                        >
                          <path
                            d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z"
                            fill="#2B4360"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      {doctor.map((card, id) => (
                        <div
                          key={id}
                          className="contact_person_detail_cards mt-3"
                        >
                          <div className="doctor_card">
                            <div className="d-flex align-items-center gap-3">
                              <Image
                                src={card.img}
                                alt="Profile Image"
                                width={50}
                                height={50}
                                className="rounded-circle"
                              />
                              <div>
                                <div className=" fw-semibold notification_card">
                                  {card.name}
                                </div>
                                <div
                                  className="fw-medium "
                                  style={{ color: "#3E4A57", fontSize: "14px" }}
                                >
                                  {card.speciality}
                                </div>
                                <div
                                  className="fw-medium d-flex align-items-center gap-1"
                                  style={{ color: "#3E4A57", fontSize: "14px" }}
                                >
                                  <Image
                                    src={star}
                                    alt="star"
                                    width={13}
                                    height={12}
                                  />
                                  {card.rating}
                                </div>
                              </div>
                            </div>
                            <div className="requestarrow">
                              <Image
                                src={arrow}
                                alt="arrow"
                                width={11}
                                height={11}
                              />
                            </div>
                          </div>
                          {/* <Image src={star} alt="star" width={12} height={12} /> */}
                        </div>
                      ))}
                      {/* <DoughnutChart
                        data={patientChartData}
                        options={{ responsive: true }}
                      /> */}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <WaveChart height={400} />
              </Col>
            </Row>
          </Col>
          {/* notification */}
          <Col md={4}>
            <Card className="h-100">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <Card.Title className="mb-0 dashboard-chart-heading">
                    Notifications
                  </Card.Title>
                  <div className="patient-journey-up-icon1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z"
                        fill="#2B4360"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="mt-3">
                  {notification_card.map((card) => (
                    <div
                      key={card.id}
                      className="contact_person_detail_cards mb-3 "
                    >
                      {/* emerygencyimg */}
                      {card.emerygencyimg ? (
                        <div className="mb-2 d-flex align-items-center gap-2">
                          <div className="emerygencyimg">
                            <Image
                              src={card.emerygencyimg}
                              alt="image"
                              width={19}
                              height={18}
                            />
                          </div>
                          <div className="fs-6 fw-medium">Emerygency</div>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center mb-2 justify-content-between">
                          <div className="fs-6 fw-medium ">
                            {card.AppointmentRequest}
                          </div>
                          <div className="requestarrow">
                            {card.arrow && (
                              <Image
                                src={card.arrow}
                                alt="arrow"
                                width={11}
                                height={11}
                              />
                            )}
                          </div>
                        </div>
                      )}
                      <div className="d-flex  justify-content-between ">
                        <div className="d-flex align-items-center gap-3">
                          <Image
                            src={card.img}
                            alt="Profile Image"
                            width={50}
                            height={50}
                          />
                          <div>
                            <div className=" fw-semibold notification_card">
                              {card.name}
                            </div>
                            <div style={{ color: "#8A8D93", fontSize: "14px" }}>
                              6 Jan 2024 10 AM
                            </div>
                          </div>
                        </div>

                        {card.eye && (
                          <div className="eyecon ">
                            <Image
                              src={card.eye}
                              alt="arrow"
                              width={16}
                              height={12}
                              // style={{ marginTop: "9px" }}
                            />
                          </div>
                        )}
                      </div>
                      {/* decline & confirm  */}
                      <div className="d-flex justify-content-evenly align-items-center mt-3">
                        <div className="w-50 d-flex align-items-center declinecon justify-content-center">
                          <IoClose fontSize={24} />
                          Decline
                        </div>
                        <div className="w-50 d-flex align-items-center confirmcon justify-content-center">
                          <FaCheck fontSize={18} />
                          Confirm
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
