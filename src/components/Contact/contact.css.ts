import { style } from "@vanilla-extract/css"
import { vars } from "../../styles/theme.css"

export const contactContainer = style({
  paddingBottom: "40px",
})

export const contactTitle = style({
  color: vars.color.skin,
  textAlign: "center",
  fontSize: "25px",
  marginBottom: "20px",
})

export const contactSubTitle = style({
  color: vars.color.text[900],
  textAlign: "center",
  fontSize: "15px",
  marginBottom: "60px",
})

export const contactInfoItem = style({
  flex: "0 0 25%",
  maxWidth: "25%",
  textAlign: "center",
  marginBottom: "60px",
  "@media": {
    "(max-width: 1199px)": {
      flex: "0 0 50%",
      maxWidth: "50%",
    },
    "(max-width: 767px)": {
      flex: "0 0 100%",
      maxWidth: "100%",
    },
  },
})

export const contactInfoIcon = style({
  display: "inline-block",
})

export const contactInfoIconFa = style({
  fontSize: "25px",
  color: vars.color.skin,
})

export const contactInfoItemH4 = style({
  fontSize: "18px",
  fontWeight: 700,
  color: vars.color.text[900],
  textTransform: "capitalize",
  margin: "15px 0 5px",
})

export const contactInfoItemP = style({
  fontSize: "16px",
  lineHeight: "25px",
  color: vars.color.text[700],
  fontWeight: 400,
})

export const contactForm = style({
  flex: "0 0 100%",
  maxWidth: "100%",
})

export const formItem = style({
  marginBottom: "30px",
})

export const col6 = style({
  flex: "0 0 50%",
  maxWidth: "50%",
  "@media": {
    "(max-width: 991px)": {
      flex: "0 0 100%",
      maxWidth: "100%",
    },
  },
})

export const col12 = style({
  flex: "0 0 100%",
  maxWidth: "100%",
})

export const formControl = style({
  width: "100%",
  height: "50px",
  borderRadius: "25px",
  background: vars.color.background[100],
  border: `1px solid ${vars.color.background[50]}`,
  padding: "10px 25px",
  fontSize: "16px",
  color: vars.color.text[700],
  transition: "all 0.3s ease",
  outline: "none",
  ":focus": {
    boxShadow: "0 0 20px rgba(48, 46, 77, 0.15)",
  },
})

export const formControlTextarea = style({
  height: "140px",
  paddingTop: "15px",
  resize: "vertical",
})

export const btn = style({
  fontSize: "16px",
  fontWeight: 500,
  padding: "12px 35px",
  color: "white",
  borderRadius: "40px",
  display: "inline-block",
  whiteSpace: "nowrap",
  border: "none",
  background: vars.color.skin,
  transition: "all 0.3s ease",
  cursor: "pointer",
  ":hover": {
    transform: "scale(1.05)",
  },
})
