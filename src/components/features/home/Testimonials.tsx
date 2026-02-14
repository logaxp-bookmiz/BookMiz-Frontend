"use client";

import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  text: string;
  name: string;
  title: string;
  rating: number;
  bgClass: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    text: "This platform has completely transformed how we handle our business operations. The intuitive interface and powerful features have made our workflow incredibly efficient.",
    name: "Sarah Chen",
    title: "CEO, TechFlow Solutions",
    rating: 5,
    bgClass: "bg-gradient-to-br from-blue-50 to-indigo-100",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    text: "Outstanding customer service and an incredibly user-friendly platform. Our team productivity has increased by 40% since we started using this solution.",
    name: "Marcus Rodriguez",
    title: "Operations Director, Global Dynamics",
    rating: 4.8,
    bgClass: "bg-gradient-to-br from-purple-50 to-pink-100",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    text: "The best investment we've made for our company. The automation features have saved us countless hours and the analytics provide invaluable insights.",
    name: "Emily Thompson",
    title: "Marketing Manager, Creative Studio",
    rating: 4.9,
    bgClass: "bg-gradient-to-br from-emerald-50 to-teal-100",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    text: "Exceptional platform with robust features. The seamless integration with our existing tools made the transition smooth and hassle-free.",
    name: "David Park",
    title: "CTO, Innovation Labs",
    rating: 5,
    bgClass: "bg-gradient-to-br from-orange-50 to-amber-100",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
];

const TestimonialComponent = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number): void => {
    setCurrentIndex(index);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (): void => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const renderStars = (rating: number): JSX.Element => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center justify-center lg:justify-start">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
          />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        <span className="ml-2 text-xs sm:text-sm text-gray-600 font-medium">
          {rating.toFixed(1)}/5.0
        </span>
      </div>
    );
  };

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Background decoration - Reduced on mobile */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
      <div className="absolute top-10 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 sm:opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 sm:opacity-30 animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
            Customer Stories
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
            What Our Users Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Discover how businesses like yours are achieving extraordinary
            results
          </p>
        </div>

        {/* Testimonial Container */}
        <div className="relative">
          <div
            className="overflow-hidden rounded-2xl sm:rounded-3xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index: number) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div
                    className={`${testimonial.bgClass} p-6 sm:p-8 lg:p-12 xl:p-16 min-h-[320px] sm:min-h-[380px] lg:min-h-[400px] flex flex-col items-center gap-6 sm:gap-8 lg:gap-12 text-center lg:text-left lg:flex-row`}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={160}
                          height={160}
                          className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-xl sm:shadow-2xl ring-2 sm:ring-4 ring-white"
                        />
                        <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-8 h-8 sm:w-12 sm:h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-sm sm:text-2xl">
                            ✓
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="mb-4 sm:mb-6">
                        <div className="text-4xl sm:text-5xl lg:text-6xl text-gray-300 font-serif leading-none">
                          &quot;
                        </div>
                        <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-800 font-medium leading-relaxed -mt-2 sm:-mt-4 px-2 sm:px-0">
                          {testimonial.text}
                        </p>
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm sm:text-base text-gray-600 font-medium">
                          {testimonial.title}
                        </p>
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Hidden on small mobile */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-105 z-10 border border-gray-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-105 z-10 border border-gray-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center items-center mt-8 space-x-3">
          {testimonials.map((_, index: number) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 h-3 bg-primary-500 rounded-full"
                  : "w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          <div className="space-y-1 sm:space-y-2">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              10,000+
            </div>
            <div className="text-sm sm:text-base text-gray-600">
              Happy Customers
            </div>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <div className="text-2xl sm:text-3xl font-bold text-primary-500">
              4.9/5
            </div>
            <div className="text-sm sm:text-base text-gray-600">
              Average Rating
            </div>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600">
              99.9%
            </div>
            <div className="text-sm sm:text-base text-gray-600">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialComponent;
