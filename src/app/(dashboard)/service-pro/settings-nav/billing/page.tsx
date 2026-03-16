'use client';

import { useState } from 'react';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  popular?: boolean;
  features: PlanFeature[];
  buttonText: string;
}

const BillingComponent = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      description: 'Up to 4 Users',
      price: 0,
      period: 'Month',
      buttonText: 'Get Started Now',
      features: [
        { name: '20,000+ of PNG & SVG graphics', included: true },
        { name: 'Access to 100 million stock images', included: true },
        { name: 'Upload custom icons and fonts', included: false },
        { name: 'Unlimited Sharing', included: false },
        { name: 'Upload graphics & video in up to 4K', included: false },
        { name: 'Unlimited Projects', included: false },
        { name: 'Instant Access to our design system', included: false },
        { name: 'Create teams to collaborate on designs', included: false }
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      description: '1 - 2 Users',
      price: 25,
      period: 'Month',
      popular: true,
      buttonText: 'Get Started Now',
      features: [
        { name: '20,000+ of PNG & SVG graphics', included: true },
        { name: 'Access to 100 million stock images', included: true },
        { name: 'Upload custom icons and fonts', included: true },
        { name: 'Unlimited Sharing', included: true },
        { name: 'Upload graphics & video in up to 4K', included: true },
        { name: 'Unlimited Projects', included: true },
        { name: 'Instant Access to our design system', included: false },
        { name: 'Create teams to collaborate on designs', included: false }
      ]
    },
    {
      id: 'team',
      name: 'Team',
      description: 'Unlimited users',
      price: 100,
      period: 'Month',
      buttonText: 'Get Started Now',
      features: [
        { name: '20,000+ of PNG & SVG graphics', included: true },
        { name: 'Access to 100 million stock images', included: true },
        { name: 'Upload custom icons and fonts', included: true },
        { name: 'Unlimited Sharing', included: true },
        { name: 'Upload graphics & video in up to 4K', included: true },
        { name: 'Unlimited Projects', included: true },
        { name: 'Instant Access to our design system', included: true },
        { name: 'Create teams to collaborate on designs', included: true }
      ]
    }
  ];

  const handlePlanSelect = async (planId: string) => {
    setIsLoading(planId);
    setSelectedPlan(planId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(null);
    console.log(`Selected plan: ${planId}`);
  };

  const CheckIcon = ({ isProfessional = false }) => (
    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
      isProfessional ? 'bg-white' : 'bg-[#e6e8eb]'
    }`}>
      <svg className={`w-3 h-3 ${isProfessional ? 'text-[#011c39]' : 'text-[#011c39]'}`} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  );

  const XIcon = ({ isProfessional = false }) => (
    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
      isProfessional ? 'bg-gray-600' : 'bg-gray-300'
    }`}>
      <svg className={`w-3 h-3 ${isProfessional ? 'text-white' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
  );

  return (
    <section className="py-16 mt-12 bg-gradient-to-b from-gray-50 to-white ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
        
          
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Grow your business
            </h2>
            <p className="text-gray-600 text-lg">
              Upgrade to Pro or Team to access exclusive features
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg text-center shadow-lg relative overflow-hidden transition-all ${
                plan.popular 
                  ? 'bg-[#011c39] ring-2 ring-green-500' 
                  : 'bg-white border border-gray-200'
              }`}
            >
              {/* Card Content */}
              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className={`text-xl font-semibold mb-2 ${
                    plan.popular ? 'text-white' : 'text-gray-900'
                  }`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${
                    plan.popular ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center">
                    <span className={`text-4xl md:text-5xl font-bold ${
                      plan.popular ? 'text-white' : 'text-gray-900'
                    }`}>
                      ${plan.price}
                    </span>
                    <span className={`text-lg font-normal ml-1 ${
                      plan.popular ? 'text-gray-300' : 'text-gray-400'
                    }`}>
                      / {plan.period}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  disabled={isLoading === plan.id}
                  className={`w-full py-3 px-6 rounded-md font-semibold text-center mb-8 transition-all text-base ${
                    plan.popular
                      ? 'bg-primary-500   text-slate-900'
                      : 'border-2 border-[#011c39] hover:bg-green-500/10 text-[#011c39]'
                  } hover:shadow-lg disabled:opacity-50`}
                >
                  {isLoading === plan.id ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Loading...
                    </div>
                  ) : (
                    plan.buttonText
                  )}
                </button>

                {/* Features List */}
                <div className="space-y-3 text-left">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {feature.included ? (
                          <CheckIcon isProfessional={plan.popular} />
                        ) : (
                          <XIcon isProfessional={plan.popular} />
                        )}
                      </div>
                      <span className={`text-sm leading-relaxed ${
                        plan.popular
                          ? 'text-white'
                          : feature.included
                          ? 'text-gray-700'
                          : 'text-gray-400'
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Plan Display */}
        {selectedPlan && (
          <div className="mt-12 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-green-800 font-medium">
                  {plans.find(p => p.id === selectedPlan)?.name} plan selected!
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BillingComponent;