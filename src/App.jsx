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
    img: '/images/card-quiet-poetry.jpg',
  },
  {
    code: 'VN-T001',
    name: 'THE ORIGIN',
    garment: 'BOXY CUT TEE',
    color: 'STATIC BLACK',
    price: 'RM189',
    badge: 'LIMITED',
    statement: '“PURPOSE AND TRUTH”',
    img: '/images/card-origin.jpg',
  },
  {
    code: 'VN-H001',
    name: 'THE ASCENT',
    garment: 'HOODIE',
    color: 'ECLIPSE',
    price: 'RM329',
    badge: 'NEW',
    statement: '“BECOME WHAT ONE COULDN’T ESCAPE”',
    img: '/images/card-ascent.jpg',
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
  { n: '01', name: 'TEES', img: '/images/cat-tees.jpg' },
  { n: '02', name: 'OUTERWEAR', img: '/images/cat-outerwear.jpg' },
  { n: '03', name: 'BOTTOMS', img: '/images/cat-bottoms.jpg' },
  { n: '04', name: 'ACCESSORIES', img: '/images/cat-accessories.jpg' },
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

function Preloader() {
  const root = useRef(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const counter = { v: 0 }
    const el = root.current
    if (!el) return
    const num = el.querySelector('[data-count]')
    const ctx = gsap.context(() => {
      gsap.set('[data-load-letter]', { yPercent: 120 })
      const tl = gsap.timeline({ onComplete: () => setDone(true) })
      tl.to(counter, {
        v: 100,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: () => {
          num.textContent = String(Math.round(counter.v)).padStart(3, '0')
        },
      })
        .to('[data-load-bar]', { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0)
        .to('[data-load-meta]', { yPercent: -30, autoAlpha: 0, duration: 0.45, ease: 'power3.in' }, '+=0.1')
        .fromTo(
          '[data-load-letter]',
          { yPercent: 120 },
          { yPercent: 0, duration: 0.7, stagger: 0.05, ease: 'power4.out' },
          '-=0.15',
        )
        .to(
          '[data-load-letter]',
          { yPercent: -120, duration: 0.55, stagger: 0.035, ease: 'power3.in' },
          '+=0.3',
        )
        .to('[data-panel-top]', { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, '-=0.2')
        .to('[data-panel-bot]', { yPercent: 100, duration: 0.85, ease: 'power4.inOut' }, '<')
    }, el)
    return () => ctx.revert()
  }, [])

  if (done) return null
  return (
    <div ref={root} className="fixed inset-0 z-[120]">
      <div data-panel-top className="absolute inset-x-0 top-0 h-1/2 border-b border-[#f4f4f2]/10 bg-[#050505]" />
      <div data-panel-bot className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050505]" />

      {/* counter + editorial frame */}
      <div data-load-meta className="absolute inset-0">
        <p className="absolute left-6 top-6 font-label text-[10px] font-light tracking-[0.5em] text-[#f4f4f2]/40 md:left-10 md:top-8">
          VOIDNOIR®
        </p>
        <p className="absolute right-6 top-6 font-label text-[10px] font-light tracking-[0.5em] text-[#f4f4f2]/40 md:right-10 md:top-8">
          DROP 01 — SOVEREIGN
        </p>
        <p className="absolute bottom-6 left-6 font-label text-[10px] font-light tracking-[0.5em] text-[#f4f4f2]/40 md:bottom-8 md:left-10">
          AW26
        </p>
        <p className="absolute bottom-6 right-6 font-label text-[10px] font-light tracking-[0.5em] text-[#f4f4f2]/40 md:bottom-8 md:right-10">
          KUALA LUMPUR
        </p>

        <div className="flex h-full flex-col items-center justify-center">
          <p data-count className="font-display text-7xl font-light tracking-[0.2em] text-[#f4f4f2] md:text-8xl">
            000
          </p>
          <div className="mt-8 h-px w-48 bg-[#f4f4f2]/15">
            <div data-load-bar className="h-full w-full origin-left scale-x-0 bg-[#f4f4f2]/80" />
          </div>
          <p className="mt-6 font-label text-[10px] font-light tracking-[0.7em] text-[#f4f4f2]/40">
            ENTERING THE VOID
          </p>
        </div>
      </div>

      {/* wordmark pass */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="overflow-hidden py-2 font-display text-[clamp(2.8rem,10vw,9rem)] font-medium leading-none tracking-[0.08em] text-[#f4f4f2]">
          {'VOIDNOIR'.split('').map((ch, i) => (
            <span key={i} data-load-letter className="inline-block will-change-transform">
              {ch}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const xd = gsap.quickTo(dot.current, 'x', { duration: 0.06, ease: 'power2.out' })
    const yd = gsap.quickTo(dot.current, 'y', { duration: 0.06, ease: 'power2.out' })
    const xr = gsap.quickTo(ring.current, 'x', { duration: 0.4, ease: 'power3.out' })
    const yr = gsap.quickTo(ring.current, 'y', { duration: 0.4, ease: 'power3.out' })
    let shown = false
    const move = (e) => {
      if (!shown) {
        shown = true
        gsap.set([dot.current, ring.current], { autoAlpha: 1 })
      }
      xd(e.clientX)
      yd(e.clientY)
      xr(e.clientX)
      yr(e.clientY)
    }
    const over = (e) => {
      const interactive = e.target.closest('a, button, [data-cursor]')
      gsap.to(ring.current, { scale: interactive ? 2 : 1, duration: 0.35, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot opacity-0" />
      <div ref={ring} className="cursor-ring opacity-0" />
    </>
  )
}

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
      {/* image area — editorial placeholders until campaign photos arrive */}
      <div data-img-reveal className="relative aspect-square overflow-hidden border-b border-[#f4f4f2]/10">
        {p.img ? (
          <img
            src={p.img}
            alt={`${p.name} — ${p.garment}`}
            className="card-art img-mono absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            <div className="card-art absolute inset-0" />
            <span className="pointer-events-none absolute inset-x-0 bottom-14 text-center font-label text-[8px] font-light tracking-[0.4em] text-[#f4f4f2]/25">
              AWAITING TRANSMISSION
            </span>
          </>
        )}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-5xl font-medium tracking-[0.1em] text-[#f4f4f2]/10">
          {p.code}
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

    // hold the page still while the preloader runs
    lenis.stop()
    const unlock = setTimeout(() => lenis.start(), 4600)

    const ctx = gsap.context(() => {
      // hero enters as the preloader curtain opens
      gsap.fromTo(
        '[data-hero-fade]',
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 1.6, stagger: 0.14, delay: 4.0, ease: 'power2.out' },
      )

      // hero image: slow settle on load, then drifts as you scroll
      gsap.fromTo(
        '#hero-img',
        { scale: 1.18, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 2.6, delay: 3.7, ease: 'power2.out' },
      )
      gsap.to('#hero-img', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      // images unmask as they enter the viewport
      gsap.utils.toArray('[data-img-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(12% 8% 12% 8%)', scale: 1.06 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
          },
        )
      })

      // transmission backdrop drifts slower than the page
      gsap.fromTo(
        '#transmission-img',
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: '#transmission', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )

      // VOID POINTS tiers surface one by one — the deeper you go
      gsap.fromTo(
        '[data-tier]',
        { y: 64, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: { trigger: '#points', start: 'top 70%' },
        },
      )

      // footer wordmark rises letter by letter out of the void
      gsap.fromTo(
        '[data-fletter]',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.055,
          ease: 'power4.out',
          scrollTrigger: { trigger: '[data-footer-word]', start: 'top 90%' },
        },
      )

      // footer columns + divider line
      gsap.fromTo(
        '[data-fcol]',
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: '[data-fcol]', start: 'top 85%' },
        },
      )
      gsap.to('[data-footer-line]', {
        scaleX: 1,
        duration: 1.6,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '[data-footer-line]', start: 'top 94%' },
      })
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
      clearTimeout(unlock)
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

      <Preloader />

      <Cursor />

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
          {/* full-bleed editorial image behind the wordmark */}
          <div className="absolute inset-0">
            <img
              id="hero-img"
              src="/images/hero.jpg"
              alt=""
              className="img-mono h-full w-full object-cover object-[50%_30%] opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black" />
          </div>

          <div className="relative flex items-end justify-between px-6 pt-28 md:px-10">
            <p data-hero-fade className="font-label text-[10px] font-light tracking-[0.5em] text-[#f4f4f2]/35">
              DROP 01 — SOVEREIGN
            </p>
            <p data-hero-fade className="hidden font-label text-[10px] font-light tracking-[0.5em] text-[#f4f4f2]/35 md:block">
              NOT FOR EVERYONE
            </p>
          </div>

          <div data-hero-title className="pointer-events-none relative select-none text-center">
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

          <div className="relative flex items-end justify-between px-6 pb-9 md:px-10">
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
          <div data-reveal className="scanlines relative overflow-hidden border border-[#f4f4f2]/10">
            <div className="absolute inset-0 overflow-hidden">
              <img
                id="transmission-img"
                src="/images/transmission.jpg"
                alt=""
                className="img-mono h-[130%] w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
            </div>
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
                className="cat-card group relative flex aspect-[4/5] flex-col justify-between overflow-hidden border border-[#f4f4f2]/10 p-6"
              >
                <img
                  src={c.img}
                  alt={c.name}
                  className="card-art img-mono absolute inset-0 h-full w-full object-cover opacity-35 transition-opacity duration-700 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />
                <span className="cat-num relative font-label text-[10px] font-light tracking-[0.4em] text-[#f4f4f2]/40">
                  {c.n}
                </span>
                <div className="relative">
                  <span className="block font-display text-xl font-medium tracking-[0.14em] text-[#f4f4f2] md:text-2xl">
                    {c.name}
                  </span>
                  <span className="mt-3 block font-label text-[8px] font-light tracking-[0.4em] text-[#f4f4f2]/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
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
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TIERS.map((t) => (
              <div
                key={t.n}
                data-tier
                data-cursor
                className="tier-card border border-[#f4f4f2]/10 bg-[#0c0c0c] p-8"
              >
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
                <div className="tier-line mt-8 h-px w-full bg-[#f4f4f2]/40" />
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
            <div data-fcol>
              <p className="font-label text-[9px] font-light tracking-[0.45em] text-[#f4f4f2]/30">SHOP</p>
              <ul className="mt-6 space-y-3 font-label text-[10px] font-light tracking-[0.3em] text-[#f4f4f2]/55">
                <li><a href="#collection" className="nav-link">TEES</a></li>
                <li><a href="#collection" className="nav-link">OUTERWEAR</a></li>
                <li><a href="#collection" className="nav-link">BOTTOMS</a></li>
                <li><a href="#collection" className="nav-link">ACCESSORIES</a></li>
              </ul>
            </div>
            <div data-fcol>
              <p className="font-label text-[9px] font-light tracking-[0.45em] text-[#f4f4f2]/30">CARE</p>
              <ul className="mt-6 space-y-3 font-label text-[10px] font-light tracking-[0.3em] text-[#f4f4f2]/55">
                <li><a href="#hero" className="nav-link">SHIPPING</a></li>
                <li><a href="#hero" className="nav-link">RETURNS</a></li>
                <li><a href="#fit" className="nav-link">SIZE GUIDE</a></li>
                <li><a href="#hero" className="nav-link">FAQ</a></li>
              </ul>
            </div>
            <div data-fcol>
              <p className="font-label text-[9px] font-light tracking-[0.45em] text-[#f4f4f2]/30">BRAND</p>
              <ul className="mt-6 space-y-3 font-label text-[10px] font-light tracking-[0.3em] text-[#f4f4f2]/55">
                <li><a href="#about" className="nav-link">ABOUT</a></li>
                <li><a href="#hero" className="nav-link">NEWSLETTER</a></li>
                <li><a href="#points" className="nav-link">MEMBERS</a></li>
              </ul>
            </div>
            <div data-fcol>
              <p className="font-label text-[9px] font-light tracking-[0.45em] text-[#f4f4f2]/30">SIGNAL</p>
              <ul className="mt-6 space-y-3 font-label text-[10px] font-light tracking-[0.3em] text-[#f4f4f2]/55">
                <li><a href="#hero" className="nav-link">INSTAGRAM</a></li>
                <li><span className="text-[#f4f4f2]/35">EMAIL — TBA</span></li>
                <li><span className="text-[#f4f4f2]/35">KUALA LUMPUR, MY</span></li>
              </ul>
            </div>
          </div>
          <div className="px-6 pb-10 md:px-10">
            <p
              data-footer-word
              className="footer-word overflow-hidden text-center font-display text-[clamp(3rem,12vw,12rem)] font-semibold leading-none tracking-[0.15em]"
            >
              {'VOIDNOIR'.split('').map((ch, i) => (
                <span key={i} data-fletter className="inline-block">
                  {ch}
                </span>
              ))}
            </p>
            <div data-footer-line className="mt-10 h-px w-full origin-left scale-x-0 bg-[#f4f4f2]/15" />
            <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
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
