"use client";

import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiBookmark,
  FiCalendar,
  FiClock,
  FiMenu,
  FiLogOut,
  FiUsers,
  FiUser,
  FiSettings,
  FiX,
  FiArrowLeft,
  FiLock,
} from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";

// ─── Static Mock User ──────────────────────────────────────────────────────

const STATIC_USER = {
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
  businessId: "biz_001", // set to null to hide the "Switch Mode" panel
};

// ─── Nav Item ─────────────────────────────────────────────────────────────

const NavItem = ({
  icon,
  label,
  isActive,
  onClick,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}) => (
  <button
    type="button"
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-left group ${
      isActive
        ? "bg-secondary text-gray-700 font-semibold shadow-lg"
        : "text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:shadow-md"
    } ${className}`}
    onClick={onClick}
  >
    <span
      className={`text-lg transition-all duration-300 ${
        isActive ? "text-gray-700" : "text-gray-500 group-hover:text-primary-500"
      }`}
    >
      {icon}
    </span>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

// ─── Section Header ────────────────────────────────────────────────────────

const SectionHeader = ({ title }: { title: string }) => (
  <div className="px-4 py-2 mb-1">
    <h3 className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
      {title}
    </h3>
  </div>
);

// ─── Sidebar Layout ────────────────────────────────────────────────────────

const UserSidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsSidebarOpen(false);
  };

  const goBack = () => {
    router.back();
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    // Static: just navigate to login
    router.push("/login");
    setIsSidebarOpen(false);
  };

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("user-sidebar");
      if (sidebar && !sidebar.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const navLinks = [
    { icon: <FiHome />, label: "Dashboard", path: "/user" },
    { icon: <FiBookmark />, label: "Bookmarks", path: "/user/bookmarks" },
    { icon: <FiCalendar />, label: "Appointments", path: "/user/appointments" },
    { icon: <FiClock />, label: "Appointments History", path: "/user/appointments-history" },
    { icon: <FiUsers />, label: "Create Business", path: "/user/create-business" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="flex items-center justify-between bg-white/95 backdrop-blur-md text-gray-800 shadow-lg border-b border-gray-200 w-full fixed top-0 left-0 z-50 md:hidden">
        <button
          type="button"
          onClick={goBack}
          className="p-4 text-xl focus:outline-none hover:text-primary-500 transition-all duration-300"
          aria-label="Go Back"
        >
          <FiArrowLeft />
        </button>
        <h1 className="p-4 text-lg font-bold text-gray-900">User Dashboard</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-4 text-2xl focus:outline-none hover:text-primary-500 transition-all duration-300"
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>

      {/* Layout Body */}
      <div className="flex w-full pt-16 md:pt-0">
        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          id="user-sidebar"
          className={`fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 bg-white/95 backdrop-blur-md p-6 border-r border-gray-200/50 shadow-xl w-64 md:sticky md:top-0 md:h-screen z-40 flex flex-col`}
        >
          {/* Sidebar Header */}
          <div className="mb-8 pb-4 border-b border-gray-200/50">
            {/* Return to Home arrow */}
            <button
              type="button"
              onClick={() => handleNavigation("/")}
              className="flex items-center space-x-2 text-gray-400 hover:text-primary-600 transition-colors duration-300 mb-4 group"
              aria-label="Return to Home"
            >
              <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-xs font-medium">Home</span>
            </button>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-gray-800">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <FiUser className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {STATIC_USER.firstname} {STATIC_USER.lastname}
                  </p>
                  <p className="text-xs text-gray-500">{STATIC_USER.email}</p>
                </div>
              </div>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 md:hidden transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FiX className="text-xl" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 flex-1 overflow-y-auto">
            {navLinks.map((link) => (
              <NavItem
                key={link.path}
                icon={link.icon}
                label={link.label}
                isActive={pathname === link.path}
                onClick={() => handleNavigation(link.path)}
              />
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="mt-6 pt-6 space-y-3 border-t border-gray-200/50">
            <SectionHeader title="Account" />

            <NavItem
              icon={<FiSettings />}
              label="Settings"
              isActive={pathname === "/profile"}
              onClick={() => handleNavigation("/profile")}
            />

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold rounded-xl transition-all duration-300 text-sm hover:shadow-lg"
            >
              <FiLogOut className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:ml-0 pt-4 md:pt-6 bg-gray-50 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserSidebarLayout;