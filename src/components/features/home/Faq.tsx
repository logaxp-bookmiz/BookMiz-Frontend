"use client"

import React, { useState, useEffect } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  isVisible: boolean;
  delay: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isVisible, delay }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={`border border-gray-400  rounded-lg mb-4 transition-opacity duration-[1.5s] transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 '
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-3 sm:p-6 flex justify-between items-center focus:outline-none"
      >
        <span className="text-[#0f2439] font-medium text-sm sm:text-lg">{question}</span>
        <span className="text-[#0f2439] text-xl sm:text-2xl">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="p-3 sm:p-6 text-[#011c39] text-xs sm:text-sm">
          {answer}
        </div>
      )}
    </div>
  );
};

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // ✅ Static FAQ data (instead of fetch)
  const faqData: FAQ[] = [
    {
      id: 1,
      question: 'What is Bookmiz?',
      answer: 'Bookmiz is a platform that helps users book beauty and grooming services easily.',
    },
    {
      id: 2,
      question: 'How do I make a booking?',
      answer: 'Simply select a service, choose a time, and confirm your booking. It’s that easy.',
    },
    {
      id: 3,
      question: 'Can I reschedule or cancel my appointment?',
      answer: 'Yes, you can manage your bookings from your account dashboard.',
    },
    {
      id: 4,
      question: 'Do I need to pay in advance?',
      answer: 'Payment options depend on the service provider. Some allow advance payment while others accept payment upon service.',
    },
  ];

  const handleMoreClick = () => {
    window.location.href = '/faq';
  };

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('#faq-section');
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

  const previewFaqs = faqData.slice(0, 3);

  return (
    <section id="faq-section" className="w-full py-6 sm:py-10 bg-white flex flex-col items-center justify-center">
      <div className="text-center mb-4 sm:mb-8 px-4 sm:px-0">
        <p className="text-[10px] sm:text-xs text-gray-400 uppercase">BOOKMIZ FAQ</p>
        <h2 className="text-xl sm:text-2xl font-bold text-[#011c39]">Frequently Asked Questions</h2>
      </div>
      <div className="w-full max-w-[95%] sm:max-w-[800px] bg-white">
        {previewFaqs.map((item, index) => (
          <FAQItem
            key={item.id}
            question={item.question}
            answer={item.answer}
            isVisible={isVisible}
            delay={0.2 * index}
          />
        ))}

        {faqData.length > 3 && (
          <div className="text-center mt-6">
            <button
              onClick={handleMoreClick}
              className="bg-[#011c39] text-white px-6 py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-[#0f2439] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#011c39] focus:ring-opacity-50"
            >
              More FAQs
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQ;
