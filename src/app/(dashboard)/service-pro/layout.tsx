"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import CreateCategory from "./Services-classes-nav/category/components/CreateCategory";
import {
  FiCalendar,
  FiHome,
  FiList,
  FiMessageSquare,
  FiSettings,
  FiMenu,
  FiPlus,
  FiChevronUp,
  FiChevronDown,
  FiUser,
  FiUsers,
  FiShield,
  FiBook,
  FiCreditCard,
  FiFileText,
  FiBell,
  FiStar,
  FiDownload,
  FiActivity,
  FiLogOut,
  FiTag,
} from "react-icons/fi";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);

  const handleNavigation = (path: string) => {
    if (path === "/settings") {
      setIsSettingsExpanded(!isSettingsExpanded);
      setIsServicesExpanded(false);
    } else if (path === "/service-pro/Services-classes-nav") {
      setIsServicesExpanded(!isServicesExpanded);
      setIsSettingsExpanded(false);
      // Don't navigate - just toggle the sidebar
      // If you want to navigate to a specific page when opening, change this to:
      // router.push("/service-pro/services-classes-nav/dashboard"); // or whatever your main services page should be
    } else {
      router.push(path);
      setIsSidebarOpen(false);
      setIsSettingsExpanded(false);
      setIsServicesExpanded(false);
    }
  };

  const handleServicesSubNavigation = (path: string) => {
    router.push(path);
    setIsSidebarOpen(false);
    setIsServicesExpanded(false);
  };

  const handleSettingsSubNavigation = (path: string) => {
    router.push(path);
    setIsSidebarOpen(false);
  };

  const handleCreateCategory = (
    categoryName: string,
    selectedServiceIds: number[]
  ) => {
    // Handle category creation logic here
    console.log(
      "Creating category:",
      categoryName,
      "with services:",
      selectedServiceIds
    );
    // You can add API call here to create the category
    setShowCreateCategoryModal(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const sidebar = document.getElementById("sidebar");
    const settingsSidebar = document.getElementById("settings-sidebar");
    const servicesSidebar = document.getElementById("services-sidebar");
    if (
      sidebar &&
      !sidebar.contains(event.target as Node) &&
      settingsSidebar &&
      !settingsSidebar.contains(event.target as Node) &&
      servicesSidebar &&
      !servicesSidebar.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
      setIsSettingsExpanded(false);
      setIsServicesExpanded(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen || isSettingsExpanded || isServicesExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, isSettingsExpanded, isServicesExpanded]);

  // Icon components as SVGs
  const DashboardIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  const ServicesIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );

  const MessageIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );

  const SettingsIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.05a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );

  const MenuIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );

  //Announcement Icon
  const AnnouncementIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.19 14,4.29 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21" />
    </svg>
  );

  // Services panel icons
  const PlusIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  const ChevronUpIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="18,15 12,9 6,15" />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6,9 12,15 18,9" />
    </svg>
  );

  // Settings sub-menu icons (filled versions)
  const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );

  const UsersIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.83 2.44A2 2 0 0 0 15 14v8h2v-3.5h1V22h2zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm1.5 2h-2C3.12 8 2 9.12 2 11.5V22h2v-3.5h1V22h2v-8c0-1.1-.9-2-2-2z" />
    </svg>
  );

  const ShieldIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
    </svg>
  );

  const BookIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
  );

  const CreditCardIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
    </svg>
  );

  const FileTextIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
    </svg>
  );

  const BellIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.19 14,4.29 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21" />
    </svg>
  );

  const StarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
    </svg>
  );

  const DownloadIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
    </svg>
  );

  const ActivityIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 5.5C16.61 5.5 17.5 4.61 17.5 3.5S16.61 1.5 15.5 1.5 13.5 2.39 13.5 3.5 14.39 5.5 15.5 5.5M9.89 19.38L10.89 15L13 17.11L16.39 13.72L17.81 15.14L13 19.95L9.89 19.38M14.3 10.9L11.38 8L9.31 8.07L8.1 12.7L9.63 14.23L11 11L12.5 12.5L14.3 10.9M8.5 5.5C9.61 5.5 10.5 4.61 10.5 3.5S9.61 1.5 8.5 1.5 6.5 2.39 6.5 3.5 7.39 5.5 8.5 5.5M7.31 8L5.27 8.07L4.06 12.7L7.83 17.2L9.36 15.67L6.5 12.5L7.31 8Z" />
    </svg>
  );

  const LogOutIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
    </svg>
  );

  const menuItems = [
    { path: "/service-pro", icon: DashboardIcon, label: "Dashboard" },
    { path: "/calendar", icon: CalendarIcon, label: "Calendar" },
    {
      path: "/service-pro/Services-classes-nav",
      icon: ServicesIcon,
      label: "Services",
    },
    { path: "/messages", icon: MessageIcon, label: "Messages" },
    { path: "/settings", icon: SettingsIcon, label: "Settings" },
  ];

  const settingsMenuItems = [
    {
      section: "PROFILE",
      items: [
        {
          path: "/service-pro/settings-nav/brand",
          icon: UserIcon,
          label: "Your brand",
        },
        { path: "/settings/profile", icon: UserIcon, label: "Your profile" },
        {
          path: "/service-pro/settings-nav/employees",
          icon: UsersIcon,
          label: "Employees",
        },
        { path: "/settings/services", icon: UserIcon, label: "Services" },
        {
          path: "/service-pro/settings-nav/general",
          icon: UserIcon,
          label: "General",
        },
      ],
    },
    {
      section: "ACCOUNT CONFIGURATION",
      items: [
        {
          path: "/service-pro/settings-nav/security",
          icon: ShieldIcon,
          label: "Security ",
        },
      ],
    },
    {
      section: "MANAGE",
      items: [
        {
          path: "/service-pro/settings-nav/booking",
          icon: BookIcon,
          label: "Booking page",
        },
        {
          path: "/service-pro/settings-nav/payment",
          icon: CreditCardIcon,
          label: "Payment",
        },
        {
          path: "/service-pro/settings-nav/report",
          icon: FileTextIcon,
          label: "Report",
        },
        {
          path: "/service-pro/settings-nav/billing",
          icon: CreditCardIcon,
          label: "Billing",
        },
        {
          path: "/service-pro/settings-nav/promotions",
          icon: AnnouncementIcon,
          label: "Promotions",
        },
        {
          path: "/service-pro/settings-nav/notification-nav",
          icon: BellIcon,
          label: "Notification",
        },
        {
          path: "/service-pro/settings-nav/reviews",
          icon: StarIcon,
          label: "Reviews",
        },
        {
          path: "/service-pro/settings-nav/messages",
          icon: StarIcon,
          label: "Messages",
        },
      ],
    },
    {
      section: "OTHERS",
      items: [
        { path: "/settings/download", icon: DownloadIcon, label: "Download" },
        {
          path: "/service-pro/settings-nav/amenities",
          icon: DownloadIcon,
          label: "Amenities",
        },
        {
          path: "/service-pro/settings-nav/activity",
          icon: ActivityIcon,
          label: "Activity",
        },
        {
          path: "/service-pro/settings-nav/refer",
          icon: UsersIcon,
          label: "Refer a friend",
        },
      ],
    },
  ];

  // Services panel states
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const [serviceExpanded, setServiceExpanded] = useState(true);
  const [timeSlotExpanded, setTimeSlotExpanded] = useState(true);
  const [appointmentExpanded, setAppointmentExpanded] = useState(true);

  // Modal state
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-[60] md:z-auto p-2 bg-white rounded-lg shadow-lg md:hidden"
      >
        <FiMenu size={20} />
      </button>

      {/* Mobile Overlay */}
      {(isSidebarOpen || isSettingsExpanded || isServicesExpanded) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[55] md:hidden"
          onClick={() => {
            setIsSidebarOpen(false);
            setIsSettingsExpanded(false);
            setIsServicesExpanded(false);
          }}
        />
      )}

      {/* Main Sidebar */}
      <div
        id="sidebar"
        className={`fixed left-0 top-0 h-screen w-64 bg-white/95 backdrop-blur-md border-r border-gray-200/50 shadow-xl z-[55] md:z-auto transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 p-6`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/50">
          <div className="flex items-center space-x-3 text-gray-800">
            <div className="w-8 h-8 bg-secondary-500 rounded-lg flex items-center justify-center">
              <FiUsers size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold">Service Dashboard</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col items-stretch space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive =
              pathname === item.path ||
              (item.path === "/settings" && pathname.startsWith("/settings")) ||
              (item.path === "/service-pro/Services-classes-nav" &&
                pathname.startsWith("/service-pro/Services-classes-nav"));
            const isSettings = item.path === "/settings";
            const isServices =
              item.path === "/service-pro/Services-classes-nav";

            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-left group ${
                  isActive
                    ? "bg-secondary-50 text-secondary-700 font-semibold shadow"
                    : "text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:shadow"
                }`}
                title={item.label}
              >
                <span
                  className={`text-lg transition-all duration-300 ${
                    isActive
                      ? "text-secondary-600"
                      : "text-gray-500 group-hover:text-primary-500"
                  }`}
                >
                  <IconComponent />
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom Actions */}
      <div className="fixed left-0 bottom-0 w-64 p-6 pb-8 bg-white/0 z-[55] md:z-auto space-y-4">
        {/* Switch to User Dashboard */}
        {/* <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200/50 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">
              Switch Mode
            </span>
            <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full font-medium">
              Available
            </span>
          </div>
          <button
            type="button"
            onClick={() => router.push("/profile/dashboard")}
            className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-primary-200/50 hover:border-primary-400 hover:bg-primary-50 transition-all duration-300 group shadow-sm hover:shadow-md"
          >
            <div className="flex items-center space-x-2">
              <FiUser className="text-lg text-primary-600" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">
                User Dashboard
              </span>
            </div>
            <div className="text-primary-600 text-lg transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </div>
          </button>
        </div> */}

        <button
          onClick={() => handleSettingsSubNavigation("/settings/logout")}
          className="w-full flex items-center justify-center space-x-3 py-3 px-4 border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary-600 font-semibold rounded-xl transition-all duration-300 text-sm hover:shadow-lg"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>

      {/* Services Expanded Sidebar */}
      {isServicesExpanded && (
        <div
          id="services-sidebar"
          className="fixed left-64 top-0  mt-24 h-screen w-80 bg-white shadow-lg z-[56] transform transition-transform duration-300 ease-in-out translate-x-0"
        >
          {/* Services Header */}
          <div className="flex items-center h-16 px-6 border-b border-gray-100">
            <FiList />
            <h2 className="ml-3 text-base font-semibold text-gray-900">
              Services & classes
            </h2>
          </div>

          {/* Services Menu */}
          <div className="py-6 overflow-y-auto h-[calc(100vh-10rem)] px-6">
            {/* Category Section */}
            <div className="mb-6">
              <button
                onClick={() => setCategoryExpanded(!categoryExpanded)}
                className="flex items-center justify-between w-full py-3 text-left border-l-4 border-blue-500 pl-4 hover:bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-700">
                  Category
                </span>
                {categoryExpanded ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {categoryExpanded && (
                <div className="mt-3 ml-4">
                  <button
                    onClick={() => setShowCreateCategoryModal(true)}
                    className="flex items-center text-gray-500 hover:text-gray-700 py-2"
                  >
                    <FiPlus />
                    <span className="ml-3 text-xs">New class category</span>
                  </button>
                </div>
              )}
            </div>

            {/* Service Section */}
            <div className="mb-6">
              <button
                onClick={() => setServiceExpanded(!serviceExpanded)}
                className="flex items-center justify-between w-full py-3 text-left border-l-4 border-blue-500 pl-4 hover:bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-700">
                  Service
                </span>
                {serviceExpanded ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {serviceExpanded && (
                <div className="mt-3 ml-4">
                  <button
                    onClick={() =>
                      handleServicesSubNavigation(
                        "/service-pro/Services-classes-nav/services"
                      )
                    }
                    className="flex items-center text-gray-500 hover:text-gray-700 py-2"
                  >
                    <FiPlus />
                    <span className="ml-3 text-xs">New service</span>
                  </button>
                </div>
              )}
            </div>

            {/* Time Slot Section */}
            <div className="mb-6">
              <button
                onClick={() => setTimeSlotExpanded(!timeSlotExpanded)}
                className="flex items-center justify-between w-full py-3 text-left border-l-4 border-green-500 pl-4 hover:bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-700">
                  Time Slot
                </span>
                {timeSlotExpanded ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {timeSlotExpanded && (
                <div className="mt-3 ml-4 space-y-2">
                  <button
                    onClick={() =>
                      handleServicesSubNavigation(
                        "/service-pro/Services-classes-nav/time-slot/auto"
                      )
                    }
                    className="flex items-center text-gray-500 hover:text-gray-700 py-2"
                  >
                    <FiPlus />
                    <span className="ml-3 text-xs">
                      Auto generate time slot
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      handleServicesSubNavigation(
                        "/service-pro/Services-classes-nav/time-slot"
                      )
                    }
                    className="flex items-center text-gray-500 hover:text-gray-700 py-2"
                  >
                    <FiPlus />
                    <span className="ml-3 text-xs">
                      Custom generate time slot
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Appointment Section */}
            <div className="mb-6">
              <button
                onClick={() => setAppointmentExpanded(!appointmentExpanded)}
                className="flex items-center justify-between w-full py-3 text-left border-l-4 border-green-500 pl-4 hover:bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-700">
                  Appointment
                </span>
                {appointmentExpanded ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {appointmentExpanded && (
                <div className="mt-3 ml-4">
                  <button
                    onClick={() =>
                      handleServicesSubNavigation(
                        "/service-pro/Services-classes-nav/appointment"
                      )
                    }
                    className="flex items-center text-gray-500 hover:text-gray-700 py-2"
                  >
                    <FiPlus />
                    <span className="ml-3 text-xs">New appointment</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Settings Expanded Sidebar */}
      {isSettingsExpanded && (
        <div
          id="settings-sidebar"
          className="fixed left-64 top-0 mt-24 h-screen w-64 bg-white shadow-lg z-[56] transform transition-transform duration-300 ease-in-out translate-x-0"
        >
          {/* Settings Header */}
          <div className="flex items-center h-16 px-6 border-b border-gray-100">
            <FiSettings size={20} />
            <h2 className="ml-3 text-lg font-semibold text-gray-900">
              Settings
            </h2>
          </div>

          {/* Settings Menu */}
          <div className="py-4 overflow-y-auto h-[calc(100vh-10rem)]">
            {settingsMenuItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-6">
                <h3 className="px-6 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.section}
                </h3>
                <div className="space-y-0">
                  {section.items.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = pathname === item.path;

                    return (
                      <button
                        key={item.path}
                        onClick={() => handleSettingsSubNavigation(item.path)}
                        className={`w-full flex items-center px-6 py-3 text-sm transition-colors duration-200 ${
                          isActive
                            ? "bg-green-50 text-green-600 border-r-2 border-green-600"
                            : "text-[#717477] hover:bg-gray-50"
                        }`}
                      >
                        <IconComponent />
                        <span className="ml-3">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSettingsExpanded
            ? "ml-[30rem]"
            : isServicesExpanded
            ? "ml-[36rem]"
            : "ml-64"
        }`}
      >
        <main className="p-6">{children}</main>
      </div>

      {/* Create Category Modal */}
      <CreateCategory
        isOpen={showCreateCategoryModal}
        onClose={() => setShowCreateCategoryModal(false)}
        onSubmit={handleCreateCategory}
      />
    </div>
  );
};

export default SidebarLayout;
