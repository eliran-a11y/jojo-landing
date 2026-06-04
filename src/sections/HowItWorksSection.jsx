import { motion } from 'framer-motion'

const STEPS = [
  {
    num: '1',
    title: 'ממלאים את הטופס',
    desc: 'פחות מ-30 שניות. שם, טלפון, שם העסק ואתר. זה הכל. ללא התחייבות.',
  },
  {
    num: '2',
    title: 'הצוות שלנו בודק את הנוכחות',
    desc: 'נבדוק SEO, GEO, פרופיל גוגל ובהירות האתר. כל תחום מקבל התייחסות נפרדת.',
  },
  {
    num: '3',
    title: 'מקבלים תקציר והמלצות',
    desc: 'תוך 48 שעות תקבלו ממצאים ראשוניים והמלצות קונקרטיות.',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="section-steps section-depth section-pad">
      <div className="section-inner">
        <div className="section-header fade-up">
          <span className="eyebrow">איך זה עובד</span>
          <h2 className="section-title">תהליך פשוט. תוצאות אמיתיות.</h2>
        </div>

        <div className="steps-track">
          {STEPS.map(({ num, title, desc }, i) => (
            <motion.div
              key={i}
              className="step-item"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.14 }}
            >
              <div className="step-left">
                <div className="step-number">{num}</div>
                {i < STEPS.length - 1 && <div className="step-connector" />}
              </div>
              <div className="step-content">
                <h3 className="step-title">{title}</h3>
                <p className="step-desc">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
