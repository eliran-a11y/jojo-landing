import { useState } from 'react'
import { motion } from 'framer-motion'

const FIELDS = [
  { id: 'name',    label: 'שם מלא',           type: 'text', placeholder: 'ישראל ישראלי' },
  { id: 'phone',   label: 'טלפון',             type: 'tel',  placeholder: '05X-XXXXXXX' },
  { id: 'business',label: 'שם העסק',           type: 'text', placeholder: 'שם העסק שלך' },
  { id: 'website', label: 'אתר אינטרנט',       type: 'url',  placeholder: 'https://...' },
]

export default function LeadFormSection() {
  const [form, setForm] = useState({ name: '', phone: '', business: '', website: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="form" className="section-form section-depth section-pad">
      <div className="section-inner">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">מתחילים עכשיו</span>
          <h2 className="section-title">
            השאירו פרטים<br />
            <span className="text-accent">נבדוק את הנוכחות שלכם</span>
          </h2>
          <p className="section-sub">
            בדיקה ראשונית ללא עלות. ללא התחייבות. תוצאות תוך 48 שעות.
          </p>
        </motion.div>

        <div className="form-wrap">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {sent ? (
              <div className="form-box" style={{ alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>✅</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>קיבלנו! תודה רבה</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
                  ניצור איתך קשר תוך 48 שעות עם ממצאים ראשוניים.
                </p>
              </div>
            ) : (
              <form className="form-box" onSubmit={handleSubmit} noValidate>
                {FIELDS.map(({ id, label, type, placeholder }) => (
                  <div key={id} className="form-field">
                    <label htmlFor={id} className="form-label">{label}</label>
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

                <button type="submit" className="form-submit">
                  לקבלת בדיקת נוכחות ללא עלות
                </button>

                <p className="form-note">
                  הפרטים נשמרים בפרטיות מלאה ולא יועברו לצד שלישי
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
