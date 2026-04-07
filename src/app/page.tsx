"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SideNav from "@/components/layout/SideNav";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import VideoSection from "@/components/sections/VideoSection";
import OverviewSection from "@/components/sections/OverviewSection";
import DividerSection from "@/components/sections/DividerSection";
import BirdEyeSection from "@/components/sections/BirdEyeSection";
import FloorPlanSection from "@/components/sections/FloorPlanSection";
import GallerySection from "@/components/sections/GallerySection";
import LocationSection from "@/components/sections/LocationSection";
import EnvSection from "@/components/sections/EnvSection";
import MarketSection from "@/components/sections/MarketSection";
import DevEnvSection from "@/components/sections/DevEnvSection";
import SellingSection from "@/components/sections/SellingSection";
import PremiumSection from "@/components/sections/PremiumSection";
import RegistrationSection from "@/components/sections/RegistrationSection";

export default function Home() {
  useActiveSection();

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        <VideoSection
          id="intro-video"
          title="호반써밋, 경산의 새로운 랜드마크"
          subtitle="Promotion Film"
          src="/videos/intro.mp4"
        />
        <OverviewSection />
        <DividerSection
          quote="공원이 선사하는 품격, 호반써밋이 완성합니다"
        />
        <BirdEyeSection />
        <FloorPlanSection />
        <VideoSection
          id="visit-guide"
          title="모델하우스 방문 전 꼭 확인하세요"
          subtitle="Visit Guide"
          src="/videos/visit-guide.mp4"
          dark
        />
        <DividerSection
          quote="당신이 꿈꾸던 공간, 그 이상의 품격"
          author="Hoban Summit"
        />
        <GallerySection />
        <EnvSection />
        <MarketSection />
        <DevEnvSection />
        <SellingSection />
        <LocationSection />
        <PremiumSection />
        <RegistrationSection />
      </main>
      <Footer />
      <SideNav />
      <FloatingCTA />
      <ScrollToTop />
    </>
  );
}
