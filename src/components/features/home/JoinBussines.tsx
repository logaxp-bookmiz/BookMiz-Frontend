"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the component is in view
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8 sm:pt-12">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col rounded-lg bg-white shadow-md dark:bg-[#d5f6f3] md:flex-row max-w-[1250px] w-full"
        style={{ margin: '0 auto' }}
      >
      <Image
  src="/barber.png"
  alt="Barber"
  width={600}  
  height={400}  
  className="h-48 w-full rounded-t-lg object-cover md:h-auto md:w-[50%] md:rounded-none md:rounded-l-lg"
/>
        <div className="flex flex-col justify-start items-start text-left p-4 sm:p-6 md:p-8 bg-[#d5f6f3] dark:bg-[#d5f6f3] md:w-[50%] md:rounded-r-lg md:items-start md:text-left">
          {/* Subheader */}
          <h6 className="mb-4 text-md font-sans text-gray-600 dark:text-black font-light">
            BOOKMIZ FOR BUSINESSES
          </h6>
          {/* Header */}
          <h5
            className="mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold sm:whitespace-normal font-sans"
            style={{ color: '#100f11' }}
          >
            Make Sales Like <br className="hidden sm:block" />
            Never Before
          </h5>
          {/* Body Text */}
          <p className="mb-6 text-sm sm:text-base text-black dark:text-black font-light">
            Lorem ipsum dolor sit amet consectetur. Amet velit tellus lectus orci. In vitae neque eget integer. Nunc nulla auctor ridiculus leo. Ut commodo etiam at tempus.
          </p>
          <a
  href="https://bookmiz-frontend.onrender.com/"
  target="_blank" // Opens the link in a new tab
  rel="noopener noreferrer" // Security measure
  className="mt-6 px-4 py-2 sm:px-6 sm:py-3 border-[1px] border-black text-black text-sm rounded-md bg-transparent hover:bg-[#22213b] hover:text-white transition duration-300 focus:outline-none  focus:ring-gray-600 font-montserrat"
>
  Join as a Business
</a>

        </div>
      </motion.div>
    </div>
  );
}
