import React, { useState } from "react"
import { btn, contactForm, contactTitle, formItem } from "./contact.css"
import { ContactFormField } from "./ContactFormField"

export const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <h3 className={`${contactTitle} padd-15`}>SEND ME AN EMAIL</h3>
      <div className="row">
        <div className={`${contactForm} padd-15`}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <ContactFormField
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                halfWidth
              />
              <ContactFormField
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                halfWidth
              />
            </div>
            <div className="row">
              <ContactFormField
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <ContactFormField
                type="textarea"
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <div className={`${formItem} padd-15`}>
                <div className="form-group">
                  <button type="submit" className={btn}>
                    Send Message
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
