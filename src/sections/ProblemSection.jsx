import { motion } from 'framer-motion'
import { spotlightHandlers } from '../utils/spotlight'

function IconSearch() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function IconRobot() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M12 11V7" />
      <circle cx="12" cy="5" r="2" />
      <path d="M7 15h.01M17 15h.01" />
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}

const PROBLEMS = [
  {
    Icon: IconSearch,
    title: 'גוגל לא תמיד מבין מה אתה מציע',
    desc: 'אתר שנראה מעולה לא מספיק, גוגל צריך להבין בדיוק מי אתה, מה אתה מוכר ולמי.',
  },
  {
    Icon: IconRobot,
    title: 'AI ממליץ על מתחרים, לא עליך',
    desc: 'ChatGPT, Gemini ו-Claude מחזירים תוצאות לפי נוכחות דיגיטלית. עסק שלא מוזכר בהם לא קיים עבור מי שמחפש.',
  },
  {
    Icon: IconGlobe,
    title: 'הנוכחות שלך חלקית ואתה לא יודע',
    desc: 'אתר לבד לא מספיק. פרופיל גוגל, תוכן, מבנה ורשתות, כולם חייבים לעבוד יחד.',
  },
]

export default function ProblemSection() {
  return (
    <section className="section-problem section-depth section-pad">
      <div className="section-inner">
        <div className="section-header fade-up">
          <span className="eyebrow">הבעיה האמיתית</span>
          <h2 className="section-title">עסקים טובים נעלמים בדיגיטל</h2>
          <p className="section-sub">
            רוב העסקים משקיעים באיך שהם נראים, אבל פחות באיך שמוצאים אותם. ושם בדיוק לקוחות הולכים לאיבוד.
          </p>
        </div>

        <div className="problem-grid">
          {PROBLEMS.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={i}
              className="glass-card problem-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: 'easeOut' } }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              {...spotlightHandlers}
            >
              <div className="problem-icon-wrap">
                <Icon />
              </div>
              <h3 className="problem-title">{title}</h3>
              <p className="problem-desc">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
