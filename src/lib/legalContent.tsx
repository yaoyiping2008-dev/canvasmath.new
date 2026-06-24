import type { ReactNode } from "react";

/** General contact for content and platform inquiries. */
export const GENERAL_CONTACT_EMAIL = "hello@canvasmath.org";

/**
 * TODO: Confirm privacy@canvasmath.org mailbox or forwarding alias is active before
 * displaying it publicly. Until confirmed, privacy inquiries are directed to hello@canvasmath.org.
 */
export const PRIVACY_CONTACT_EMAIL = GENERAL_CONTACT_EMAIL;

function LegalHeading({ children }: { children: ReactNode }) {
  return <h3 className="mt-6 text-sm font-semibold text-foreground first:mt-0">{children}</h3>;
}

function LegalParagraph({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed text-foreground/90">{children}</p>;
}

function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function MailtoLink({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
    >
      {email}
    </a>
  );
}

function LegalDocument({ children }: { children: ReactNode }) {
  return <div className="max-w-prose space-y-4">{children}</div>;
}

const privacyBody = (
  <LegalDocument>
    <LegalParagraph>
      <strong>Last updated: June 14, 2026.</strong>
    </LegalParagraph>

    <LegalHeading>1. Scope</LegalHeading>
    <LegalParagraph>
      This Privacy Policy describes how the CanvasMath public website and application shell handle
      information when you browse simulations, open module workspaces, and contact CanvasMath. It
      applies to the CanvasMath platform at canvasmath.org and does not replace the privacy
      practices of external simulation providers embedded within module workspaces.
    </LegalParagraph>

    <LegalHeading>2. Information CanvasMath Does Not Require</LegalHeading>
    <LegalParagraph>
      Public access to CanvasMath simulations does not require account registration, payment
      information, or a student identifier managed by CanvasMath. The platform is designed so that
      educators and learners can open modules without creating a CanvasMath account.
    </LegalParagraph>

    <LegalHeading>3. Local Learning History</LegalHeading>
    <LegalParagraph>
      When the learning-history feature is active in your browser, CanvasMath stores progress
      indicators locally on your device using the browser&apos;s <code>localStorage</code> API under
      the key <code>canvasmath-learning-history</code>. This may include module slugs visited,
      exploration status, visit counts, and time spent in a session.
    </LegalParagraph>
    <LegalParagraph>
      This information stays on your device and is not transmitted to CanvasMath servers as part of
      the current application implementation. You can remove locally stored learning history by
      clearing site data or browser storage for canvasmath.org in your browser settings.
    </LegalParagraph>

    <LegalHeading>4. Technical and Essential Data</LegalHeading>
    <LegalParagraph>
      Like most websites, CanvasMath may involve routine technical processing when you request pages
      and assets. Depending on your network path and hosting configuration, this can include
      standard web-server logs, connection metadata, and content delivery necessary to serve the
      application shell, thumbnails, and static files.
    </LegalParagraph>
    <LegalParagraph>
      CanvasMath does not claim that no technical information is processed. Rather, the application
      shell is built without intentional third-party advertising, social-media embeds, or analytics
      scripts in the codebase reviewed for this policy.
    </LegalParagraph>

    <LegalHeading>5. Embedded Third-Party Simulations</LegalHeading>
    <LegalParagraph>
      Interactive modules are loaded from external sources identified in each module&apos;s
      configuration, including educational publishers, open repositories, and locally hosted
      simulation files. When a module workspace opens, the external resource runs inside a sandboxed
      iframe and may request additional network connections according to its own design.
    </LegalParagraph>
    <LegalParagraph>
      Those providers may collect or process information under their own privacy policies and
      technical controls. CanvasMath provides a curated access layer and fallback handling, but does
      not control and is not responsible for the data practices of external simulation systems.
    </LegalParagraph>

    <LegalHeading>6. Advertising, Analytics, and Social Media</LegalHeading>
    <LegalParagraph>
      The CanvasMath application shell does not intentionally load third-party advertising networks,
      social-media widgets, or third-party analytics scripts in the current codebase. Embedded
      simulations remain separate resources and may include their own interfaces, links, or network
      activity governed by their providers.
    </LegalParagraph>

    <LegalHeading>7. Children and School Use</LegalHeading>
    <LegalParagraph>
      CanvasMath is intended for educational use in K-12 and classroom settings. Because public
      modules do not require CanvasMath account registration, schools and families should review
      module sources, network policies, and device settings before classroom deployment. Parents,
      educators, and administrators may contact CanvasMath with questions about how the platform
      presents embedded resources.
    </LegalParagraph>
    <LegalParagraph>
      This section describes design intent and observable implementation. It does not assert full
      regulatory certification or guaranteed compliance with specific privacy laws.
    </LegalParagraph>

    <LegalHeading>8. Data Retention and Device Controls</LegalHeading>
    <LegalParagraph>
      Locally stored learning history persists until you clear browser storage or until the browser
      removes it according to its own retention rules. CanvasMath does not provide a server-side
      account dashboard for deleting learning history because that history is stored on the device.
    </LegalParagraph>
    <LegalParagraph>
      Schools and families can use standard browser, device, and network controls to limit storage,
      block external domains, or supervise module access where appropriate.
    </LegalParagraph>

    <LegalHeading>9. External Links</LegalHeading>
    <LegalParagraph>
      Module workspaces and informational pages may link to external websites, including original
      simulation sources opened in a new browser tab. CanvasMath does not control the content,
      security, or privacy practices of those external sites.
    </LegalParagraph>

    <LegalHeading>10. Policy Updates</LegalHeading>
    <LegalParagraph>
      CanvasMath may update this Privacy Policy to reflect platform changes, module sources, or
      legal requirements. The &ldquo;Last updated&rdquo; date at the top of this policy will change
      when revisions are published.
    </LegalParagraph>

    <LegalHeading>11. Privacy Contact</LegalHeading>
    <LegalParagraph>
      Parents, educators, and users may contact CanvasMath about privacy questions, embedded module
      sources, or local storage behavior:
    </LegalParagraph>
    <p className="text-sm leading-relaxed">
      <MailtoLink email={PRIVACY_CONTACT_EMAIL} />
    </p>
  </LegalDocument>
);

const termsBody = (
  <LegalDocument>
    <LegalParagraph>
      <strong>Last updated: June 14, 2026.</strong>
    </LegalParagraph>

    <LegalHeading>1. Educational Purpose</LegalHeading>
    <LegalParagraph>
      CanvasMath provides a curated access layer to interactive mathematics and STEM simulations
      intended for learning, exploration, and classroom support. The platform organizes modules,
      presents thumbnails and descriptions, and opens embedded workspaces for educational use.
    </LegalParagraph>

    <LegalHeading>2. Permitted Use</LegalHeading>
    <LegalParagraph>
      You may access the public CanvasMath platform for personal, classroom, homeschool, and other
      lawful educational purposes consistent with applicable school policies and network rules.
      Educators may direct students to specific modules as part of instructional activities.
    </LegalParagraph>

    <LegalHeading>3. Prohibited Conduct</LegalHeading>
    <LegalParagraph>You must not:</LegalParagraph>
    <LegalList
      items={[
        "Attempt to damage, overload, or disrupt CanvasMath services or hosting infrastructure.",
        "Use automated means to scrape, harvest, or extract platform content in a manner that interferes with normal operation.",
        "Attempt to circumvent access controls, iframe sandbox restrictions, or security measures.",
        "Misrepresent affiliation with CanvasMath or misuse contact channels for unlawful purposes.",
      ]}
    />

    <LegalHeading>4. Third-Party Simulations and External Resources</LegalHeading>
    <LegalParagraph>
      Simulations are provided by external owners and may be subject to their own terms, licenses,
      attribution requirements, and availability. Inclusion of a resource in the CanvasMath catalog
      does not imply ownership, endorsement, or an operational partnership with the original
      provider.
    </LegalParagraph>
    <LegalParagraph>
      Your use of an embedded simulation may also be governed by the external provider&apos;s terms.
      CanvasMath does not grant you separate rights to third-party content beyond what those
      providers make available.
    </LegalParagraph>

    <LegalHeading>5. Intellectual Property</LegalHeading>
    <LegalParagraph>
      CanvasMath branding, site structure, curated presentation, and original supporting materials
      are protected by applicable intellectual-property laws. Third-party simulations, logos, and
      source materials remain the property of their respective owners. Do not remove attribution or
      reuse external simulation assets outside the permissions granted by their owners.
    </LegalParagraph>

    <LegalHeading>6. Availability and Changes</LegalHeading>
    <LegalParagraph>
      CanvasMath may add, modify, reorganize, or remove modules, descriptions, thumbnails, or
      platform features. External simulation URLs may change, become unavailable, or be blocked by
      network policies without notice.
    </LegalParagraph>

    <LegalHeading>7. No Warranty</LegalHeading>
    <LegalParagraph>
      CanvasMath is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis for
      educational access. CanvasMath does not warrant uninterrupted service, error-free operation,
      or continued availability of any specific external simulation.
    </LegalParagraph>

    <LegalHeading>8. Limitation of Responsibility</LegalHeading>
    <LegalParagraph>
      To the extent permitted by applicable law, CanvasMath is not responsible for losses arising
      from external provider outages, network filtering, device limitations, third-party content, or
      use of the platform outside its intended educational context. Nothing in these Terms limits
      responsibilities that cannot be limited under applicable law.
    </LegalParagraph>

    <LegalHeading>9. Links to External Services</LegalHeading>
    <LegalParagraph>
      CanvasMath may display links that open external websites in a new browser tab, including
      original simulation sources. CanvasMath does not control and is not responsible for external
      services, their security practices, or their content.
    </LegalParagraph>

    <LegalHeading>10. Contact</LegalHeading>
    <LegalParagraph>Questions about these Terms of Service may be sent to:</LegalParagraph>
    <p className="text-sm leading-relaxed">
      <MailtoLink email={GENERAL_CONTACT_EMAIL} />
    </p>
  </LegalDocument>
);

const aboutBody = (
  <LegalDocument>
    <LegalHeading>1. About CanvasMath</LegalHeading>
    <LegalParagraph>
      CanvasMath is a curated visual mathematics learning workspace designed to help students and
      educators discover interactive mathematics and STEM resources. The platform presents
      simulations in a compact catalog and opens each module directly in an embedded workspace.
    </LegalParagraph>

    <LegalHeading>2. Who It Is For</LegalHeading>
    <LegalParagraph>
      CanvasMath supports K-12 learners, teachers, families, and informal learning environments
      looking for structured access to interactive mathematics tools. Public modules do not require
      a CanvasMath account to open.
    </LegalParagraph>

    <LegalHeading>3. What the Platform Provides</LegalHeading>
    <LegalList
      items={[
        "A searchable catalog of interactive simulation modules.",
        "Direct module workspaces with reload, fullscreen, and external-source fallback controls.",
        "Locally stored learning-history indicators on the device when that feature is used.",
        "Education-oriented presentation designed for classroom and home study contexts.",
      ]}
    />

    <LegalHeading>4. Content and Source Transparency</LegalHeading>
    <LegalParagraph>
      Modules are drawn from recognized educational sources, open repositories, and locally hosted
      simulation files identified in module metadata. CanvasMath curates presentation and
      navigation, but external providers remain responsible for their simulation content, licensing,
      and technical behavior inside embedded workspaces.
    </LegalParagraph>

    <LegalHeading>5. Accessibility and Classroom Devices</LegalHeading>
    <LegalParagraph>
      The homepage and module shell are designed for use on Chromebooks, tablets, laptops, and
      desktop screens. Keyboard focus states, semantic navigation, and readable module labels
      support classroom deployment, though individual embedded simulations may vary in accessibility
      features depending on their source.
    </LegalParagraph>

    <LegalHeading>6. Contact</LegalHeading>
    <LegalParagraph>General and content inquiries:</LegalParagraph>
    <p className="text-sm leading-relaxed">
      <MailtoLink email={GENERAL_CONTACT_EMAIL} />
    </p>
    <LegalParagraph>Privacy inquiries:</LegalParagraph>
    <p className="text-sm leading-relaxed">
      <MailtoLink email={PRIVACY_CONTACT_EMAIL} />
    </p>
  </LegalDocument>
);

export const legalContent = {
  privacy: {
    title: "Privacy Policy",
    description:
      "How CanvasMath handles local learning data, embedded resources, and privacy-related inquiries.",
    body: privacyBody,
  },
  terms: {
    title: "Terms of Service",
    description:
      "Conditions governing access to CanvasMath and its interactive educational resources.",
    body: termsBody,
  },
  about: {
    title: "About & Contact",
    description:
      "Information about CanvasMath, its educational purpose, content approach, and contact channels.",
    body: aboutBody,
  },
} as const;

export type LegalContentKey = keyof typeof legalContent;
