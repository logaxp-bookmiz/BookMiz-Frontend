"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

type AccountType = "Admin" | "Company" | "Employee";

interface Account {
  id: string;
  name: string;
  company: string;
  type: AccountType;
}

const accounts: Account[] = [
  // Company (Admin)
  { id: "1", name: "Logaxp Super Admin", company: "", type: "Admin" },
  // Users
  { id: "2", name: "ABC Company", company: "Inc", type: "Company" },
  { id: "3", name: "ABC Company", company: "Inc", type: "Company" },
  { id: "4", name: "ABC Company", company: "Inc", type: "Company" },
  // Employees
  { id: "5", name: "ABC Company", company: "Inc", type: "Employee" },
  { id: "6", name: "ABC Company", company: "Inc", type: "Employee" },
];

const badgeStyles: Record<AccountType, string> = {
  Admin: "bg-indigo-600 text-white",
  Company: "bg-[#c2d8cc] text-black",
  Employee: "bg-indigo-100 text-indigo-700",
};

function AccountCard({ account, onClick }: { account: Account; onClick: () => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-indigo-400 hover:shadow-md transition-all duration-200 cursor-pointer group">
      {/* Badge */}
      <div className="flex justify-end mb-3">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeStyles[account.type]}`}>
          {account.type}
        </span>
      </div>

      {/* Avatar + Name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm leading-tight">{account.name}</p>
          {account.company && <p className="text-gray-500 text-sm">{account.company}</p>}
        </div>
      </div>

      {/* Continue */}
      <button
        onClick={onClick}
        className="flex items-center gap-1 text-indigo-600 font-semibold text-sm group-hover:gap-2 transition-all duration-200"
      >
        Continue
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
}

export default function PreDashboard() {
  const router = useRouter();
  const [closing, setClosing] = useState(false);

  const adminAccounts = accounts.filter((a) => a.type === "Admin");
  const userAccounts = accounts.filter((a) => a.type === "Company");
  const employeeAccounts = accounts.filter((a) => a.type === "Employee");

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => router.push("/"), 300);
  };

  const handleContinue = (account: Account) => {
    // Navigate based on account type
    if (account.type === "Admin") {
      router.push("/admin");
    } else if (account.type === "Company") {
      router.push("/user");
    } else {
      router.push("/employee");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Modal */}
      <div
        className={`bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-8 relative transition-all duration-300 ${
          closing ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#211658] mb-1">Pre-Dashboard</h1>
          <p className="text-gray-500 text-sm">Which account do you want to access?</p>
        </div>

        {/* Company Section */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Company</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {adminAccounts.map((account) => (
              <AccountCard key={account.id} account={account} onClick={() => handleContinue(account)} />
            ))}
          </div>
        </div>

        {/* Users Section */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-700 mb-3">
            Users ({userAccounts.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {userAccounts.map((account) => (
              <AccountCard key={account.id} account={account} onClick={() => handleContinue(account)} />
            ))}
          </div>
        </div>

        {/* Employee Section */}
        <div>
          <h2 className="text-base font-semibold text-gray-700 mb-3">
            Employee ({employeeAccounts.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {employeeAccounts.map((account) => (
              <AccountCard key={account.id} account={account} onClick={() => handleContinue(account)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}