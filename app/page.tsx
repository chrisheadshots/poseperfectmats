import { Ambassadors } from "@/components/Ambassadors";
import { CheckoutButton } from "@/components/CheckoutButton";
import {
  ContextualProof,
  UseCaseResults,
  WorkflowCompare,
} from "@/components/ConversionSections";
import { FAQ } from "@/components/FAQ";
import { HeroDemo } from "@/components/HeroDemo";
import { LooxPhotoWall } from "@/components/LooxPhotoWall";
import { LooxReviews } from "@/components/LooxReviews";
import { LooxVideoSlider } from "@/components/LooxVideoSlider";
import { OfferCatalog } from "@/components/OfferCatalog";
import { OfferLadder } from "@/components/OfferLadder";
import { PersonaGate } from "@/components/PersonaGate";
import { ROICalculator } from "@/components/ROICalculator";
import { FinalCTA, HowItWorks } from "@/components/Sections";
import { StickyCta } from "@/components/StickyCta";
import { GUARANTEE } from "@/lib/copy/trust";
import { reviewsForPersona } from "@/lib/reviews/reviews";

export default function HomePage() {
  return (
    <>
      <HeroDemo />
      <PersonaGate />
      <HowItWorks />
      <WorkflowCompare />
      <ROICalculator />
      <OfferLadder />
      <ContextualProof />
      <Ambassadors />
      <UseCaseResults />
      <LooxVideoSlider />
      <OfferCatalog persona="master" />
      <LooxPhotoWall />
      <LooxReviews
        reviews={reviewsForPersona("general", 8)}
        title="Buyer reviews"
      />
      <FAQ />
      <FinalCTA
        title="Ready for your next shoot?"
        body={GUARANTEE.ctaBody}
        cta={<CheckoutButton label="Add PosePerfect Mat™ - $44.99" />}
      />
      <StickyCta />
    </>
  );
}
