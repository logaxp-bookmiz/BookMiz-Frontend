"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import useMediaQuery from "@/hooks/useMediaQuery";
import { motion } from "framer-motion";
import Image from "next/image";

const Home = () => {
  const router = useRouter();
  const isAboveMediumScreens = useMediaQuery("(min-width:1000px)");
  const isTablet = useMediaQuery("(min-width:768px) and (max-width:1023px)");
  const isMobile = useMediaQuery("(max-width:767px)");

  const searchBoxRef = useRef<HTMLFormElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);
  const [searchBoxWidth, setSearchBoxWidth] = useState<string>("100%");
  const [isSearchBoxFocused, setIsSearchBoxFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Banner images array - service-related images
  const bannerImages = [
    "/banner2.png",
    "/banner.png",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  ];

  // Static categories data
  const categories = [
    "Barber",
    "Hair Salon",
    "Spa",
    "Massage",
    "Nail Salon",
    "Beauty Salon",
    "Fitness Center",
    "Dental Clinic",
    "Auto Repair",
    "Home Cleaning",
    "Tutoring",
    "Pet Grooming",
    "Photography",
    "Catering",
    "Event Planning",
  ];

  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % bannerImages.length,
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  useEffect(() => {
    if (isAboveMediumScreens) {
      setSearchBoxWidth("900px");
    } else if (isTablet) {
      setSearchBoxWidth("95%");
    } else {
      setSearchBoxWidth("100%");
    }

    const handleResize = () => {
      if (isAboveMediumScreens) {
        setSearchBoxWidth("900px");
      } else if (isTablet) {
        setSearchBoxWidth("95%");
      } else {
        setSearchBoxWidth("100%");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isAboveMediumScreens, isTablet]);

  const handleServiceClick = (service: string) => {
    setSearchValue(service);
    setIsSearchBoxFocused(false);
    setShowAllCategories(false);
    router.push(`/market-place?search=${encodeURIComponent(service)}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim().length >= 2) {
      router.push(`/market-place?search=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleMoreClick = () => {
    setShowAllCategories(!showAllCategories);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close search dropdown if clicking outside
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setIsSearchBoxFocused(false);
      }

      // Close categories dropdown if clicking outside
      if (
        categoriesDropdownRef.current &&
        !categoriesDropdownRef.current.contains(event.target as Node)
      ) {
        setShowAllCategories(false);
      }
    };

    if (isSearchBoxFocused || showAllCategories) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchBoxFocused, showAllCategories]);

  // Dynamic sizing based on device type
  const getContainerHeight = () => {
    if (isAboveMediumScreens) return "700px";
    if (isTablet) return "600px";
    return "500px";
  };

  const getVisibleCategoriesCount = () => {
    if (isAboveMediumScreens) return 5;
    if (isTablet) return 4;
    return 3;
  };

  return (
    <>
      <section
        id="home"
        className="relative flex flex-col items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          height: getContainerHeight(),
          padding: "20px 0",
          width: "100%",
        }}
      >
        {/* Background Images with Rotation */}
        <div className="absolute inset-0 z-[-1]">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`Banner ${index + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
            </div>
          ))}
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        <motion.div
          className="relative w-full max-w-screen-lg px-4 md:px-8 lg:px-8 text-center z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, staggerChildren: 0.2 },
            },
          }}
        >
          <motion.h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-lg leading-tight">
            Find Your Perfect Services Today
          </motion.h1>
          <motion.p className="mt-3 md:mt-4 lg:mt-4 text-base sm:text-lg md:text-xl lg:text-xl text-white drop-shadow-md">
            Discover top-notch service providers near you.
          </motion.p>

          <motion.form
            onSubmit={handleSearchSubmit}
            className="relative mx-auto mt-6 md:mt-8 lg:mt-8 flex w-full items-center"
            ref={searchBoxRef}
            style={{
              width: searchBoxWidth,
              maxWidth: isTablet
                ? "700px"
                : isAboveMediumScreens
                  ? "800px"
                  : "100%",
            }}
          >
            <FaSearch
              className={`absolute left-4 md:left-5 lg:left-6 top-1/2 -translate-y-1/2 transform text-gray-500 ${
                isMobile ? "h-4 w-4" : isTablet ? "h-5 w-5" : "h-6 w-6"
              }`}
            />
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search services here"
              className={`w-full rounded-lg focus:outline-none shadow-lg text-gray-700 transition-all duration-200 ${
                isMobile
                  ? "p-3 pl-12 pr-4 text-sm"
                  : isTablet
                    ? "p-4 pl-14 pr-4 text-base"
                    : "p-4 pl-16 pr-4 text-base"
              }`}
              onFocus={() => setIsSearchBoxFocused(true)}
            />
            {isSearchBoxFocused && (
              <div
                ref={dropdownRef}
                className="absolute z-50 mt-2 w-full rounded-lg bg-white shadow-xl border border-gray-100"
                style={{ top: "110%", left: "0" }}
              >
                <div
                  className={`border-t px-4 py-3 ${isTablet ? "px-5 py-3" : ""}`}
                >
                  <h4
                    className={`text-gray-500 ${isMobile ? "text-xs" : "text-sm"}`}
                  >
                    Popular services
                  </h4>
                  <div
                    className={`mt-2 flex flex-wrap ${isMobile ? "gap-1" : "gap-2"}`}
                  >
                    {categories
                      .slice(0, 5)
                      .map((cat: string, index: number) => (
                        <span
                          key={index}
                          className={`rounded-lg cursor-pointer border border-transparent bg-gray-100 text-black transition-colors duration-300 hover:border-green-500 hover:bg-white hover:shadow-md ${
                            isMobile
                              ? "px-2 py-1 text-xs"
                              : isTablet
                                ? "px-3 py-1.5 text-sm"
                                : "px-4 py-1.5 text-sm"
                          }`}
                          onClick={() => handleServiceClick(cat)}
                        >
                          {cat}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </motion.form>

          <motion.div
            className={`flex flex-wrap justify-center ${
              isMobile ? "mt-4 gap-2" : isTablet ? "mt-6 gap-3" : "mt-6 gap-4"
            }`}
          >
            {categories
              .slice(0, getVisibleCategoriesCount())
              .map((cat: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleServiceClick(cat)}
                  className={`rounded-full border-2 border-white text-white transition-all duration-300 hover:border-green-400 hover:bg-white hover:text-black hover:shadow-lg drop-shadow-md transform hover:scale-105 ${
                    isMobile
                      ? "px-3 py-1.5 text-sm"
                      : isTablet
                        ? "px-4 py-2 text-base"
                        : "px-5 py-2.5 text-base"
                  }`}
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  {cat}
                </button>
              ))}

            <button
              onClick={handleMoreClick}
              className={`rounded-full border-2 border-white text-white transition-all duration-300 hover:border-green-400 hover:bg-white hover:text-black hover:shadow-lg drop-shadow-md transform hover:scale-105 ${
                isMobile
                  ? "px-3 py-1.5 text-sm"
                  : isTablet
                    ? "px-4 py-2 text-base"
                    : "px-5 py-2.5 text-base"
              }`}
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(5px)",
              }}
            >
              More...
            </button>

            {showAllCategories && (
              <div
                ref={categoriesDropdownRef}
                className={`absolute z-50 mt-2 space-y-2 overflow-y-auto rounded-lg bg-white shadow-xl border border-gray-100 ${
                  isMobile
                    ? "h-48 w-full max-w-xs p-3 top-full"
                    : isTablet
                      ? "h-56 w-full max-w-lg p-4 top-full"
                      : "h-60 w-full max-w-md p-4 top-full"
                }`}
                style={{
                  left: "50%",
                  transform: "translateX(-50%)",
                  marginTop: isMobile ? "8px" : isTablet ? "12px" : "16px",
                }}
              >
                {categories
                  .slice(getVisibleCategoriesCount())
                  .map((cat: string, index: number) => (
                    <button
                      key={`more-${index}`}
                      onClick={() => handleServiceClick(cat)}
                      className={`w-full rounded-lg border border-gray-200 text-left text-gray-700 transition-all duration-300 hover:bg-green-500 hover:text-white hover:shadow-md transform hover:scale-105 ${
                        isMobile
                          ? "px-3 py-2 text-sm"
                          : isTablet
                            ? "px-4 py-2.5 text-base"
                            : "px-4 py-2 text-base"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
