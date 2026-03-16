"use client";

import React, { useState } from "react";
import {
  Plus,
  Tag,
  Trash2,
  Calendar as CalendarIcon,
  Copy,
} from "lucide-react";
import { usePromoCode } from "@/hooks/usePromoCode";

const CreatePromoCodePage = () => {
  const [form, setForm] = useState({
    description: "",
    discountPercentage: "",
    maxUsage: "",
    expiryDate: "",
  });

  const { activePromos, isLoadingActivePromos, createPromo, isCreatingPromo } =
    usePromoCode();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "discountPercentage" || name === "maxUsage"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createPromo({
        description: form.description,
        discountPercentage: Number(form.discountPercentage),
        maxUsage: Number(form.maxUsage),
        expiryDate: form.expiryDate,
      });
      setForm({
        description: "",
        discountPercentage: "",
        maxUsage: "",
        expiryDate: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">Promo Codes</h1>
          <p className="text-gray-600 mt-1">
            Create and manage promo codes for your customers
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Create Promo Code Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Create New Promo Code
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g. 10% off for September bookings"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Percentage
              </label>
              <input
                type="number"
                name="discountPercentage"
                value={form.discountPercentage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g. 10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Usage
              </label>
              <input
                type="number"
                name="maxUsage"
                value={form.maxUsage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g. 50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              disabled={isCreatingPromo}
              className="px-4 py-2 bg-secondary-500 text-white rounded-lg font-medium hover:bg-secondary-600 disabled:opacity-50 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {isCreatingPromo ? "Creating..." : "Create Promo Code"}
            </button>
          </div>
        </div>

        {/* Promo Codes List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Promo Codes
            </h2>
          </div>
          <div className="p-6">
            {isLoadingActivePromos ? (
              <p className="text-gray-500">Loading promo codes...</p>
            ) : activePromos && activePromos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activePromos.map((promo: any) => {
                  const expiry = new Date(promo.expiryDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  );

                  const status = promo.isActive ? "active" : "expired";

                  return (
                    <div
                      key={promo.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">
                          {promo.description}
                        </h3>
                        <button
                          // no delete endpoint yet
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Promo Code */}
                      <p className="text-sm font-mono text-gray-800 mb-2 flex items-center gap-2">
                        Code:{" "}
                        <span className="font-semibold">{promo.code}</span>
                        <button
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(promo.code);
                              alert("Promo code copied!"); // simple feedback
                            } catch (err) {
                              console.error("Failed to copy:", err);
                            }
                          }}
                          className="p-1 rounded hover:bg-gray-100 text-gray-600"
                          title="Copy promo code"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </p>

                      {/* Discount */}
                      <p className="text-sm text-gray-600 mb-2">
                        Discount: {parseFloat(promo.discountPercentage)}%
                      </p>

                      {/* Max Usage */}
                      <p className="text-sm text-gray-600 mb-2">
                        Max Usage: {promo.maxUsage}
                      </p>

                      {/* Expiry */}
                      <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                        <CalendarIcon className="w-3 h-3" />
                        Expires: {expiry}
                      </p>

                      {/* Status */}
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="p-3 bg-gray-100 rounded-lg w-fit mx-auto mb-4">
                  <Tag className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Promo Codes Yet
                </h3>
                <p className="text-gray-600">
                  Create your first promo code to offer discounts
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePromoCodePage;
