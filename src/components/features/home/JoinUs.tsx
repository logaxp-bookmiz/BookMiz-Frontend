"use client";


import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const JoinUs = () => {
  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} // Animation happens once when in view
        transition={{ duration: 0.6 }}
        className="relative flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[#d5f6f3] md:flex-row-reverse max-w-[1250px] w-full"
      >
        <Image
  src="/washer.png"
  alt="image"
  width={600}
  height={400}
  className="h-64 w-full rounded-t-lg object-cover md:h-auto md:w-[50%] md:rounded-none md:rounded-l-none md:rounded-r-lg"
/>
        <div className="flex flex-col justify-start items-start text-left p-4 sm:p-6 md:p-8 bg-[#f5f5f5] dark:bg-[#f5f5f5] md:w-[50%] md:rounded-r-lg">
          {/* Subheader */}
          <h6 className="mb-4 text-md font-sans text-gray-600 dark:text-black font-light pt-9">
            BOOKMIZ FOR CUSTOMERS
          </h6>
          {/* Header */}
          <h5
            className="mb-6 text-3xl font-semibold sm:text-4xl md:text-5xl sm:whitespace-normal font-sans"
            style={{ color: '#100f11' }}
          >
            Find The Services <br className="hidden sm:block" />
            You Need
          </h5>
          {/* Body Text */}
          <p className="mb-6 text-sm sm:text-base text-gray-600 font-light">
            Lorem ipsum dolor sit amet consectetur. Amet velit tellus lectus orci. In vitae neque eget integer. Nunc nulla auctor ridiculus leo. Ut commodo etiam at tempus.
          </p>
          <a
            className="mt-6 px-6 py-3 border-[1px] border-black text-black text-sm rounded-none bg-transparent hover:bg-gray-100 focus:outline-none font-montserrat cursor-pointer"
            href='https://bookmiz-frontend.onrender.com/'
            target="_blank"
          >
            Join as a Business
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default JoinUs;
