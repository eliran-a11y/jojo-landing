import { useState } from 'react'
import { motion } from 'framer-motion'

// ─── Animation helpers ────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] },
})

const inView = (delay = 0) => ({
  initial:    { opacity: 0, y: 22 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] },
})

// ─── Inline style blocks ──────────────────────────────────
const S = {
  // Layout
  sectionPad:  { padding: '7.5rem 0' },
  sectionPadSm:{ padding: '4.5rem 0' },
  inner:       { maxWidth: '1080px', margin: '0 auto', padding: '0 2rem' },

  // Section header
  header: {
    textAlign: 'center',
    maxWidth: '640px',
    margin: '0 auto',
    marginBottom: '4rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  // Eyebrow
  eyebrow: {
    fontSize: '0.68rem',
    fontWeight: 600,
    letterSpacing: '0.26em',
    textTransform: 'uppercase',
    color: 'var(--cyan)',
    opacity: 0.55,
  },

  // Section title
  sectionTitle: {
    fontSize: 'clamp(1.9rem, 4.2vw, 3rem)',
    fontWeight: 800,
    lineHeight: 1.18,
    letterSpacing: '-0.026em',
    color: 'var(--cta)',
  },

  // Section sub
  sectionSub: {
    fontSize: '0.975rem',
    color: 'var(--muted)',
    lineHeight: 1.85,
    maxWidth: '540px',
    margin: '0 auto',
  },

  // Glass card base
  glassCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--line)',
    borderRadius: '14px',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.22)',
  },
}

// ─── SVG Icons ────────────────────────────────────────────
function IconSEO() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  )
}

function IconAI() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 0 2h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1 0-2h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z" />
      <path d="M9 14h.01M15 14h.01" />
    </svg>
  )
}

function IconMap() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconCode() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function IconLayout() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  )
}

function IconLink() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9l-6 6M9 9l6 6" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

// ─── HERO ─────────────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '6rem 2rem',
    }}>
      {/* Background glows */}
      <div style={{
        position: 'absolute',
        width: '1100px', height: '840px',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -58%)',
        background: 'radial-gradient(ellipse at center, rgba(15,80,200,0.22) 0%, rgba(10,55,150,0.12) 30%, rgba(5,30,90,0.05) 58%, transparent 72%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        width: '700px', height: '420px',
        bottom: '0', left: '50%',
        transform: 'translateX(-50%)',
        background: 'radial-gradient(ellipse at center, rgba(232,163,23,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        width: '500px', height: '300px',
        top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        maxWidth: '860px',
      }}>
        {/* Logo */}
        <motion.img
          {...fadeUp(0)}
          src="/logo.png"
          alt="JOJO Digital"
          style={{
            height: '60px',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 22px rgba(34,211,238,0.14))',
          }}
        />

        {/* Amber rule */}
        <motion.div
          {...fadeUp(0.06)}
          style={{
            width: '32px', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(232,163,23,0.50), transparent)',
            marginTop: '-0.5rem',
          }}
        />

        {/* Eyebrow badge */}
        <motion.div {...fadeUp(0.1)}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(34,211,238,0.06)',
            border: '1px solid rgba(34,211,238,0.18)',
            borderRadius: '100px',
            padding: '0.35rem 1rem',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--cyan)',
            opacity: 0.8,
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 6px rgba(34,211,238,0.9)' }} />
            בדיקת נראות דיגיטלית
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          {...fadeUp(0.18)}
          style={{
            fontSize: 'clamp(2.3rem, 6vw, 4.6rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.034em',
            color: 'var(--text)',
          }}
        >
          האם הלקוחות שלך
          <br />
          <span style={{ color: 'var(--cta)' }}>באמת מוצאים אותך?</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.3)}
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            color: 'var(--muted)',
            lineHeight: 1.82,
            maxWidth: '560px',
          }}
        >
          בעידן ה-AI, לא מספיק שהאתר שלך נראה טוב.
          גוגל, ChatGPT ו-Gemini מחליטים מי מופיע — ולמי.
          <br />
          אנחנו בודקים את כל מה שמשפיע על הנמצאות שלך.
        </motion.p>

        {/* CTA */}
        <motion.div {...fadeUp(0.42)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem' }}>
          <a
            href="#form"
            className="btn-primary"
            style={{ boxShadow: '0 0 52px rgba(232,163,23,0.18), 0 4px 28px rgba(232,163,23,0.28)', fontSize: '1.05rem' }}
          >
            לקבלת בדיקת נראות ללא עלות
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['בדיקה ראשונית ללא עלות', 'ללא התחייבות', 'תשובה תוך 48 שעות'].map((t) => (
              <span key={t} style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                fontSize: '0.8rem', color: 'var(--dim)',
              }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--cyan)', opacity: 0.7, flexShrink: 0 }} />
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── SERVICES ─────────────────────────────────────────────
const SERVICES = [
  {
    Icon: IconSEO,
    title: 'SEO אורגני',
    desc: 'דירוג בתוצאות גוגל, מילות מפתח, ו-E-E-A-T. אנחנו בודקים מה גוגל מבין על העסק שלך.',
    accent: 'cyan',
  },
  {
    Icon: IconAI,
    title: 'GEO / AI Visibility',
    desc: 'האם ChatGPT, Gemini ו-Perplexity מזכירים אותך? נראות במנועי ה-AI היא מציאות, לא עתיד.',
    accent: 'amber',
  },
  {
    Icon: IconMap,
    title: 'Google Business Profile',
    desc: 'הופעה בחיפוש מקומי, במפות ובתצוגת Knowledge Panel — שלמות ואמינות הפרופיל שלך.',
    accent: 'cyan',
  },
  {
    Icon: IconCode,
    title: 'SEO טכני',
    desc: 'מהירות, Core Web Vitals, אינדוקס תקין, schema markup — התשתית שגוגל דורש.',
    accent: 'amber',
  },
  {
    Icon: IconLayout,
    title: 'מבנה תוכן',
    desc: 'כותרות, תגיות, מבנה סמנטי ובהירות מסר — האם האתר שולח את המסר הנכון תוך 5 שניות?',
    accent: 'cyan',
  },
  {
    Icon: IconLink,
    title: 'סמכות ולינקים',
    desc: 'אמינות דומיין, פרופיל קישורים ונוכחות ברשת — הגורמים שמחזקים את האוטוריטה שלך.',
    accent: 'amber',
  },
]

function ServicesSection() {
  return (
    <section style={{ ...S.sectionPad, background: 'linear-gradient(180deg, rgba(6,7,14,0.98) 0%, var(--bg) 100%)' }}>
      <div style={S.inner}>
        <motion.div style={S.header} {...inView()}>
          <span style={S.eyebrow}>מה אנחנו בודקים</span>
          <h2 style={S.sectionTitle}>בדיקה מקיפה ב-6 תחומי ליבה</h2>
          <p style={S.sectionSub}>
            נמצאות דיגיטלית אמיתית לא מסתכמת באתר — זו מערכת שלמה.
            אנחנו בודקים כל נקודת מגע שמשפיעה על כך שלקוח יגיע אליך.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}
          className="services-grid"
        >
          {SERVICES.map(({ Icon, title, desc, accent }, i) => (
            <motion.div
              key={i}
              style={{
                ...S.glassCard,
                padding: '2rem 1.875rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.1rem',
                position: 'relative',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
              {...inView(i * 0.07)}
              whileHover={{ y: -4, transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] } }}
            >
              {/* Top edge accent */}
              <div style={{
                position: 'absolute', top: 0, left: '1.875rem', right: '1.875rem', height: '1px',
                background: accent === 'amber'
                  ? 'linear-gradient(90deg, transparent, rgba(232,163,23,0.32), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(34,211,238,0.26), transparent)',
              }} />

              {/* Icon */}
              <div style={{
                width: '46px', height: '46px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '11px',
                background: accent === 'amber' ? 'rgba(232,163,23,0.07)' : 'rgba(34,211,238,0.06)',
                border: `1px solid ${accent === 'amber' ? 'rgba(232,163,23,0.18)' : 'rgba(34,211,238,0.14)'}`,
                boxShadow: `0 0 18px ${accent === 'amber' ? 'rgba(232,163,23,0.08)' : 'rgba(34,211,238,0.07)'}`,
                color: accent === 'amber' ? 'var(--cta)' : 'var(--cyan)',
                flexShrink: 0,
              }}>
                <Icon />
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.35 }}>{title}</h3>
              <p style={{ fontSize: '0.855rem', color: 'var(--muted)', lineHeight: 1.72 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 540px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─── PROBLEM ──────────────────────────────────────────────
const PROBLEMS = [
  {
    Icon: IconCode,
    title: 'גוגל לא מצליח להבין את האתר',
    desc: 'אתר ללא מבנה סמנטי, schema נכון ותכנים מאורגנים — הוא אתר שגוגל מתעלם ממנו.',
  },
  {
    Icon: IconAI,
    title: 'מנועי AI לא מזכירים אותך',
    desc: 'ChatGPT ו-Gemini נשענים על מידע מהרשת. אם אתה לא שם בצורה ברורה — הם לא ממליצים עליך.',
  },
  {
    Icon: IconLayout,
    title: 'השירותים לא מוצגים בצורה ברורה',
    desc: 'מסר מעורפל = לקוח שמסתבך = לקוח שעוזב. הבהירות היא לא אסתטיקה — היא המרה.',
  },
  {
    Icon: IconSEO,
    title: 'אין תשובות מובנות לשאלות נפוצות',
    desc: 'שאלות כמו "כמה עולה" ו-"מה כולל השירות" — אם הן לא באתר, גוגל ו-AI לא ידעו לענות.',
  },
  {
    Icon: IconMap,
    title: 'הנראות המקומית חלשה',
    desc: 'פרופיל Google Business לא מעודכן, חוסר עקביות בפרטי העסק — ולקוחות מחפשים "קרוב אליי".',
  },
]

function ProblemSection() {
  return (
    <section style={{
      ...S.sectionPad,
      position: 'relative',
    }}>
      {/* Subtle red tint glow to emphasize "problem" */}
      <div style={{
        position: 'absolute', width: '700px', height: '400px',
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse at center, rgba(220,38,38,0.03) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={S.inner}>
        <motion.div style={S.header} {...inView()}>
          <span style={S.eyebrow}>למה זה קורה</span>
          <h2 style={S.sectionTitle}>עסקים טובים שנעלמים בדיגיטל</h2>
          <p style={S.sectionSub}>
            רוב הבעיות לא נראות לעין. הן מסתתרות במבנה, בתוכן ובמה שגוגל לא מצליח לפענח.
          </p>
        </motion.div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '720px',
          margin: '0 auto',
        }}>
          {PROBLEMS.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={i}
              style={{
                ...S.glassCard,
                padding: '1.75rem 2rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.5rem',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
              {...inView(i * 0.09)}
              whileHover={{ x: -4, transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } }}
            >
              {/* Left: problem icon */}
              <div style={{
                width: '40px', height: '40px', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '9px',
                background: 'rgba(220,38,38,0.07)',
                border: '1px solid rgba(220,38,38,0.14)',
                color: 'rgba(248,113,113,0.7)',
                marginTop: '2px',
              }}>
                <IconX />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.35 }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.75 }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── WHAT YOU GET ─────────────────────────────────────────
const OUTCOMES = [
  { title: 'דוח נראות מלא', desc: 'סקירה מקיפה של כל תחומי הנמצאות — SEO, GEO, טכני ומקומי.' },
  { title: 'ממצאי SEO קריטיים', desc: 'אילו בעיות ספציפיות מונעות מכם להופיע בתוצאות הראשונות.' },
  { title: 'ניתוח נראות AI', desc: 'מה ChatGPT, Gemini ו-Perplexity אומרים (או לא אומרים) עליכם.' },
  { title: 'ניצחונות מהירים', desc: 'שינויים פשוטים שאפשר לבצע מיד ושיניבו תוצאות תוך שבועות.' },
  { title: 'מפת דרכים ממוקדת', desc: 'סדרי עדיפויות ברורים — מה לתקן קודם ולמה זה הכי חשוב.' },
]

function WhatYouGetSection() {
  return (
    <section style={{
      ...S.sectionPad,
      background: 'linear-gradient(180deg, var(--bg) 0%, rgba(6,7,14,0.98) 100%)',
      position: 'relative',
    }}>
      {/* Cyan ambient */}
      <div style={{
        position: 'absolute', width: '800px', height: '500px',
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={S.inner}>
        <motion.div style={S.header} {...inView()}>
          <span style={S.eyebrow}>מה מקבלים</span>
          <h2 style={S.sectionTitle}>תמונה מלאה. המלצות ברורות.</h2>
          <p style={S.sectionSub}>
            לא דוח אוטומטי. לא רשימת שגיאות ללא הקשר.
            בדיקה אנושית שמתורגמת לצעדים שאפשר לעשות.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.25rem',
          maxWidth: '820px',
          margin: '0 auto',
        }}
          className="outcomes-grid"
        >
          {OUTCOMES.map(({ title, desc }, i) => (
            <motion.div
              key={i}
              style={{
                ...S.glassCard,
                padding: '1.875rem',
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'flex-start',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
              {...inView(i * 0.08)}
            >
              {/* Check icon */}
              <div style={{
                width: '30px', height: '30px', flexShrink: 0,
                borderRadius: '50%',
                border: '1px solid rgba(232,163,23,0.35)',
                background: 'rgba(232,163,23,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--cta)',
                marginTop: '2px',
              }}>
                <IconCheck />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>{title}</h3>
                <p style={{ fontSize: '0.855rem', color: 'var(--muted)', lineHeight: 1.72 }}>{desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Full-width 5th card */}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) { .outcomes-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─── PROCESS ──────────────────────────────────────────────
const STEPS = [
  {
    num: '01',
    title: 'משאירים פרטים',
    desc: 'טופס קצר — שם, טלפון, שם העסק ואתר. פחות מדקה. ללא התחייבות.',
  },
  {
    num: '02',
    title: 'אני בודק את האתר',
    desc: 'בדיקה אנושית מקיפה של SEO, נראות AI, פרופיל גוגל, תשתית טכנית ומבנה תוכן.',
  },
  {
    num: '03',
    title: 'מקבלים תובנות והמלצות',
    desc: 'תוך 48 שעות — ממצאים ברורים, ניצחונות מהירים ומפת דרכים להמשך. ללא עלות.',
  },
]

function ProcessSection() {
  return (
    <section style={{ ...S.sectionPad }}>
      <div style={S.inner}>
        <motion.div style={S.header} {...inView()}>
          <span style={S.eyebrow}>איך זה עובד</span>
          <h2 style={S.sectionTitle}>3 שלבים. 48 שעות. תוצאות.</h2>
        </motion.div>

        <div style={{
          maxWidth: '580px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {STEPS.map(({ num, title, desc }, i) => (
            <motion.div
              key={i}
              style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
              {...inView(i * 0.14)}
            >
              {/* Left track */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: '52px', height: '52px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '1.5px solid rgba(232,163,23,0.38)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.95rem', fontWeight: 800,
                  color: 'var(--cta)',
                  letterSpacing: '-0.01em',
                  boxShadow: '0 0 24px rgba(232,163,23,0.10)',
                }}>
                  {num}
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{
                    width: '1px', height: '52px',
                    background: 'linear-gradient(to bottom, rgba(232,163,23,0.22), transparent)',
                    margin: '6px 0',
                  }} />
                )}
              </div>

              {/* Content */}
              <div style={{
                paddingTop: '0.4rem',
                paddingBottom: i < STEPS.length - 1 ? '3.5rem' : 0,
                display: 'flex', flexDirection: 'column', gap: '0.5rem',
              }}>
                <h3 style={{ fontSize: '1.12rem', fontWeight: 700, color: 'var(--text)' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.78 }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA BAND ─────────────────────────────────────────────
function CTABand() {
  return (
    <section style={{
      padding: '5rem 2rem',
      background: 'linear-gradient(180deg, rgba(6,7,14,0.97) 0%, rgba(8,10,18,1) 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Amber glow behind band */}
      <div style={{
        position: 'absolute', width: '900px', height: '500px',
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse at center, rgba(232,163,23,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ ...S.inner, position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem' }}
          {...inView()}
        >
          {/* Top accent */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
            background: 'rgba(232,163,23,0.07)',
            border: '1px solid rgba(232,163,23,0.18)',
            borderRadius: '100px',
            padding: '0.4rem 1.2rem',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'var(--cta)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--cta)', boxShadow: '0 0 6px rgba(232,163,23,0.9)' }} />
            חינם. ללא התחייבות.
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 900,
            lineHeight: 1.2,
            letterSpacing: '-0.028em',
            color: 'var(--text)',
            maxWidth: '680px',
          }}>
            לא בטוחים אם הלקוחות
            <br />
            <span style={{ color: 'var(--cta)' }}>באמת מוצאים אתכם?</span>
          </h2>

          <p style={{
            fontSize: '1rem',
            color: 'var(--muted)',
            lineHeight: 1.8,
            maxWidth: '480px',
          }}>
            בואו נבדוק את זה בצורה פשוטה וברורה.
            בדיקה ראשונית ללא עלות — תוצאות תוך 48 שעות.
          </p>

          <a
            href="#form"
            className="btn-primary"
            style={{
              fontSize: '1.05rem',
              padding: '1rem 2.8rem',
              boxShadow: '0 0 60px rgba(232,163,23,0.20), 0 4px 32px rgba(232,163,23,0.25)',
            }}
          >
            לקבלת בדיקת נראות ללא עלות
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── LEAD FORM ────────────────────────────────────────────
const FORM_FIELDS = [
  { id: 'name',     label: 'שם מלא',        type: 'text', placeholder: 'ישראל ישראלי' },
  { id: 'phone',    label: 'טלפון',          type: 'tel',  placeholder: '05X-XXXXXXX' },
  { id: 'business', label: 'שם העסק',        type: 'text', placeholder: 'שם העסק שלך' },
  { id: 'website',  label: 'כתובת אתר',      type: 'url',  placeholder: 'https://...' },
  { id: 'area',     label: 'אזור פעילות',    type: 'text', placeholder: 'לדוגמה: תל אביב, כל הארץ' },
]

function LeadFormSection() {
  const [form, setForm] = useState({ name: '', phone: '', business: '', website: '', area: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); setSent(true) }

  return (
    <section id="form" style={{
      ...S.sectionPad,
      background: 'linear-gradient(180deg, rgba(8,10,18,1) 0%, rgba(6,8,15,1) 100%)',
      position: 'relative',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', width: '640px', height: '400px',
        bottom: 0, left: '50%', transform: 'translateX(-50%)',
        background: 'radial-gradient(ellipse at center, rgba(232,163,23,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ ...S.inner, position: 'relative', zIndex: 1 }}>
        <motion.div style={S.header} {...inView()}>
          <span style={S.eyebrow}>מתחילים עכשיו</span>
          <h2 style={S.sectionTitle}>
            השאירו פרטים —
            <br />
            <span style={{ color: 'var(--text)', fontWeight: 900 }}>נבדוק את הנראות שלכם</span>
          </h2>
          <p style={S.sectionSub}>
            בדיקה ראשונית ללא עלות. ללא התחייבות. ניצור קשר תוך 48 שעות.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          style={{ maxWidth: '520px', margin: '0 auto' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {sent ? (
            <div style={{
              ...S.glassCard,
              padding: '3.5rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '1.1rem',
            }}>
              <div style={{
                width: '56px', height: '56px',
                borderRadius: '50%',
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem',
              }}>✓</div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)' }}>קיבלנו! תודה רבה</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.75 }}>
                ניצור איתך קשר תוך 48 שעות עם ממצאים ראשוניים והמלצות קונקרטיות.
              </p>
            </div>
          ) : (
            <form
              style={{
                ...S.glassCard,
                padding: '3rem 2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
              onSubmit={handleSubmit}
              noValidate
            >
              {FORM_FIELDS.map(({ id, label, type, placeholder }) => (
                <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <label htmlFor={id} style={{
                    fontSize: '0.83rem',
                    fontWeight: 600,
                    color: 'rgba(248,250,252,0.5)',
                    letterSpacing: '0.01em',
                  }}>
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    value={form[id]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="form-input"
                    required
                  />
                </div>
              ))}

              <button
                type="submit"
                className="form-submit"
                style={{ marginTop: '0.5rem' }}
              >
                לקבלת בדיקת נראות ללא עלות
              </button>

              <p style={{
                fontSize: '0.76rem',
                color: 'var(--dim)',
                textAlign: 'center',
                lineHeight: 1.6,
              }}>
                הפרטים נשמרים בפרטיות מלאה ולא יועברו לצד שלישי
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '2.5rem 2rem',
      borderTop: '1px solid var(--line)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem',
    }}>
      <span style={{ fontSize: '0.78rem', color: 'var(--dim)', letterSpacing: '0.02em' }}>
        © {new Date().getFullYear()} JOJO Digital · כל הזכויות שמורות
      </span>
      <span style={{ fontSize: '0.72rem', color: 'var(--dim)', opacity: 0.6 }}>
        SEO · GEO · AI Visibility · Digital Strategy
      </span>
    </footer>
  )
}

// ─── PAGE ROOT ────────────────────────────────────────────
export default function LeosPage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProblemSection />
      <WhatYouGetSection />
      <ProcessSection />
      <CTABand />
      <LeadFormSection />
      <Footer />
    </>
  )
}
