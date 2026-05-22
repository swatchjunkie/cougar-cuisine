/* eslint-disable */
// Cougar Cuisine — Homepage components
// All sections export to window for use by app.jsx.

const { useState, useEffect } = React;

// -- Atoms --------------------------------------------------------------

function Button({ variant = "primary", size = "md", children, iconRight, onClick, type = "button", style: extra = {} }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    gap: 10, fontFamily: "Montserrat, sans-serif", fontWeight: 500,
    border: 0, borderRadius: 0, cursor: "pointer", whiteSpace: "nowrap",
    lineHeight: 1, letterSpacing: "0.01em",
    transition: "transform 200ms ease, background-color 200ms ease, box-shadow 200ms ease, color 200ms ease"
  };
  const sizes = {
    md: { padding: "16px 28px", fontSize: 15 },
    sm: { padding: "12px 22px", fontSize: 13 },
    lg: { padding: "20px 36px", fontSize: 16 }
  };
  const shadow =
    "inset 0 -2px 1px 0 rgba(9,2,2,.2), inset 0 32px 24px 0 rgba(255,255,255,.05), " +
    "inset 0 1px 1px 1px rgba(255,255,255,.2), inset 0 0 0 1px rgba(9,2,2,.15), 0 1px 2px 0 rgba(9,2,2,.15)";

  const variants = {
    primary: { background: "var(--cc-btn-bg, var(--cc-scheme-primary-bg, #6E1F28))", color: "var(--cc-btn-fg, var(--cc-scheme-primary-fg, #fff))", boxShadow: shadow },
    secondary: {
      background: "transparent",
      color: "var(--cc-scheme-fg, #090202)",
      border: "2px solid var(--cc-scheme-border, #090202)",
      padding: size === "sm" ? "10px 20px" : size === "lg" ? "18px 32px" : "14px 26px"
    },
    link: { background: "transparent", color: "inherit", padding: 0, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 6, textDecorationThickness: 1 }
  };

  const [hover, setHover] = useState(false);
  const style = { ...base, ...sizes[size], ...variants[variant], ...extra };
  if (hover && variant === "primary") style.transform = "translateY(-2px)";
  if (hover && variant === "secondary") style.background = "var(--cc-scheme-fg, #090202)", style.color = "var(--cc-scheme-bg, #fff)";

  return (
    <button type={type} onClick={onClick} style={style}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {children}
      {iconRight && <span className="mi mi-sm">{iconRight}</span>}
    </button>
  );
}

function ButtonStack({ children, dark = false, style = {} }) {
  const s = dark ? { "--cc-btn-bg": "#fff", "--cc-btn-fg": "#090202" } : {};
  return <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", ...s, ...style }}>{children}</div>;
}

function Eyebrow({ children }) {
  return <p className="eyebrow">{children}</p>;
}

// -- Navbar -------------------------------------------------------------

function Navbar() {
  const links = ["Home", "Experiences", "About", "Gallery", "Inquiry"];
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <header className="scheme-1" style={{
      position: "sticky", top: 0, zIndex: 100,
      borderBottom: "1px solid rgba(255,255,255,0.12)",
      backdropFilter: scrolled ? "blur(0)" : "none",
      transition: "background-color 300ms ease"
    }}>
      <div style={{
        maxWidth: "82rem", margin: "0 auto",
        display: "grid", gridTemplateColumns: "auto 1fr auto",
        alignItems: "center", padding: "0 5%",
        minHeight: scrolled ? 68 : 84,
        transition: "min-height 300ms ease"
      }}>
        <a href="#top" style={{ display: "flex", alignItems: "center" }}>
          <img src="assets/logo-dark.svg" alt="Cougar Cuisine" style={{ width: 72, height: 38 }} />
        </a>
        <nav style={{ display: "flex", justifyContent: "center", gap: 4 }}>
          {links.map((l, i) => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="nav-link"
              style={{ opacity: i === 0 ? 1 : 0.78, fontWeight: i === 0 ? 600 : 400 }}>
              {l}
            </a>
          ))}
        </nav>
        <div style={{ justifySelf: "end" }}>
          <Button variant="primary" size="sm">Book now</Button>
        </div>
      </div>
    </header>
  );
}

// -- Hero (two variants) ------------------------------------------------

function HeroSplit() {
  return (
    <section className="scheme-6 section" id="top" data-screen-label="Hero">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <Eyebrow>Seattle · Private chef</Eyebrow>
            <h1 style={{ margin: "0 0 32px", fontSize: "clamp(48px, 6.4vw, 84px)", lineHeight: 1.04, letterSpacing: "-0.012em" }}>
              Upscale private dining<br/>for intimate,<br/><em style={{ fontStyle: "italic", color: "var(--cc-sundance-3, #C8A55A)" }}>unforgettable</em> gatherings
            </h1>
            <p style={{ margin: "0 0 20px", fontSize: 19, lineHeight: 1.55, maxWidth: 540, opacity: 0.92 }}>
              Cougar Cuisine creates elevated culinary experiences for date nights, birthdays, anniversaries,
              private celebrations, and lifestyle events across the Seattle area.
            </p>
            <p style={{ margin: "0 0 40px", fontSize: 17, lineHeight: 1.55, maxWidth: 540, opacity: 0.78, fontStyle: "italic", fontFamily: "Prata, serif" }}>
              This is more than dinner—it's a curated experience designed to engage the senses, set the mood, and leave a lasting impression.
            </p>
            <ButtonStack dark>
              <Button variant="primary" size="lg">Inquire now</Button>
              <Button variant="secondary" size="lg">View experiences</Button>
            </ButtonStack>
          </div>
          <div style={{ position: "relative" }}>
            <img src="assets/slots/hero-image.webp" alt=""
              style={{ width: "100%", aspectRatio: "4/3", minHeight: 400, display: "block", objectFit: "cover" }} />
            <div style={{
              position: "absolute", left: -32, bottom: -32,
              background: "var(--cc-neutral-7)", color: "#fff",
              padding: "20px 24px", border: "2px solid #fff", maxWidth: 240
            }}>
              <div style={{ fontFamily: "Prata", fontSize: 28, lineHeight: 1.1 }}>Seasonal</div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Spring 2026 menus open</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroFullBleed() {
  return (
    <section className="hero-fullbleed scheme-1" id="top" data-screen-label="Hero"
      style={{ "--hero-img": "url(assets/home-hero.jpg)" }}>
      <div className="container">
        <div style={{ maxWidth: 880 }}>
          <Eyebrow>Seattle · Private chef</Eyebrow>
          <h1 style={{ margin: "0 0 28px", fontSize: "clamp(52px, 7.2vw, 104px)", lineHeight: 1.02, letterSpacing: "-0.015em" }}>
            Upscale private dining for intimate, <em style={{ fontStyle: "italic", color: "var(--cc-sundance-3, #C8A55A)" }}>unforgettable</em> gatherings
          </h1>
          <p style={{ margin: "0 0 40px", fontSize: 20, lineHeight: 1.5, maxWidth: 640, opacity: 0.92 }}>
            Cougar Cuisine creates elevated culinary experiences for date nights, birthdays, anniversaries,
            private celebrations, and lifestyle events across the Seattle area. This is more than dinner—it's
            a curated experience designed to engage the senses, set the mood, and leave a lasting impression.
          </p>
          <ButtonStack dark>
            <Button variant="primary" size="lg">Inquire now</Button>
            <Button variant="secondary" size="lg">View experiences</Button>
          </ButtonStack>
        </div>
      </div>
    </section>
  );
}

// -- Brand Intro --------------------------------------------------------

function BrandIntro() {
  return (
    <section className="scheme-1 section" data-screen-label="Brand Intro">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <Eyebrow>Vision</Eyebrow>
            <h2 style={{ margin: "0 0 32px", fontSize: "clamp(40px, 4.6vw, 60px)", lineHeight: 1.08, letterSpacing: "-0.012em" }}>
              We don't sell plates.<br/>
              <span style={{ fontStyle: "italic" }}>We sell experiences.</span>
            </h2>
            <p style={{ margin: "0 0 24px", fontSize: 18, lineHeight: 1.6, opacity: 0.92 }}>
              Cougar Cuisine is a private chef experience brand for clients who want more than a meal.
              We create intimate dining moments that feel luxurious, personal, and thoughtfully designed
              from start to finish.
            </p>
            <p style={{ margin: "0 0 40px", fontSize: 18, lineHeight: 1.6, opacity: 0.92 }}>
              Whether you're planning a romantic evening, hosting a private dinner party, or curating a
              memorable event at home, every detail is shaped to deliver an experience that feels effortless,
              elevated, and unforgettable.
            </p>
            <ButtonStack>
              <Button variant="secondary">About Us</Button>
            </ButtonStack>
          </div>
          <div>
            <img src="assets/slots/brand-intro-image.webp" alt=""
              style={{ width: "100%", aspectRatio: "4/3", minHeight: 400, display: "block", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// -- Experience Overview -----------------------------------------------

function ExperienceOverview() {
  const items = [
    { heading: "Private dining", body: "Custom in-home chef experiences for couples, small groups, and special occasions." },
    { heading: "Lifestyle events", body: "Curated culinary experiences designed to match the mood, energy, and intention of your event." },
    { heading: "Celebration dinners", body: "Birthday dinners, anniversaries, girls' nights, and private gatherings with a premium touch." },
    { heading: "Custom menus", body: "Thoughtfully crafted menus tailored to your preferences, guest count, and overall experience." },
  ];
  return (
    <section className="scheme-parchment section" id="experiences" data-screen-label="Experience Overview">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96 }}>
          <div style={{ display: "grid", gap: 14 }}>
            {[1, 2, 3, 4].map((n) => (
              <img key={n} src={`assets/slots/exp-image-${n}.webp`} alt=""
                style={{ width: "100%", height: 360, minHeight: 300, display: "block", objectFit: "cover" }} />
            ))}
          </div>
          <div style={{ position: "sticky", top: 110, alignSelf: "start", display: "flex", flexDirection: "column", gap: 56 }}>
            <div>
              <Eyebrow>Moments</Eyebrow>
              <h2 style={{ margin: "0 0 24px", fontSize: "clamp(40px, 4.6vw, 60px)", lineHeight: 1.08, letterSpacing: "-0.012em" }}>
                Designed for the moments you want people to remember
              </h2>
              <p style={{ margin: "0 0 32px", fontSize: 18, lineHeight: 1.6, color: "var(--cc-neutral-5)" }}>
                Our services are built around intimate gatherings where food, atmosphere, and presentation
                matter just as much as the menu.
              </p>
              <ButtonStack>
                <Button variant="secondary" size="sm">View all experiences</Button>
              </ButtonStack>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {items.map((it, i) => (
                <div key={i} style={{
                  paddingBlock: 28,
                  borderTop: i === 0 ? "2px solid var(--cc-neutral-7)" : "1px solid rgba(9,2,2,0.12)",
                  borderBottom: i === items.length - 1 ? "2px solid var(--cc-neutral-7)" : "none",
                  display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "baseline"
                }}>
                  <span style={{ fontFamily: "Prata", fontSize: 18, opacity: 0.5 }}>{String(i+1).padStart(2,"0")}</span>
                  <div>
                    <h5 style={{ margin: "0 0 8px", fontSize: 26, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{it.heading}</h5>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "var(--cc-neutral-5)" }}>{it.body}</p>
                  </div>
                  <span className="mi mi-sm" style={{ alignSelf: "center", opacity: 0.55 }}>arrow_outward</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -- Benefits -----------------------------------------------------------

function Benefits() {
  const items = [
    { icon: "auto_awesome", heading: "Experience-first approach",
      body: "Every event is designed around the full feeling of the evening, not just what's on the plate." },
    { icon: "favorite", heading: "Intimate by design",
      body: "We specialize in smaller gatherings where detail, mood, and quality matter." },
    { icon: "diamond", heading: "Luxury without pretension",
      body: "Our approach is elevated and intentional, while still feeling warm, inviting, and memorable." },
    { icon: "tune", heading: "Customized to your vision",
      body: "From menu direction to ambiance, your experience is tailored to your occasion and preferences." },
  ];
  return (
    <section className="scheme-5 section" data-screen-label="Why Cougar Cuisine">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 96, marginBottom: 80, alignItems: "end" }}>
          <div>
            <Eyebrow>Why</Eyebrow>
            <h2 style={{ margin: 0, fontSize: "clamp(40px, 4.6vw, 60px)", lineHeight: 1.08, letterSpacing: "-0.012em" }}>
              Why Cougar Cuisine
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: 19, lineHeight: 1.55, opacity: 0.86 }}>
            We combine food, presentation, and atmosphere to create a dining experience that feels personal,
            polished, and worth the investment.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40 }}>
          {items.map((it, i) => (
            <div key={i} style={{ paddingTop: 32, borderTop: "2px solid currentColor" }}>
              <span className="mi mi-lg" style={{ display: "inline-block", marginBottom: 28 }}>{it.icon}</span>
              <h5 style={{ margin: "0 0 14px", fontSize: 26, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{it.heading}</h5>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, opacity: 0.86 }}>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -- Editorial signature (full-bleed image moment) ---------------------

function SignatureVisual() {
  return (
    <section className="scheme-1" style={{ padding: 0 }} data-screen-label="Signature Visual">
      <div style={{ position: "relative", height: "clamp(420px, 60vh, 720px)", overflow: "hidden", background: "#090202" }}>
        <img src="assets/slots/signature-image.webp" alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", objectFit: "cover" }} />
        <div style={{
          position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(9,2,2,0.25) 0%, rgba(9,2,2,0.6) 100%)", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 5%", textAlign: "center", pointerEvents: "none"
        }}>
          <div style={{ maxWidth: 880, color: "#fff" }}>
            <p className="eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>An evening, in pieces</p>
            <p style={{ margin: 0, fontFamily: "Prata", fontSize: "clamp(32px, 4.2vw, 56px)", lineHeight: 1.15, letterSpacing: "-0.01em", fontStyle: "italic" }}>
              "Candlelight on a table that's been set for hours. A drink in your hand before you put down your coat.
              A first course that arrives the moment the conversation gets good."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// -- How It Works -------------------------------------------------------

function HowItWorks() {
  const steps = [
    { n: 1, heading: "Submit your inquiry",
      body: "Tell us about your event, guest count, preferred cuisine, and any details you want us to know." },
    { n: 2, heading: "We curate your experience",
      body: "We review your needs and shape a tailored dining concept based on your vision." },
    { n: 3, heading: "Receive your custom quote",
      body: "You'll receive pricing and service details aligned with your selected experience." },
    { n: 4, heading: "Enjoy the moment",
      body: "We bring the culinary experience to life so you can focus on your guests and the atmosphere." },
  ];
  return (
    <section className="scheme-6 section" data-screen-label="How It Works">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, marginBottom: 80, alignItems: "end" }}>
          <div>
            <Eyebrow>Process</Eyebrow>
            <h2 style={{ margin: 0, fontSize: "clamp(40px, 4.6vw, 60px)", lineHeight: 1.08, letterSpacing: "-0.012em" }}>
              How it works
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, opacity: 0.78 }}>
            Four steps, from first message to the moment you sit down. We handle the rest.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ position: "relative", paddingTop: 32, borderTop: "2px solid currentColor" }}>
              <div style={{ minHeight: 80 }}>
                <span style={{ fontFamily: "Prata", fontSize: 56, lineHeight: 1, letterSpacing: "-0.02em" }}>0{s.n}</span>
              </div>
              <h5 style={{ margin: "32px 0 12px", fontSize: 24, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{s.heading}</h5>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -- Ideal For ----------------------------------------------------------

function IdealFor() {
  const tags = [
    "Date nights", "Anniversaries", "Birthdays", "Small dinner parties",
    "Lifestyle events", "VIP hosting", "Private celebrations", "Elevated at-home experiences"
  ];
  return (
    <section className="scheme-1 section" data-screen-label="Perfect For">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 96, alignItems: "center" }}>
          <div>
            <img src="assets/slots/ideal-for-image.webp" alt=""
              style={{ width: "100%", aspectRatio: "4/3", minHeight: 400, display: "block", objectFit: "cover" }} />
          </div>
          <div>
            <Eyebrow>Perfect for</Eyebrow>
            <h2 style={{ margin: "0 0 40px", fontSize: "clamp(40px, 4.6vw, 60px)", lineHeight: 1.08, letterSpacing: "-0.012em" }}>
              The kind of evenings we craft
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {tags.map(t => <span key={t} className="chip">{t}</span>)}
            </div>
            <p style={{ margin: "40px 0 0", fontSize: 15, lineHeight: 1.6, color: "var(--cc-neutral-5)", maxWidth: 480 }}>
              Don't see your occasion? We design custom experiences for nearly any private gathering.
              Tell us what you have in mind.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// -- Testimonials -------------------------------------------------------

function Testimonials() {
  const quotes = [
    { stars: 5, quote: "It felt like she'd been planning this for months, but she told me it was all arranged in a week. That's when I knew.", name: "Marcus T.", city: "Seattle, Washington", img: "testi-0" },
    { stars: 5, quote: "We've hosted dinners before, but this was different. The chef understood what we were trying to create, not just what we wanted to eat.", name: "Jennifer L.", city: "Seattle, Washington", img: "testi-1" },
    { stars: 5, quote: "My husband still talks about it. That's the real measure of whether something worked.", name: "Sarah M.", city: "Seattle, Washington", img: "testi-2" }
  ];
  return (
    <section className="scheme-parchment section" id="gallery" data-screen-label="Testimonials">
      <div className="container">
        <div style={{ marginBottom: 72, maxWidth: 820 }}>
          <Eyebrow>Stories</Eyebrow>
          <h2 style={{ margin: 0, fontSize: "clamp(40px, 4.8vw, 64px)", lineHeight: 1.06, letterSpacing: "-0.012em" }}>
            The kind of experience people talk about <em style={{ fontStyle: "italic" }}>after</em> the night is over
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 56 }}>
          {quotes.map((q, i) => (
            <div key={i} style={{ paddingTop: 36, borderTop: "2px solid var(--cc-neutral-7)" }}>
              <div className="stars" style={{ marginBottom: 28 }}>
                {Array.from({ length: q.stars }).map((_, j) => <span key={j} className="star">★</span>)}
              </div>
              <p style={{ margin: "0 0 32px", fontFamily: "Prata", fontSize: 22, lineHeight: 1.4 }}>"{q.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <img src={`assets/${q.img}.jpg`} alt="" style={{ width: 52, height: 52, objectFit: "cover", borderRadius: "50%" }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{q.name}</div>
                  <div style={{ fontSize: 13, color: "var(--cc-neutral-5)" }}>{q.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -- Final CTA ----------------------------------------------------------

function FinalCTA() {
  return (
    <section className="scheme-6 section" id="inquiry" data-screen-label="Final CTA">
      <div className="container" style={{ textAlign: "center", maxWidth: 820, marginInline: "auto" }}>
        <Eyebrow>Begin</Eyebrow>
        <h2 style={{ margin: "0 0 28px", fontSize: "clamp(44px, 5.6vw, 80px)", lineHeight: 1.04, letterSpacing: "-0.012em" }}>
          Ready to create your <em style={{ fontStyle: "italic" }}>experience?</em>
        </h2>
        <p style={{ margin: "0 0 44px", fontSize: 19, lineHeight: 1.55, opacity: 0.92 }}>
          Let's plan a dining experience that feels intimate, elevated, and completely your own.
        </p>
        <ButtonStack dark style={{ justifyContent: "center" }}>
          <Button variant="primary" size="lg">Book an experience</Button>
          <Button variant="secondary" size="lg">Start your inquiry</Button>
        </ButtonStack>
      </div>
    </section>
  );
}

// -- Footer -------------------------------------------------------------

function Footer() {
  const cols = [
    { title: "Site", items: ["Home", "Experiences", "About", "Gallery", "Inquiry"] },
    { title: "Experiences", items: ["Private dining", "Lifestyle events", "Celebration dinners", "Custom menus"] },
    { title: "Contact", items: ["inquiries@cougarcuisine.com", "Seattle, Washington", "Greater Puget Sound area"] }
  ];
  return (
    <footer className="scheme-1" style={{ padding: "96px 5% 56px" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr", gap: 96, paddingBottom: 64 }}>
          <div>
            <img src="assets/logo-dark.svg" alt="Cougar Cuisine" style={{ width: 88, height: 46, marginBottom: 24 }} />
            <p style={{ margin: 0, fontFamily: "Prata", fontSize: 22, lineHeight: 1.4, maxWidth: 380, opacity: 0.92 }}>
              An upscale private dining studio designing intimate culinary moments across the Seattle area.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
            {cols.map((c, i) => (
              <div key={i}>
                <h6 style={{ margin: "0 0 20px", fontFamily: "Montserrat", fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}>{c.title}</h6>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {c.items.map(it => <li key={it} style={{ fontSize: 14, opacity: 0.88 }}><a href="#">{it}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="rule" style={{ background: "#fff", opacity: 0.2, marginBottom: 28 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, gap: 24, flexWrap: "wrap", opacity: 0.78 }}>
          <div>© 2026 Cougar Cuisine. All rights reserved.</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", gap: 24, flexWrap: "wrap" }}>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Cookies</a></li>
          </ul>
          <div style={{ display: "flex", gap: 18 }}>
            {["alternate_email", "photo_camera", "language", "smart_display"].map(i => (
              <a key={i} href="#"><span className="mi" style={{ fontSize: 20 }}>{i}</span></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Button, ButtonStack, Eyebrow,
  Navbar, HeroSplit, HeroFullBleed, BrandIntro, ExperienceOverview,
  Benefits, SignatureVisual, HowItWorks, IdealFor, Testimonials, FinalCTA, Footer
});
