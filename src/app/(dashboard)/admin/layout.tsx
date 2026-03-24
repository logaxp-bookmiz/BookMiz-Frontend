"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaGlobe,
  FaUsers,
  FaUserShield,
  FaCreditCard,
  FaComments,
  FaKey,
  FaSignOutAlt,
  FaCog,
  FaTags,
  FaStar,
  FaBars,
  FaTimes,
  FaArrowLeft,
  FaChevronDown,
  FaChevronRight,
  FaCalendarAlt,
  FaTachometerAlt,
  FaBuilding,
} from "react-icons/fa";
import { removeCookie } from "@/utils/cookie.utility";

// NavItem Component
function NavItem({
  icon,
  label,
  href,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive = href && pathname === href;

  return (
    <Link href={href || "#"} className="block">
      <div
        className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-300 group ${
          isActive
            ? "bg-primary-500 text-white font-semibold shadow-lg"
            : href
            ? "text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:shadow-md"
            : "bg-primary-100 text-primary-700 font-semibold"
        } ${className}`}
      >
        <span
          className={`text-lg transition-all duration-300 ${
            isActive
              ? "text-white"
              : "text-gray-500 group-hover:text-primary-500"
          }`}
        >
          {icon}
        </span>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
}

// Dropdown NavItem Component
function DropdownNavItem({
  icon,
  label,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Check if any child route is active
  const isChildActive = React.Children.toArray(children).some((child) => {
    if (React.isValidElement(child)) {
      return child.props.href && pathname === child.props.href;
    }
    return false;
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={className}>
      <div
        onClick={toggleDropdown}
        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 group ${
          isChildActive
            ? "bg-primary-500 text-white font-semibold shadow-lg"
            : "text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:shadow-md"
        }`}
      >
        <div className="flex items-center space-x-3">
          <span
            className={`text-lg transition-all duration-300 ${
              isChildActive
                ? "text-white"
                : "text-gray-500 group-hover:text-primary-500"
            }`}
          >
            {icon}
          </span>
          <span className="text-sm font-medium">{label}</span>
        </div>
        {isOpen ? (
          <FaChevronDown
            className={`text-sm transition-all duration-300 ${
              isChildActive
                ? "text-white"
                : "text-gray-400 group-hover:text-primary-500"
            }`}
          />
        ) : (
          <FaChevronRight
            className={`text-sm transition-all duration-300 ${
              isChildActive
                ? "text-white"
                : "text-gray-400 group-hover:text-primary-500"
            }`}
          />
        )}
      </div>

      {isOpen && (
        <div className="ml-6 mt-2 space-y-1 border-l-2 border-primary-200 pl-4">
          {children}
        </div>
      )}
    </div>
  );
}

// SubNavItem Component
function SubNavItem({
  icon,
  label,
  href,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="block">
      <div
        className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer text-sm transition-all duration-300 group ${
          isActive
            ? "bg-primary-100 text-primary-700 font-semibold shadow-sm"
            : "text-gray-600 hover:bg-primary-50 hover:text-primary-600"
        } ${className}`}
      >
        <span
          className={`transition-all duration-300 ${
            isActive
              ? "text-primary-600"
              : "text-gray-400 group-hover:text-primary-500"
          }`}
        >
          {icon}
        </span>
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const goBack = () => {
    router.back();
  };

  const handleLogout = () => {
    // Remove the authentication token
    removeCookie("token");

    // Clear any other local storage or session storage if needed
    // localStorage.removeItem('user');
    // sessionStorage.clear();

    // Redirect to home page
    router.replace("/");
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="flex items-center justify-between bg-white/95 backdrop-blur-md text-gray-800 shadow-lg border-b border-gray-200 w-full fixed top-0 left-0 z-50 md:hidden">
        <button
          type="button"
          onClick={goBack}
          className="p-4 text-xl focus:outline-none hover:text-primary-500 transition-all duration-300 hover:scale-105"
          aria-label="Go Back"
        >
          <FaArrowLeft />
        </button>
        <h1 className="p-4 text-lg font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={toggleSidebar}
          className="p-4 text-2xl focus:outline-none hover:text-primary-500 transition-all duration-300 hover:scale-105"
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Main Layout Container */}
      <div className="flex w-full pt-16 md:pt-0">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 bg-white/95 backdrop-blur-md p-6 border-r border-gray-200/50 shadow-xl w-64 md:static overflow-y-auto z-40`}
        >
          <div className="flex items-center text-gray-800 text-xl font-bold mb-8 pb-4 border-b border-gray-200/50">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
              <FaTachometerAlt className="text-white text-sm" />
            </div>
            Admin Dashboard
          </div>
          <nav className="space-y-2">
            <NavItem
              icon={<FaTachometerAlt />}
              label="Overview"
              href="/admin/overview"
            />
            <NavItem icon={<FaGlobe />} label="Country" href="/admin/country" />
            <NavItem
              icon={<FaBuilding />}
              label="Company"
              href="/admin/company"
            />
            <NavItem icon={<FaUsers />} label="Users" href="/admin/users" />
            <NavItem
              icon={<FaUserShield />}
              label="Admins"
              href="/admin/admins"
            />
            <NavItem
              icon={<FaCreditCard />}
              label="Billing plans"
              href="/admin/billing"
            />
            <NavItem
              icon={<FaComments />}
              label="Messages"
              href="/admin/messages"
            />

            <NavItem
              icon={<FaKey />}
              label="Change password"
              href="/admin/resetpassword"
            />
          </nav>

          <nav className="mt-20 pt-6 border-t border-gray-200/50 space-y-2">
            <NavItem icon={<FaCog />} label="Settings" href="/admin/settings" />
            <button
              type="button"
              onClick={handleLogout}
              className="mt-6 w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl flex items-center justify-center transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:ml-0 pt-16 md:pt-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-all duration-300"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default AdminLayout;
