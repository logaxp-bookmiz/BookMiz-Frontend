import React, { useState } from "react";
import { FiX, FiDownload } from "react-icons/fi";

interface ImportCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (method: "csv" | "google") => void;
}

const ImportCustomerModal: React.FC<ImportCustomerModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<"csv" | "google" | null>(
    null
  );

  const handleClose = () => {
    setSelectedMethod(null);
    onClose();
  };

  const handleContinue = () => {
    if (selectedMethod) {
      onImport(selectedMethod);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6">
          <div className="w-6"></div> {/* Spacer for balance */}
          <h2 className="text-xl font-bold text-gray-900">Import customer?</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-6 pb-6">
          <p className="text-sm text-gray-600 mb-6 text-center">
            Choose how you want to import your contact
          </p>

          {/* Import Options */}
          <div className="space-y-3 mb-6">
            {/* CSV File Option */}
            <button
              onClick={() => setSelectedMethod("csv")}
              className={`w-full flex items-center p-4 border-2 rounded-lg transition-colors ${
                selectedMethod === "csv"
                  ? "border-secondary bg-secondary/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mr-4">
                <FiDownload size={20} className="text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">
                CSV File
              </span>
            </button>

            {/* Google Contacts Option */}
            <button
              onClick={() => setSelectedMethod("google")}
              className={`w-full flex items-center p-4 border-2 rounded-lg transition-colors ${
                selectedMethod === "google"
                  ? "border-secondary bg-secondary/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-lg mr-4">
                <div className="w-6 h-6 relative">
                  {/* Google G Logo */}
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900">
                Google contacts
              </span>
            </button>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedMethod}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              selectedMethod
                ? "bg-secondary text-white hover:bg-secondary/90"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportCustomerModal;
