import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTitle } from "ahooks"
import React, { useState } from "react"
import {
  useContactInfo,
  usePersonalInfo,
  usePortfolioError,
  usePortfolioLoading,
} from "../../stores/portfolioStore"
import {
  btn,
  col12,
  col6,
  contactContainer,
  contactForm,
  contactInfoIcon,
  contactInfoIconFa,
  contactInfoItem,
  contactInfoItemH4,
  contactInfoItemP,
  contactSubTitle,
  contactTitle,
  formControl,
  formControlTextarea,
  formItem,
} from "./contact.css"

const Contact: React.FC = () => {
  const contact = useContactInfo()
  const personalInfo = usePersonalInfo()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  useTitle("Contact - ZSK Portfolio")

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

  if (loading) {
    return (
      <section className="contact section active" id="contact">
        <div className={`container ${contactContainer}`}>
          <div className="loading">Loading...</div>
        </div>
      </section>
    )
  }

  if (error || !contact || !personalInfo) {
    return (
      <section className="contact section active" id="contact">
        <div className={`container ${contactContainer}`}>
          <div className="error">Error loading data</div>
        </div>
      </section>
    )
  }

  const contactInfo = [
    {
      icon: "phone",
      title: "Call Us On",
      details: contact.phone,
    },
    {
      icon: "map-marker-alt",
      title: "Location",
      details:
        personalInfo.location.city + ", " + personalInfo.location.country,
    },
    {
      icon: "envelope",
      title: "Email",
      details: contact.email,
    },
    {
      icon: "globe-europe",
      title: "Website",
      details: contact.social.website.label,
    },
    {
      icon: ["fab", "github"],
      title: "GitHub",
      details: contact.social.github.label,
    },
    {
      icon: ["fab", "linkedin"],
      title: "LinkedIn",
      details: contact.social.linkedin.label,
    },
    {
      icon: ["fab", "twitter"],
      title: "Twitter",
      details: contact.social.twitter.label,
    },
    {
      icon: ["fab", "instagram"],
      title: "Instagram",
      details: contact.social.instagram.label,
    },
    {
      icon: ["fab", "telegram"],
      title: "Telegram",
      details: contact.social.telegram.label,
    },
  ]

  return (
    <section className="contact section active" id="contact">
      <div className={`container ${contactContainer}`}>
        <div className="row">
          <div className="section-title padd-15">
            <h2>Contact Me</h2>
          </div>
        </div>
        <h3 className={`${contactTitle} padd-15`}>
          Do You Have Any Questions?
        </h3>
        <h4 className={`${contactSubTitle} padd-15`}>
          FEEL FREE TO REACH OUT TO ME
        </h4>
        <div className="row">
          {contactInfo.map((info, index) => (
            <div key={index} className={`${contactInfoItem} padd-15`}>
              <div className={contactInfoIcon}>
                <FontAwesomeIcon
                  icon={info.icon as any}
                  className={contactInfoIconFa}
                />
              </div>
              <h4 className={contactInfoItemH4}>{info.title}</h4>
              <p className={contactInfoItemP}>{info.details}</p>
            </div>
          ))}
        </div>
        <h3 className={`${contactTitle} padd-15`}>SEND ME AN EMAIL</h3>
        <div className="row">
          <div className={`${contactForm} padd-15`}>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className={`${formItem} ${col6} padd-15`}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={formControl}
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className={`${formItem} ${col6} padd-15`}>
                  <div className="form-group">
                    <input
                      type="email"
                      className={formControl}
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className={`${formItem} ${col12} padd-15`}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={formControl}
                      placeholder="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className={`${formItem} ${col12} padd-15`}>
                  <div className="form-group">
                    <textarea
                      className={`${formControl} ${formControlTextarea}`}
                      placeholder="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className={`${formItem} ${col12} padd-15`}>
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
      </div>
    </section>
  )
}

export default Contact
