'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';

// Types
type ExchangeRateResponse = {
  rates: Record<string, number>;
  base: string;
};

type LocationResponse = {
  country_code: string;
};

type PricingPlan = {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular?: boolean;
  savePercentage: number;
};

// Constants
const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  US: 'USD',
  GB: 'GBP',
  EU: 'EUR',
  NG: 'NGN',
  MX: 'MXN',
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  GBP: '£',
  EUR: '€',
  NGN: '₦',
  MXN: '$',
};

const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    monthlyPrice: 49,
    yearlyPrice: 29,
    savePercentage: 20,
    features: [
      '10,000 Visitors',
      'Create Unlimited Widgets',
      'All Widget Types',
      '3rd Party integrations',
      'Advanced Targeting',
      'Widget A/B Testing',
    ],
  },
  {
    name: 'Pro',
    monthlyPrice: 99,
    yearlyPrice: 69,
    savePercentage: 40,
    isPopular: true,
    features: [
      '50,000 Visitors',
      'All in Starter',
      'Website Personalization',
      'A/B Testing and Experimentation',
      'Manage Multiple Websites',
      'Priority Support',
    ],
  },
  {
    name: 'Enterprise',
    monthlyPrice: 199,
    yearlyPrice: 99,
    savePercentage: 50,
    features: [
      'Unlimited Visitors',
      'All in Starter and Pro',
      'Custom Contact',
      'Clearbit and Albacross',
      'Custom integration',
      'Dedicated Manager',
    ],
  },
];

// Custom hooks
const useUserLocation = () => {
  const [location, setLocation] = useState('US');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('Location fetch failed');
        
        const data: LocationResponse = await response.json();
        if (isActive && data.country_code) {
          setLocation(data.country_code);
        }
      } catch (error) {
        console.warn('Using default location (US) due to error:', error);
        if (isActive) setLocation('US');
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    fetchLocation();

    return () => { isActive = false; };
  }, []);

  return { location, isLoading };
};

const useExchangeRate = (currency: string) => {
  const [rate, setRate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currency === 'USD') {
      setRate(1);
      return;
    }

    let isActive = true;
    setIsLoading(true);

    const fetchRate = async () => {
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
        if (!response.ok) throw new Error('Rate fetch failed');
        
        const data: ExchangeRateResponse = await response.json();
        if (isActive && data.rates[currency]) {
          setRate(data.rates[currency]);
        }
      } catch (error) {
        console.warn('Using default rate (1) due to error:', error);
        if (isActive) setRate(1);
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    fetchRate();

    return () => { isActive = false; };
  }, [currency]);

  return { rate, isLoading };
};

// Components
const ToggleSwitch = ({ isYearly, onToggle }: { 
  isYearly: boolean; 
  onToggle: (value: boolean) => void 
}) => (
  <div className="flex justify-center items-center mb-6 sm:mb-8">
    <span className={`mr-2 text-sm ${!isYearly ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
      Monthly
    </span>
    <label className="flex items-center cursor-pointer mx-2">
      <div className="relative">
        <input
          type="checkbox"
          checked={isYearly}
          onChange={(e) => onToggle(e.target.checked)}
          className="sr-only"
          aria-label="Toggle billing period"
        />
        <div className={`block w-12 h-6 sm:w-14 sm:h-8 rounded-full ${isYearly ? 'bg-[#89e101]' : 'bg-gray-300'}`} />
        <div className={`dot absolute left-0.5 top-0.5 sm:left-1 sm:top-1 bg-white w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-transform ${
          isYearly ? 'translate-x-6 sm:translate-x-6' : ''
        }`} />
      </div>
    </label>
    <span className={`ml-2 text-sm ${isYearly ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
      Yearly
    </span>
    <span className="ml-2 sm:ml-4 bg-[#89e101] text-xs text-white font-medium px-2 py-1 rounded-lg">
      UP TO 50% OFF
    </span>
  </div>
);

const VisitorSlider = ({ visitors, onChange }: { 
  visitors: number; 
  onChange: (value: number) => void 
}) => {
  const formatVisitors = useCallback((count: number) => {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}k`;
    return count.toString();
  }, []);

  const sliderPercent = ((visitors - 1000) / (1_000_000 - 1000)) * 100;

  return (
    <div className="text-center mb-8 sm:mb-12">
      <p className="text-xs sm:text-sm text-gray-600 font-medium mb-3 sm:mb-4">
        MONTHLY VISITORS
      </p>
      <div className="flex justify-center items-center mt-4 max-w-2xl mx-auto px-4">
        <input
          type="range"
          min="1000"
          max="1000000"
          step="1000"
          value={visitors}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider flex-1 h-2 appearance-none bg-gray-300 rounded-full outline-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #89e101 0%, #89e101 ${sliderPercent}%, #e5e7eb ${sliderPercent}%)`,
          }}
          aria-label="Monthly visitors slider"
        />
        <span className="ml-3 sm:ml-4 text-sm sm:text-base text-gray-800 font-bold min-w-[2.5rem] sm:min-w-[3rem]">
          {formatVisitors(visitors)}
        </span>
      </div>
    </div>
  );
};

const PricingCard = ({ 
  plan, 
  currency, 
  exchangeRate, 
  isYearly, 
  visitors 
}: { 
  plan: PricingPlan;
  currency: string;
  exchangeRate: number;
  isYearly: boolean;
  visitors: number;
}) => {
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  const basePrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  
  const priceMultiplier = useMemo(() => {
    if (visitors <= 10_000) return 1;
    if (visitors <= 50_000) return 1.5;
    if (visitors <= 100_000) return 2;
    return 2.5;
  }, [visitors]);

  const finalPrice = Math.round(basePrice * priceMultiplier * exchangeRate);
  const period = isYearly ? 'year' : 'month';

  return (
    <div className={`rounded-lg text-center shadow-lg relative overflow-hidden transition-all ${
      plan.isPopular ? 'bg-[#011c39] ring-2 ring-[#89e101]' : 'bg-white border border-gray-200'
    }`}>
      {plan.isPopular && (
        <div className="bg-[#89e101] text-white font-semibold py-2 text-xs sm:text-sm">
          MOST POPULAR
        </div>
      )}
      
      <div className="p-4 sm:p-6">
        <h4 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${plan.isPopular ? 'text-white' : 'text-gray-900'}`}>
          {plan.name}
        </h4>
        
        <div className="mb-4 sm:mb-6">
          <p className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 ${plan.isPopular ? 'text-white' : 'text-gray-900'}`}>
            {symbol}{finalPrice}
            <span className={`text-base sm:text-lg font-normal ${plan.isPopular ? 'text-gray-300' : 'text-gray-400'}`}>
              /{period}
            </span>
          </p>
          {!isYearly && (
            <p className={`text-xs sm:text-sm ${plan.isPopular ? 'text-gray-300' : 'text-gray-500'}`}>
              Save {symbol}{Math.round((plan.monthlyPrice - plan.yearlyPrice / 12) * exchangeRate)} per month
            </p>
          )}
        </div>

        <ul className={`mb-6 sm:mb-8 space-y-2 sm:space-y-3 text-left ${plan.isPopular ? 'text-gray-300' : 'text-gray-600'}`}>
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <span className={`mr-2 sm:mr-3 mt-0.5 text-[#89e101] text-sm`}>✓</span>
              <span className="text-xs sm:text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {isYearly && (
          <div className="mb-3 sm:mb-4">
            <span className={`inline-block px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-semibold ${
              plan.isPopular ? 'bg-[#89e101]/20 text-[#89e101]' : 'bg-gray-100 text-[#89e101]'
            }`}>
              Save {plan.savePercentage}%
            </span>
          </div>
        )}

        <Link
          href="https://bookmiz-frontend.onrender.com/"
          target="_blank"
          className={`block w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-md font-bold text-sm sm:text-base text-center ${
            plan.isPopular ? 'bg-[#89e101] hover:bg-[#7bd400]' : 'bg-[#011c39] hover:bg-[#89e101]'
          } text-white hover:shadow-lg transition-all`}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

// Main Component
export default function PricingPlans() {
  const [isYearly, setIsYearly] = useState(false);
  const [visitors, setVisitors] = useState(10_000);
  
  const { location, isLoading: locationLoading } = useUserLocation();
  const currency = COUNTRY_CURRENCY_MAP[location] || 'USD';
  const { rate, isLoading: rateLoading } = useExchangeRate(currency);

  const isLoading = locationLoading || rateLoading;

  return (
    <section className="py-12 sm:py-16 sm:pt-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">
            Logaxp Pricing
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 mt-2 mb-3 sm:mb-4 px-2">
            Find the perfect plan for your business
          </h3>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Start with a 14-day unlimited free trial. No contact or credit card required.
          </p>
        </div>

        <ToggleSwitch isYearly={isYearly} onToggle={setIsYearly} />
        <VisitorSlider visitors={visitors} onChange={setVisitors} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              currency={currency}
              exchangeRate={rate}
              isYearly={isYearly}
              visitors={visitors}
            />
          ))}
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg mx-4">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-[#89e101] mx-auto"></div>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 text-center">Loading pricing...</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}