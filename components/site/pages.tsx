import Link from "@/components/site/link";
import { PartnerPhoto } from "./partner-photo";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Compass,
  Layers,
  Handshake,
  Building2,
  Landmark,
  Factory,
  Zap,
} from "lucide-react";
import {
  services,
  partners,
  firm,
  processSteps,
  type Article,
} from "@/content/site";
import {
  HeroPanels,
  ServiceFinder,
  ServicesGrid,
  TeamCards,
  InsightCards,
  InsightsExplorer,
  EnquiryForm,
  ServiceIcon,
} from "./interactive";
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span className="gold-line" />
      {children}
    </div>
  );
}
export function CTA() {
  return (
    <section className="consultation-cta">
      <div>
        <Eyebrow>A CONVERSATION IS A GOOD PLACE TO START</Eyebrow>
        <h2>
          Navigate financial complexity.
          <br />
          <em>Move forward with confidence.</em>
        </h2>
      </div>
      <Link className="button light" href="/consultation">
        Speak with our professionals <ArrowUpRight size={19} />
      </Link>
      <span className="cta-watermark" aria-hidden="true">
        VVK
      </span>
    </section>
  );
}
export function Process() {
  return (
    <section className="section process-section">
      <div className="section-heading">
        <div>
          <Eyebrow>THE WAY WE WORK</Eyebrow>
          <h2>
            A clear process.
            <br />
            <em>A lasting partnership.</em>
          </h2>
        </div>
        <p>
          Thoughtful advice begins with understanding.
          <br />
          Here’s how we move forward, together.
        </p>
      </div>
      <div className="process-grid">
        {processSteps.map(([title, desc], i) => (
          <div key={title}>
            <span className="step-number">
              0{i + 1}
              <ArrowRight size={20} />
            </span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export function HomePage({ articles }: { articles: Article[] }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <Eyebrow>CHARTERED ACCOUNTANTS · INDIA</Eyebrow>
          <h1>
            Clarity in
            <br />
            compliance.
            <br />
            Confidence
            <br />
            in <em>growth.</em>
          </h1>
          <p>
            Professional audit, taxation and financial advisory. A clearer way
            forward for your business.
          </p>
          <Link className="hero-consult text-link" href="/consultation">
            Schedule a consultation <ArrowUpRight size={19} />
          </Link>
          <ServiceFinder />
        </div>
        <HeroPanels />
      </section>
      <div className="hero-foot">
        <span>
          <span className="status-dot" /> YOUR BUSINESS. OUR PROFESSIONAL
          COMMITMENT.
        </span>
        <a href="#about" className="scroll-link">
          SCROLL TO DISCOVER <span>↓</span>
        </a>
      </div>
      <section className="section about-preview" id="about">
        <div className="about-image">
          <img
            src="/images/accounting-review.jpg"
            alt="Illustrative accounting review with documents and calculator"
            loading="lazy"
          />
          <span className="image-note">A FRESH PERSPECTIVE ON FINANCE.</span>
          <div className="about-seal">
            <span>Built on trust.</span>
            <em>Focused on you.</em>
            <ArrowUpRight size={25} />
          </div>
        </div>
        <div className="about-copy">
          <Eyebrow>MORE THAN NUMBERS</Eyebrow>
          <h2>
            Your ambitions.
            <br />
            <em>Our shared focus.</em>
          </h2>
          <p>
            Behind every balance sheet is a business with a story. We take the
            time to understand yours.
          </p>
          <p>
            At VVK & Associates, we bring audit, taxation, accounting and
            advisory together to help businesses and individuals navigate their
            financial responsibilities with clarity.
          </p>
          <div className="inline-values">
            <span>
              <Check size={16} /> Partner-led advice
            </span>
            <span>
              <Check size={16} /> Practical perspective
            </span>
          </div>
          <Link href="/about" className="button outline">
            Discover our firm <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section services-section" id="services">
        <div className="section-heading">
          <div>
            <Eyebrow>OUR EXPERTISE</Eyebrow>
            <h2>
              For every stage.
              <br />
              <em>For what’s next.</em>
            </h2>
          </div>
          <p>
            From your first business decision to the next chapter.
            <br />
            Considered financial support, under one roof.
          </p>
        </div>
        <ServicesGrid />
      </section>
      <section className="section why-section">
        <div>
          <Eyebrow>THE VVK APPROACH</Eyebrow>
          <h2>
            Good advice starts
            <br />
            with <em>understanding.</em>
          </h2>
          <p>
            Professional rigour, a personal approach and
            <br />a commitment to doing things with care.
          </p>
          <Link className="text-link" href="/about">
            What matters to us <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="values-grid">
          {[
            [
              Compass,
              "Professional expertise",
              "Advice shaped by technical knowledge and the context of your business.",
            ],
            [
              Layers,
              "Connected financial support",
              "Audit, tax, accounting and advisory considered as part of the same picture.",
            ],
            [
              Handshake,
              "Personalised client advisory",
              "A clear scope and thoughtful guidance built around your requirements.",
            ],
            [
              ShieldCheck,
              "Integrity at every step",
              "Careful handling of information, transparent communication and professional judgement.",
            ],
          ].map(([Icon, title, desc]) => {
            const I = Icon as typeof Compass;
            return (
              <div key={title as string}>
                <I size={25} strokeWidth={1.4} />
                <h3>{title as string}</h3>
                <p>{desc as string}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <Eyebrow>PEOPLE BEHIND THE PERSPECTIVE</Eyebrow>
            <h2>
              Three partners.
              <br />
              <em>One shared commitment.</em>
            </h2>
          </div>
          <Link className="text-link" href="/team">
            Meet our team <ArrowUpRight size={18} />
          </Link>
        </div>
        <TeamCards />
      </section>
      <section className="industries-section">
        <Eyebrow>EXPERIENCE ACROSS DIFFERENT WORLDS</Eyebrow>
        <div className="industries">
          {[
            [Landmark, "Banking & finance"],
            [Building2, "Infrastructure"],
            [Zap, "Power & energy"],
            [Factory, "Public sector"],
            [Compass, "Startups & MSMEs"],
          ].map(([Icon, label]) => {
            const I = Icon as typeof Compass;
            return (
              <div key={label as string}>
                <I size={24} strokeWidth={1.3} />
                <span>{label as string}</span>
              </div>
            );
          })}
        </div>
      </section>
      <Process />
      <section className="section insights-section">
        <div className="section-heading">
          <div>
            <Eyebrow>A LITTLE MORE CLARITY</Eyebrow>
            <h2>
              Ideas worth
              <br />
              <em>understanding.</em>
            </h2>
          </div>
          <Link href="/insights" className="text-link">
            Explore all insights <ArrowUpRight size={18} />
          </Link>
        </div>
        <InsightCards articles={articles.slice(0, 3)} />
      </section>
      <CTA />
    </>
  );
}
export function PageIntro({
  label,
  title,
  accent,
  desc,
}: {
  label: string;
  title: string;
  accent?: string;
  desc: string;
}) {
  return (
    <section className="page-intro">
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>{label}</span>
      </div>
      <Eyebrow>{label.toUpperCase()}</Eyebrow>
      <h1>
        {title}
        {accent && (
          <>
            <br />
            <em>{accent}</em>
          </>
        )}
      </h1>
      <p>{desc}</p>
    </section>
  );
}
export function ServicesPage() {
  return (
    <>
      <PageIntro
        label="Our services"
        title="Your next chapter."
        accent="Our professional perspective."
        desc="Six connected areas of expertise. Considered support for the decisions, details and responsibilities that shape your business."
      />
      <section className="section after-intro">
        <ServicesGrid />
      </section>
      <Process />
      <CTA />
    </>
  );
}
export function ServicePage({ slug }: { slug: string }) {
  const s = services.find((s) => s.slug === slug)!;
  return (
    <>
      <section className="service-hero">
        <div>
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <span>{s.name}</span>
          </div>
          <Eyebrow>{s.category.toUpperCase()} WITH CLARITY</Eyebrow>
          <h1>{s.full}</h1>
          <p>{s.desc}</p>
          <Link className="button" href="/consultation">
            Discuss your requirements <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="service-hero-image">
          <img
            src={
              s.category === "Build"
                ? "/images/accounting-review.jpg"
                : s.category === "Comply"
                  ? "/images/desk.jpg"
                  : "/images/financial-documents.jpg"
            }
            alt="Illustrative financial document review and advisory work"
          />
          <div>
            <ServiceIcon name={s.icon} size={36} />
            <span>THE VVK PERSPECTIVE</span>
          </div>
        </div>
      </section>
      <section className="section service-body">
        <div>
          <Eyebrow>THE BIGGER PICTURE</Eyebrow>
          <h2>
            Clarity in the details.
            <br />
            <em>Confidence in your decisions.</em>
          </h2>
          <p className="lead">{s.intro}</p>
          <h2 className="small-title">How we can help</h2>
          <div className="coverage-grid">
            {s.areas.map((a, i) => (
              <div key={a}>
                <span>0{i + 1}</span>
                <h3>{a}</h3>
              </div>
            ))}
          </div>
        </div>
        <aside className="service-aside">
          <ServiceIcon name={s.icon} size={32} />
          <h3>
            What this means
            <br />
            for your business
          </h3>
          {s.benefits.map((b) => (
            <p key={b}>
              <Check size={18} />
              {b}
            </p>
          ))}
          <Link href="/contact" className="button">
            Make an enquiry <ArrowUpRight size={17} />
          </Link>
          <small>
            The scope of each engagement is agreed after reviewing your
            requirements.
          </small>
        </aside>
      </section>
      <Process />
      <section className="section faq-section">
        <div>
          <Eyebrow>COMMON QUESTIONS</Eyebrow>
          <h2>
            A little more
            <br />
            <em>understanding.</em>
          </h2>
          <p>
            Have a different question?
            <br />
            <Link href="/contact" className="text-link">
              Let’s talk <ArrowUpRight size={16} />
            </Link>
          </p>
        </div>
        <div>
          {[
            ...s.faq,
            [
              "What happens after I get in touch?",
              "We discuss your requirements and available records, consider the relevant professional requirements and agree the scope and terms before commencing work.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="section related-services">
        <Eyebrow>CONNECTED EXPERTISE</Eyebrow>
        <h2>You may also need</h2>
        <div className="related-grid">
          {services
            .filter((x) => x.slug !== slug)
            .slice(0, 3)
            .map((x) => (
              <Link key={x.slug} href={"/services/" + x.slug}>
                <ServiceIcon name={x.icon} />
                <h3>{x.name}</h3>
                <ArrowUpRight size={20} />
              </Link>
            ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
export function AboutPage() {
  return (
    <>
      <PageIntro
        label="About us"
        title="A personal approach."
        accent="A professional commitment."
        desc="We are VVK & Associates, Chartered Accountants. We bring a considered perspective to the financial questions that matter to you."
      />
      <section className="about-wide">
        <img
          src="/images/accounting-review.jpg"
          alt="Professional reviewing organised accounting records"
        />
        <span>CLARITY. INTEGRITY. PERSPECTIVE.</span>
      </section>
      <section className="section editorial-grid">
        <div>
          <Eyebrow>OUR FIRM</Eyebrow>
          <h2>
            Built around
            <br />
            <em>your business.</em>
          </h2>
        </div>
        <div className="firm-copy">
          <p className="lead">
            Our work brings together audit, taxation, bookkeeping and financial
            advisory. Our approach begins with listening.
          </p>
          <p>
            We work with businesses and individuals to understand their
            requirements, organise financial information and approach compliance
            with care. Each engagement has a defined scope, clear
            responsibilities and a practical plan.
          </p>
          <p>
            Based in Noida, with a branch listed in Gurugram, our partners bring
            complementary experience across audit, corporate advisory, taxation
            and financial management.
          </p>
        </div>
      </section>
      <section className="section mission-grid">
        <article>
          <span>01 / OUR MISSION</span>
          <h2>
            Make complexity
            <br />
            <em>more understandable.</em>
          </h2>
          <p>
            Provide thoughtful financial, tax and advisory support that helps
            clients meet their responsibilities and make informed decisions.
          </p>
        </article>
        <article>
          <span>02 / OUR VISION</span>
          <h2>
            Build relationships
            <br />
            <em>that look ahead.</em>
          </h2>
          <p>
            Develop a practice recognised for professional care, clear
            communication and an enduring commitment to the people we advise.
          </p>
        </article>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <Eyebrow>OUR VALUES</Eyebrow>
            <h2>
              The principles behind
              <br />
              <em>every conversation.</em>
            </h2>
          </div>
        </div>
        <div className="process-grid">
          {[
            [
              "Integrity",
              "We place professional responsibilities and honest communication at the centre of our work.",
            ],
            [
              "Care",
              "We handle information thoughtfully and approach each engagement with attention to detail.",
            ],
            [
              "Clarity",
              "We explain our scope, findings and next steps in language you can understand.",
            ],
            [
              "Perspective",
              "We consider the business behind the records and the decisions that lie ahead.",
            ],
          ].map(([t, d]) => (
            <article key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <Eyebrow>OUR LEADERSHIP</Eyebrow>
            <h2>
              Complementary expertise.
              <br />
              <em>A shared approach.</em>
            </h2>
          </div>
        </div>
        <TeamCards />
      </section>
      <Process />
      <CTA />
    </>
  );
}
export function TeamPage() {
  return (
    <>
      <PageIntro
        label="Our team"
        title="People you can talk to."
        accent="Perspective you can build on."
        desc="Meet the professionals behind VVK & Associates. Complementary areas of expertise, with a shared commitment to professional care."
      />
      <section className="section after-intro">
        <TeamCards expand />
      </section>
      <CTA />
    </>
  );
}
export function PartnerPage({ slug }: { slug: string }) {
  const p = partners.find((p) => p.slug === slug)!;
  return (
    <>
      <section className="section partner-profile">
        {p.image ? (
          <div className="profile-portrait">
            <PartnerPhoto partner={p} priority />
          </div>
        ) : (
          <div className="large-monogram">
            <span>{p.initials}</span>
            <small>VVK & ASSOCIATES</small>
          </div>
        )}
        <div>
          <div className="breadcrumbs">
            <Link href="/team">Our team</Link>
            <span>/</span>
            <span>{p.name}</span>
          </div>
          <Eyebrow>{p.role.toUpperCase()}</Eyebrow>
          <h1>{p.name}</h1>
          {p.designation && (
            <p className="profile-designation">{p.designation}</p>
          )}
          <div className="profile-qualification">{p.qualification}</div>
          <h2>{p.focus}</h2>
          {(p.fullBio || [p.bio, p.more]).map((paragraph, index) => (
            <p key={index} className={index === 0 ? "lead" : undefined}>
              {paragraph}
            </p>
          ))}
          <Link href="/consultation" className="button">
            Request a conversation <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <CTA />
    </>
  );
}
export function InsightsPage({ articles }: { articles: Article[] }) {
  return (
    <>
      <PageIntro
        label="Insights & blogs"
        title="A thoughtful perspective."
        accent="A little more clarity."
        desc="Practical reading on business, reporting and financial organisation. Ideas to help you ask better questions and prepare for the next conversation."
      />
      <section className="section after-intro">
        <InsightsExplorer articles={articles} />
      </section>
      <CTA />
    </>
  );
}
export function ArticlePage({
  article: a,
  articles,
}: {
  article: Article;
  articles: Article[];
}) {
  return (
    <>
      <section className="article-heading">
        <div className="breadcrumbs">
          <Link href="/insights">Insights</Link>
          <span>/</span>
          <span>{a.category}</span>
        </div>
        <Eyebrow>{a.category.toUpperCase()}</Eyebrow>
        <h1>{a.title}</h1>
        <p>{a.excerpt}</p>
        <div className="article-meta">
          {a.author}
          <span>
            {new Date(a.date + "T00:00:00Z").toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            })}
          </span>
        </div>
      </section>
      <div className="article-cover">
        <img src={a.image} alt="Illustrative image accompanying the article" />
      </div>
      <article className="article-body">
        {a.body.split("\n\n").flatMap((block, i) => {
          if (!block.startsWith("## ")) return [<p key={`p-${i}`}>{block}</p>];
          const [heading, ...lines] = block.split("\n");
          return [
            <h2 key={`h-${i}`}>{heading.slice(3)}</h2>,
            ...(lines.length ? [<p key={`p-${i}`}>{lines.join("\n")}</p>] : []),
          ];
        })}
        <div className="editorial-note">
          This article provides general information, not advice on a particular
          transaction or legal position. Please discuss your circumstances with
          a qualified professional.
        </div>
        <Link className="text-link" href="/consultation">
          Discuss your requirements <ArrowUpRight size={18} />
        </Link>
      </article>
      <section className="section">
        <div className="section-heading">
          <h2>Continue exploring.</h2>
          <Link className="text-link" href="/insights">
            All insights <ArrowUpRight size={18} />
          </Link>
        </div>
        <InsightCards
          articles={articles.filter((x) => x.slug !== a.slug).slice(0, 3)}
        />
      </section>
    </>
  );
}
export function ContactPage({
  consultation = false,
}: {
  consultation?: boolean;
}) {
  return (
    <>
      <PageIntro
        label={consultation ? "Book a consultation" : "Contact us"}
        title={consultation ? "Your next step starts" : "Good conversations."}
        accent={
          consultation ? "with a conversation." : "Clearer possibilities."
        }
        desc={
          consultation
            ? "Tell us what you are working on. We’ll discuss your requirements and arrange a suitable time to connect."
            : "Whether you are starting a business, reviewing your finances or navigating compliance, we are here to listen."
        }
      />
      <section className="section contact-layout">
        <div className="contact-info">
          <Eyebrow>LET’S CONNECT</Eyebrow>
          <h2>
            We’re a call
            <br />
            <em>or a message away.</em>
          </h2>
          <a href={firm.phoneHref}>
            <Phone size={20} />
            <span>
              {firm.phone}
              <small>Call our team</small>
            </span>
            <ArrowUpRight size={18} />
          </a>
          <a href={"mailto:" + firm.email}>
            <Mail size={20} />
            <span>
              {firm.email}
              <small>Email your enquiry</small>
            </span>
            <ArrowUpRight size={18} />
          </a>
          <a href={firm.whatsapp} target="_blank" rel="noopener noreferrer">
            <span className="status-dot" />
            <span>
              Continue on WhatsApp<small>Connect with our team</small>
            </span>
            <ArrowUpRight size={18} />
          </a>
          <div className="contact-note">
            <ShieldCheck size={20} />
            <p>
              Please share only the information needed for your enquiry. Our
              team will discuss a suitable way to exchange confidential
              documents.
            </p>
          </div>
        </div>
        <EnquiryForm consultation={consultation} />
      </section>
      <section className="section office-section">
        <div className="section-heading">
          <div>
            <Eyebrow>OUR OFFICES</Eyebrow>
            <h2>
              Closer to
              <br />
              <em>your business.</em>
            </h2>
          </div>
        </div>
        <div className="office-grid">
          <article>
            <MapPin size={24} />
            <span className="eyebrow">HEAD OFFICE</span>
            <h3>Noida</h3>
            <p>{firm.address}</p>
            <a
              href={firm.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              View on Google Maps <ArrowUpRight size={18} />
            </a>
          </article>
          <article>
            <MapPin size={24} />
            <span className="eyebrow">BRANCH OFFICE</span>
            <h3>Gurugram</h3>
            <p>{firm.branch}</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Tower+B4+Spaze+IT+Park+Sector+49+Gurugram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              View on Google Maps <ArrowUpRight size={18} />
            </a>
            <small>Please call before visiting either office.</small>
          </article>
        </div>
      </section>
    </>
  );
}
export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  return (
    <>
      <PageIntro
        label={kind === "privacy" ? "Privacy policy" : "Terms of use"}
        title={
          kind === "privacy" ? "Your information." : "A clear understanding."
        }
        accent={kind === "privacy" ? "Handled with care." : "Before we begin."}
        desc="Information about using this website and contacting VVK & Associates."
      />
      <div className="article-body legal-body">
        {kind === "privacy" ? (
          <>
            <h2>Information you share</h2>
            <p>
              When you send an enquiry, we ask for your name, contact details,
              service requirement and message. We use this information to
              respond and discuss professional services. Please avoid sharing
              confidential documents or sensitive financial identifiers through
              the enquiry form.
            </p>
            <h2>How enquiries are handled</h2>
            <p>
              When online email delivery is configured, your enquiry is sent
              through our email delivery provider to the firm’s inbox. If it is
              unavailable, the website will explain this and offer email or
              WhatsApp options. Choosing these options opens the relevant
              service, whose own privacy terms apply.
            </p>
            <h2>Access and retention</h2>
            <p>
              Enquiry information is used for responding to your request and
              managing related professional discussions. Records may also need
              to be retained for applicable legal or professional requirements.
              Contact us to request access, correction or deletion, subject to
              those requirements.
            </p>
            <h2 id="cookies">Cookies and third-party services</h2>
            <p>
              This website does not set advertising or analytics cookies.
              Necessary security and hosting cookies may be used to provide the
              site. The content editor uses a necessary session cookie. No
              optional tracking is enabled, so a marketing-cookie consent banner
              is not required. Links to Google Maps and WhatsApp open only when
              you choose them.
            </p>
            <h2>Your choices</h2>
            <p>
              You can contact the firm by phone or email instead of using the
              form. For questions about your information, or to withdraw consent
              for further contact, write to{" "}
              <a href={"mailto:" + firm.email}>{firm.email}</a>.
            </p>
          </>
        ) : (
          <>
            <h2>General information</h2>
            <p>
              The material on this website is for general information. It is not
              a substitute for professional advice tailored to your
              circumstances, and should not be relied on as a statement of the
              law applicable to a specific matter.
            </p>
            <h2>Professional engagements</h2>
            <p>
              Sending an enquiry or requesting a consultation does not create a
              client relationship or confirm an appointment. Services begin only
              after relevant checks, scope and engagement terms have been
              agreed. No particular financial, tax or regulatory outcome is
              guaranteed.
            </p>
            <h2>Content and links</h2>
            <p>
              We aim to keep information useful and accurate. Circumstances and
              requirements can change. External links are provided for
              convenience; their content and privacy practices are controlled by
              their respective operators.
            </p>
            <h2>Intellectual property</h2>
            <p>
              Original website content and branding must not be reused without
              appropriate permission. Illustrative photography is used for
              visual context and does not depict the firm’s offices, team or
              clients.
            </p>
            <h2>Contact</h2>
            <p>
              Please direct questions about this website to{" "}
              <a href={"mailto:" + firm.email}>{firm.email}</a> or contact our
              Noida office.
            </p>
          </>
        )}
        <p className="form-note">Last updated: 2 November 2026.</p>
      </div>
    </>
  );
}
