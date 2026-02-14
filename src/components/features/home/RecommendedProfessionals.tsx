"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiInfo } from "react-icons/fi";
import { FaThumbsUp, FaCar, FaTag } from "react-icons/fa";

const Recommended: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFirstClick, setIsFirstClick] = useState<boolean>(false);
  const [imagesPerSlide, setImagesPerSlide] = useState<number>(4);

  // ✅ Mocked data (replaces API)
const recommendedProfessionals = [
  {
    business: {
      name: "AutoFix Garage",
      city: "Lagos",
      state: "Lagos",
      photo:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      averageRating: 4.5,
      reviews: [1, 2, 3, 4],
    },
  },
  {
    business: {
      name: "Prime Mechanics",
      city: "Abuja",
      state: "FCT",
      photo:
        "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1200&auto=format&fit=crop",
      averageRating: 4.2,
      reviews: [1, 2],
    },
  },
  {
    business: {
      name: "Speed Motors",
      city: "Ibadan",
      state: "Oyo",
      photo:
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop",
      averageRating: 4.8,
      reviews: [1, 2, 3, 4, 5],
    },
  },
  {
    business: {
      name: "Elite Auto Care",
      city: "Port Harcourt",
      state: "Rivers",
      photo:
        "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=1200&auto=format&fit=crop",
      averageRating: 4.0,
      reviews: [1],
    },
  },
];

  const isLoadingHomepageServices = false;

  useEffect(() => {
    const updateImagesPerSlide = () => {
      if (window.innerWidth < 640) {
        setImagesPerSlide(2);
      } else if (window.innerWidth < 1024) {
        setImagesPerSlide(3);
      } else {
        setImagesPerSlide(4);
      }
    };

    updateImagesPerSlide();
    window.addEventListener("resize", updateImagesPerSlide);

    return () => {
      window.removeEventListener("resize", updateImagesPerSlide);
    };
  }, []);

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === recommendedProfessionals.length - imagesPerSlide
        ? 0
        : prevIndex + 1
    );
    setIsFirstClick(true);
  };

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? recommendedProfessionals.length - imagesPerSlide
        : prevIndex - 1
    );
  };

  return (
    <div className="w-full flex flex-col items-center mt-6 sm:mt-12 lg:mt-24 px-3 sm:px-4 lg:px-0">
      <div className="w-full max-w-[1250px] mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-left">
          Recommended Professionals
        </h2>
      </div>

      <div className="w-full max-w-[1300px] flex items-center relative">
        <div className="flex overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / imagesPerSlide)
              }%)`,
            }}
          >
            {recommendedProfessionals.map((professional, index) => (
              <div
                key={index}
                className="min-w-[50%] sm:min-w-[33.333%] lg:min-w-[25%] px-1 sm:px-2 mt-2 sm:mt-4 flex flex-col items-center"
              >
                <div className="w-full bg-white rounded-lg sm:rounded-xl p-1 sm:p-2 relative shadow-sm">
                  <div className="relative w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden">
                    <Image
                      src={professional.business.photo}
                      alt={professional.business.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-md">
                    <p className="text-xs font-bold">
                      {professional.business.averageRating.toFixed(1)}
                    </p>
                    <p className="text-[10px]">
                      {professional.business.reviews.length} reviews
                    </p>
                  </div>

                  <div className="mt-2 text-left px-1">
                    <p className="text-sm font-semibold">
                      {professional.business.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {professional.business.city},{" "}
                      {professional.business.state}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isLoadingHomepageServices && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default Recommended;