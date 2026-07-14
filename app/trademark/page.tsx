import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/LegalDoc";
import { SITE } from "@/lib/copy/personas";

export const metadata: Metadata = {
  title: "Trademark Information",
  description: `Trademark and brand-use information for ${SITE.name}, owned and operated in connection with Fail Up Inc. and Chris Headshots.`,
  alternates: { canonical: "/trademark" },
};

export default function TrademarkPage() {
  return (
    <LegalDoc title="Trademark Information" updated="July 14, 2026">
      <p>
        <strong>PosePerfect Mat™</strong> and related logos, product names, and
        marketing materials are trademarks or trade dress used by{" "}
        <strong>Fail Up Inc.</strong> in connection with photography workflow
        products created with <strong>Chris Headshots</strong>.
      </p>

      <h2>Brand name</h2>
      <p>
        The correct designation of the product brand is{" "}
        <strong>PosePerfect Mat™</strong>. Please include the trademark symbol
        (™) at least on the first or most prominent mention in promotional
        materials when reasonably practical.
      </p>

      <h2>Ownership &amp; affiliation</h2>
      <ul>
        <li>
          Commerce, fulfillment, and customer support are provided by Fail Up
          Inc. (failupinc.com).
        </li>
        <li>
          This marketing site ({SITE.url.replace("https://", "")}) is powered by
          Fail Up Inc. and promotes authentic PosePerfect Mat™ products sold
          through Fail Up Inc.’s Shopify store.
        </li>
        <li>
          References to “Chris Headshots” describe the product creator / brand
          collaborator associated with the mats and Advanced Posing Guide.
        </li>
      </ul>

      <h2>Allowed editorial use</h2>
      <p>
        You may refer to PosePerfect Mat™ factually when reviewing, recommending,
        or teaching with the product, provided the reference does not imply
        sponsorship or endorsement by Fail Up Inc. or Chris Headshots unless that
        relationship exists.
      </p>

      <h2>Restricted use</h2>
      <ul>
        <li>
          Do not use PosePerfect Mat™, Fail Up Inc., or Chris Headshots marks as
          part of your own product name, domain, or logo.
        </li>
        <li>
          Do not modify the marks in a way that creates a confusingly similar
          imprint (including knockoff mats marketed under confusing names).
        </li>
        <li>
          Do not claim affiliation, partnership, or “official” reseller status
          without written permission from Fail Up Inc.
        </li>
        <li>
          Official ambassador or affiliate arrangements must follow the written
          terms provided for that program.
        </li>
      </ul>

      <h2>Product authenticity</h2>
      <p>
        Genuine PosePerfect Mat™ products are sold through Fail Up Inc. channels,
        including this Site’s Shopify checkout handoff. Counterfeit or
        unauthorized reproductions may infringe intellectual property rights.
      </p>

      <h2>Reporting misuse</h2>
      <p>
        To report suspected trademark misuse or counterfeit listings, contact{" "}
        <a href="mailto:info@failupinc.com">info@failupinc.com</a> or{" "}
        <a href="mailto:support@failupinc.com">support@failupinc.com</a> with
        URLs, screenshots, and any order details you have.
      </p>

      <h2>Related policies</h2>
      <p>
        See our <Link href="/privacy">Privacy Policy</Link> for how this Site
        handles personal information, and the{" "}
        <a
          href="https://failupinc.com/policies/privacy-policy"
          target="_blank"
          rel="noreferrer"
        >
          Fail Up Inc. store privacy policy
        </a>{" "}
        for checkout and order data.
      </p>

      <h2>Contact</h2>
      <p>
        Fail Up Inc. · 19 NW 7th Ave, Fort Lauderdale, FL 33311 ·{" "}
        <a href="tel:+13054248626">305-424-8626</a> ·{" "}
        <a href="mailto:info@failupinc.com">info@failupinc.com</a>.
      </p>
    </LegalDoc>
  );
}
