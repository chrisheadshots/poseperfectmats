import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/LegalDoc";
import { SITE } from "@/lib/copy/personas";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE.name} (poseperfectmats.com), operated by Fail Up Inc. Covers analytics, Meta Pixel, and Shopify checkout.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalDoc title="Privacy Policy" updated="July 14, 2026">
      <p>
        This Privacy Policy explains how Fail Up Inc. (“we,” “us,” or “our”)
        collects, uses, and shares information when you visit{" "}
        <strong>{SITE.name}</strong> at{" "}
        <a href={SITE.url}>{SITE.url.replace("https://", "")}</a> (the “Site”).
        Purchases started on this Site are completed on Fail Up Inc.’s Shopify
        storefront (
        <a href="https://failupinc.com" target="_blank" rel="noreferrer">
          failupinc.com
        </a>
        ). The store’s full commerce privacy notice also applies once you enter
        checkout:{" "}
        <a
          href="https://failupinc.com/policies/privacy-policy"
          target="_blank"
          rel="noreferrer"
        >
          Fail Up Inc. Privacy Policy
        </a>
        .
      </p>

      <h2>Who we are</h2>
      <p>
        Fail Up Inc., 19 NW 7th Ave, Fort Lauderdale, FL 33311, United States.
        Contact:{" "}
        <a href="mailto:info@failupinc.com">info@failupinc.com</a> ·{" "}
        <a href="tel:+13054248626">+1 305-424-8626</a> ·{" "}
        <a href="mailto:support@failupinc.com">support@failupinc.com</a>.
      </p>

      <h2>Information we collect on this Site</h2>
      <ul>
        <li>
          <strong>Usage and device data</strong> — pages viewed, referrer, browser
          type, approximate location derived from IP, and similar technical logs
          from our hosting provider (Vercel) and analytics partners.
        </li>
        <li>
          <strong>Interaction data</strong> — CTA clicks, offer selections, and
          cart handoff events before you are redirected to Shopify checkout.
        </li>
        <li>
          <strong>Communications</strong> — information you send when emailing or
          calling support.
        </li>
      </ul>
      <p>
        Payment card details and shipping addresses are collected by Shopify on
        the Fail Up Inc. checkout pages, not on this marketing Site’s forms.
      </p>

      <h2>Meta (Facebook) Pixel &amp; advertising</h2>
      <p>
        This Site uses the same Meta Pixel configured on the Fail Up Inc. Shopify
        store to measure campaigns, retarget interested visitors, and understand
        which landing pages drive checkout starts. Meta may receive hashed or
        pseudonymous identifiers and event data (for example PageView and
        InitiateCheckout) under Meta’s terms. You can manage ad preferences in
        your Meta account and browser settings, and use tools such as{" "}
        <a href="https://globalprivacycontrol.org/" target="_blank" rel="noreferrer">
          Global Privacy Control
        </a>{" "}
        where supported.
      </p>

      <h2>Shopify &amp; checkout</h2>
      <p>
        When you start checkout, we create a cart via Shopify’s Storefront API and
        send you to Shopify-hosted checkout. Shopify and Fail Up Inc. then process
        order, payment, and fulfillment data under the store privacy policy and{" "}
        <a href="https://privacy.shopify.com/en" target="_blank" rel="noreferrer">
          Shopify’s Consumer Privacy Policy
        </a>
        .
      </p>

      <h2>Cookies and similar technologies</h2>
      <p>
        We and our partners use cookies, pixels, and local storage for site
        function, analytics, fraud prevention, and advertising measurement.
        Disabling cookies may break checkout handoff or measurement accuracy.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>Operate, secure, and improve the Site and offers</li>
        <li>Measure marketing performance (including Meta Pixel events)</li>
        <li>Complete purchases and customer support via Shopify / Fail Up Inc.</li>
        <li>Comply with law and protect against abuse</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, delete,
        correct, or port personal information, or to opt out of sale/sharing for
        targeted advertising. Contact{" "}
        <a href="mailto:info@failupinc.com">info@failupinc.com</a> or call{" "}
        <a href="tel:+13054248626">+1 305-424-8626</a>. For data processed in
        Shopify checkout and enhanced Shopify advertising features, use Shopify’s
        privacy tools at{" "}
        <a href="https://privacy.shopify.com/en" target="_blank" rel="noreferrer">
          privacy.shopify.com
        </a>
        .
      </p>

      <h2>Children</h2>
      <p>
        The Site is intended for professional photographers and adult buyers. We
        do not knowingly collect personal information from children under 16.
      </p>

      <h2>Trademark notice</h2>
      <p>
        Product and brand naming is described on our{" "}
        <Link href="/trademark">Trademark Information</Link> page.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The “Last updated” date at
        the top will change when we post revisions.
      </p>

      <h2>Contact</h2>
      <p>
        Fail Up Inc. · 19 NW 7th Ave, Fort Lauderdale, FL 33311 ·{" "}
        <a href="mailto:info@failupinc.com">info@failupinc.com</a> ·{" "}
        <a href="tel:+13054248626">305-424-8626</a>.
      </p>
    </LegalDoc>
  );
}
