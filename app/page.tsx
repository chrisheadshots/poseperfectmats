import { Ambassadors } from "@/components/Ambassadors";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Comparison } from "@/components/Comparison";
import {
  ContextualProof,
  CostOfDoingNothing,
  Objections,
  UseCaseResults,
  WhyItWorks,
  WorkflowCompare,
} from "@/components/ConversionSections";
import { FAQ } from "@/components/FAQ";
import { HeroDemo } from "@/components/HeroDemo";
import { LooxPhotoWall } from "@/components/LooxPhotoWall";
import { LooxReviews } from "@/components/LooxReviews";
import { LooxVideoSlider } from "@/components/LooxVideoSlider";
import { OfferCatalog } from "@/components/OfferCatalog";
import { PersonaGate } from "@/components/PersonaGate";
import { PosePerfectSystem } from "@/components/PosePerfectSystem";
import { ROICalculator } from "@/components/ROICalculator";
import { FinalCTA, HowItWorks } from "@/components/Sections";
import { StickyCta } from "@/components/StickyCta";
import { reviewsForPersona } from "@/lib/reviews/reviews";

export default function HomePage() {
  return (
    <>
      <HeroDemo />
      <PersonaGate />
      <CostOfDoingNothing />
      <HowItWorks />
      <WhyItWorks />
      <WorkflowCompare />
      <ROICalculator />
      <ContextualProof />
      <Ambassadors />
      <UseCaseResults />
      <Comparison />
      <LooxVideoSlider />
      <PosePerfectSystem />
      <OfferCatalog persona="master" />
      <LooxPhotoWall />
      <LooxReviews
        reviews={reviewsForPersona("general", 8)}
        title="Long-form Loox proof from verified buyers"
      />
      <Objections />
      <FAQ />
      <FinalCTA
        title="Install the workflow on your next shoot."
        body="Join photographers who treat posing as operations. Add PosePerfect Mat™, stack Junior + the guide as you grow, and if it doesn’t make positioning faster, contact Fail Up Inc. within 30 days about the product-page guarantee path."
        cta={<CheckoutButton label="Add PosePerfect Mat™ — $44.99" />}
      />
      <StickyCta />
    </>
  );
}
