"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { SelectedPage } from "@/components/ui/types";
import Hero from "@/components/features/home/Hero";
import RecommendedProfessionals from "@/components/features/home/RecommendedProfessionals";
import WhyUs from "@/components/features/home/WhyUs";
import JoinBussines from "@/components/features/home/JoinBussines";
import Plans from "@/components/features/home/Plans";
import JoinUs from "@/components/features/home/JoinUs";
import Testimonials from "@/components/features/home/Testimonials";
import Faq from "@/components/features/home/Faq";
import Reviews from "@/components/features/home/Reviews";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);

  return (
    <>
      <Navbar
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        isScrolled={false} // optional, can keep static
      />
      <main className="p-8">
        <Hero/>
        <RecommendedProfessionals/>
        <WhyUs/>
        <JoinBussines/>
        <Plans/>
        <JoinUs/>
      
         <Reviews />
      <Faq />
            <Footer />
      </main>
      {/* <Footer /> */}
    </>
  );
}