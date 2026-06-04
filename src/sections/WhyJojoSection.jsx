import { motion } from 'framer-motion'

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

const REASONS = [
  {
    title: 'שקיפות מלאה',
    desc: 'אתם מקבלים ממצאים ברורים: מה נבדק, מה נמצא, ומה ההשלכות לעסק שלכם.',
  },
  {
    title: 'SEO + GEO ביחד',
    desc: 'אנחנו מתמחים בשני העולמות: גוגל המסורתי ומנועי ה-AI החדשים. שניהם קריטיים היום.',
  },
  {
    title: 'בדיקות עם כלים מקצועיים',
    desc: 'Search Console, Ahrefs, Analytics ועוד. כל כלי בודק נדבך שונה בנוכחות שלכם.',
  },
  {
    title: 'הזווית העסקית',
    desc: 'השאלה המנחה שלנו: מה יגרום לצמיחה. כל בעיה שמוצאים נמדדת בהשפעתה העסקית.',
  },
]

export default function WhyJojoSection() {
  return (
    <section className="section-pad">
      <div className="section-inner">
        <div className="section-header">
          <span className="eyebrow">למה JOJO</span>
          <h2 className="section-title">בדיקה קודמת לכל המלצה</h2>
          <p className="section-sub">
            כל המלצה שתקבלו נשענת על ממצאים מהעסק שלכם.
          </p>
        </div>

        <div className="why-grid">
          {REASONS.map(({ title, desc }, i) => (
            <motion.div
              key={i}
              className="glass-card why-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="why-check">
                <CheckIcon />
              </div>
              <div className="why-body">
                <h3 className="why-title">{title}</h3>
                <p className="why-desc">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
