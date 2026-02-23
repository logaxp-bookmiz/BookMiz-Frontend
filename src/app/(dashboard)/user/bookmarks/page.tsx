"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, MapPin, Clock, DollarSign } from "lucide-react";
import UserDashboardHeader from "../_components/UserDashboardHeader";

// ─── Static Types ────────────────────────────────────────────────────────────

export interface StaticBusiness {
  id: number;
  name: string;
  about: string;
  address: string;
  city: string;
  state: string;
  country: string;
  currencyCode: string;
}

export type ServiceLocation = "in_person" | "online";

export interface StaticService {
  id: number;
  title: string;
  description: string;
  currencyCode: string;
  cost: number;
  businessId: number;
  location: ServiceLocation;
  durationInMinutes: number;
  gallery: { url: string }[];
}

export interface StaticBookmarkItem {
  id: number;
  serviceId: number;
  businessId: number;
  business: StaticBusiness;
  service: StaticService;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const STATIC_BOOKMARKS: StaticBookmarkItem[] = [
  {
    id: 1,
    serviceId: 101,
    businessId: 201,
    business: {
      id: 201,
      name: "Prestige Barber Studio",
      about: "Premium grooming experience",
      address: "14 Wuse Zone 5, Abuja",
      city: "Abuja",
      state: "FCT",
      country: "Nigeria",
      currencyCode: "NGN",
    },
    service: {
      id: 101,
      title: "Classic Fade & Shape-up",
      description: "A sharp fade with a clean shape-up and beard line.",
      currencyCode: "NGN",
      cost: 8500,
      businessId: 201,
      location: "in_person",
      durationInMinutes: 45,
      gallery: [{ url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop" }],
    },
  },
  {
    id: 2,
    serviceId: 102,
    businessId: 202,
    business: {
      id: 202,
      name: "Glow Skin & Beauty Lounge",
      about: "Expert skincare and beauty treatments",
      address: "7 Maitama Close, Abuja",
      city: "Abuja",
      state: "FCT",
      country: "Nigeria",
      currencyCode: "NGN",
    },
    service: {
      id: 102,
      title: "Deep Pore Facial Treatment",
      description: "A rejuvenating facial targeting deep pores and skin tone.",
      currencyCode: "NGN",
      cost: 15000,
      businessId: 202,
      location: "in_person",
      durationInMinutes: 60,
      gallery: [{ url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop" }],
    },
  },
  {
    id: 3,
    serviceId: 103,
    businessId: 203,
    business: {
      id: 203,
      name: "FlexFit Personal Training",
      about: "Results-driven personal fitness coaching",
      address: "22 Garki District, Abuja",
      city: "Abuja",
      state: "FCT",
      country: "Nigeria",
      currencyCode: "NGN",
    },
    service: {
      id: 103,
      title: "1-on-1 Personal Training Session",
      description: "Customized workout session with a certified trainer.",
      currencyCode: "NGN",
      cost: 12000,
      businessId: 203,
      location: "in_person",
      durationInMinutes: 90,
      gallery: [{ url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop" }],
    },
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function UserBookmarks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<StaticBookmarkItem[]>(STATIC_BOOKMARKS);

  const handleRemoveBookmark = (bookmarkId: number) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
  };

  const filtered = bookmarks.filter((item) =>
    item.business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <UserDashboardHeader
          username="John"
          timezone="GMT+01"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onFilterClick={() => {}}
          onBookClick={() => {}}
        />

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary-50 rounded-xl">
              <Heart className="w-6 h-6 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Bookmarks</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Your saved services and favourite businesses
          </p>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-500 mb-1">No bookmarks yet</h3>
            <p className="text-gray-400 text-sm">Services you save will appear here.</p>
          </div>
        )}

        {/* Bookmarks Grid */}
        <div className="space-y-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white/95 backdrop-blur-md shadow-lg rounded-xl overflow-hidden border border-gray-200/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                <div className="lg:w-[300px] flex-shrink-0 p-5">
                  <div className="relative w-full aspect-square group rounded-xl overflow-hidden">
                    <Image
                      src={item.service.gallery?.[0]?.url || "https://leigh.town/img/placeholder-store.png"}
                      alt={item.service.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <button
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 transition-all duration-300 hover:scale-110"
                        onClick={() => handleRemoveBookmark(item.id)}
                        aria-label="Remove bookmark"
                      >
                        <Heart className="w-5 h-5 text-red-500 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 p-6 lg:p-8">
                  <div className="mb-5">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {item.business.name}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
                      <span className="text-sm">{item.business.address}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200/50 hover:border-primary-200/50 hover:bg-primary-50/30 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                          {item.service.title}
                        </h3>

                        <div className="flex flex-wrap gap-6">
                          {/* Price */}
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary-100 rounded-lg">
                              <DollarSign className="w-4 h-4 text-primary-600" />
                            </div>
                            <div>
                              <span className="text-primary-600 text-xs font-semibold uppercase tracking-wide block">
                                Price
                              </span>
                              <span className="text-gray-900 font-bold text-base">
                                {item.service.cost.toLocaleString()} {item.service.currencyCode}
                              </span>
                            </div>
                          </div>

                          {/* Duration */}
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Clock className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <span className="text-blue-600 text-xs font-semibold uppercase tracking-wide block">
                                Duration
                              </span>
                              <span className="text-gray-900 font-bold text-base">
                                {item.service.durationInMinutes} Min(s)
                              </span>
                            </div>
                          </div>

                          {/* Location type */}
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <MapPin className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <span className="text-green-600 text-xs font-semibold uppercase tracking-wide block">
                                Location
                              </span>
                              <span className="text-gray-900 font-bold text-base capitalize">
                                {item.service.location.replace("_", " ")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button className="bg-primary-500 hover:bg-primary-600 text-white rounded-xl px-8 py-3 text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform whitespace-nowrap">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}