"use client"

import React, { useState } from 'react';
import { X, User, Users } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  deposit: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
  onBookingTypeSelect: (bookingType: 'self' | 'third-party', service: Service) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  service,
  onBookingTypeSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Book Service</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Service Info */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">{service.name}</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Price: ${service.price}.00</p>
            <p>Duration: {service.duration}</p>
            <p>Deposit: ${service.deposit}</p>
          </div>
        </div>

        {/* Booking Options */}
        <div className="space-y-3 mb-6">
          <p className="text-gray-700 font-medium mb-4">
            Who are you booking this service for?
          </p>

          <button
            onClick={() => onBookingTypeSelect('self', service)}
            className="w-full flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mr-4 group-hover:bg-blue-200">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900">For Myself</h4>
              <p className="text-sm text-gray-600">Book this service for yourself</p>
            </div>
          </button>

          <button
            onClick={() => onBookingTypeSelect('third-party', service)}
            className="w-full flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mr-4 group-hover:bg-green-200">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900">For Someone Else</h4>
              <p className="text-sm text-gray-600">Book this service for a third party</p>
            </div>
          </button>
        </div>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const BookingPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services: Service[] = [
    { id: '1', name: 'Craw cut', price: 200, duration: '45 Mins', deposit: 10 },
    { id: '2', name: 'Mohawk', price: 200, duration: '45 Mins', deposit: 10 },
  ];

  const handleBookClick = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleBookingTypeSelect = (bookingType: 'self' | 'third-party', service: Service) => {
    console.log(`Booking ${service.name} for ${bookingType}`);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Title */}
      <div className="text-right text-gray-600 text-sm py-3 pr-4 border-b border-gray-200">
        Title: Bookmark
      </div>

      <div className="p-6 space-y-10">
        {[1, 2].map((section) => (
          <div key={section} className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-extrabold text-[#0E1E3D]">Telesvade</h1>
              <p className="text-gray-600 text-sm">
                No. 24 Ajengunle Street, Leventis, coca cola, Ibadan, Oyo State, Nigeria
              </p>
            </div>

            {/* Services */}
            {services.map((service) => (
           <div
    key={`${section}-${service.id}`}
    className="flex items-center space-x-2"
  >
    {/* Price */}
    <div className="flex-1 border border-gray-200 rounded-md px-4 py-3">
      <p className="text-xs text-primary-500 font-medium">Price</p>
      <p className="text-base font-bold text-gray-900">
        ${service.price}.00
      </p>
    </div>

    {/* Duration */}
    <div className="flex-1 border border-gray-200 rounded-md px-4 py-3">
      <p className="text-xs text-primary-500 font-medium">Duration</p>
      <p className="text-base font-semibold text-gray-900">
        {service.duration}
      </p>
    </div>

    {/* Deposit */}
    <div className="flex-1 border border-gray-200 rounded-md px-4 py-3">
      <p className="text-xs text-primary-500 font-medium">Deposit</p>
      <p className="text-base font-semibold text-gray-900">
        ${service.deposit}
      </p>
    </div>

    {/* Book button */}
    <button
      onClick={() => handleBookClick(service)}
      className="flex-1 bg-[#001F54] text-white py-3 rounded-md font-medium hover:bg-[#001940] transition-colors"
    >
      Book
    </button>
  </div>
            ))}
          </div>
        ))}
      </div>

      {selectedService && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          service={selectedService}
          onBookingTypeSelect={handleBookingTypeSelect}
        />
      )}
    </div>
  );
};

export default BookingPage;
