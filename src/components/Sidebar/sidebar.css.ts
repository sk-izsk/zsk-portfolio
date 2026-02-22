import { style } from "@vanilla-extract/css"
import { vars } from "../../styles/theme.css"

export const aside = style({
  width: "270px",
  height: "100%",
  background: vars.color.background[100],
  position: "fixed",
  left: 0,
  top: 0,
  padding: "30px",
  zIndex: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRight: `1px solid ${vars.color.background[50]}`,
  transition: "all 0.3s ease",
})

export const logo = style({
  position: "absolute",
  top: "50px",
  fontSize: "30px",
  textTransform: "capitalize",
})

export const logoA = style({
  color: vars.color.text[700],
  fontWeight: 700,
  padding: "15px 20px",
  fontSize: "30px",
  letterSpacing: "5px",
  position: "relative",
  "::before": {
    content: '""',
    position: "absolute",
    width: "20px",
    height: "20px",
    borderBottom: `5px solid ${vars.color.skin}`,
    borderLeft: `5px solid ${vars.color.skin}`,
    bottom: 0,
    left: 0,
  },
  "::after": {
    content: '""',
    position: "absolute",
    width: "20px",
    height: "20px",
    borderTop: `5px solid ${vars.color.skin}`,
    borderRight: `5px solid ${vars.color.skin}`,
    top: 0,
    right: 0,
  },
})

export const logoSpan = style({
  fontFamily: vars.font.family.script,
  fontSize: "40px",
})

export const navToggler = style({
  height: "40px",
  width: "45px",
  border: `1px solid ${vars.color.background[50]}`,
  cursor: "pointer",
  position: "fixed",
  left: "300px",
  top: "20px",
  borderRadius: "5px",
  background: vars.color.background[100],
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  "@media": {
    "(max-width: 1199px)": {
      display: "flex",
      left: "30px",
    },
  },
})

export const navTogglerOpen = style({
  "@media": {
    "(max-width: 1199px)": {
      left: "300px",
    },
  },
})

export const navTogglerSpan = style({
  height: "2px",
  width: "18px",
  background: vars.color.skin,
  display: "inline-block",
  position: "relative",
  "::before": {
    content: '""',
    height: "2px",
    width: "18px",
    background: vars.color.skin,
    position: "absolute",
    top: "-6px",
    left: 0,
  },
  "::after": {
    content: '""',
    height: "2px",
    width: "18px",
    background: vars.color.skin,
    position: "absolute",
    top: "6px",
    left: 0,
  },
})

export const navTogglerOpenSpan = style({
  background: "transparent",
  "::before": {
    transform: "rotate(45deg)",
    top: 0,
  },
  "::after": {
    transform: "rotate(-45deg)",
    top: 0,
  },
})

export const nav = style({
  marginTop: "50px",
})

export const navLi = style({
  marginBottom: "20px",
  display: "block",
})

export const navA = style({
  fontSize: "16px",
  fontWeight: 600,
  display: "block",
  borderBottom: `1px solid ${vars.color.background[50]}`,
  color: vars.color.text[900],
  padding: "5px 15px",
  textDecoration: "none",
})

export const navAActive = style({
  color: vars.color.skin,
})

export const navAI = style({
  marginRight: "15px",
})
