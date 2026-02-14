"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

type Feature = {
  title: string;
  description: string;
  icon: string;
};

const features: Feature[] = [
  {
    title: 'Easy Scheduling',
    description: 'Effortlessly book appointments with our intuitive and user-friendly interface.',
    icon: '/check-circle.png',
  },
  {
    title: 'Mobile-Friendly',
    description: 'Access and manage your appointments on-the-go with our responsive design that works on any device.',
    icon: '/smartphone.png',
  },
  {
    title: 'Secure Platform',
    description: 'Keep your data safe with our secure infrastructure and privacy-focused features.',
    icon: '/galaSecure0.png',
  },
];

const WhyUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('#why-loga-section');
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.8;
        if (sectionTop < triggerBottom) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(-6deg);
          }
          50% {
            transform: translateY(-10px) rotate(-4deg);
          }
        }
        
        @keyframes floatReverse {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(8px);
          }
        }
        
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        
        .float-reverse {
          animation: floatReverse 4s ease-in-out infinite;
        }
      `}</style>
      
      <section id="why-loga-section" className="py-8 sm:py-12 lg:py-16 bg-white mb-4 sm:mb-6 lg:mb-8 relative">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 sm:pt-6 lg:pt-12">
          <h3 className="text-left text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-12">
            Why Choose Us?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`border-2 border-gray-200 rounded-lg p-4 sm:p-5 lg:p-6 bg-white transform transition-opacity duration-[1.5s] ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={20}
                    height={20}
                    className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6"
                  />
                  <h4 className="text-left text-lg sm:text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h4>
                </div>
                <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        
      </section>
    </>
  );
};

export default WhyUs;