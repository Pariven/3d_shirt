import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useProgress } from '@react-three/drei'
import Experience from './components/Experience.jsx'

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_ITEMS = [
  'DROP 01 — SOVEREIGN',
  'QUIET POETRY',
  'THE ORIGIN',
  'THE ASCENT',
  'NOT FOR EVERYONE',
  'VOID IS FORM',
]

const DROP_PIECES = [
  {
    n: '01',
    name: 'QUIET POETRY',
    garment: "WOMEN'S CROP BAGGY SHIRT",
    statement: '“MADE OF QUIET POETRY”',
    viewing: false,
  },
  {
    n: '02',
    name: 'THE ORIGIN',
    garment: 'BOXY CUT TEE',
    statement: '“PURPOSE AND TRUTH”',
    viewing: true,
  },
  {
    n: '03',
    name: 'THE ASCENT',
    garment: 'HOODIE',
    statement: '“BECOME WHAT ONE COULDN’T ESCAPE”',
    viewing: false,
  },
]

function Loader() {
  const { progress, active } = useProgress()
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (!active && progress >= 100) {
      const id = setTimeout(() => setGone(true), 900)
      return () => clearTimeout(id)
    }
  }, [active, progress])

  if (gone) return null
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${
        !active && progress >= 100 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <p className="font-display text-5xl font-light tracking-[0.3em] text-[#f4f4f2]">
        {Math.round(progress)}%
      </p>
      <p className="mt-6 font-label text-[10px] font-light tracking-[0.6em] text-[#f4f4f2]/40">
        ENTERING THE VOID
      </p>
    </div>
  )
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

function SpecRow({ k, v }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-[#f4f4f2]/12 py-4">
      <span className="font-label text-[10px] font-light tracking-[0.35em] text-[#f4f4f2]/40">
        {k}
      </span>
      <span className="text-right font-body text-sm font-normal tracking-[0.12em] text-[#f4f4f2]">
        {v}
      </span>
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

export default function App() {
  const progressFill = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1, anchors: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      // slight delay + fade when entering the site
      gsap.fromTo(
        '[data-hero-fade]',
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 1.6, stagger: 0.14, delay: 1.1, ease: 'power2.out' },
      )

      // slow fade/slide reveals — nothing flashy
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

      // hero wordmark recedes into the void as you leave it
      gsap.to('[data-hero-title]', {
        yPercent: -24,
        autoAlpha: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      // right-hand scroll progress line
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
      <Loader />

      {/* matte void background + hairline grid */}
      <div id="page-bg" className="void-bg fixed inset-0 z-0">
        <div className="hairlines absolute inset-0" />
      </div>

      <div className="grain" />

      {/* 3D layer */}
      <Experience />

      {/* fixed UI */}
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between px-6 py-6 text-[#f4f4f2] md:px-10">
          <a href="#hero" className="font-display text-base font-medium tracking-[0.45em]">
            VOIDNOIR
          </a>
          <div className="hidden gap-12 font-label text-[10px] font-light tracking-[0.4em] md:flex">
            <a href="#drop" className="nav-link">THE DROP</a>
            <a href="#about" className="nav-link">ABOUT</a>
            <a href="#finale" className="nav-link">CONTACT</a>
          </div>
          <button className="nav-link font-label text-[10px] font-light tracking-[0.4em]">
            CART (0)
          </button>
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
      <main className="relative">
        {/* HERO — one focus piece. An entry, not a banner. */}
        <section id="hero" className="relative z-[5] flex h-screen flex-col justify-between overflow-hidden">
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
            <p data-hero-fade className="mt-4 font-label text-[11px] font-light tracking-[0.8em] text-[#f4f4f2]/40">
              VOID IS FORM.
            </p>
          </div>

          <div className="flex items-end justify-between px-6 pb-9 md:px-10">
            <p data-hero-fade className="max-w-[220px] font-label text-[9px] font-light leading-loose tracking-[0.35em] text-[#f4f4f2]/35">
              THE ORIGIN
              <br />
              BOXY CUT TEE
              <br />
              LIMITED RELEASE
            </p>
            <div data-hero-fade className="scroll-cue hidden text-center font-label text-[9px] font-light tracking-[0.6em] text-[#f4f4f2]/45 md:block">
              SCROLL
            </div>
            <a
              data-hero-fade
              href="#drop"
              className="btn-void px-8 py-3 font-label text-[10px] font-light tracking-[0.35em]"
            >
              EXPLORE DROP
            </a>
          </div>
        </section>

        <div className="relative z-20">
          <Marquee />
        </div>

        {/* 01 — FABRIC (text left, shirt drifts right) */}
        <section id="fabric" className="relative z-20 flex min-h-screen items-center">
          <div className="grid w-full grid-cols-1 gap-10 px-6 py-28 md:grid-cols-2 md:px-10">
            <div className="max-w-xl">
              <SectionLabel>01 — FABRIC / THE ORIGIN</SectionLabel>
              <h2
                data-reveal
                className="mt-8 font-display text-4xl font-medium leading-[1.05] tracking-[0.04em] text-[#f4f4f2] md:text-6xl"
              >
                DENSE.
                <br />
                MATTE.
                <br />
                SILENT.
              </h2>
              <p data-reveal className="mt-9 max-w-md font-body text-[15px] font-light leading-relaxed tracking-[0.02em] text-[#f4f4f2]/60">
                240 GSM combed organic cotton, enzyme-washed to a dry, matte
                hand. It holds its structure wash after wash and drapes with
                real weight. Nothing about it is loud.
              </p>
              <div data-reveal className="mt-12">
                <SpecRow k="WEIGHT" v="240 GSM" />
                <SpecRow k="COMPOSITION" v="100% ORGANIC COTTON" />
                <SpecRow k="HAND-FEEL" v="DRY / MATTE" />
                <SpecRow k="SHRINKAGE" v="&lt; 3%" />
              </div>
            </div>
            <div className="hidden md:block" />
          </div>
        </section>

        {/* 02 — CONSTRUCTION (text right, shirt shows its back) */}
        <section id="construction" className="relative z-20 flex min-h-screen items-center">
          <div className="grid w-full grid-cols-1 gap-10 px-6 py-28 md:grid-cols-2 md:px-10">
            <div className="hidden md:block" />
            <div className="max-w-xl justify-self-end">
              <SectionLabel>02 — CONSTRUCTION</SectionLabel>
              <h2
                data-reveal
                className="mt-8 font-display text-4xl font-medium leading-[1.05] tracking-[0.04em] text-[#f4f4f2] md:text-6xl"
              >
                BUILT,
                <br />
                NOT SEWN.
              </h2>
              <p data-reveal className="mt-9 max-w-md font-body text-[15px] font-light leading-relaxed tracking-[0.02em] text-[#f4f4f2]/60">
                A tubular-knit body removes the side seams entirely. Every seam
                that remains is flatlocked, every hem double-needled, and the
                collar rib is reinforced to hold its line.
              </p>
              <div data-reveal className="mt-12">
                <SpecRow k="BODY" v="TUBULAR KNIT — NO SIDE SEAMS" />
                <SpecRow k="SEAMS" v="FLATLOCK" />
                <SpecRow k="HEMS" v="DOUBLE-NEEDLE" />
                <SpecRow k="COLLAR" v="2×2 RIB, REINFORCED" />
              </div>
            </div>
          </div>
        </section>

        {/* 03 — FIT (shirt recedes to center, size table) */}
        <section id="fit" className="relative z-20 flex min-h-screen items-center">
          <div className="w-full px-6 py-28 md:px-10">
            <div className="text-center">
              <SectionLabel>03 — FIT</SectionLabel>
              <h2
                data-reveal
                className="mt-8 font-display text-4xl font-medium leading-[1.05] tracking-[0.05em] text-[#f4f4f2] md:text-6xl"
              >
                BOXY. ON PURPOSE.
              </h2>
              <p data-reveal className="mx-auto mt-9 max-w-lg font-body text-[15px] font-light leading-relaxed tracking-[0.02em] text-[#f4f4f2]/60">
                Drop shoulders, a boxy body, a clean squared hem. Sized true
                for the full silhouette — size down for a closer line.
              </p>
            </div>
            <div data-reveal className="mx-auto mt-16 max-w-3xl overflow-x-auto">
              <table className="w-full border-collapse font-label text-[11px] font-light tracking-[0.25em]">
                <thead>
                  <tr className="border-b border-[#f4f4f2]/20 text-[#f4f4f2]/40">
                    <th className="py-4 text-left font-normal">SIZE</th>
                    <th className="py-4 text-right font-normal">CHEST (CM)</th>
                    <th className="py-4 text-right font-normal">LENGTH (CM)</th>
                    <th className="py-4 text-right font-normal">SHOULDER (CM)</th>
                  </tr>
                </thead>
                <tbody className="text-[#f4f4f2]/85">
                  {[
                    ['S', '112', '68', '52'],
                    ['M', '118', '70', '54'],
                    ['L', '124', '72', '56'],
                    ['XL', '130', '74', '58'],
                  ].map(([s, c, l, sh]) => (
                    <tr key={s} className="border-b border-[#f4f4f2]/8">
                      <td className="py-4 text-left">{s}</td>
                      <td className="py-4 text-right">{c}</td>
                      <td className="py-4 text-right">{l}</td>
                      <td className="py-4 text-right">{sh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* DROP 01 — SOVEREIGN (three pieces, three meanings) */}
        <section id="drop" className="relative z-20 flex min-h-screen items-center">
          <div className="w-full px-6 py-28 md:px-10">
            <SectionLabel>DROP 01 — SOVEREIGN</SectionLabel>
            <h2
              data-reveal
              className="mt-8 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[0.04em] text-[#f4f4f2] md:text-6xl"
            >
              THREE PIECES.
              <br />
              THREE MEANINGS.
              <br />
              ONE IDENTITY.
            </h2>

            <div data-reveal className="mt-16 border-t border-[#f4f4f2]/15">
              {DROP_PIECES.map((piece) => (
                <div
                  key={piece.n}
                  className="drop-row grid grid-cols-1 items-baseline gap-2 border-b border-[#f4f4f2]/15 py-8 md:grid-cols-[80px_1fr_1fr_auto] md:gap-8"
                >
                  <span className="font-label text-[10px] font-light tracking-[0.4em] text-[#f4f4f2]/30">
                    {piece.n}
                  </span>
                  <h3 className="font-display text-2xl font-medium tracking-[0.08em] text-[#f4f4f2] md:text-3xl">
                    {piece.name}
                  </h3>
                  <div>
                    <p className="font-label text-[10px] font-light tracking-[0.35em] text-[#f4f4f2]/45">
                      {piece.garment}
                    </p>
                    <p className="mt-2 font-body text-[13px] font-light italic tracking-[0.06em] text-[#f4f4f2]/55">
                      {piece.statement}
                    </p>
                  </div>
                  <span className="font-label text-[9px] font-light tracking-[0.35em] text-[#f4f4f2]/30">
                    {piece.viewing ? '— CURRENTLY VIEWING' : 'REVEALING SOON'}
                  </span>
                </div>
              ))}
            </div>

            <p data-reveal className="mt-12 max-w-xl font-body text-[14px] font-light leading-relaxed tracking-[0.02em] text-[#f4f4f2]/50">
              SOVEREIGN is not simply a collection. It is a statement of
              self-mastery — individuality, self-definition, transformation.
            </p>
          </div>
        </section>

        {/* ABOUT — the philosophy */}
        <section id="about" className="relative z-20 flex min-h-screen items-center">
          <div className="mx-auto w-full max-w-4xl px-6 py-28 text-center md:px-10">
            <SectionLabel>VOIDNOIR — ABOUT</SectionLabel>
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

        {/* FINALE — welcome to the void */}
        <section id="finale" className="relative z-20 flex min-h-screen flex-col justify-between">
          <div className="flex flex-1 flex-col items-center justify-center px-6 pt-32 text-center md:px-10">
            <SectionLabel>DROP 01 — SOVEREIGN / AW26</SectionLabel>
            <h2
              data-reveal
              className="mt-8 font-display text-[clamp(2.6rem,8vw,7rem)] font-medium leading-[1.02] tracking-[0.05em] text-[#f4f4f2]"
            >
              WELCOME
              <br />
              TO THE VOID.
            </h2>
            <div data-reveal className="mt-14 flex flex-col items-center gap-7">
              <a href="#hero" className="btn-void px-16 py-5 font-label text-[11px] font-light tracking-[0.35em]">
                ENTER
              </a>
              <p className="font-label text-[9px] font-light tracking-[0.4em] text-[#f4f4f2]/35">
                LIMITED RELEASE · DETAILS REVEALING SOON
              </p>
            </div>
          </div>

          <footer className="mt-24">
            <Marquee />
            <div className="flex flex-col items-center justify-between gap-8 px-6 py-12 md:flex-row md:px-10">
              <p className="font-label text-[9px] font-light tracking-[0.35em] text-[#f4f4f2]/30">
                © 2026 VOIDNOIR
              </p>
              <p className="text-stroke font-display text-5xl font-semibold tracking-[0.2em]">
                VOIDNOIR
              </p>
              <div className="flex gap-10 font-label text-[9px] font-light tracking-[0.35em] text-[#f4f4f2]/50">
                <a href="#hero" className="nav-link">INSTAGRAM</a>
                <a href="#hero" className="nav-link">CONTACT</a>
                <a href="#hero" className="nav-link">TERMS</a>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </>
  )
}
