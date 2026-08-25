import { useState, useEffect } from "react";
import { Search, ShoppingBag, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  milkIvory: "#F3F0E8",
  warmPaper: "#E7E1D4",
  deepOlive: "#4A4E38",
  softOlive: "#8A8C72",
  inkBlack: "#171714",
  chalkWhite: "#FAF9F5",
  cobalt: "#2646D8",
  hairline: "#C9C3B7",
} as const;

const sans = "'Pretendard Variable', Pretendard, -apple-system, system-ui, sans-serif";
const serif = "'Instrument Serif', Georgia, serif";

// ─── Images ───────────────────────────────────────────────────────────────────
const I = {
  hero: "https://images.unsplash.com/photo-1612196808827-9ff25cb6137a?w=1920&q=85",
  sachet: "https://images.unsplash.com/photo-1643696206568-745586973dde?w=900&q=80",
  incense: "https://images.unsplash.com/photo-1512917860049-18d416baa831?w=900&q=80",
  case1: "https://images.unsplash.com/photo-1640095889747-2090ee12fa7d?w=1200&q=80",
  case2: "https://images.unsplash.com/photo-1623316128945-355659bae73e?w=700&q=80",
  case3: "https://images.unsplash.com/photo-1643696206473-c0ba81eb5f57?w=700&q=80",
  process: "https://images.unsplash.com/photo-1557722807-5a426e084035?w=900&q=80",
  processB: "https://images.unsplash.com/photo-1623316128945-355659bae73e?w=900&q=80",
  shop: "https://images.unsplash.com/photo-1675017181907-47fd659603e5?w=1200&q=80",
  shopP1: "https://images.unsplash.com/photo-1633857099824-75d9a3c42f77?w=500&q=80",
  shopP2: "https://images.unsplash.com/photo-1642683497682-0204b7b9be77?w=500&q=80",
  shopP3: "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?w=500&q=80",
  subscription: "https://images.unsplash.com/photo-1658856053144-36d7ed7dffe7?w=1600&q=80",
  brandStory: "https://images.unsplash.com/photo-1704083043868-a23986597567?w=1200&q=80",
  j1: "https://images.unsplash.com/photo-1639390167093-9c62311fe84d?w=700&q=80",
  j2: "https://images.unsplash.com/photo-1612948956019-434c6d229a0d?w=700&q=80",
  j3: "https://images.unsplash.com/photo-1674708271645-4d77f9d68707?w=700&q=80",
  finalCta: "https://images.unsplash.com/photo-1529047033375-f402d3da24ca?w=1920&q=85",
};

// ─── Utility components ───────────────────────────────────────────────────────

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ text, light }: { text: string; light?: boolean }) {
  return (
    <span
      style={{
        fontFamily: sans,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase" as const,
        color: light ? "rgba(250,249,245,0.5)" : C.softOlive,
      }}
    >
      {text}
    </span>
  );
}

function ArrowLink({
  children,
  light,
  onClick,
}: {
  children: string;
  light?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center gap-2"
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        fontFamily: sans,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        color: light ? C.chalkWhite : C.inkBlack,
      }}
    >
      <span className="relative">
        {children}
        <span
          className="absolute -bottom-px left-0 h-px w-0 group-hover:w-full transition-[width] duration-300 ease-out"
          style={{ background: light ? C.chalkWhite : C.inkBlack }}
        />
      </span>
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
    </button>
  );
}

// ─── Announcement bar ─────────────────────────────────────────────────────────

function AnnouncementBar({ onInquiry }: { onInquiry: () => void }) {
  return (
    <div
      style={{ background: C.deepOlive, height: 32, fontFamily: sans, position: "relative", zIndex: 60 }}
      className="w-full flex items-center justify-center px-4"
    >
      <p style={{ color: C.chalkWhite, fontSize: 11, letterSpacing: "0.05em", opacity: 0.9 }}>
        브랜드와 공간을 위한 커스텀 향 제품 제작&nbsp;·&nbsp;MOQ 50개부터
      </p>
      <button
        onClick={onInquiry}
        className="hidden md:block absolute right-12 hover:opacity-60 transition-opacity"
        style={{ background: "none", border: "none", cursor: "pointer", color: C.chalkWhite, fontSize: 11, letterSpacing: "0.05em" }}
      >
        제작 상담 →
      </button>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({
  scrolled,
  onInquiry,
  mobileOpen,
  setMobileOpen,
}: {
  scrolled: boolean;
  onInquiry: () => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const fg = scrolled ? C.inkBlack : C.chalkWhite;

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 32,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 76,
          background: scrolled ? C.milkIvory : "transparent",
          borderBottom: scrolled ? `1px solid ${C.hairline}` : "1px solid transparent",
          transition: "background 0.4s ease, border-color 0.4s ease",
          fontFamily: sans,
        }}
        className="flex items-center px-6 md:px-12 justify-between"
      >
        {/* Logo */}
        <span
          style={{ color: fg, fontSize: 17, fontWeight: 600, letterSpacing: "0.1em", transition: "color 0.4s" }}
        >
          SO&apos;ONE
        </span>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {["CUSTOM", "SHOP", "SUBSCRIPTION", "JOURNAL", "ABOUT"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:opacity-50 transition-opacity"
              style={{
                color: fg,
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textDecoration: "none",
                transition: "color 0.4s, opacity 0.2s",
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <button
            className="hidden md:flex hover:opacity-50 transition-opacity"
            style={{ background: "none", border: "none", cursor: "pointer", color: fg, transition: "color 0.4s" }}
          >
            <Search size={17} />
          </button>
          <button
            className="hidden md:flex hover:opacity-50 transition-opacity"
            style={{ background: "none", border: "none", cursor: "pointer", color: fg, transition: "color 0.4s" }}
          >
            <ShoppingBag size={17} />
          </button>
          <button
            onClick={onInquiry}
            className="hidden md:flex items-center gap-2 hover:opacity-70 transition-opacity"
            style={{
              background: "none",
              border: `1px solid ${fg}`,
              color: fg,
              fontFamily: sans,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              padding: "8px 16px",
              cursor: "pointer",
              transition: "color 0.4s, border-color 0.4s",
            }}
          >
            프로젝트 문의
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden hover:opacity-50 transition-opacity"
            style={{ background: "none", border: "none", cursor: "pointer", color: fg, transition: "color 0.4s" }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: C.milkIvory, fontFamily: sans, zIndex: 45 }}
            className="fixed inset-0 flex flex-col px-8 pt-36 pb-12"
          >
            <nav className="flex flex-col gap-6 flex-1">
              {["CUSTOM", "SHOP", "SUBSCRIPTION", "JOURNAL", "ABOUT"].map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.08, duration: 0.4 }}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: C.inkBlack,
                    fontSize: 30,
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                    textDecoration: "none",
                  }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => { setMobileOpen(false); onInquiry(); }}
              style={{
                border: `1px solid ${C.inkBlack}`,
                color: C.inkBlack,
                background: "none",
                fontFamily: sans,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                padding: "14px",
                cursor: "pointer",
                width: "100%",
                textTransform: "uppercase" as const,
              }}
            >
              프로젝트 문의 →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({ onInquiry }: { onInquiry: () => void }) {
  return (
    <section
      style={{
        height: "calc(100vh - 32px)",
        minHeight: 760,
        backgroundImage: `url(${I.hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(23,23,20,0.6) 0%, rgba(23,23,20,0.18) 45%, transparent 75%)",
        }}
      />

      {/* Bottom-left copy */}
      <div className="relative z-10 pb-14 px-8 md:px-16 max-w-[760px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionLabel text="SO'ONE — Scent Studio" light />
          <h1
            style={{
              color: C.chalkWhite,
              fontSize: "clamp(34px, 5vw, 64px)",
              lineHeight: 1.2,
              fontFamily: sans,
              fontWeight: 400,
              marginTop: 18,
              marginBottom: 10,
            }}
          >
            향으로, 공간의 기억을<br />디자인합니다.
          </h1>
          <p
            style={{
              color: C.chalkWhite,
              fontSize: "clamp(22px, 3vw, 46px)",
              fontFamily: serif,
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: 24,
              opacity: 0.75,
            }}
          >
            Scent, shaped into memory.
          </p>
          <p
            style={{
              color: C.chalkWhite,
              fontSize: 15,
              lineHeight: 1.85,
              fontFamily: sans,
              fontWeight: 400,
              opacity: 0.75,
              maxWidth: 460,
              marginBottom: 36,
            }}
          >
            SO&apos;ONE은 브랜드와 공간, 사람 사이에 오래 남을 분위기를 만듭니다.
            샤쉐와 페이퍼 인센스, 그리고 각 프로젝트에 맞춘 향의 경험을 제안합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
            <ArrowLink light onClick={onInquiry}>커스텀 제작 시작하기</ArrowLink>
            <button
              className="hover:opacity-100 transition-opacity text-left"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: sans,
                fontSize: 12,
                fontWeight: 400,
                color: C.chalkWhite,
                opacity: 0.55,
                letterSpacing: "0.04em",
                padding: 0,
              }}
            >
              SO&apos;ONE 알아보기
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-14 right-8 md:right-16 hidden md:flex flex-col items-center gap-3"
        style={{ color: C.chalkWhite, opacity: 0.4 }}
      >
        <span
          style={{
            fontFamily: sans,
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase" as const,
            writingMode: "vertical-rl" as const,
          }}
        >
          Scroll to discover
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ width: 1, height: 40, background: C.chalkWhite, opacity: 0.5 }}
        />
      </motion.div>
    </section>
  );
}

// ─── Manifesto ────────────────────────────────────────────────────────────────

function ManifestoSection() {
  return (
    <section style={{ background: C.milkIvory, padding: "128px 0", fontFamily: sans }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4 lg:pt-1.5">
            <Reveal>
              <SectionLabel text="The Art of Scented Space" />
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.2vw, 48px)",
                  fontWeight: 400,
                  lineHeight: 1.45,
                  color: C.inkBlack,
                  marginBottom: 28,
                }}
              >
                향은 보이지 않지만,{" "}
                <span style={{ color: C.cobalt }}>공간의 인상</span>과<br />
                그날의 기억을 오래 남깁니다.
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.9,
                  color: C.softOlive,
                  maxWidth: 560,
                }}
              >
                우리는 향을 제품에 담는 데서 그치지 않습니다. 브랜드가 전하고 싶은 이야기,
                머무는 공간의 온도, 선물하는 마음까지 살펴 하나의 감각적인 경험으로 완성합니다.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Custom: Intro ────────────────────────────────────────────────────────────

function CustomIntroSection({ onInquiry }: { onInquiry: () => void }) {
  return (
    <section style={{ background: C.deepOlive, padding: "120px 0", fontFamily: sans }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3 lg:pt-1">
            <Reveal>
              <SectionLabel text="01 / Custom Production" light />
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            <Reveal delay={0.1}>
              <h2
                style={{
                  fontSize: "clamp(30px, 4vw, 56px)",
                  fontWeight: 400,
                  lineHeight: 1.3,
                  color: C.chalkWhite,
                  marginBottom: 28,
                }}
              >
                당신의 이야기를<br />하나의 향기로운 오브제로.
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.85,
                  color: C.softOlive,
                  maxWidth: 560,
                  marginBottom: 40,
                }}
              >
                기업 행사, 전시와 공연, 관광 굿즈, 웰컴 키트, 브랜드 프로모션까지.
                목적과 예산에 맞춰 향 선정부터 디자인, 생산까지 함께합니다.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <ArrowLink light onClick={onInquiry}>프로젝트 문의하기</ArrowLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Custom: Products ─────────────────────────────────────────────────────────

function CustomProductsSection() {
  const products = [
    {
      img: I.sachet,
      name: "Custom Sachet",
      desc: "브랜드의 이미지와 향을 한 장에 담는 샤쉐. 패키지 디자인, 향 선택, 후면 정보 구성까지 맞춤 제작합니다.",
    },
    {
      img: I.incense,
      name: "Custom Paper Incense",
      desc: "종이 위에 이야기와 향을 함께 담는 페이퍼 인센스. 공연 MD, 전시 굿즈, 기념품과 선물에 적합합니다.",
    },
  ];

  return (
    <section style={{ background: C.milkIvory, paddingBottom: 120, fontFamily: sans }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.12}>
              <div className="group cursor-pointer">
                <div
                  className="overflow-hidden"
                  style={{ aspectRatio: "4/5", marginBottom: 24 }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <SectionLabel text={p.name} />
                <p
                  style={{
                    color: C.inkBlack,
                    fontSize: 15,
                    lineHeight: 1.8,
                    marginTop: 12,
                    marginBottom: 18,
                    maxWidth: 440,
                  }}
                >
                  {p.desc}
                </p>
                <ArrowLink>제작 방식 살펴보기</ArrowLink>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Custom: Strengths ────────────────────────────────────────────────────────

function CustomStrengthsSection() {
  const items = [
    { num: "01", title: "Creative Direction", desc: "목적과 브랜드에 맞는 콘셉트 제안" },
    { num: "02", title: "Design", desc: "전달받은 로고·사진·문구를 바탕으로 시안 제작" },
    { num: "03", title: "Scent Selection", desc: "제품과 이야기의 인상을 고려한 향 선택" },
    { num: "04", title: "Production", desc: "국내 기획·디자인·생산과 일정 관리" },
  ];

  return (
    <section style={{ background: C.warmPaper, padding: "80px 0 100px", fontFamily: sans }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.num} delay={i * 0.09}>
              <div
                className="pt-6 pr-8 pb-10"
                style={{ borderTop: `1px solid ${C.hairline}` }}
              >
                <span
                  style={{
                    color: C.cobalt,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    display: "block",
                    marginBottom: 14,
                  }}
                >
                  {item.num}
                </span>
                <p
                  style={{
                    color: C.inkBlack,
                    fontSize: 15,
                    fontWeight: 500,
                    marginBottom: 8,
                    lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </p>
                <p style={{ color: C.softOlive, fontSize: 13, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <p
            style={{
              color: C.softOlive,
              fontSize: 13,
              lineHeight: 1.9,
              marginTop: 48,
              borderTop: `1px solid ${C.hairline}`,
              paddingTop: 24,
            }}
          >
            소량 50개부터 대량 프로젝트까지 상담 가능합니다.<br />
            일반 제작 일정은 사양 확정 후 별도 안내합니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Case Studies ─────────────────────────────────────────────────────────────

function CaseStudiesSection() {
  const cases = [
    {
      img: I.case1,
      category: "문화예술 / 공연",
      title: "연극 '안개의 정원' 공연 기념 향 패키지",
      product: "Custom Paper Incense × Sachet",
      qty: "500세트",
    },
    {
      img: I.case2,
      category: "기업 행사",
      title: "신사옥 오픈 웰컴 키트",
      product: "Custom Sachet",
      qty: "1,200개",
    },
    {
      img: I.case3,
      category: "지역 / 관광 굿즈",
      title: "제주 아트 페어 한정 향 굿즈",
      product: "Custom Paper Incense",
      qty: "300개",
    },
  ];

  return (
    <section style={{ background: C.milkIvory, padding: "100px 0 120px", fontFamily: sans }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="mb-12">
          <Reveal>
            <SectionLabel text="제작 사례" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              style={{
                fontSize: "clamp(26px, 3vw, 44px)",
                fontWeight: 400,
                color: C.inkBlack,
                marginTop: 14,
                lineHeight: 1.35,
              }}
            >
              하나의 향이, 하나의 장면이 된 기록
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div
                className="group relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Category badge */}
                <div
                  className="absolute top-4 left-4 transition-opacity duration-300 group-hover:opacity-0"
                  style={{
                    background: C.milkIvory,
                    padding: "4px 10px",
                    fontFamily: sans,
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color: C.inkBlack,
                  }}
                >
                  {c.category}
                </div>
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(to top, rgba(23,23,20,0.88) 0%, transparent 55%)",
                  }}
                >
                  <SectionLabel text={c.category} light />
                  <p
                    style={{
                      color: C.chalkWhite,
                      fontSize: 16,
                      fontWeight: 500,
                      marginTop: 8,
                      lineHeight: 1.45,
                    }}
                  >
                    {c.title}
                  </p>
                  <p style={{ color: C.softOlive, fontSize: 12, marginTop: 6 }}>
                    {c.product} · {c.qty}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-10 flex justify-end">
            <ArrowLink>모든 제작 사례 보기</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────

function ProcessSection({ onInquiry }: { onInquiry: () => void }) {
  const [active, setActive] = useState(0);

  const steps = [
    { num: "01", title: "문의", desc: "제품, 수량, 일정, 예산과 사용 목적을 확인합니다." },
    { num: "02", title: "제안", desc: "적합한 사양과 향, 디자인 방향을 제안합니다." },
    { num: "03", title: "디자인", desc: "전달 자료를 바탕으로 시안을 제작하고 조율합니다." },
    { num: "04", title: "생산", desc: "확정된 사양으로 꼼꼼하게 제작합니다." },
    { num: "05", title: "전달", desc: "검수 후 일정에 맞춰 안전하게 출고합니다." },
  ];

  const stepImages = [I.shop, I.sachet, I.incense, I.process, I.case2];

  return (
    <section style={{ background: C.warmPaper, padding: "120px 0", fontFamily: sans }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="mb-12">
          <Reveal>
            <SectionLabel text="05 / Process" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              style={{
                fontSize: "clamp(24px, 2.8vw, 40px)",
                fontWeight: 400,
                color: C.inkBlack,
                marginTop: 14,
                lineHeight: 1.4,
              }}
            >
              프로젝트가 완성되기까지
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Steps */}
          <div>
            {steps.map((step, i) => (
              <div
                key={step.num}
                onClick={() => setActive(i)}
                className="cursor-pointer py-5"
                style={{ borderTop: `1px solid ${C.hairline}` }}
              >
                <div className="flex items-start gap-5">
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: active === i ? C.cobalt : C.softOlive,
                      transition: "color 0.3s",
                      minWidth: 24,
                      paddingTop: 3,
                    }}
                  >
                    {step.num}
                  </span>
                  <div className="flex-1">
                    <p
                      style={{
                        fontSize: 17,
                        fontWeight: 500,
                        color: active === i ? C.inkBlack : C.softOlive,
                        transition: "color 0.3s",
                        marginBottom: active === i ? 8 : 0,
                        lineHeight: 1.4,
                      }}
                    >
                      {step.title}
                    </p>
                    <motion.div
                      initial={false}
                      animate={{
                        maxHeight: active === i ? 80 : 0,
                        opacity: active === i ? 1 : 0,
                      }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p style={{ fontSize: 14, color: C.softOlive, lineHeight: 1.7 }}>
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
            <div
              className="py-6"
              style={{ borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}` }}
            >
              <p style={{ color: C.softOlive, fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>
                만들고 싶은 장면이 있으신가요?
              </p>
              <ArrowLink onClick={onInquiry}>프로젝트 상담하기</ArrowLink>
            </div>
          </div>

          {/* Changing image */}
          <div className="hidden lg:block" style={{ aspectRatio: "3/4", position: "relative" }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={stepImages[active]}
                alt={steps[active].title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Shop ─────────────────────────────────────────────────────────────────────

function ShopSection() {
  const products = [
    { img: I.shopP1, name: "Linen & Fig", scent: "Wood · Green · Powdery", price: "18,000원" },
    { img: I.shopP2, name: "Ember & Moss", scent: "Smoke · Earth · Resin", price: "18,000원" },
    { img: I.shopP3, name: "Salt & Iris", scent: "Sea · Floral · Mineral", price: "18,000원" },
  ];

  return (
    <section style={{ background: C.milkIvory, padding: "120px 0", fontFamily: sans }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left image */}
          <div className="lg:col-span-5">
            <Reveal>
              <div style={{ aspectRatio: "4/5", overflow: "hidden" }}>
                <img
                  src={I.shop}
                  alt="SO'ONE Sachet Collection"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Right content */}
          <div className="lg:col-span-7 lg:pt-8">
            <Reveal>
              <SectionLabel text="02 / Shop" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                style={{
                  fontSize: "clamp(22px, 2.5vw, 40px)",
                  fontWeight: 400,
                  color: C.inkBlack,
                  margin: "14px 0 16px",
                  lineHeight: 1.4,
                }}
              >
                일상 가까이에 두는,<br />작은 향의 장면
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p
                style={{
                  color: C.softOlive,
                  fontSize: 14,
                  lineHeight: 1.85,
                  maxWidth: 440,
                  marginBottom: 40,
                }}
              >
                옷장과 침실, 현관과 차 안까지. SO&apos;ONE의 샤쉐는 향이 필요한
                일상의 작은 공간에 자연스럽게 머뭅니다.
              </p>
            </Reveal>

            <div className="grid grid-cols-3 gap-4 md:gap-5">
              {products.map((p, i) => (
                <Reveal key={p.name} delay={0.2 + i * 0.07}>
                  <div className="group cursor-pointer">
                    <div style={{ aspectRatio: "3/4", overflow: "hidden", marginBottom: 12 }}>
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: C.inkBlack, marginBottom: 4 }}>
                      {p.name}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: C.softOlive,
                        letterSpacing: "0.03em",
                        marginBottom: 5,
                      }}
                    >
                      {p.scent}
                    </p>
                    <p style={{ fontSize: 13, color: C.inkBlack }}>{p.price}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.38}>
              <div className="mt-10">
                <ArrowLink>샤쉐 컬렉션 보기</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Subscription ─────────────────────────────────────────────────────────────

function SubscriptionSection({ onInquiry }: { onInquiry: () => void }) {
  const features = [
    "공간과 사용량에 맞춘 구성",
    "정기 배송과 교체 주기 관리",
    "샤쉐·디퓨저 등 복합 제안",
  ];

  return (
    <section style={{ background: C.warmPaper, padding: "120px 0", fontFamily: sans }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          {/* Info panel */}
          <div
            className="lg:col-span-5 z-10 flex items-center"
            style={{ position: "relative" }}
          >
            <div
              style={{
                background: C.milkIvory,
                padding: "64px 48px",
                width: "100%",
              }}
            >
              <Reveal>
                <SectionLabel text="03 / Subscription" />
              </Reveal>
              <Reveal delay={0.1}>
                <h2
                  style={{
                    fontSize: "clamp(22px, 2.4vw, 38px)",
                    fontWeight: 400,
                    color: C.inkBlack,
                    margin: "14px 0 18px",
                    lineHeight: 1.45,
                  }}
                >
                  좋은 공간은,<br />향도 꾸준히 관리됩니다.
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.85,
                    color: C.softOlive,
                    marginBottom: 28,
                  }}
                >
                  매달 필요한 향 제품을 정기적으로 구성하고 교체 시점에 맞춰 전달합니다.
                  오피스, 병원, 스튜디오, 쇼룸, 숙박 공간처럼 늘 좋은 인상을 유지해야 하는 곳을 위한 서비스입니다.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="flex flex-col gap-3 mb-8">
                  {features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3"
                      style={{ fontSize: 14, color: C.inkBlack }}
                    >
                      <span
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: C.cobalt,
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="flex flex-col gap-3">
                  <ArrowLink>정기구독 알아보기</ArrowLink>
                  <button
                    onClick={onInquiry}
                    className="hover:opacity-60 transition-opacity text-left"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: sans,
                      fontSize: 12,
                      fontWeight: 400,
                      color: C.softOlive,
                      padding: 0,
                    }}
                  >
                    공간 상담 요청하기
                  </button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right image */}
          <div className="lg:col-span-7 hidden lg:block" style={{ minHeight: 560 }}>
            <Reveal>
              <div style={{ height: "100%", minHeight: 560, overflow: "hidden" }}>
                <img
                  src={I.subscription}
                  alt="공간 향 관리"
                  className="w-full h-full object-cover"
                  style={{ minHeight: 560 }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Brand Story ──────────────────────────────────────────────────────────────

function BrandStorySection() {
  return (
    <section style={{ background: C.milkIvory, padding: "120px 0", fontFamily: sans }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <Reveal>
              <SectionLabel text="About SO'ONE" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                style={{
                  fontSize: "clamp(24px, 3vw, 44px)",
                  fontWeight: 400,
                  color: C.inkBlack,
                  margin: "14px 0 22px",
                  lineHeight: 1.4,
                }}
              >
                보이지 않는 감각을<br />오래 남는 경험으로.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.9,
                  color: C.softOlive,
                  marginBottom: 36,
                }}
              >
                SO&apos;ONE은 공간의 분위기와 기억을 디자인합니다. 다양한 기업과 브랜드,
                공연과 문화예술 프로젝트를 위한 맞춤형 향 제품을 기획하고 제작하며,
                향이 사람과 공간을 연결하는 순간을 만들어왔습니다. 국내에서 기획·디자인·생산하고,
                제품에 필요한 안전 기준과 품질을 세심하게 확인합니다.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ArrowLink>브랜드 이야기</ArrowLink>
            </Reveal>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <Reveal>
              <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                <img
                  src={I.brandStory}
                  alt="SO'ONE 브랜드 스토리"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Journal ─────────────────────────────────────────────────────────────────

function JournalSection() {
  const posts = [
    {
      img: I.j1,
      cat: "CASE",
      title: "연극 공연 기념 향 패키지를 만드는 방법",
      excerpt: "무대 위 향이 어떻게 관객의 기억에 스며드는지 이야기합니다.",
      date: "2024.11.20",
    },
    {
      img: I.j2,
      cat: "NOTE",
      title: "샤쉐를 공간에 활용하는 5가지 방법",
      excerpt: "옷장, 침실, 자동차까지. 향의 위치가 경험을 바꿉니다.",
      date: "2024.10.14",
    },
    {
      img: I.j3,
      cat: "STORY",
      title: "SO'ONE이 향을 고르는 기준",
      excerpt: "좋은 향은 주목받지 않고 공간과 자연스럽게 어우러집니다.",
      date: "2024.09.30",
    },
  ];

  const catColor: Record<string, string> = {
    CASE: C.cobalt,
    NOTE: C.softOlive,
    STORY: C.inkBlack,
  };

  return (
    <section style={{ background: C.warmPaper, padding: "100px 0 120px", fontFamily: sans }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <Reveal>
              <SectionLabel text="Journal" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                style={{
                  fontSize: "clamp(22px, 2.5vw, 40px)",
                  fontWeight: 400,
                  color: C.inkBlack,
                  marginTop: 12,
                  lineHeight: 1.4,
                }}
              >
                향과 공간에 관한 기록
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.1}>
              <article className="group cursor-pointer">
                <div style={{ aspectRatio: "4/3", overflow: "hidden", marginBottom: 18 }}>
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      color: catColor[post.cat],
                    }}
                  >
                    {post.cat}
                  </span>
                  <span
                    style={{ width: 1, height: 10, background: C.hairline, display: "inline-block" }}
                  />
                  <span style={{ fontSize: 11, color: C.softOlive }}>{post.date}</span>
                </div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: C.inkBlack,
                    lineHeight: 1.5,
                    marginBottom: 8,
                  }}
                >
                  {post.title}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: C.softOlive }}>
                  {post.excerpt}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTASection({ onInquiry }: { onInquiry: () => void }) {
  return (
    <section
      style={{
        height: "70vh",
        minHeight: 500,
        backgroundImage: `url(${I.finalCta})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: sans,
      }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(23,23,20,0.65)" }} />
      <div className="relative z-10 text-center px-8" style={{ maxWidth: 640 }}>
        <Reveal>
          <h2
            style={{
              fontSize: "clamp(26px, 3.8vw, 54px)",
              fontWeight: 400,
              color: C.chalkWhite,
              lineHeight: 1.45,
              marginBottom: 14,
            }}
          >
            기억되고 싶은 장면을<br />들려주세요.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            style={{
              color: C.softOlive,
              fontSize: 15,
              lineHeight: 1.8,
              marginBottom: 44,
            }}
          >
            그 이야기에 어울리는 향을 함께 만들겠습니다.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
            <button
              onClick={onInquiry}
              className="hover:opacity-85 transition-opacity"
              style={{
                background: C.chalkWhite,
                border: "none",
                color: C.inkBlack,
                fontFamily: sans,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                padding: "14px 28px",
                cursor: "pointer",
                textTransform: "uppercase" as const,
              }}
            >
              커스텀 제작 문의 →
            </button>
            <button
              className="hover:opacity-100 transition-opacity"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: sans,
                fontSize: 12,
                fontWeight: 400,
                color: C.chalkWhite,
                opacity: 0.5,
                letterSpacing: "0.04em",
                padding: 0,
              }}
            >
              제작 사례 먼저 보기
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Inquiry Panel ────────────────────────────────────────────────────────────

function InquiryPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    contact: "",
    product: "",
    quantity: "",
    timeline: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "none",
    border: "none",
    borderBottom: `1px solid ${C.hairline}`,
    padding: "10px 0",
    fontFamily: sans,
    fontSize: 14,
    color: C.inkBlack,
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: sans,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: C.softOlive,
    display: "block",
    marginBottom: 4,
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(23,23,20,0.45)" }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col overflow-y-auto"
            style={{ width: "min(520px, 100vw)", background: C.milkIvory, fontFamily: sans }}
          >
            {/* Panel header */}
            <div
              className="flex items-center justify-between px-8 py-6 sticky top-0"
              style={{
                background: C.milkIvory,
                borderBottom: `1px solid ${C.hairline}`,
              }}
            >
              <div>
                <SectionLabel text="Project Inquiry" />
                <p
                  style={{ fontSize: 20, fontWeight: 400, color: C.inkBlack, marginTop: 4 }}
                >
                  프로젝트 문의
                </p>
              </div>
              <button
                onClick={onClose}
                className="hover:opacity-40 transition-opacity"
                style={{ background: "none", border: "none", cursor: "pointer", color: C.inkBlack }}
              >
                <X size={20} />
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-7 px-8 py-8 flex-1">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>담당자명</label>
                    <input
                      style={inputStyle}
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>브랜드·기관명</label>
                    <input
                      style={inputStyle}
                      required
                      value={form.brand}
                      onChange={(e) => setForm({ ...form, brand: e.target.value })}
                      placeholder="브랜드 또는 기관명"
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>연락처 또는 이메일</label>
                  <input
                    style={inputStyle}
                    required
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    placeholder="010-0000-0000 또는 email@example.com"
                  />
                </div>

                <div>
                  <label style={labelStyle}>관심 제품</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Custom Sachet", "Custom Paper Incense", "정기구독", "기타"].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setForm({ ...form, product: opt })}
                        style={{
                          border: `1px solid ${form.product === opt ? C.inkBlack : C.hairline}`,
                          background: form.product === opt ? C.inkBlack : "none",
                          color: form.product === opt ? C.chalkWhite : C.inkBlack,
                          fontFamily: sans,
                          fontSize: 12,
                          padding: "6px 14px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>예상 수량</label>
                    <input
                      style={inputStyle}
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      placeholder="예: 500개"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>희망 일정</label>
                    <input
                      style={inputStyle}
                      value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                      placeholder="예: 2025년 3월"
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>문의 내용</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 96, resize: "none", paddingTop: 10 }}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="프로젝트에 대해 자유롭게 설명해 주세요."
                  />
                </div>

                <div>
                  <label style={labelStyle}>파일 첨부 (선택)</label>
                  <div
                    style={{
                      border: `1px dashed ${C.hairline}`,
                      padding: "18px",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                    className="hover:border-stone-400 transition-colors"
                  >
                    <p style={{ fontSize: 13, color: C.softOlive }}>
                      로고, 레퍼런스 이미지를 첨부해 주세요.
                    </p>
                    <p style={{ fontSize: 11, color: C.hairline, marginTop: 4 }}>
                      PNG · JPG · PDF 최대 10MB
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="hover:opacity-85 transition-opacity mt-auto"
                  style={{
                    background: C.deepOlive,
                    border: "none",
                    color: C.chalkWhite,
                    fontFamily: sans,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    padding: "16px",
                    cursor: "pointer",
                    width: "100%",
                    textTransform: "uppercase" as const,
                  }}
                >
                  문의 전송하기 →
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 text-center px-8">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center gap-5"
                >
                  <div style={{ width: 40, height: 1, background: C.cobalt }} />
                  <p style={{ fontSize: 22, fontWeight: 400, color: C.inkBlack }}>
                    문의가 전달되었습니다.
                  </p>
                  <p style={{ fontSize: 14, color: C.softOlive, lineHeight: 1.8 }}>
                    빠른 시일 내에 연락드리겠습니다.<br />
                    감사합니다.
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: C.inkBlack, fontFamily: sans }}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 pt-16 pb-8">
        <div
          className="flex flex-col lg:flex-row justify-between gap-12 pb-14"
          style={{ borderBottom: `1px solid rgba(255,255,255,0.08)` }}
        >
          {/* Brand */}
          <div style={{ maxWidth: 260 }}>
            <p
              style={{
                color: C.chalkWhite,
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: "0.1em",
                marginBottom: 12,
              }}
            >
              SO&apos;ONE
            </p>
            <p
              style={{
                color: C.softOlive,
                fontSize: 13,
                fontStyle: "italic",
                fontFamily: serif,
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              Objects of scent, made to be remembered.
            </p>
          </div>

          {/* Nav links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <p
                style={{
                  color: C.softOlive,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Services
              </p>
              {["CUSTOM", "SHOP", "SUBSCRIPTION"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:opacity-100 transition-opacity"
                  style={{
                    color: C.chalkWhite,
                    fontSize: 14,
                    display: "block",
                    marginBottom: 10,
                    textDecoration: "none",
                    opacity: 0.6,
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
            <div>
              <p
                style={{
                  color: C.softOlive,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Brand
              </p>
              {["JOURNAL", "ABOUT"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:opacity-100 transition-opacity"
                  style={{
                    color: C.chalkWhite,
                    fontSize: 14,
                    display: "block",
                    marginBottom: 10,
                    textDecoration: "none",
                    opacity: 0.6,
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
            <div>
              <p
                style={{
                  color: C.softOlive,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Connect
              </p>
              {["Instagram", "Blog", "Email"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:opacity-100 transition-opacity"
                  style={{
                    color: C.chalkWhite,
                    fontSize: 14,
                    display: "block",
                    marginBottom: 10,
                    textDecoration: "none",
                    opacity: 0.6,
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div style={{ maxWidth: 300 }}>
            <p style={{ color: C.chalkWhite, fontSize: 14, lineHeight: 1.7, marginBottom: 20, opacity: 0.75 }}>
              향과 공간에 관한 새로운 소식을 받아보세요.
            </p>
            <div
              className="flex"
              style={{ borderBottom: `1px solid rgba(255,255,255,0.25)` }}
            >
              <input
                type="email"
                placeholder="이메일 주소"
                className="placeholder-stone-600"
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  color: C.chalkWhite,
                  fontSize: 13,
                  flex: 1,
                  padding: "8px 0",
                  fontFamily: sans,
                }}
              />
              <button
                className="hover:opacity-50 transition-opacity"
                style={{
                  background: "none",
                  border: "none",
                  color: C.chalkWhite,
                  cursor: "pointer",
                  fontSize: 16,
                  padding: "0 4px",
                }}
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-7">
          <p style={{ color: C.softOlive, fontSize: 11 }}>
            © 2024 SO&apos;ONE. 사업자등록번호 000-00-00000 · 서울특별시
          </p>
          <div className="flex gap-5">
            {["이용약관", "개인정보처리방침"].map((t) => (
              <a
                key={t}
                href="#"
                className="hover:opacity-70 transition-opacity"
                style={{ color: C.softOlive, fontSize: 11, textDecoration: "none" }}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openInquiry = () => setInquiryOpen(true);

  return (
    <div style={{ background: C.milkIvory, fontFamily: sans }}>
      <AnnouncementBar onInquiry={openInquiry} />
      <Header
        scrolled={scrolled}
        onInquiry={openInquiry}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />
      <main>
        <HeroSection onInquiry={openInquiry} />
        <ManifestoSection />
        <CustomIntroSection onInquiry={openInquiry} />
        <CustomProductsSection />
        <CustomStrengthsSection />
        <CaseStudiesSection />
        <ProcessSection onInquiry={openInquiry} />
        <ShopSection />
        <SubscriptionSection onInquiry={openInquiry} />
        <BrandStorySection />
        <JournalSection />
        <FinalCTASection onInquiry={openInquiry} />
      </main>
      <Footer />
      <InquiryPanel open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
