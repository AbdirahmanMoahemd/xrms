import React from "react";
import {
  AiFillAppstore
} from "react-icons/ai";
import {
  FiShoppingBag,
  FiCreditCard,
} from "react-icons/fi";
import {FcCustomerSupport, FcSalesPerformance} from 'react-icons/fc'
import {
  BsCurrencyDollar,
} from "react-icons/bs";
import {   FaMoneyBill, FaUsers } from "react-icons/fa"
import { FcMoneyTransfer, FcParallelTasks } from "react-icons/fc";
import avatar from "./avatar.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.png";
import avatar4 from "./avatar4.jpg";



export const links = [
  {
    name: "Dashboard",
    text: "",
    icon: <FiShoppingBag />,
  },
  {
    name: "Store",
    text: "store",
    icon: <AiFillAppstore />,
  },
  {
    name: "Sales",
    text: "sales",
    icon: <FcSalesPerformance />,
  },
  {
    name: "Tasks",
    text: "tasks",
    icon: <FcParallelTasks />,
  },
  {
    name: "My Tasks",
    text: "my-tasks",
    icon: <FcParallelTasks />,
  },
  
  
  
];



export const Adminlinks = [
  {
    name: "Dashboard",
    text: "",
    icon: <FiShoppingBag />,
  },
  {
    name: "Inventory",
    text: "store",
    icon: <AiFillAppstore />,
  },
  {
    name: "Sales",
    text: "sales",
    icon: <FcSalesPerformance />,
  },
  {
    name: "Tasks",
    text: "tasks",
    icon: <FcParallelTasks />,
  },
  {
    name: "Tasks Events",
    text: "tasks-events",
    icon: <FcParallelTasks />,
  },
  {
    name: "Customers",
    text: "customers",
    icon: <FcCustomerSupport />,
  },
  {
    name: "Income",
    text: "income",
    icon: <FcMoneyTransfer />,
  },
  {
    name: "Expenses",
    text: "expenses",
    icon: <FaMoneyBill />,
  },
  {
    name: "Users",
    text: "users",
    icon: <FaUsers />,
  },



  
  
];


export const chatData = [
  {
    image: avatar2,
    message: "Roman Joined the Team!",
    desc: "Congratulate him",
    time: "9:08 AM",
  },
  {
    image: avatar3,
    message: "New message received",
    desc: "Salma sent you new message",
    time: "11:56 AM",
  },
  {
    image: avatar4,
    message: "New Payment received",
    desc: "Check your earnings",
    time: "4:39 AM",
  },
  {
    image: avatar,
    message: "Jolly completed tasks",
    desc: "Assign her new tasks",
    time: "1:12 AM",
  },
];






export const medicalproBranding = {
  data: [
    {
      title: "Due Date",
      desc: "Oct 23, 2021",
    },
    {
      title: "Budget",
      desc: "$98,500",
    },
    {
      title: "Expense",
      desc: "$63,000",
    },
  ],
  teams: [
    {
      name: "Bootstrap",
      color: "orange",
    },
    {
      name: "Angular",
      color: "#FB9678",
    },
  ],
  leaders: [
    {
      image: avatar2,
    },
    {
      image: avatar3,
    },
    {
      image: avatar2,
    },
    {
      image: avatar4,
    },
    {
      image: avatar,
    },
  ],
};

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "org-theme",
    color: "#F4A003",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: "My Profile",
    desc: "Account Settings",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
  },
  {
    icon: <FiCreditCard />,
    title: "My Tasks",
    desc: "My-Tasks",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
  },
];














