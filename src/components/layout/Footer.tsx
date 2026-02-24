"use client"

import React from 'react';
import { FaLinkedinIn, FaTwitter, FaInstagram, FaFacebookF, FaApple, FaGooglePlay } from 'react-icons/fa';
import { FiPhone, FiArrowUp } from 'react-icons/fi';
import Image from 'next/image';
import { MapPinIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0e2843] text-white">
    
      {/* Main Footer Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Company Info - Left Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
           <div className="flex items-center gap-3 mb-8">
  <Image
    src="/logo.png"
    alt="Logo"
    width={120}
    height={70}
    className="object-contain"
  />
</div>

            
            {/* Contact Email */}
            <div className="mb-8">
              <a href="mailto:enquiries@logaxp.com" className="text-gray-300 hover:text-white transition-colors">
                enquiries@logaxp.com
              </a>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 mb-8">
              <a href="#" className="w-10 h-10 text-gray-400 hover:text-white transition-colors">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 text-gray-400 hover:text-white transition-colors">
                <FaLinkedinIn className="h-5 w-5" />
              </a>
            </div>

            {/* Address - moved directly under social media */}
            <div className="flex items-start gap-2 mb-6">
              <MapPinIcon className="h-5 w-5 text-[#89e101] mt-0.5 flex-shrink-0" />
              <address className="text-sm text-gray-300 not-italic">
                1105 Berry Street, Old Hickory, Tennessee 37138
              </address>
            </div>

            {/* App Downloads - moved up here */}
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">Download Our App</p>
              <div className="flex gap-4">
                <a href="#" className="flex items-center gap-2 bg-black hover:bg-gray-800 px-3 py-2 rounded transition-colors">
                  <FaApple className="h-5 w-5" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-2 bg-black hover:bg-gray-800 px-3 py-2 rounded transition-colors">
                  <FaGooglePlay className="h-5 w-5" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-2 bg-black hover:bg-gray-800 px-3 py-2 rounded transition-colors">
                  <span className="text-sm">💻</span>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download for</div>
                    <div className="text-sm font-semibold">Desktop</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Company tagline/description */}
            <div className="text-gray-400 mt-6">
             
            </div>
          </div>

          {/* Links Grid - Right 3 columns */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1 - Products */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-[#89e101] mb-4">Products</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Gatherplux</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Profixer</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Logaluxe</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">TimeSync</a></li>
              </ul>
            </div>

            {/* Column 2 - 24/7 Support (replaces Business Types) */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                
                <h4 className="text-lg font-bold text-[#89e101]">24/7 Support</h4>
              </div>
              <div className="text-gray-300 space-y-3">
                <p className="text-sm">LogaXP provides round-the-clock customer support for all your business needs.</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FiPhone className="h-4 w-4 text-[#89e101]" />
                    <span className="text-sm">+1 (615) 930-6090</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="h-4 w-4 text-[#89e101]" />
                    <span className="text-sm">+1 (832) 946-5563</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="h-4 w-4 text-[#89e101]" />
                    <span className="text-sm">+2348031322801</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3 - Company */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-[#89e101] mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Career</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Management</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700">
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-300">
            {/* Left side - Copyright and links */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span>© 2023. LogaXP. All Rights Reserved</span>
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="hidden sm:inline text-gray-500">|</span>
                <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                <span className="text-gray-500">|</span>
                <a href="#" className="hover:text-white transition-colors">Privacy & Security</a>
                <span className="text-gray-500">|</span>
                <div className="flex items-center gap-1">
                  <span>Language:</span>
                  <a href="#" className="underline hover:no-underline text-[#89e101]">English</a>
                </div>
              </div>
            </div>
            {/* Right side - Trust badge */}
            <div className="flex items-center gap-2">
              <span>Trusted by 50,000+ businesses worldwide</span>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#89e101] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-8 right-8">
        <a 
          href="#home" 
          className="w-12 h-12 bg-[#89e101] hover:bg-green-400 text-black rounded-lg flex items-center justify-center transition-colors shadow-lg"
          aria-label="Back to Top"
        >
          <FiArrowUp className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;