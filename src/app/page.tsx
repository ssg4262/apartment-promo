"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { getImagePath } from "@/lib/utils";
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
import CommunitySection from "@/components/sections/CommunitySection";
import FloorPlanSection from "@/components/sections/FloorPlanSection";
import EnvSection from "@/components/sections/EnvSection";
import DevEnvSection from "@/components/sections/DevEnvSection";
import RegistrationSection from "@/components/sections/RegistrationSection";

export default function Home() {
  useActiveSection();

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        {/* Promo benefit banner */}
        <section className="bg-white">
          <a
            href="#registration"
            className="mx-auto block w-full max-w-md py-10 md:max-w-lg md:py-16"
          >
            <img
              src={getImagePath("/images/promo/benefit.png")}
              alt="파격 분양혜택 - 계약금 500만원, 중도금 무이자, 발코니 확장 무상, 안심보장제 시행"
              className="block h-auto w-full"
            />
          </a>
        </section>
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
        <CommunitySection />
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
        <EnvSection />
        <DevEnvSection />
        <RegistrationSection />
      </main>
      <Footer />
      <SideNav />
      <FloatingCTA />
      <ScrollToTop />
    </>
  );
}
