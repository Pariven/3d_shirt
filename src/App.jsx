import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_ITEMS = [
  'DROP 01 — SOVEREIGN',
  'QUIET POETRY',
  'THE ORIGIN',
  'THE ASCENT',
  'NOT FOR EVERYONE',
  'VOID IS FORM',
]

const PRODUCTS = [
  {
    code: 'VN-W001',
    name: 'QUIET POETRY',
    garment: "WOMEN'S CROP BAGGY SHIRT",
    color: 'OBSIDIAN',
    price: 'RM209',
    badge: 'NEW',
    statement: '“MADE OF QUIET POETRY”',
  },
  {
    code: 'VN-T001',
    name: 'THE ORIGIN',
    garment: 'BOXY CUT TEE',
    color: 'STATIC BLACK',
    price: 'RM189',
    badge: 'LIMITED',
    statement: '“PURPOSE AND TRUTH”',
  },
  {
    code: 'VN-H001',
    name: 'THE ASCENT',
    garment: 'HOODIE',
    color: 'ECLIPSE',
    price: 'RM329',
    badge: 'NEW',
    statement: '“BECOME WHAT ONE COULDN’T ESCAPE”',
  },
  {
    code: 'VN-X000',
    name: '[REDACTED]',
    garment: 'SIGNAL LOST',
    color: '—',
    price: '—',
    badge: 'SOON',
    statement: 'AWAITING TRANSMISSION',
    locked: true,
  },
]

const CATEGORIES = [
  { n: '01', name: 'TEES' },
  { n: '02', name: 'OUTERWEAR' },
  { n: '03', name: 'BOTTOMS' },
  { n: '04', name: 'ACCESSORIES' },
]

const TIERS = [
  { n: '01', name: 'SIGNAL', line: 'ENTRY', copy: 'Every purchase transmits points into the system.' },
  { n: '02', name: 'SHADOW', line: 'KEPT CLOSE', copy: 'Early access to each drop before the public signal.' },
  { n: '03', name: 'VOID', line: 'INNER CIRCLE', copy: 'Private events. First claim on limited pieces.' },
]

const MENU_LINKS = [
  { n: '01', name: 'HOME', href: '#hero' },
  { n: '02', name: 'SHOP', href: '#collection' },
  { n: '03', name: 'TRANSMISSION', href: '#transmission' },
  { n: '04', name: 'FORM', href: '#form' },
  { n: '05', name: 'ABOUT', href: '#about' },
  { n: '06', name: 'ACCOUNT', href: '#hero' },
]

function useKLTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kuala_Lumpur',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 15000)
    return () => clearInterval(id)
  }, [])
  return time
}

function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="overflow-hidden border-y border-[#f4f4f2]/10 py-4">
      <div className="marquee-track">
        {[...row, ...row].map((item, i) => (
          <span
            key={i}
            className="mx-8 flex items-center gap-8 whitespace-nowrap font-label text-[11px] font-light tracking-[0.4em] text-[#f4f4f2]/45"
          >
            {item} <span className="text-[7px] text-[#f4f4f2]/25">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <p data-reveal className="font-label text-[10px] font-light tracking-[0.5em] text-[#f4f4f2]/35">
      {children}
    </p>
  )
}

function ProductCard({ p }) {
  return (
    <article className="group border border-[#f4f4f2]/10 bg-[#0a0a0a]">
      {/* image area — placeholder until campaign photos arrive */}
      <div className="relative aspect-square overflow-hidden border-b border-[#f4f4f2]/10">
        <div className="card-art absolute inset-0" />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-5xl font-medium tracking-[0.1em] text-[#f4f4f2]/[0.05]">
          {p.code}
        </span>
        <span className="pointer-events-none absolute inset-x-0 bottom-14 text-center font-label text-[8px] font-light tracking-[0.4em] text-[#f4f4f2]/25">
          {p.locked ? 'AWAITING TRANSMISSION' : 'IMAGERY TRANSMITTING SOON'}
        </span>
        <span className="absolute left-4 top-4 border border-[#f4f4f2]/25 px-3 py-1 font-label text-[8px] font-light tracking-[0.35em] text-[#f4f4f2]/70">
          {p.badge}
        </span>
        <button
          disabled={p.locked}
          className={`absolute inset-x-0 bottom-0 translate-y-full py-4 font-label text-[10px] font-light tracking-[0.4em] transition-transform duration-500 ease-out group-hover:translate-y-0 ${
            p.locked
              ? 'bg-[#0c0c0c] text-[#f4f4f2]/30'
              : 'bg-[#f4f4f2] text-black hover:tracking-[0.55em]'
          }`}
        >
          {p.locked ? 'NO SIGNAL' : 'QUICK ADD'}
        </button>
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-baseline justify-between font-label text-[9px] font-light tracking-[0.35em] text-[#f4f4f2]/35">
          <span>{p.code}</span>
          <span>{p.color}</span>
        </div>
        <h3 className="font-display text-lg font-medium tracking-[0.12em] text-[#f4f4f2]">
          {p.name}
        </h3>
        <p className="font-label text-[9px] font-light tracking-[0.3em] text-[#f4f4f2]/40">
          {p.garment}
        </p>
        <div className="flex items-baseline justify-between pt-1">
          <span className="font-body text-sm font-normal tracking-[0.1em] text-[#f4f4f2]/85">
            {p.price}
          </span>
          <span className="max-w-[55%] truncate font-body text-[10px] font-light italic tracking-[0.04em] text-[#f4f4f2]/35">
            {p.statement}
          </span>
        </div>
      </div>
    </article>
  )
}

export default function App() {
  const progressFill = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const time = useKLTime()

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1, anchors: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-fade]',
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 1.6, stagger: 0.14, delay: 0.9, ease: 'power2.out' },
      )
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 44, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        )
      })
      gsap.to('[data-hero-title]', {
        yPercent: -24,
        autoAlpha: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(progressFill.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
      })
    })

    return () => {
      ctx.revert()
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {/* matte void background + hairline grid */}
      <div id="page-bg" className="void-bg fixed inset-0 z-0">
        <div className="hairlines absolute inset-0" />
      </div>

      <div className="grain" />

      {/* full-screen menu */}
      <div
        className={`menu-overlay fixed inset-0 z-[80] flex items-center bg-black/95 backdrop-blur-sm ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav className="w-full px-8 md:px-24">
          {MENU_LINKS.map((l) => (
            <a
              key={l.n}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="menu-link group flex items-baseline gap-8 border-b border-[#f4f4f2]/10 py-6 text-[#f4f4f2]/60"
            >
              <span className="font-label text-[10px] font-light tracking-[0.4em] text-[#f4f4f2]/30">
                {l.n}
              </span>
              <span className="font-display text-3xl font-medium tracking-[0.15em] md:text-5xl">
                {l.name}
              </span>
            </a>
          ))}
          <p className="mt-10 font-label text-[9px] font-light tracking-[0.5em] text-[#f4f4f2]/25">
            VOIDNOIR — UNIFORM FOR THE UNSEEN
          </p>
        </nav>
      </div>

      {/* fixed UI */}
      <header className="fixed inset-x-0 top-0 z-[85]">
        <nav className="grid grid-cols-3 items-center px-6 py-6 text-[#f4f4f2] md:px-10">
          <p className="font-label text-[10px] font-light tracking-[0.35em] text-[#f4f4f2]/50">
            {time && `${time} KL`}
          </p>
          <a href="#hero" className="justify-self-center font-display text-base font-medium tracking-[0.45em]">
            VOIDNOIR
          </a>
          <div className="flex items-center justify-self-end gap-8 font-label text-[10px] font-light tracking-[0.35em]">
            <a href="#collection" className="nav-link hidden md:inline">SHOP</a>
            <a href="#about" className="nav-link hidden md:inline">ABOUT</a>
            <button className="nav-link">CART (0)</button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-link tracking-[0.35em]"
            >
              {menuOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </nav>
      </header>

      <div className="fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
        <p className="rotate-180 font-label text-[9px] font-light tracking-[0.6em] text-[#f4f4f2]/30 [writing-mode:vertical-rl]">
          DROP 01 — SOVEREIGN / VOIDNOIR
        </p>
      </div>

      <div className="fixed right-6 top-1/2 z-50 hidden h-44 w-px -translate-y-1/2 bg-[#f4f4f2]/15 lg:block">
        <div ref={progressFill} className="h-full w-full origin-top scale-y-0 bg-[#f4f4f2]/70" />
      </div>

      {/* ============ CONTENT ============ */}
      <main className="relative z-10">
        {/* HERO */}
        <section id="hero" className="relative flex h-screen flex-col justify-between overflow-hidden">
          <div className="flex items-end justify-between px-6 pt-28 md:px-10">
            <p data-hero-fade className="font-label text-[10px] font-light tracking-[0.5em] text-[#f4f4f2]/35">
              DROP 01 — SOVEREIGN
            </p>
            <p data-hero-fade className="hidden font-label text-[10px] font-light tracking-[0.5em] text-[#f4f4f2]/35 md:block">
              NOT FOR EVERYONE
            </p>
          </div>

          <div data-hero-title className="pointer-events-none select-none text-center">
            <h1
              data-hero-fade
              className="font-display text-[clamp(3.2rem,14vw,15rem)] font-medium leading-[0.95] tracking-[0.06em] text-[#f4f4f2]"
            >
              VOIDNOIR
            </h1>
            <p data-hero-fade className="mt-6 font-label text-[12px] font-light tracking-[0.7em] text-[#f4f4f2]/55">
              EXIST BETWEEN LIGHT &amp; ABSENCE
            </p>
            <p data-hero-fade className="mt-3 font-label text-[9px] font-light tracking-[0.55em] text-[#f4f4f2]/30">
              UNIFORM FOR THE UNSEEN
            </p>
          </div>

          <div className="flex items-end justify-between px-6 pb-9 md:px-10">
            <p data-hero-fade className="hidden max-w-[220px] font-label text-[9px] font-light leading-loose tracking-[0.35em] text-[#f4f4f2]/35 md:block">
              THREE PIECES
              <br />
              THREE MEANINGS
              <br />
              ONE IDENTITY
            </p>
            <div data-hero-fade className="scroll-cue hidden text-center font-label text-[9px] font-light tracking-[0.6em] text-[#f4f4f2]/45 md:block">
              SCROLL
            </div>
            <div data-hero-fade className="flex gap-4">
              <a href="#about" className="btn-void px-7 py-3 font-label text-[10px] font-light tracking-[0.3em]">
                ENTER THE VOID
              </a>
              <a
                href="#collection"
                className="btn-void border-[#f4f4f2]/80 px-7 py-3 font-label text-[10px] font-light tracking-[0.3em]"
              >
                VIEW COLLECTION
              </a>
            </div>
          </div>
        </section>

        <Marquee />

        {/* THE COLLECTION — product cards */}
        <section id="collection" className="relative min-h-screen px-6 py-28 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>01 — THE COLLECTION</SectionLabel>
              <h2
                data-reveal
                className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-[0.04em] text-[#f4f4f2] md:text-6xl"
              >
                SOVEREIGN
              </h2>
            </div>
            <a
              data-reveal
              href="#collection"
              className="nav-link font-label text-[10px] font-light tracking-[0.4em] text-[#f4f4f2]/50"
            >
              VIEW ALL →
            </a>
          </div>

          <div data-reveal className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.code} p={p} />
            ))}
          </div>

          <p data-reveal className="mt-10 font-label text-[9px] font-light tracking-[0.4em] text-[#f4f4f2]/30">
            LIMITED RELEASE — ONCE A PIECE SELLS THROUGH, IT DOES NOT RETURN.
          </p>
        </section>

        {/* NEW TRANSMISSION — campaign strip */}
        <section id="transmission" className="relative px-6 py-28 md:px-10">
          <div data-reveal className="relative overflow-hidden border border-[#f4f4f2]/10">
            <div className="card-art absolute inset-0" />
            <div className="relative flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
              <SectionLabel>02 — NEW TRANSMISSION</SectionLabel>
              <h2 className="mt-8 max-w-3xl font-display text-3xl font-medium leading-[1.15] tracking-[0.06em] text-[#f4f4f2] md:text-5xl">
                THREE PIECES.
                <br />
                THREE MEANINGS.
                <br />
                ONE IDENTITY.
              </h2>
              <p className="mt-8 font-label text-[9px] font-light tracking-[0.45em] text-[#f4f4f2]/35">
                CAMPAIGN IMAGERY — TRANSMITTING SOON
              </p>
              <a href="#about" className="btn-void mt-12 px-10 py-4 font-label text-[10px] font-light tracking-[0.35em]">
                READ THE SIGNAL
              </a>
            </div>
          </div>
        </section>

        {/* SHOP BY FORM — category cards */}
        <section id="form" className="relative px-6 py-28 md:px-10">
          <SectionLabel>03 — SHOP BY FORM</SectionLabel>
          <div data-reveal className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <a
                key={c.n}
                href="#collection"
                className="cat-card group flex aspect-[4/5] flex-col justify-between border border-[#f4f4f2]/10 p-6"
              >
                <span className="cat-num font-label text-[10px] font-light tracking-[0.4em] text-[#f4f4f2]/30">
                  {c.n}
                </span>
                <div>
                  <span className="block font-display text-xl font-medium tracking-[0.14em] text-[#f4f4f2] md:text-2xl">
                    {c.name}
                  </span>
                  <span className="mt-3 block font-label text-[8px] font-light tracking-[0.4em] text-[#f4f4f2]/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    ENTER →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ABOUT — the philosophy */}
        <section id="about" className="relative flex min-h-screen items-center">
          <div className="mx-auto w-full max-w-4xl px-6 py-28 text-center md:px-10">
            <SectionLabel>04 — VOIDNOIR</SectionLabel>
            <h2
              data-reveal
              className="mt-8 font-display text-3xl font-medium leading-[1.15] tracking-[0.06em] text-[#f4f4f2] md:text-5xl"
            >
              THE ABSENCE OF LIGHT
              <br />
              CREATES FORM.
            </h2>
            <div className="mx-auto mt-12 max-w-2xl space-y-8 font-body text-[15px] font-light leading-loose tracking-[0.02em] text-[#f4f4f2]/60">
              <p data-reveal>
                VOIDNOIR is not simply a clothing label. It is an expression of
                identity, discipline, creativity and connection — built around
                the contrast between darkness and elegance, for those who move
                differently.
              </p>
              <p data-reveal>
                The VOID is the unknown — the space where ideas form without
                limitation. NOIR is the elegance of darkness — minimal,
                refined, timeless. Silence can be powerful. Presence does not
                need to be announced.
              </p>
              <p data-reveal>
                Every release is limited. Every drop is a chapter. And with
                every drop, five trees are planted — growth measured beyond
                numbers.
              </p>
            </div>
            <div data-reveal className="mt-14 flex items-center justify-center gap-10 font-label text-[9px] font-light tracking-[0.45em] text-[#f4f4f2]/35">
              <span>LIMITED RELEASES</span>
              <span className="text-[#f4f4f2]/15">/</span>
              <span>5 TREES PER DROP</span>
              <span className="text-[#f4f4f2]/15">/</span>
              <span>BEYOND CLOTHING</span>
            </div>
          </div>
        </section>

        {/* VOID POINTS — loyalty tiers */}
        <section id="points" className="relative px-6 py-28 md:px-10">
          <SectionLabel>05 — VOID POINTS</SectionLabel>
          <h2
            data-reveal
            className="mt-6 font-display text-3xl font-medium tracking-[0.06em] text-[#f4f4f2] md:text-5xl"
          >
            THE DEEPER YOU GO.
          </h2>
          <div data-reveal className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TIERS.map((t) => (
              <div key={t.n} className="border border-[#f4f4f2]/10 bg-[#0c0c0c] p-8">
                <div className="flex items-baseline justify-between">
                  <span className="font-label text-[10px] font-light tracking-[0.4em] text-[#f4f4f2]/30">
                    {t.n}
                  </span>
                  <span className="font-label text-[8px] font-light tracking-[0.4em] text-[#f4f4f2]/30">
                    {t.line}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-medium tracking-[0.18em] text-[#f4f4f2]">
                  {t.name}
                </h3>
                <p className="mt-5 font-body text-[13px] font-light leading-relaxed tracking-[0.02em] text-[#f4f4f2]/50">
                  {t.copy}
                </p>
              </div>
            ))}
          </div>
          <p data-reveal className="mt-10 font-label text-[9px] font-light tracking-[0.4em] text-[#f4f4f2]/30">
            SYSTEM CALIBRATING — FULL RULES REVEALING SOON.
          </p>
        </section>

        {/* FINALE */}
        <section id="finale" className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center md:px-10">
          <SectionLabel>DROP 01 — SOVEREIGN / AW26</SectionLabel>
          <h2
            data-reveal
            className="mt-8 font-display text-[clamp(2.6rem,8vw,7rem)] font-medium leading-[1.02] tracking-[0.05em] text-[#f4f4f2]"
          >
            WELCOME
            <br />
            TO THE VOID.
          </h2>
          <a data-reveal href="#collection" className="btn-void mt-14 px-16 py-5 font-label text-[11px] font-light tracking-[0.35em]">
            ENTER
          </a>
        </section>

        {/* FOOTER */}
        <footer className="relative mt-16">
          <Marquee />
          <div className="grid grid-cols-2 gap-12 px-6 py-16 md:grid-cols-4 md:px-10 lg:px-20">
            <div>
              <p className="font-label text-[9px] font-light tracking-[0.45em] text-[#f4f4f2]/30">SHOP</p>
              <ul className="mt-6 space-y-3 font-label text-[10px] font-light tracking-[0.3em] text-[#f4f4f2]/55">
                <li><a href="#collection" className="nav-link">TEES</a></li>
                <li><a href="#collection" className="nav-link">OUTERWEAR</a></li>
                <li><a href="#collection" className="nav-link">BOTTOMS</a></li>
                <li><a href="#collection" className="nav-link">ACCESSORIES</a></li>
              </ul>
            </div>
            <div>
              <p className="font-label text-[9px] font-light tracking-[0.45em] text-[#f4f4f2]/30">CARE</p>
              <ul className="mt-6 space-y-3 font-label text-[10px] font-light tracking-[0.3em] text-[#f4f4f2]/55">
                <li><a href="#hero" className="nav-link">SHIPPING</a></li>
                <li><a href="#hero" className="nav-link">RETURNS</a></li>
                <li><a href="#fit" className="nav-link">SIZE GUIDE</a></li>
                <li><a href="#hero" className="nav-link">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="font-label text-[9px] font-light tracking-[0.45em] text-[#f4f4f2]/30">BRAND</p>
              <ul className="mt-6 space-y-3 font-label text-[10px] font-light tracking-[0.3em] text-[#f4f4f2]/55">
                <li><a href="#about" className="nav-link">ABOUT</a></li>
                <li><a href="#hero" className="nav-link">NEWSLETTER</a></li>
                <li><a href="#points" className="nav-link">MEMBERS</a></li>
              </ul>
            </div>
            <div>
              <p className="font-label text-[9px] font-light tracking-[0.45em] text-[#f4f4f2]/30">SIGNAL</p>
              <ul className="mt-6 space-y-3 font-label text-[10px] font-light tracking-[0.3em] text-[#f4f4f2]/55">
                <li><a href="#hero" className="nav-link">INSTAGRAM</a></li>
                <li><span className="text-[#f4f4f2]/35">EMAIL — TBA</span></li>
                <li><span className="text-[#f4f4f2]/35">KUALA LUMPUR, MY</span></li>
              </ul>
            </div>
          </div>
          <div className="px-6 pb-10 md:px-10">
            <p className="text-stroke text-center font-display text-[clamp(3rem,12vw,12rem)] font-semibold leading-none tracking-[0.15em]">
              VOIDNOIR
            </p>
            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#f4f4f2]/10 pt-8 md:flex-row">
              <p className="font-label text-[9px] font-light tracking-[0.35em] text-[#f4f4f2]/30">
                © 2026 VOIDNOIR — ALL RIGHTS RESERVED
              </p>
              <div className="flex gap-10 font-label text-[9px] font-light tracking-[0.35em] text-[#f4f4f2]/45">
                <a href="#hero" className="nav-link">PRIVACY</a>
                <a href="#hero" className="nav-link">TERMS</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
