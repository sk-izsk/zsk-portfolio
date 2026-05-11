import React, { useState } from 'react'
import { useTranslation } from '@localization/localize'
import { Button } from '@components/common/button/Button'
import { contactForm, contactTitle, formItem } from '@components/contact/contact.css'
import { ContactFormField } from '@components/contact/ContactFormField'
import { cx } from '@utils/cn'

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
      <h3 className={cx(contactTitle, 'padd-15')}>{t('contact.form.heading')}</h3>
      <div className="row">
        <div className={cx(contactForm, 'padd-15')}>
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
              <div className={cx(formItem, 'padd-15')}>
                <div className="form-group">
                  <Button type="submit" variant="primary" size="large">
                    {t('contact.form.submit')}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
