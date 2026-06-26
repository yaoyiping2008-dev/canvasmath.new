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
      <strong>Last updated: June 26, 2026.</strong>
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

    <LegalHeading>3. Technical and Essential Data</LegalHeading>
    <LegalParagraph>
      Like most websites, CanvasMath involves routine technical processing when you request pages
      and assets. Depending on your network path and hosting configuration, this may include
      standard web-server logs, IP addresses, browser and device information, connection metadata,
      requested URLs, timestamps, and content-delivery information necessary to serve the
      application shell, thumbnails, and static files.
    </LegalParagraph>
    <LegalParagraph>
      CanvasMath does not currently provide public user accounts or a server-side learning-history
      dashboard.
    </LegalParagraph>

    <LegalHeading>4. Third-Party Advertising and Cookies</LegalHeading>
    <LegalParagraph>
      CanvasMath may use third-party advertising services, including Google AdSense, to help support
      free access to the platform.
    </LegalParagraph>
    <LegalParagraph>
      If advertising is enabled, third-party vendors, including Google, may use cookies, device
      information, IP addresses, or similar technologies to deliver, measure, limit the frequency
      of, and protect advertisements from invalid activity. Depending on the user&apos;s location,
      consent choices, and applicable age-related treatment, advertisements may be personalized,
      non-personalized, or limited.
    </LegalParagraph>
    <LegalParagraph>
      Google and its advertising partners may use advertising cookies to serve advertisements based
      on a user&apos;s previous visits to CanvasMath or other websites. Users may manage
      personalized advertising through Google Ads Settings and may also use applicable industry
      advertising opt-out tools.
    </LegalParagraph>
    <LegalParagraph>
      Where consent is required, CanvasMath will use an appropriate consent-management mechanism
      before requesting personalized advertising. For users in the European Economic Area, the
      United Kingdom, and Switzerland, CanvasMath intends to use a Google-certified consent
      management platform where required.
    </LegalParagraph>
    <LegalParagraph>
      If advertising providers other than Google are enabled, CanvasMath may update this Policy to
      identify those providers and provide appropriate privacy and opt-out information.
    </LegalParagraph>

    <LegalHeading>5. Embedded and Locally Hosted Modules</LegalHeading>
    <LegalParagraph>
      Interactive modules may be loaded from educational publishers, open-source projects, external
      repositories, and locally hosted files.
    </LegalParagraph>
    <LegalParagraph>
      A locally hosted module may still connect to third-party content-delivery networks, media
      hosts, analytics providers, advertising services, game services, or other external endpoints
      included in the original module code.
    </LegalParagraph>
    <LegalParagraph>
      External and embedded services may process technical information according to their own
      privacy policies and technical controls. CanvasMath reviews module behavior where practical
      but does not control every external request initiated by third-party module code.
    </LegalParagraph>
    <LegalParagraph>
      Users, parents, educators, and school administrators should review module sources and network
      activity before broad classroom deployment.
    </LegalParagraph>

    <LegalHeading>6. Children and School Use</LegalHeading>
    <LegalParagraph>
      CanvasMath is designed for students, educators, families, and general educational audiences.
      Some parts of the platform may be used by or directed toward children under the age of 13.
    </LegalParagraph>
    <LegalParagraph>
      CanvasMath does not require a public user account and does not knowingly ask children to
      submit their name, email address, school name, physical address, telephone number, or other
      direct personal identifiers to access public modules.
    </LegalParagraph>
    <LegalParagraph>
      On pages or advertising requests treated as child-directed, CanvasMath requests appropriate
      child-directed advertising treatment and does not request interest-based advertising or
      remarketing for those requests.
    </LegalParagraph>
    <LegalParagraph>
      Parents, educators, and school administrators should review individual module sources,
      external network connections, device settings, and school policies before assigning modules to
      students.
    </LegalParagraph>
    <LegalParagraph>
      Third-party modules may have their own data practices. Questions or concerns about a module
      may be sent to <MailtoLink email={PRIVACY_CONTACT_EMAIL} />.
    </LegalParagraph>

    <LegalHeading>7. Cookie and Device Controls</LegalHeading>
    <LegalParagraph>
      Users may restrict, block, or delete cookies through their browser or device settings.
      Blocking cookies or external resources may affect the availability of advertisements, embedded
      modules, media files, or other website functionality.
    </LegalParagraph>
    <LegalParagraph>
      Schools and families may also use browser, device, content-filtering, and network controls to
      limit storage, block external domains, or supervise module access where appropriate.
    </LegalParagraph>

    <LegalHeading>8. External Links</LegalHeading>
    <LegalParagraph>
      Module workspaces and informational pages may link to external websites, including original
      simulation sources opened in a new browser tab. CanvasMath does not control the content,
      security, or privacy practices of those external sites.
    </LegalParagraph>

    <LegalHeading>9. Policy Updates</LegalHeading>
    <LegalParagraph>
      CanvasMath may update this Privacy Policy to reflect platform changes, module sources, or
      legal and advertising compliance requirements. The &ldquo;Last updated&rdquo; date at the top
      of this policy will change when revisions are published.
    </LegalParagraph>

    <LegalHeading>10. Privacy Contact</LegalHeading>
    <LegalParagraph>
      Parents, educators, and users may contact CanvasMath about privacy questions, embedded module
      sources, cookies, or technical data processing:
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
        "An education-oriented presentation designed for classroom and home study contexts.",
        "Free public access that may be supported by advertising after appropriate privacy controls are enabled.",
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
      "How CanvasMath handles cookies, embedded resources, technical data, and privacy-related inquiries.",
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
