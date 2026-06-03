import { useState } from 'react'
import { motion } from 'framer-motion'

const FIELDS = [
  { id: 'name',    label: 'שם מלא',      type: 'text', placeholder: 'ישראל ישראלי', required: true  },
  { id: 'phone',   label: 'טלפון',       type: 'tel',  placeholder: '05X-XXXXXXX',   required: true  },
  { id: 'business',label: 'שם העסק',    type: 'text', placeholder: 'שם העסק שלך',   required: true  },
  { id: 'website', label: 'אתר אינטרנט', type: 'text', placeholder: 'https://...',   required: false },
]

function ChatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

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
        <div className="section-header fade-up">
          <span className="eyebrow">מתחילים עכשיו</span>
          <h2 className="section-title">
            השאירו פרטים<br />
            <span className="text-accent">נבדוק את הנוכחות שלכם</span>
          </h2>
          <p className="section-sub">
            בדיקה ראשונית ללא עלות. ללא התחייבות. תוצאות תוך 48 שעות.
          </p>
        </div>

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
                {FIELDS.map(({ id, label, type, placeholder, required }) => (
                  <div key={id} className="form-field">
                    <label htmlFor={id} className="form-label">{label}</label>
                    <input
                      id={id}
                      type={type}
                      value={form[id]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="form-input"
                      required={required}
                    />
                  </div>
                ))}

                <button type="submit" className="form-submit">
                  לקבלת בדיקת נוכחות ללא עלות
                </button>

                <p className="form-note">
                  הפרטים נשמרים בפרטיות מלאה ולא יועברו לצד שלישי
                </p>

                <div className="form-contact-row">
                  <span className="form-contact-label">מעדיפים לדבר ישירות?</span>
                  <div className="form-contact-links">
                    <a href="https://wa.me/972534301194" className="form-contact-link" target="_blank" rel="noopener noreferrer">
                      <ChatIcon />
                      וואטסאפ
                    </a>
                    <a href="tel:+972534301194" className="form-contact-link">
                      <PhoneIcon />
                      טלפון
                    </a>
                    <a href="mailto:eliran@jojodigital.co.il" className="form-contact-link">
                      <MailIcon />
                      מייל
                    </a>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
