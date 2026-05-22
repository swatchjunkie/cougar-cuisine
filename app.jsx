/* eslint-disable */
// Cougar Cuisine — Homepage assembly + Tweaks

const { useEffect } = React;
const {
  Navbar, HeroSplit, HeroFullBleed, BrandIntro, ExperienceOverview,
  Benefits, SignatureVisual, HowItWorks, IdealFor, Testimonials, FinalCTA, Footer,
  TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle
} = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "Split",
  "accent": "Crown",
  "showSignature": true,
  "italicAccents": true
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  Crown: { primary: "#6E1F28", hover: "#581820", schemeBg: "#581820", schemeFg: "#fff" },
  Black: { primary: "#090202", hover: "#211B1B", schemeBg: "#090202", schemeFg: "#fff" },
  Forest: { primary: "#014421", hover: "#012e16", schemeBg: "#012e16", schemeFg: "#fff" }
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const a = ACCENT_MAP[t.accent] || ACCENT_MAP.Crown;

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--cc-accent", a.primary);
    r.style.setProperty("--cc-accent-hover", a.hover);
    // Override the dark hero/CTA scheme bg with the chosen accent (scheme-6 is hero/CTA color)
    r.style.setProperty("--cc-scheme6-bg", a.schemeBg);
    document.body.classList.toggle("italic-off", !t.italicAccents);
  }, [t.accent, t.italicAccents, a]);

  const Hero = t.heroVariant === "Full" ? HeroFullBleed : HeroSplit;

  return (
    <div>
      <Navbar />
      <main className="page fade-in" data-screen-label="01 Homepage">
        <Hero />
        <BrandIntro />
        <ExperienceOverview />
        <Benefits />
        {t.showSignature && <SignatureVisual />}
        <HowItWorks />
        <IdealFor />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero" />
        <TweakRadio
          label="Layout"
          value={t.heroVariant}
          options={["Split", "Full"]}
          onChange={(v) => setTweak("heroVariant", v)}
        />
        <TweakSection label="Brand accent" />
        <TweakRadio
          label="Color"
          value={t.accent}
          options={["Crown", "Black", "Forest"]}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakSection label="Editorial" />
        <TweakToggle
          label="Pull-quote band"
          value={t.showSignature}
          onChange={(v) => setTweak("showSignature", v)}
        />
        <TweakToggle
          label="Italic accents"
          value={t.italicAccents}
          onChange={(v) => setTweak("italicAccents", v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
