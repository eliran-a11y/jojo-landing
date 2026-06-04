import { motion } from 'framer-motion'
import { spotlightHandlers } from '../utils/spotlight'

function SearchIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function AiChipIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M9 7V4" /><path d="M12 7V4" /><path d="M15 7V4" />
      <path d="M9 17v3" /><path d="M12 17v3" /><path d="M15 17v3" />
      <path d="M7 9H4" /><path d="M7 12H4" /><path d="M7 15H4" />
      <path d="M17 9h3" /><path d="M17 12h3" /><path d="M17 15h3" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

const CHECKS = [
  {
    Icon: SearchIcon,
    color: '#22d3ee',
    title: 'SEO',
    desc: 'מיקום בגוגל + מה שגוגל "מבין" על העסק שלך: מילות מפתח, כותרות, ותכנים.',
  },
  {
    Icon: AiChipIcon,
    color: '#a78bfa',
    title: 'GEO / AI Visibility',
    desc: 'האם ChatGPT, Gemini ו-Claude מציינים אותך? נוכחות במנועי ה-AI החדשים.',
  },
  {
    Icon: MapPinIcon,
    color: '#e8a317',
    title: 'Google Business Profile',
    desc: 'הופעה בחיפושים מקומיים, במפות, וביצוג הנכון של שעות, שירותים וביקורות.',
  },
  {
    Icon: EyeIcon,
    color: '#22d3ee',
    title: 'בהירות האתר',
    desc: 'האם האתר שולח מסר ברור בתוך 5 שניות? מה שמבקר לא מבין, הוא עוזב.',
  },
  {
    Icon: LayersIcon,
    color: '#60a5fa',
    title: 'מבנה תוכן',
    desc: 'כותרות, מילות מפתח, E-E-A-T ואמינות: הבסיס שמאפשר לגוגל לסמוך עליך.',
  },
  {
    Icon: ShareIcon,
    color: '#e8a317',
    title: 'נוכחות ברשתות',
    desc: 'החיבור בין הפלטפורמות (אתר, אינסטגרם, פייסבוק, לינקדאין) חשוב לאמינות.',
  },
]

export default function WhatWeCheckSection() {
  return (
    <section className="section-pad section-check">
      <div className="section-inner">
        <div className="section-header">
          <span className="eyebrow">מה בודקים</span>
          <h2 className="section-title">בדיקה מקיפה בשישה תחומים</h2>
          <p className="section-sub">
            נוכחות דיגיטלית אמיתית היא לא רק אתר,
            זה כל המערכת שעוזרת ללקוחות למצוא אותך.
          </p>
        </div>

        <div className="check-grid">
          {CHECKS.map(({ Icon, color, title, desc }, i) => (
            <motion.div
              key={i}
              className="glass-card check-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: 'easeOut' } }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              {...spotlightHandlers}
            >
              <div className="check-icon" style={{ color }}>
                <Icon />
              </div>
              <h3 className="check-title">{title}</h3>
              <p className="check-desc">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
