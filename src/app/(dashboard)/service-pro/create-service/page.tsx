"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Plus,
  DollarSign,
  Clock,
  Tag,
  Calendar,
  Upload,
  X,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useServices } from "@/hooks/useServices";
import { CreateServiceData } from "@/services/serviceManagementService";
import { useCategory } from "@/hooks/useCategory";
import { useFileUpload } from "@/hooks/useFileUpload";

type Category = {
  id: number;
  value: string;
  status: string;
  description: string;
};

type TimeSlot = {
  day: string;
  slots: string[];
};

const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const TIME_SLOTS = [
  "08:00-12:00",
  "12:00-16:00",
  "16:00-20:00",
  "08:00-16:00",
  "12:00-20:00",
];

const CreateServicePage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { categories, isLoading: loadingCategories } = useCategory();
  const { createService, isCreatingService } = useServices();
  const { mutateAsync: uploadAsync, isError, error, data } = useFileUpload();

  const [formData, setFormData] = useState<CreateServiceData>({
    name: "",
    description: "",
    cost: 0,
    duration: 30,
    currencyCode: "NGN",
    categories: [],
    startDate: null,
    endDate: null,
    timeSlots: [],
    gallery: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [costInput, setCostInput] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    let parsedValue: string | number = value;

    if (name === "cost" || name === "duration") {
      parsedValue = Number(value);
    }

    if (name === "startDate" || name === "endDate") {
      if (
        name === "endDate" &&
        formData.startDate &&
        new Date(value) < new Date(formData.startDate)
      ) {
        return;
      }

      parsedValue = new Date(value).toISOString();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCategoryToggle = (categoryId: number) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setCostInput(value);
      const numericValue = value === "" ? 0 : parseFloat(value) || 0;
      setFormData((prev) => ({
        ...prev,
        cost: numericValue,
      }));

      if (errors.cost) {
        setErrors((prev) => ({
          ...prev,
          cost: "",
        }));
      }
    }
  };

  const handleTimeSlotToggle = (day: string, slot: string) => {
    setFormData((prev) => {
      const timeSlots = [...(prev.timeSlots || [])];
      const existingDayIndex = timeSlots.findIndex((ts) => ts.day === day);

      if (existingDayIndex >= 0) {
        // Day exists, check if slot exists
        const existingDay = { ...timeSlots[existingDayIndex] };
        const slotIndex = existingDay.slots.indexOf(slot);

        if (slotIndex >= 0) {
          // Remove the slot
          existingDay.slots = existingDay.slots.filter(
            (s: string) => s !== slot,
          );

          // If no slots left for this day, remove the day
          if (existingDay.slots.length === 0) {
            timeSlots.splice(existingDayIndex, 1);
          } else {
            timeSlots[existingDayIndex] = existingDay;
          }
        } else {
          // Add the slot
          existingDay.slots = [...existingDay.slots, slot];
          timeSlots[existingDayIndex] = existingDay;
        }
      } else {
        // Add new day with this slot
        timeSlots.push({ day, slots: [slot] });
      }

      return { ...prev, timeSlots };
    });
  };

  const isSlotSelected = (day: string, slot: string): boolean => {
    const daySlots = formData.timeSlots?.find((ts) => ts.day === day);
    return daySlots?.slots.includes(slot) || false;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Limit to 5 images total
    const remainingSlots = 5 - imageFiles.length;
    const filesToAdd = files.slice(0, remainingSlots);

    if (filesToAdd.length > 0) {
      setImageFiles((prev) => [...prev, ...filesToAdd]);

      // Create preview URLs
      filesToAdd.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviewUrls((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Service name is required";
    }

    if (formData.name.length < 3) {
      newErrors.name = "Service name must be at least 3 characters";
    }

    if (formData.name.length > 50) {
      newErrors.name = "Service name must be 50 characters or less";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Service description is required";
    }

    if (formData.cost <= 0) {
      newErrors.cost = "Cost must be greater than 0";
    }

    if (formData.duration < 1) {
      newErrors.duration = "Duration must be at least 1 minute";
    }

    if (formData.categories.length === 0) {
      newErrors.categories = "Please select at least one category";
    }

    if (!formData.startDate || !formData.endDate) {
      newErrors.endDate = "Both start and end dates are required";
    } else {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end < start) {
        newErrors.endDate = "End date cannot be before start date";
      }
    }

    if (formData.timeSlots && formData.timeSlots.length === 0) {
      newErrors.timeSlots = "Please select at least one time slot";
    }

    if (imageFiles.length === 0) {
      newErrors.gallery = "Please upload at least one image for the gallery";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const galleryUrls: string[] = [];

      if (imageFiles.length > 0) {
        const response = await uploadAsync(
          imageFiles.length === 1
            ? { mode: "single", file: imageFiles[0] }
            : { mode: "multiple", files: imageFiles },
        );

        // Handle response regardless of upload mode
        if (Array.isArray(response)) {
          galleryUrls.push(...response.map((f: any) => f.url));
        }
      }

      const serviceData = { ...formData, gallery: galleryUrls };
      const response = await createService(serviceData);
      if (response.success) {
        router.push("/service-pro/Services-classes-nav/services");
      }
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const durationOptions = [
    { value: 15, label: "15 minutes" },
    { value: 30, label: "30 minutes" },
    { value: 45, label: "45 minutes" },
    { value: 60, label: "1 hour" },
    { value: 90, label: "1.5 hours" },
    { value: 120, label: "2 hours" },
    { value: 180, label: "3 hours" },
    { value: 240, label: "4 hours" },
  ];

  const toDateInputValue = (iso?: string | null) =>
    iso ? iso.split("T")[0] : "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Create New Service
              </h1>
              <p className="text-gray-600 mt-1">
                Add a new service to your business offerings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Service Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Plus className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Service Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Service Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    maxLength={50}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.name ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter service name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Service Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.description ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Describe what this service includes and what customers can expect"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Pricing and Duration */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Pricing & Duration
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="cost"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Cost *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cost"
                      name="cost"
                      value={costInput}
                      onChange={handleCostChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.cost ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter cost"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-sm">
                        {formData.currencyCode}
                      </span>
                    </div>
                  </div>
                  {errors.cost && (
                    <p className="text-red-500 text-sm mt-1">{errors.cost}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Duration *
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.duration ? "border-red-300" : "border-gray-300"
                    }`}
                  >
                    {durationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.duration && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.duration}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Tag className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Categories *
                </h2>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Select one or more categories that best describe your service
              </p>

              {loadingCategories ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                  <span className="ml-2 text-gray-600">
                    Loading categories...
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categories.map((category: Category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        formData.categories.includes(category.id)
                          ? "border-primary-500 bg-primary-50 text-primary-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      <div className="font-medium">{category.value}</div>
                    </button>
                  ))}
                </div>
              )}

              {errors.categories && (
                <p className="text-red-500 text-sm mt-1">{errors.categories}</p>
              )}
            </div>

            {/* Time Slots */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Available Time Slots
                </h2>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Select when this service is available
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={toDateInputValue(formData.startDate)}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={toDateInputValue(formData.endDate)}
                    min={
                      formData.startDate
                        ? formData.startDate.split("T")[0]
                        : new Date().toISOString().split("T")[0]
                    }
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {DAYS_OF_WEEK.map((day) => (
                  <div
                    key={day}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <h3 className="font-medium text-gray-900 mb-3 capitalize">
                      {day}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => handleTimeSlotToggle(day, slot)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all text-sm ${
                            isSlotSelected(day, slot)
                              ? "border-primary-500 bg-primary-50 text-primary-700"
                              : "border-gray-200 hover:border-gray-300 text-gray-700"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Upload className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Service Gallery
                </h2>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Upload up to 5 images (JPG, PNG, max 5MB each)
              </p>

              {imagePreviewUrls.length < 5 && (
                <div>
                  <label
                    htmlFor="images"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      Click to upload images
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      {imagePreviewUrls.length}/5 images uploaded
                    </span>
                  </label>
                  <input
                    id="images"
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}

              {imagePreviewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="relative w-full h-32 rounded-lg border border-gray-200 overflow-hidden">
                        <Image
                          src={url}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreatingService}
                className="px-6 py-3 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isCreatingService ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Service...
                  </>
                ) : (
                  "Create Service"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateServicePage;
