import React, { useState } from 'react'
import { useTranslation } from '../../localization/localize'
import { btn, contactForm, contactTitle, formItem } from './contact.css'
import { ContactFormField } from './ContactFormField'

export const ContactFormSection: React.FC = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <h3 className={`${contactTitle} padd-15`}>{t('contact.form.heading')}</h3>
      <div className="row">
        <div className={`${contactForm} padd-15`}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <ContactFormField
                type="text"
                name="name"
                placeholder={t('contact.form.placeholders.name')}
                value={formData.name}
                onChange={handleInputChange}
                halfWidth
              />
              <ContactFormField
                type="email"
                name="email"
                placeholder={t('contact.form.placeholders.email')}
                value={formData.email}
                onChange={handleInputChange}
                halfWidth
              />
            </div>
            <div className="row">
              <ContactFormField
                type="text"
                name="subject"
                placeholder={t('contact.form.placeholders.subject')}
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <ContactFormField
                type="textarea"
                name="message"
                placeholder={t('contact.form.placeholders.message')}
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <div className={`${formItem} padd-15`}>
                <div className="form-group">
                  <button type="submit" className={btn}>
                    {t('contact.form.submit')}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
