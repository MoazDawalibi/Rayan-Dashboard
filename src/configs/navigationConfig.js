import React from "react";
import { Home } from "react-feather";
import { AiFillQuestionCircle, AiFillStar} from "react-icons/ai"
import {FaUserFriends , FaUser } from "react-icons/fa"
import { MdPrivacyTip } from "react-icons/md";
import {DiDatabase} from "react-icons/di"
import { FiMail } from "react-icons/fi";
import {CgUnavailable} from "react-icons/cg"
import {BsCode, BsInfoCircle} from "react-icons/bs"
import {AiOutlineTransaction ,AiFillSetting ,AiFillGift} from "react-icons/ai"
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiLockAlt } from "react-icons/bi";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { RiCouponFill } from "react-icons/ri";

const navigationConfig = [
  {
    id: "home",
    title: "home",
    type: "item",
    icon: <Home size={20} />,
    navLink: "/",
  },
  {
    id: "user_Management",
    title: "user_management",
    type: "collapse",
    icon: <FaUserFriends size={20} />,
    children: [
      {
        id: "driver",
        title: "drivers",
        type: "item",
        icon: <FaUser size={20} />,
        navLink: "/driver",
        
      },
      {
        id: "customers",
        title: "customers",
        type: "item",
        icon: <FaUser size={20} />,
        navLink: "/customer",
        
      },
   

    
    ]
  },
  {
    id: "order",
    title: "order",
    type: "collapse",
    icon: <DiDatabase size={20} />,
    children: [
    
   
  {
    id: "orders",
    title: "orders",
    type: "item",
    icon: <DiDatabase size={20} />,
    navLink: "/orders",
  },{
    id: "unorder",
    title: "unacceptable_order",
    type: "item",
    icon: <CgUnavailable size={20} />,
    navLink: "/unacceptable_order",
  },
    
    ]
  },

  {
    id: "code",
    title: "Code",
    type: "item",
    icon: <RiCouponFill size={20} />,
    navLink: "/code",
  },
 
  {
    id: "transaction",
    title: "Transaction",
    type: "item",
    icon: <AiOutlineTransaction size={20} />,
    navLink: "/transaction",
  },
  {
    id: "driverrate",
    title: "driver_rate",
    type: "item",
    icon: <AiFillStar size={20} />,
    navLink: "/driver_rate",
  }, {
    id: "not",
    title: "notification",
    type: "item",
    icon: <IoIosNotificationsOutline size={20} />,
    navLink: "/notification",
  },
  {
    id: "social_media",
    title: "social_media",
    type: "item",
    icon: <FiMail size={20} />,
    navLink: "/social_media",
  },
  {
    id: "information",
    title: "information",
    type: "collapse",
    icon: <BsInfoCircle size={20} />,
    children: [
      {
        id: "privacy",
        title: "privacy",
        type: "item",
        icon: <MdPrivacyTip size={20} />,
        navLink: "/information/privacy",
      },

      {
        id: "about_us",
        title: "about_us",
        type: "item",
        icon: <AiFillQuestionCircle size={20} />,
        navLink: "/information/about-us",
      },
    ],
  },
  {
    id: "accounts",
    title: "accounts",
    type: "collapse",
    icon: <AdminPanelSettingsIcon />,
   
    children: [
      {
        id: "view_accounts",
        title: "view_accounts",
        type: "item",
        icon: <PeopleIcon />,
        navLink: "/accounts/view",
       
      },
      {
        id: "add_account",
        title: "add_account",
        type: "item",
        icon: <PersonAddIcon />,
        navLink: "/accounts/add",
       
      },
      {
        id: "role",
        title: "role",
        type: "item",
        icon: <BiLockAlt />,
        navLink: "/accounts/role",
       
      },
    ],
  },
  {
    id: "app_settings",
    title: "app_setting",
    type: "item",
    icon: <AiFillSetting size={20} />,
    navLink: "/app_setting",
  },

];

export default navigationConfig;
