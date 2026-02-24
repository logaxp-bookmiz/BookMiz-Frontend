import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SelectedPage } from "@/components/ui/types";
import ActionButton from "@/components/ui/ActionButton";
import MobileActionButton from "@/components/ui/ActionButton";
import Image from "next/image";
import { ChevronDownIcon } from "lucide-react";
import { FaBars, FaXRay } from "react-icons/fa";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  isScrolled?: boolean;
};

const Navbar = ({
  selectedPage,
  setSelectedPage,
  isScrolled: externalIsScrolled,
}: Props) => {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const [internalIsScrolled, setInternalIsScrolled] = useState<boolean>(false);
  const [internalIsAboveMediumScreens, setInternalIsAboveMediumScreens] =
    useState(false);

  // Use geolocation
  useEffect(() => {
    const getGeolocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
              );
              const data = await response.json();
              const countryCode = data.address.country_code;

              setSelectedCountry(countryCode.toUpperCase());
            } catch {}
          },
          () => {},
        );
      }
    };

    getGeolocation();
  }, []);

  // Use external isScrolled if provided, otherwise use internal state
  const isScrolled =
    externalIsScrolled !== undefined ? externalIsScrolled : internalIsScrolled;

  // Initialize client state and set up event listeners
  useEffect(() => {
    setIsClient(true);

    // Media query detection
    const checkMediaQuery = () => {
      setInternalIsAboveMediumScreens(window.innerWidth >= 1060);
    };

    // Scroll detection
    const handleScroll = () => {
      setInternalIsScrolled(window.scrollY > 50);
    };

    // Only set up event listeners on client
    if (typeof window !== "undefined") {
      checkMediaQuery();
      handleScroll();

      window.addEventListener("resize", checkMediaQuery);
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("resize", checkMediaQuery);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Safe values for SSR
  const safePathname = isClient ? pathname : "/";
  const isHomePage = safePathname === "/";
  const isAtTop = !isScrolled;

  // Use internal media query state for conditional rendering
  const isAboveMediumScreens = internalIsAboveMediumScreens;

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const handleLinkClick = (page: SelectedPage) => {
    setSelectedPage(page);
    setIsMenuToggled(false);
  };

  const navbarClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-secondary-500`;

  // Text color classes based on scroll position and page
  const textColorClass = isHomePage && isAtTop ? "text-white" : "text-white";
  const hoverColorClass =
    isHomePage && isAtTop ? "hover:text-primary-500" : "hover:text-primary-500";
  const selectedColorClass = "text-primary-500";

  // Country flag emoji mapping
  const countryFlags: { [key: string]: string } = {
    NG: "🇳🇬",
    US: "🇺🇸",
    IN: "🇮🇳",
    CN: "🇨🇳",
    GH: "🇬🇭",
  };

  return (
    <>
      <nav className={navbarClasses}>
        <div className="mx-auto w-5/6 flex items-center py-3 sm:py-4 h-16 sm:h-20">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-2">
            <Link href="/" onClick={() => handleLinkClick(SelectedPage.Home)}>
              <Image
                src="/logo.png"
                height={20}
                width={100}
                alt="Logo"
                className="w-auto h-8 sm:h-5 object-contain transition-all duration-300 hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* CENTER - NAV LINKS - Truly Centered */}
          {isAboveMediumScreens && (
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div
                className={`flex items-center gap-10 text-sm font-semibold ${textColorClass}`}
              >
                <Link
                  href="/"
                  onClick={() => handleLinkClick(SelectedPage.Home)}
                  className={`${
                    selectedPage === SelectedPage.Home ? selectedColorClass : ""
                  } transition-all duration-300 hover:scale-105 ${hoverColorClass} relative group`}
                >
                  Home
                </Link>
                <Link
                  href="/marketplace"
                  onClick={() => handleLinkClick(SelectedPage.Marketplace)}
                  className={`${
                    selectedPage === SelectedPage.Marketplace
                      ? selectedColorClass
                      : ""
                  } transition-all duration-300 hover:scale-105 ${hoverColorClass} relative group`}
                >
                  Marketplace
                </Link>
                <Link
                  href="/#pricing"
                  onClick={() => handleLinkClick(SelectedPage.Pricing)}
                  className={`${
                    selectedPage === SelectedPage.Pricing
                      ? selectedColorClass
                      : ""
                  } transition-all duration-300 hover:scale-105 ${hoverColorClass} relative group`}
                >
                  Pricing
                </Link>
              </div>
            </div>
          )}

          {/* RIGHT SIDE */}
          {isAboveMediumScreens ? (
            <div className="flex items-center gap-8 ml-auto">
              {/* Auth Actions Group */}
              <div className="flex items-center gap-4">
                <a
                  href="/login"
                  className={`transition-all duration-300 hover:scale-105 ${textColorClass} ${hoverColorClass} font-medium px-3 py-2 rounded-lg hover:bg-white/10`}
                >
                  Log In
                </a>

                <ActionButton
                  className={`${
                    isAtTop
                      ? "bg-primary-500 text-white shadow-lg hover:shadow-xl"
                      : "bg-white text-primary-500 shadow-md hover:shadow-lg"
                  } transition-all duration-300 hover:scale-105`}
                  setSelectedPage={setSelectedPage}
                >
                  Get Started
                </ActionButton>
              </div>

              {/* Country Selector */}
              <div className="relative flex items-center">
                <button
                  className={`flex items-center gap-2 transition-all duration-300 ${textColorClass} hover:bg-white/10 px-3 py-2 rounded-lg group`}
                  onClick={handleDropdownToggle}
                >
                  <span className="text-xl">
                    {countryFlags[selectedCountry]}
                  </span>
                  <span className="text-sm font-medium">{selectedCountry}</span>
                  <ChevronDownIcon className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-3 w-48 bg-white/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-40 overflow-hidden">
                    <button
                      className="flex items-center w-full px-4 py-3 text-sm hover:bg-primary-500/10 hover:text-primary-500 transition-all duration-200"
                      onClick={() => handleCountrySelect("NG")}
                    >
                      <span className="text-xl mr-2">{countryFlags["NG"]}</span>
                      <span>Nigeria</span>
                    </button>
                    <button
                      className="flex items-center w-full px-4 py-3 text-sm hover:bg-primary-500/10 hover:text-primary-500 transition-all duration-200"
                      onClick={() => handleCountrySelect("US")}
                    >
                      <span className="text-xl mr-2">{countryFlags["US"]}</span>
                      <span>US</span>
                    </button>
                    <button
                      className="flex items-center w-full px-4 py-3 text-sm hover:bg-primary-500/10 hover:text-primary-500 transition-all duration-200"
                      onClick={() => handleCountrySelect("IN")}
                    >
                      <span className="text-xl mr-2">{countryFlags["IN"]}</span>
                      <span>India</span>
                    </button>
                    <button
                      className="flex items-center w-full px-4 py-3 text-sm hover:bg-primary-500/10 hover:text-primary-500 transition-all duration-200"
                      onClick={() => handleCountrySelect("CN")}
                    >
                      <span className="text-xl mr-2">{countryFlags["CN"]}</span>
                      <span>China</span>
                    </button>
                    <button
                      className="flex items-center w-full px-4 py-3 text-sm hover:bg-primary-500/10 hover:text-primary-500 transition-all duration-200"
                      onClick={() => handleCountrySelect("GH")}
                    >
                      <span className="text-xl mr-2">{countryFlags["GH"]}</span>
                      <span>Ghana</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              className="ml-auto p-2 flex items-center justify-center"
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              <FaBars
                className={`h-6 w-6 transition duration-500 ${textColorClass}`}
              />
            </button>
          )}
        </div>
      </nav>

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div
          className={`fixed right-0 top-0 h-full w-[320px] bg-secondary-500/95 backdrop-blur-md border-l border-white/10 transform transition-all duration-500 z-50`}
        >
          <div className="flex justify-end p-6">
            <button
              onClick={() => setIsMenuToggled(!isMenuToggled)}
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              <FaXRay className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="ml-8 flex flex-col gap-4 text-lg text-white">
            <Link
              href="/"
              onClick={() => handleLinkClick(SelectedPage.Home)}
              className={`${
                selectedPage === SelectedPage.Home ? selectedColorClass : ""
              } transition-all duration-300 hover:text-primary-500 hover:scale-105`}
            >
              Home
            </Link>
            <Link
              href="/market-place"
              onClick={() => handleLinkClick(SelectedPage.Marketplace)}
              className={`${
                selectedPage === SelectedPage.Marketplace
                  ? selectedColorClass
                  : ""
              } transition-all duration-300 hover:text-primary-500 hover:scale-105`}
            >
              Marketplace
            </Link>
            <Link
              href="/#pricing"
              onClick={() => handleLinkClick(SelectedPage.Pricing)}
              className={`${
                selectedPage === SelectedPage.Pricing ? selectedColorClass : ""
              } transition-all duration-300 hover:text-primary-500 hover:scale-105`}
            >
              Pricing
            </Link>

            {/* Mobile Auth Section */}
            <a
              href="/login"
              className="transition-all duration-300 hover:text-primary-500 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Log In
            </a>
            <MobileActionButton
              className="bg-white text-primary-500 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              setSelectedPage={setSelectedPage}
            >
              Get Started
            </MobileActionButton>

            {/* Mobile Country Selector */}
            <div className="relative flex items-center mt-6">
              <button
                className="flex items-center gap-2 text-white bg-transparent rounded-md px-4 py-2 w-full"
                onClick={handleDropdownToggle}
              >
                <span className="text-xl">{countryFlags[selectedCountry]}</span>
                <span className="text-sm">{selectedCountry}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-full bg-white/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-40 overflow-hidden">
                  <button
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-800 hover:bg-primary-500/10 hover:text-primary-500 transition-all duration-200"
                    onClick={() => handleCountrySelect("US")}
                  >
                    <span className="text-xl mr-2">{countryFlags["US"]}</span>
                    <span>US</span>
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-800 hover:bg-primary-500/10 hover:text-primary-500 transition-all duration-200"
                    onClick={() => handleCountrySelect("IN")}
                  >
                    <span className="text-xl mr-2">{countryFlags["IN"]}</span>
                    <span>India</span>
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-800 hover:bg-primary-500/10 hover:text-primary-500 transition-all duration-200"
                    onClick={() => handleCountrySelect("NG")}
                  >
                    <span className="text-xl mr-2">{countryFlags["NG"]}</span>
                    <span>Nigeria</span>
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-800 hover:bg-primary-500/10 hover:text-primary-500 transition-all duration-200"
                    onClick={() => handleCountrySelect("CN")}
                  >
                    <span className="text-xl mr-2">{countryFlags["CN"]}</span>
                    <span>China</span>
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-800 hover:bg-primary-500/10 hover:text-primary-500 transition-all duration-200"
                    onClick={() => handleCountrySelect("GH")}
                  >
                    <span className="text-xl mr-2">{countryFlags["GH"]}</span>
                    <span>Ghana</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
