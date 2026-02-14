"use client";

import React, { useState, useEffect } from "react";
import { FiFilter, FiSearch, FiX, FiMapPin, FiClock, FiStar, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import FilterModal from "@/components/features/marketplace/Filtermodal";
import Navbar from "@/components/layout/Navbar"; // Add this import
import { SelectedPage } from "@/components/ui/types"; // Add this import


// Static data
const STATIC_SERVICES = [
  {
    id: "1",
    name: "Luxe Beauty Studio",
    address: "Victoria Island, Lagos, Nigeria",
    rating: 4.8,
    reviewCount: 127,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop",
    featured: true,
    services: [
      {
        id: 101,
        name: "Signature Facial Treatment",
        price: "NGN 25,000.00",
        duration: "60min",
        description: "Deep cleansing facial with collagen mask and facial massage",
      },
      {
        id: 102,
        name: "Luxury Manicure & Pedicure",
        price: "NGN 15,000.00",
        duration: "90min",
        description: "Premium nail care with spa treatment and gel polish",
      },
    ],
  },
  {
    id: "2",
    name: "Elite Barber Lounge",
    address: "Ikeja GRA, Lagos, Nigeria",
    rating: 4.9,
    reviewCount: 203,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop",
    featured: true,
    services: [
      {
        id: 201,
        name: "Executive Haircut & Styling",
        price: "NGN 8,500.00",
        duration: "45min",
        description: "Premium cut with hot towel treatment and styling",
      },
      {
        id: 202,
        name: "Royal Shave Experience",
        price: "NGN 6,000.00",
        duration: "30min",
        description: "Traditional straight razor shave with pre-shave oil",
      },
    ],
  },
  {
    id: "3",
    name: "Wellness Spa & Massage",
    address: "Lekki Phase 1, Lagos, Nigeria",
    rating: 4.7,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop",
    featured: false,
    services: [
      {
        id: 301,
        name: "Swedish Full Body Massage",
        price: "NGN 35,000.00",
        duration: "90min",
        description: "Relaxing full body massage with aromatherapy oils",
      },
      {
        id: 302,
        name: "Deep Tissue Therapy",
        price: "NGN 40,000.00",
        duration: "75min",
        description: "Therapeutic massage targeting muscle tension",
      },
    ],
  },
  {
    id: "4",
    name: "Glam Hair Studio",
    address: "Surulere, Lagos, Nigeria",
    rating: 4.6,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&auto=format&fit=crop",
    featured: false,
    services: [
      {
        id: 401,
        name: "Braiding & Cornrows",
        price: "NGN 12,000.00",
        duration: "180min",
        description: "Professional African braiding styles",
      },
      {
        id: 402,
        name: "Silk Press Treatment",
        price: "NGN 18,000.00",
        duration: "120min",
        description: "Heat styling with keratin treatment",
      },
    ],
  },
  {
    id: "5",
    name: "The Nail Boutique",
    address: "Yaba, Lagos, Nigeria",
    rating: 4.5,
    reviewCount: 92,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop",
    featured: false,
    services: [
      {
        id: 501,
        name: "Acrylic Full Set",
        price: "NGN 20,000.00",
        duration: "120min",
        description: "Custom acrylic nails with design",
      },
      {
        id: 502,
        name: "Gel Manicure",
        price: "NGN 8,000.00",
        duration: "45min",
        description: "Long-lasting gel polish application",
      },
    ],
  },
];

const MarketPlace = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredServices, setFilteredServices] = useState(STATIC_SERVICES);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [filters, setFilters] = useState({
    priceRange: "all",
    rating: "all",
    location: "all",
  });
  
  // Add state for Navbar
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Marketplace);
  const [isScrolled, setIsScrolled] = useState(false);

  const categories = ["All", "Beauty", "Barbering", "Wellness", "Hair", "Nails"];

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  // Handle scroll for sticky filter bar AND navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsFilterVisible(window.scrollY > 100);
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter services
  useEffect(() => {
    let result = STATIC_SERVICES;

    // Search filter
    if (searchQuery.trim()) {
      result = result.filter(
        (pro) =>
          pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pro.services.some((s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Rating filter
    if (filters.rating !== "all") {
      const minRating = parseFloat(filters.rating);
      result = result.filter((pro) => pro.rating >= minRating);
    }

    setFilteredServices(result);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [searchQuery, filters]);

  const activeFilterCount = Object.values(filters).filter((v) => v !== "all").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add Navbar */}
      <Navbar 
        selectedPage={selectedPage} 
        setSelectedPage={setSelectedPage}
        isScrolled={isScrolled}
      />

      {/* Hero Section with Background Image - Add top padding to account for fixed navbar */}
      <div className="relative h-72 overflow-hidden mt-16 sm:mt-20">
        <img
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&auto=format&fit=crop"
          alt="Marketplace Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Discover Your Next
            <span className="block text-yellow-300">
              Beauty Experience
            </span>
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl">
            Connect with top-rated professionals in your area
          </p>
        </div>
      </div>

      {/* Search and Category Bar */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search for services or professionals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-primary-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX className="text-xl" />
                </button>
              )}
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all font-medium relative"
            >
              <FiFilter className="text-lg" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 mt-5 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-primary-500 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div
        className={`sticky top-16 sm:top-20 w-full bg-white/95 backdrop-blur-lg shadow-lg z-40 transition-all duration-300 border-b border-gray-200 ${
          isFilterVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors relative"
            >
              <FiFilter />
              <span className="font-medium">Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-semibold text-sm shadow-lg">
              {filteredServices.length} {filteredServices.length === 1 ? "service" : "services"}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="mb-8 flex items-center flex-wrap gap-3">
            <span className="text-sm font-semibold text-gray-700">Active Filters:</span>
            {Object.entries(filters).map(([key, value]) => {
              if (value === "all") return null;
              return (
                <span
                  key={key}
                  className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                >
                  {key}: {value}
                  <button
                    onClick={() => setFilters((prev) => ({ ...prev, [key]: "all" }))}
                    className="ml-2 hover:text-primary-900"
                  >
                    <FiX size={16} />
                  </button>
                </span>
              );
            })}
            <button
              onClick={() => setFilters({ priceRange: "all", rating: "all", location: "all" })}
              className="text-sm text-primary-600 hover:text-primary-800 font-semibold"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Service Cards */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <FiSearch className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">No Services Found</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              {searchQuery.trim()
                ? `We couldn't find any services matching "${searchQuery}"`
                : "No services match your selected filters"}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilters({ priceRange: "all", rating: "all", location: "all" });
              }}
              className="px-8 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 font-semibold transition-all"
            >
              Clear Search & Filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {currentServices.map((professional, index) => (
              <div
                key={professional.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-2/5 w-full relative h-64 md:h-96 overflow-hidden">
                    <img
                      src={professional.image}
                      alt={professional.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {professional.featured && (
                      <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-bold shadow-lg">
                        ⭐ RECOMMENDED
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <FiStar className="text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-sm">{professional.rating}</span>
                        <span className="text-gray-500 text-xs">({professional.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:w-3/5 w-full p-4 sm:p-6 lg:p-8 flex flex-col">
                    <div className="mb-4 md:mb-6">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                        {professional.name}
                      </h2>
                      <div className="flex items-center text-gray-500">
                        <FiMapPin className="mr-2 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{professional.address}</span>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="space-y-3 sm:space-y-4 flex-1">
                      {professional.services.map((service) => (
                        <div
                          key={service.id}
                          className="flex flex-col sm:flex-row sm:justify-between sm:items-start p-3 sm:p-4 rounded-xl bg-white hover:bg-gray-50 transition-colors border border-gray-200 gap-3 sm:gap-0"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">
                              {service.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2">{service.description}</p>
                            <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <FiClock className="text-gray-400" />
                                <span>{service.duration}</span>
                              </div>
                            </div>
                          </div>
                          <div className="sm:text-right sm:ml-6 flex sm:flex-col items-center sm:items-end justify-between sm:justify-start">
                            <p className="text-xl sm:text-2xl font-bold text-gray-900 sm:mb-3">
                              {service.price}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                alert(`Booking ${service.name} at ${professional.name}`);
                              }}
                              className="px-4 sm:px-6 py-2 sm:py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2 group text-sm sm:text-base whitespace-nowrap"
                            >
                              Book Now
                              <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredServices.length > 0 && totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              <FiChevronLeft />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                    currentPage === page
                      ? "bg-primary-500 text-white shadow-lg"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              <span className="hidden sm:inline">Next</span>
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MarketPlace;