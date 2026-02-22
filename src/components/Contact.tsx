import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTitle } from "ahooks"
import React, { useState } from "react"
import {
  useContactInfo,
  usePersonalInfo,
  usePortfolioError,
  usePortfolioLoading,
} from "../stores/portfolioStore"

const Contact: React.FC = () => {
  const contact = useContactInfo()
  const personalInfo = usePersonalInfo()
  const loading = usePortfolioLoading()
  const error = usePortfolioError()

  // Update page title
  useTitle("Contact - ZSK Portfolio")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  if (loading) {
    return (
      <section className="contact section active" id="contact">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </section>
    )
  }

  if (error || !contact || !personalInfo) {
    return (
      <section className="contact section active" id="contact">
        <div className="container">
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
  ]

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  return (
    <section className="contact section active" id="contact">
      <div className="container">
        <div className="row">
          <div className="section-title padd-15">
            <h2>Contact Me</h2>
          </div>
        </div>
        <h3 className="contact-title padd-15">Do You Have Any Questions?</h3>
        <h4 className="contact-sub-title padd-15">I'M AT YOUR SERVICE</h4>
        <div className="row">
          {contactInfo.map((info, index) => (
            <div key={index} className="contact-info-item padd-15">
              <div className="icon">
                <FontAwesomeIcon
                  icon={
                    info.icon as
                      | "map-marker-alt"
                      | "phone-alt"
                      | "envelope"
                      | "globe-americas"
                  }
                  className="fa"
                />
              </div>
              <h4>{info.title}</h4>
              <p>{info.details}</p>
            </div>
          ))}
        </div>
        <h3 className="contact-title padd-15">SEND ME AN EMAIL</h3>
        <h4 className="contact-sub-title padd-15">
          I'M VERY RESPONSIVE TO MESSAGES
        </h4>
        <div className="row">
          <div className="contact-form padd-15">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-item col-6 padd-15">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-item col-6 padd-15">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-item col-12 padd-15">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-item col-12 padd-15">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-item col-12 padd-15">
                  <div className="form-group">
                    <button type="submit" className="btn">
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
