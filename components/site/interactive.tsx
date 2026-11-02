"use client";
import { useState, useEffect, useRef } from "react";
import Link from "@/components/site/link";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ArrowUp,
  Check,
  Search,
  ShieldCheck,
  Building2,
  ChartNoAxesCombined,
  Rocket,
  ReceiptText,
  BookOpen,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { services, firm, partners, type Article } from "@/content/site";
export function ServiceIcon({
  name,
  size = 27,
}: {
  name: string;
  size?: number;
}) {
  const Icon =
    {
      rocket: Rocket,
      receipt: ReceiptText,
      shield: ShieldCheck,
      book: BookOpen,
      chart: ChartNoAxesCombined,
      building: Building2,
    }[name] || BookOpen;
  return <Icon size={size} strokeWidth={1.4} />;
}
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="VVK & Associates home">
      <img
        className="brand-logo"
        src="/images/ca-logo.png"
        alt="CA logo"
        width={62}
        height={62}
      />
      <span className="brand-name">
        VVK & ASSOCIATES<small>CHARTERED ACCOUNTANTS</small>
      </span>
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [path, setPath] = useState("/");
  useEffect(() => {
    setPath(window.location.pathname);
  }, []);
  const previousPath = useRef(path);
  const trigger = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    if (previousPath.current !== path) {
      setOpen(false);
      setDropdown(false);
      previousPath.current = path;
    }
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (e.key === "Tab") {
        const els = nav.current?.querySelectorAll<HTMLElement>("a,button");
        if (!els?.length) return;
        const first = els[0],
          last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          trigger.current?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          trigger.current?.focus();
        } else if (document.activeElement === trigger.current) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        }
      }
    };
    document.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = prior;
      document.removeEventListener("keydown", handle);
    };
  }, [open]);
  return (
    <header className="header">
      <Brand />
      <button
        ref={trigger}
        className="menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        ref={nav}
        id="main-nav"
        className={open ? "navigation is-open" : "navigation"}
        aria-label="Main navigation"
      >
        <Link className={path === "/" ? "active" : ""} href="/">
          Home
        </Link>
        <Link className={path === "/about" ? "active" : ""} href="/about">
          About Us
        </Link>
        <div
          className="nav-services"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setDropdown(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setDropdown(false);
              e.currentTarget.querySelector("button")?.focus();
            }
          }}
        >
          <button
            className={path.startsWith("/services") ? "active" : ""}
            aria-expanded={dropdown}
            aria-controls="service-menu"
            onClick={() => setDropdown(!dropdown)}
          >
            Our Services <ChevronDown size={13} />
          </button>
          {dropdown && (
            <div className="service-menu" id="service-menu">
              <Link href="/services">
                Explore all services <ArrowUpRight size={16} />
              </Link>
              {services.map((s) => (
                <Link key={s.slug} href={"/services/" + s.slug}>
                  {s.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link className={path.startsWith("/team") ? "active" : ""} href="/team">
          Our Team
        </Link>
        <Link
          className={path.startsWith("/insights") ? "active" : ""}
          href="/insights"
        >
          Insights
        </Link>
        <Link className={path === "/contact" ? "active" : ""} href="/contact">
          Contact Us
        </Link>
        <Link href="/consultation" className="button nav-cta">
          Book a Consultation <ArrowUpRight size={16} />
        </Link>
      </nav>
    </header>
  );
}
const panels = [
  {
    label: "Build.",
    sub: "A strong beginning.",
    image: "/images/desk.jpg",
    alt: "Illustrative business advisory discussion over financial documents",
    link: "/services/startup-advisory",
    tag: "START WITH CLARITY",
  },
  {
    label: "Grow.",
    sub: "With a clearer perspective.",
    image: "/images/financial-documents.jpg",
    alt: "Financial records reviewed with a calculator and laptop",
    link: "/services/virtual-cfo",
    tag: "PLAN FOR WHAT’S NEXT",
  },
  {
    label: "Thrive.",
    sub: "Confidence in every detail.",
    image: "/images/accounting-review.jpg",
    alt: "An accountant checking documents with a calculator",
    link: "/services/audit-assurance",
    tag: "STAY ONE STEP AHEAD",
  },
];
export function HeroPanels() {
  const [active, setActive] = useState(1);
  return (
    <div className="hero-panels">
      {panels.map((p, i) => (
        <div
          key={p.label}
          className={"hero-panel " + (active === i ? "expanded" : "")}
          onMouseEnter={() => setActive(i)}
        >
          <img
            src={p.image}
            alt={p.alt}
            fetchPriority={i === 1 ? "high" : "auto"}
          />
          <button
            className="panel-activate"
            aria-label={`Explore ${p.label} ${p.sub}`}
            aria-expanded={active === i}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <span className="panel-tag">{p.tag}</span>
            <span className="panel-label">{p.label}</span>
          </button>
          {active === i && (
            <div className="panel-bottom">
              <span>{p.sub}</span>
              <Link href={p.link} aria-label={p.label + " Explore service"}>
                <ArrowUpRight size={24} />
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export function ServiceFinder() {
  const [value, setValue] = useState("");
  return (
    <form
      className="service-finder"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.assign(value ? "/services/" + value : "/services");
      }}
    >
      <label htmlFor="service-finder">How can we help you?</label>
      <div>
        <select
          id="service-finder"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="">Find the right service</option>
          {services.map((s) => (
            <option value={s.slug} key={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
        <button aria-label="Explore selected service">
          <ArrowUpRight size={25} />
        </button>
      </div>
    </form>
  );
}
const serviceHighlights: Record<string, string> = {
  "startup-advisory": "Strategy · Planning · Funding readiness",
  taxation: "Income Tax · GST · International tax",
  "audit-assurance": "Statutory audit · Controls · Assurance",
  "international-bookkeeping": "Ledgers · Reconciliation · Reporting",
  "virtual-cfo": "Cash flow · Forecasting · Financial strategy",
  "business-incorporation": "Private limited · LLP · Business structure",
};
const servicePerspectives: Record<
  string,
  { label: string; title: string; accent: string; description: string }
> = {
  "All services": {
    label: "ONE CONNECTED PERSPECTIVE",
    title: "Your business.",
    accent: "A clearer way forward.",
    description:
      "The right financial advice, at the right stage of your journey.",
  },
  Build: {
    label: "START WITH A STRONG FOUNDATION",
    title: "Big ideas.",
    accent: "Considered beginnings.",
    description:
      "Turn your plans into a business with a clear structure and financial direction.",
  },
  Comply: {
    label: "CONFIDENCE IN THE DETAILS",
    title: "Clear records.",
    accent: "Informed decisions.",
    description:
      "Navigate tax, reporting and assurance with a thoughtful professional perspective.",
  },
  Manage: {
    label: "SEE THE BIGGER PICTURE",
    title: "Better visibility.",
    accent: "A stronger next step.",
    description:
      "Connect everyday accounting with the financial decisions that shape your future.",
  },
};
export function ServicesGrid() {
  const [cat, setCat] = useState("All services");
  const visible = services.filter(
    (s) => cat === "All services" || s.category === cat,
  );
  const perspective = servicePerspectives[cat];
  return (
    <div className="expertise-browser">
      <div className="expertise-toolbar">
        <div
          className="expertise-filters"
          role="group"
          aria-label="Filter services"
        >
          {["All services", "Build", "Comply", "Manage"].map((c) => (
            <button
              key={c}
              className={cat === c ? "selected" : ""}
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
            >
              {c}
              <span>{c === "All services" ? "06" : "02"}</span>
            </button>
          ))}
        </div>
        <span className="expertise-count" role="status">
          {String(visible.length).padStart(2, "0")} areas of expertise{" "}
          <span aria-hidden="true">↙</span>
        </span>
      </div>
      <div className="expertise-layout">
        <aside className="expertise-feature">
          <div className="expertise-feature-copy">
            <span className="expertise-kicker">
              <span />
              {perspective.label}
            </span>
            <h3>
              {perspective.title}
              <br />
              <em>{perspective.accent}</em>
            </h3>
            <p>{perspective.description}</p>
            <Link href="/consultation" className="expertise-consult">
              Let’s find your next step{" "}
              <span>
                <ArrowUpRight size={18} />
              </span>
            </Link>
          </div>
          <div className="expertise-feature-image">
            <img
              src="/images/accounting-review.jpg"
              alt="Accounting documents, calculator and organised financial records"
              loading="lazy"
            />
            <div className="expertise-feature-caption">
              <span>VVK & ASSOCIATES</span>
              <span>Clarity. Confidence. Growth.</span>
            </div>
          </div>
        </aside>
        <div className="expertise-grid">
          {visible.map((s) => (
            <Link
              href={"/services/" + s.slug}
              key={s.slug}
              className="expertise-card"
            >
              <div className="expertise-card-top">
                <span className="expertise-icon">
                  <ServiceIcon name={s.icon} size={25} />
                </span>
                <span className="expertise-category">{s.category}</span>
                <span className="expertise-number">
                  0{services.indexOf(s) + 1}
                </span>
              </div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <div className="expertise-card-footer">
                <span>{serviceHighlights[s.slug]}</span>
                <span className="expertise-card-arrow" aria-hidden="true">
                  <ArrowUpRight size={19} />
                </span>
              </div>
              <span className="sr-only">Explore {s.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="expertise-bottom">
        <span>
          <ShieldCheck size={16} />
          Partner-led advice. Personal attention.
        </span>
        <Link href="/contact">
          Not sure where to begin?{" "}
          <span>
            Talk to us <ArrowRight size={15} />
          </span>
        </Link>
      </div>
    </div>
  );
}
export function TeamCards({ expand = false }: { expand?: boolean }) {
  const [expanded, setExpanded] = useState<string[]>([]);
  return (
    <div className="team-grid">
      {partners.map((p, i) => (
        <article className="team-card" key={p.slug}>
          <Link
            href={"/team/" + p.slug}
            className={"partner-portrait portrait-" + i}
            aria-label={"View " + p.name + " profile"}
          >
            <span className="portrait-monogram">{p.initials}</span>
            <span className="portrait-caption">PARTNER / 0{i + 1}</span>
            <ArrowUpRight size={25} />
          </Link>
          <div className="partner-details">
            <span className="eyebrow">{p.role}</span>
            <h3>
              <Link href={"/team/" + p.slug}>{p.name}</Link>
            </h3>
            <div className="qualification">{p.qualification}</div>
            <p>{expand && p.fullBio ? p.fullBio[0] : p.bio}</p>
            {expand ? (
              <>
                <button
                  className="text-link"
                  aria-expanded={expanded.includes(p.slug)}
                  aria-controls={"bio-" + p.slug}
                  onClick={() =>
                    setExpanded(
                      expanded.includes(p.slug)
                        ? expanded.filter((s) => s !== p.slug)
                        : [...expanded, p.slug],
                    )
                  }
                >
                  {expanded.includes(p.slug) ? "Read less" : "Read more"}{" "}
                  <ChevronDown size={16} />
                </button>
                {expanded.includes(p.slug) && (
                  <div id={"bio-" + p.slug}>
                    {(p.fullBio ? p.fullBio.slice(1) : [p.more]).map(
                      (paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ),
                    )}
                  </div>
                )}
              </>
            ) : (
              <Link className="text-link" href={"/team/" + p.slug}>
                View profile <ArrowUpRight size={17} />
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
export function InsightCards({ articles }: { articles: Article[] }) {
  return (
    <div className="insight-grid">
      {articles.map((a) => (
        <article className="insight-card" key={a.slug}>
          <Link href={"/insights/" + a.slug} className="insight-image">
            <img src={a.image} alt="" loading="lazy" />
            <span>{a.category}</span>
          </Link>
          <div className="article-meta">
            {new Date(a.date + "T00:00:00Z").toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            })}
            <span>
              {Math.max(1, Math.ceil(a.body.split(/\s+/).length / 200))} min
              read
            </span>
          </div>
          <h3>
            <Link href={"/insights/" + a.slug}>{a.title}</Link>
          </h3>
          <p>{a.excerpt}</p>
          <Link className="text-link" href={"/insights/" + a.slug}>
            Read insight <ArrowUpRight size={17} />
          </Link>
        </article>
      ))}
    </div>
  );
}
export function InsightsExplorer({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All insights");
  const result = articles.filter(
    (a) =>
      (cat === "All insights" || a.category === cat) &&
      (a.title + " " + a.excerpt + " " + a.body)
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="insight-tools">
        <div
          className="filter-tabs"
          role="group"
          aria-label="Article categories"
        >
          {["All insights", ...new Set(articles.map((a) => a.category))].map(
            (c) => (
              <button
                className={c === cat ? "selected" : ""}
                key={c}
                aria-pressed={c === cat}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ),
          )}
        </div>
        <label className="search">
          <Search size={18} />
          <span className="sr-only">Search articles</span>
          <input
            placeholder="Search insights…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <p className="sr-only" aria-live="polite">
        {result.length} articles found
      </p>
      {result.length ? (
        <InsightCards articles={result} />
      ) : (
        <div className="empty-state">
          <h3>No insights found.</h3>
          <p>Try another search or browse all categories.</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setCat("All insights");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
export function EnquiryForm({
  consultation = false,
}: {
  consultation?: boolean;
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "unconfigured"
  >("idle");
  const [message, setMessage] = useState("");
  const [mail, setMail] = useState("mailto:" + firm.email);
  const [started] = useState(Date.now());
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setMail(
      "mailto:" +
        firm.email +
        "?subject=" +
        encodeURIComponent(
          (consultation ? "Consultation request: " : "Enquiry: ") +
            data.service,
        ) +
        "&body=" +
        encodeURIComponent(
          `Name: ${data.name}\nEmail: ${data.email}\nMobile: ${data.phone}\nService: ${data.service}\n\n${data.message}`,
        ),
    );
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          started,
          kind: consultation ? "consultation" : "enquiry",
        }),
      });
      const result = (await res.json()) as { code?: string; message?: string };
      if (!res.ok) {
        setStatus(result.code === "NOT_CONFIGURED" ? "unconfigured" : "error");
        setMessage(
          result.message ||
            "Your message could not be sent. Please call or email us.",
        );
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        "We could not reach the server. Please try again or contact us directly.",
      );
    }
  }
  return (
    <form className="enquiry-form" onSubmit={submit}>
      <div className="form-heading">
        <h2>
          {consultation
            ? "Let’s start a conversation."
            : "Tell us how we can help."}
        </h2>
        <p>
          {consultation
            ? "Share your requirements. Our team will contact you to discuss a suitable time."
            : "A little context helps us connect you with the right professional."}
        </p>
      </div>
      <div className="form-row">
        <label>
          Full name <span>*</span>
          <input
            name="name"
            required
            autoComplete="name"
            minLength={2}
            maxLength={120}
            placeholder="Your full name"
          />
        </label>
        <label>
          Email address <span>*</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={200}
            placeholder="you@company.com"
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Mobile number <span>*</span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            pattern="[+0-9 ()-]{7,20}"
            title="Use 7–20 characters: digits, spaces, +, brackets or hyphens."
            maxLength={20}
            placeholder="+91"
          />
        </label>
        <label>
          Service required <span>*</span>
          <select name="service" required defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug}>{s.full}</option>
            ))}
            <option>General consultation</option>
          </select>
        </label>
      </div>
      <label>
        Your message <span>*</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          placeholder="Tell us a little about your requirements. Please do not include sensitive financial documents."
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this blank
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>
          I agree to the <Link href="/privacy">Privacy Policy</Link> and consent
          to being contacted about my enquiry.
        </span>
      </label>
      <button className="button" disabled={status === "sending"}>
        {status === "sending"
          ? "Sending…"
          : consultation
            ? "Request a consultation"
            : "Send enquiry"}{" "}
        <ArrowUpRight size={18} />
      </button>
      <p className="form-note">
        Consultations are confirmed personally by our team. Submitting this form
        does not book an appointment.
      </p>
      <div aria-live="polite">
        {status === "success" && (
          <div className="form-message success">
            <Check size={20} />
            <span>
              Your message has been accepted for email delivery. Our team will
              respond using the contact details you provided.
            </span>
          </div>
        )}
        {(status === "error" || status === "unconfigured") && (
          <div className="form-message error">
            <p>{message}</p>
            <a className="text-link" href={mail}>
              Open your email app <ArrowUpRight size={16} />
            </a>
            <a
              className="text-link"
              href={firm.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact on WhatsApp <ArrowUpRight size={16} />
            </a>
          </div>
        )}
      </div>
    </form>
  );
}
export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className="floating-actions">
      {show && (
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth",
            })
          }
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
      <a
        href={firm.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp"
        aria-label="Contact VVK on WhatsApp"
      >
        <img
          src="/images/whatsapp.svg"
          width={25}
          height={25}
          alt=""
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <Brand />
          <p>
            Clarity for your business.
            <br />
            Confidence for the road ahead.
          </p>
          <a className="footer-email" href={"mailto:" + firm.email}>
            {firm.email} <ArrowUpRight size={17} />
          </a>
        </div>
        <div>
          <h3>Explore</h3>
          {[
            ["About us", "/about"],
            ["Our team", "/team"],
            ["Insights & blogs", "/insights"],
            ["Contact us", "/contact"],
          ].map(([n, h]) => (
            <Link key={h} href={h}>
              {n}
            </Link>
          ))}
        </div>
        <div>
          <h3>Our expertise</h3>
          {services.map((s) => (
            <Link href={"/services/" + s.slug} key={s.slug}>
              {s.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>Let’s connect</h3>
          <a href="tel:+919990860356">{firm.phone}</a>
          <a href="tel:+918929295155">{firm.phone2}</a>
          <p>{firm.address}</p>
          <a
            href={firm.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Get directions <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} VVK & Associates. All rights reserved.
        </span>
        <div>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Use</Link>
          <Link href="/privacy#cookies">Cookie information</Link>
        </div>
        <span className="india-mark">
          Based in India. Thinking ahead. <i />
        </span>
      </div>
    </footer>
  );
}
