import { Ambassadors } from "@/components/Ambassadors";
import { CheckoutButton } from "@/components/CheckoutButton";
import {
  ContextualProof,
  Objections,
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
      <Objections />
      <FAQ />
      <FinalCTA
        title="Ready for your next shoot?"
        body="Add PosePerfect Mat™, stack Junior and the guide as you grow. If it does not make positioning faster, contact Fail Up Inc. within 30 days about the product-page guarantee path."
        cta={<CheckoutButton label="Add PosePerfect Mat™ - $44.99" />}
      />
      <StickyCta />
    </>
  );
}
