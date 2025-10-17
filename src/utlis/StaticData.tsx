import doctor1 from "@/assets/images/doctor1.png";
import doctor2 from "@/assets/images/doctor2.png";
import doctor3 from "@/assets/images/doctor3.png";
import doctor4 from "@/assets/images/doctor4.png";
import doctor5 from "@/assets/images/doctor5.png";
import { StaticImageData } from "next/image";
import Doctor1 from "@/assets/images/doctor1.png";
import Doctor2 from "@/assets/images/doctor2.png";
import Doctor3 from "@/assets/images/doctor3.png";
import Doctor4 from "@/assets/images/doctor4.png";

export interface DoctorEntry {
  id: number; // <-- ADD ID
  name: string;
  mobile: string;
  email: string;
  pin: string;
  status: string;
  image: string | StaticImageData;
  date?: string; // ✅ optional date field
  specialisation: string;
  verified: boolean;
}

export interface InventoryEntry {
  id: number; // <-- ADD ID
  name: string;
  mobile: string;
  email: string;
  pin: string;
  status: string;
  image: string | StaticImageData;
  date?: string; // ✅ optional date field
}

export type Doctor = {
  id: string | number;
  name: string;
  image: string | StaticImageData;
  slots: string[];
};

export const DoctorData: DoctorEntry[] = [
  {
    id: 1,
    name: "Dr. Ashok Kumar",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    pin: "400077",
    status: "Active",
    image: doctor1,
    date: "23, Mar 2023",
    specialisation: "Fertility Specialist",
    verified: true,
  },
  {
    id: 2,
    name: "Dr. Harpreet Bedi",
    mobile: "9092038491",
    email: "harpreetbedi@gmail.com",
    pin: "400077",
    status: "Active",
    image: doctor2,
    date: "09, Apr 2023",
    verified: true,
    specialisation: "Fertility Specialist",
  },
  {
    id: 3,
    name: "Dr. Sonia Advani",
    mobile: "9092038491",
    email: "soniaadvani2@gmail.com",
    pin: "400077",
    status: "On Leave",
    image: doctor3,
    date: "12, May 2023",
    verified: true,
    specialisation: "Fertility Specialist",
  },
  {
    id: 4,
    name: "Dr. Meena Neema",
    mobile: "9092038491",
    verified: true,
    email: "neemameen@gmail.com",
    pin: "400077",
    status: "Inactive",
    image: doctor4,
    date: "03, June 2023",
    specialisation: "Gynoecologist",
  },
  {
    id: 5,
    name: "Dr. Shantanu Patil",
    mobile: "9092038491",
    email: "shantanupatil@gmail.com",
    pin: "400077",
    status: "Active",
    image: doctor5,
    date: "25, July 2023",
    verified: true,
    specialisation: "Embryologist",
  },
  {
    id: 6,
    name: "Ashok Kumar",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    pin: "400077",
    status: "Active",
    image: doctor1,
    date: "23, Mar 2023",
    verified: true,
    specialisation: "Fertility Specialist",
  },
  {
    id: 7,
    name: "Ashok Kumar",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    pin: "400077",
    status: "Active",
    image: doctor1,
    date: "23, Mar 2023",
    verified: true,
    specialisation: "Fertility Specialist",
  },
  {
    id: 8,
    name: "Ashok Kumar",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    pin: "400077",
    status: "Active",
    image: doctor1,
    date: "23, Mar 2023",
    verified: true,
    specialisation: "Fertility Specialist",
  },
  {
    id: 9,
    name: "Ashok Kumar",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    pin: "400077",
    status: "Active",
    image: doctor1,
    date: "23, Mar 2023",
    verified: true,
    specialisation: "Fertility Specialist",
  },
  {
    id: 10,
    name: "Ashok Kumar",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    verified: true,
    pin: "400077",
    status: "Active",
    image: doctor1,
    date: "23, Mar 2023",
    specialisation: "Fertility Specialist",
  },
];

// export const inventoryData: InventoryEntry[] = [
//   {
//     id: 1,
//     name: "Rani Desai",
//     mobile: "9092038491",
//     email: "ranidesai@protonmail.com",
//     pin: "400077",
//     status: "Completed",
//     image: doctor1,
//     date: "2025-09-16",
//   },
//   {
//     id: 2,
//     name: "Nina Gupta",
//     mobile: "9092038491",
//     email: "ninagupta@protonmail.com",
//     pin: "400077",
//     status: "Pending",
//     image: doctor1,
//     date: "2025-09-15",
//   },
//   {
//     id: 3,
//     name: "Himari Roy",
//     mobile: "9092038491",
//     email: "himariroy@protonmail.com",
//     pin: "400077",
//     status: "Scheduled",
//     image: doctor1,
//     date: "2025-09-15",
//   },
//   {
//     id: 4,
//     name: "Anjali Shinde",
//     mobile: "9092038491",
//     email: "anjalishinde@protonmail.com",
//     pin: "400077",
//     status: "No Response",
//     image: doctor1,
//     date: "2025-09-25",
//   },
//   {
//     id: 5,
//     name: "Anjali Shinde",
//     mobile: "9092038491",
//     email: "anjalishinde@protonmail.com",
//     pin: "400077",
//     status: "Cancelled",
//     image: doctor1,
//     date: "2025-10-15",
//   },
// ];

// export const doctorsData: Doctor[] = [
//   {
//     id: 1,
//     name: "Dr. Manan Gupta",
//     image: Doctor1,
//     slots: ["3:00 PM", "3:30 PM", "4:00 PM", "5:00 PM", "5:30 PM"],
//   },
//   {
//     id: 2,
//     name: "Dr. Manan Gupta",
//     image: Doctor2,
//     slots: ["3:00 PM", "3:30 PM", "4:00 PM", "5:00 PM"],
//   },
//   {
//     id: 3,
//     name: "Dr. Jaya Prakesh",
//     image: Doctor3,
//     slots: ["3:00 PM", "3:30 PM", "4:00 PM", "5:00 PM", "6:00 PM"],
//   },
//   {
//     id: 4,
//     name: "Dr. Megha Singh",
//     image: doctor1,
//     slots: ["3:00 PM", "3:30 PM", "4:00 PM", "5:00 PM"],
//   },
//   {
//     id: 5,
//     name: "Dr. Veena Raman",
//     image: Doctor4,
//     slots: ["3:00 PM", "3:30 PM", "4:00 PM", "5:00 PM", "5:30 PM"],
//   },
// ];

import { ColumnDef } from "@tanstack/react-table";
// import { LeaveEntry } from "../utils/types/interfaces";
import Trash from "../assets/images/Trash.png";
import LightEditimg from "../assets/images/LightEditimg.png";
import Image from "next/image";
import { Patient } from "./types/interfaces";

export type LeaveEntry = {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  days: string;
};

export const leaveData: LeaveEntry[] = [
  {
    id: "01",
    type: "Casual leave",
    startDate: "12/08/25",
    endDate: "12/08/25",
    days: "1 Day",
  },
  {
    id: "02",
    type: "Sick leave",
    startDate: "12/08/25",
    endDate: "12/08/25",
    days: "3 Days",
  },
  {
    id: "03",
    type: "Vacation",
    startDate: "12/08/25",
    endDate: "12/08/25",
    days: "15 Days",
  },
  {
    id: "04",
    type: "Family Thing",
    startDate: "12/08/25",
    endDate: "12/08/25",
    days: "1 Day",
  },
  {
    id: "05",
    type: "Sick leave",
    startDate: "12/08/25",
    endDate: "12/08/25",
    days: "2 Days",
  },
  {
    id: "06",
    type: "Casual leave",
    startDate: "12/08/25",
    endDate: "12/08/25",
    days: "1 Day",
  },
  {
    id: "07",
    type: "Family thing",
    startDate: "12/08/25",
    endDate: "12/08/25",
    days: "2 Days",
  },
  {
    id: "08",
    type: "Casual leave",
    startDate: "12/08/25",
    endDate: "12/08/25",
    days: "1 Day",
  },
];

export const leaveColumns: ColumnDef<LeaveEntry>[] = [
  {
    header: "#",
    accessorKey: "id",
  },
  {
    header: "Leave Type",
    accessorKey: "type",
  },
  {
    header: "Start Date",
    accessorKey: "startDate",
  },
  {
    header: "End Date",
    accessorKey: "endDate",
  },
  {
    header: "No. of days",
    accessorKey: "days",
  },
  // {
  //   header: 'Action',
  //   cell: () => (
  //     <div className="d-flex gap-2">
  //       <button className="btn btn-sm profile-card-boeder ">
  //         <Image src={LightEditimg} alt="Specialization" width={18} height={20} />
  //       </button>

  //       <button className="btn btn-sm profile-card-boeder">
  //         <Image src={Trash} alt="Specialization" width={18} height={20} />
  //       </button>
  //     </div>
  //   ),
  // },
];

export const tableResponse: Patient[] = [
  {
    id: 1,
    name: "Meera Joshi",
    mobile: "9092038491",
    email: "----",
    pincode: "400072",
    treatment: "Fertility Support +2",
    status: "Active",
  },
  {
    id: 2,
    name: "Anjali Kapoor",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    pincode: "400072",
    treatment: "IVF",
    status: "Deactivated",
  },
  // ...add more rows
];
