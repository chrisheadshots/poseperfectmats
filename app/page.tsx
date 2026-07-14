import { Ambassadors } from "@/components/Ambassadors";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Comparison } from "@/components/Comparison";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { LooxPhotoWall } from "@/components/LooxPhotoWall";
import { LooxReviews } from "@/components/LooxReviews";
import { LooxVideoSlider } from "@/components/LooxVideoSlider";
import { OfferCatalog } from "@/components/OfferCatalog";
import { PersonaGate } from "@/components/PersonaGate";
import { ROICalculator } from "@/components/ROICalculator";
import {
  FinalCTA,
  HowItWorks,
  ProblemSection,
} from "@/components/Sections";
import { StickyCta } from "@/components/StickyCta";
import { reviewsForPersona } from "@/lib/reviews/reviews";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <ROICalculator />
      <LooxVideoSlider />
      <Ambassadors />
      <PersonaGate />
      <Comparison />
      <OfferCatalog persona="master" />
      <LooxPhotoWall />
      <LooxReviews reviews={reviewsForPersona("general", 6)} />
      <FAQ />
      <FinalCTA cta={<CheckoutButton label="Get PosePerfect Mat — $54.99" />} />
      <StickyCta />
    </>
  );
}
