import CTA from "@/components/landing/cta";
import DashboardPreview from "@/components/landing/dashboard-preview";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <DashboardPreview />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}