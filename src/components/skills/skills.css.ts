import { style } from "@vanilla-extract/css"
import { vars } from "../../styles/theme.css"

export const skillsContainer = style({
  paddingBottom: "40px",
})

export const skillsSection = style({
  flex: "0 0 50%",
  maxWidth: "50%",
  marginTop: "40px",
  "@media": {
    "(max-width: 1199px)": {
      flex: "0 0 100%",
      maxWidth: "100%",
      marginTop: "30px",
    },
  },
})

export const skillsSectionTitle = style({
  color: vars.color.skin,
  fontWeight: 600,
  fontSize: "24px",
  marginBottom: "30px",
  textAlign: "center",
})

export const skillsGrid = style({
  display: "flex",
  flexWrap: "wrap",
})

export const skillsItem = style({
  flex: "0 0 50%",
  maxWidth: "50%",
  marginBottom: "25px",
  paddingRight: "15px",
  "@media": {
    "(max-width: 767px)": {
      flex: "0 0 100%",
      maxWidth: "100%",
      paddingRight: 0,
    },
  },
})

export const skillsItemContent = style({
  // Empty since we're using About page styling
})

export const skillName = style({
  lineHeight: "40px",
  fontWeight: 600,
  fontSize: "16px",
  color: vars.color.text[900],
  textTransform: "capitalize",
  margin: 0,
})

export const progress = style({
  background: vars.color.background[50],
  height: "7px",
  borderRadius: "4px",
  width: "100%",
  position: "relative",
})

export const progressIn = style({
  position: "absolute",
  left: 0,
  top: 0,
  height: "100%",
  borderRadius: "4px",
  background: vars.color.skin,
})

export const skillPercent = style({
  position: "absolute",
  right: 0,
  color: vars.color.text[900],
  top: "-40px",
  fontWeight: 400,
  lineHeight: "40px",
})

export const skillCategoryContainer = style({
  flex: "0 0 100%",
  maxWidth: "100%",
  marginTop: "60px",
  marginBottom: "4px",
})

export const skillCategoryTitle = style({
  fontSize: "20px",
  fontWeight: 600,
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  color: vars.color.text[900],
})

export const skillsList = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
})

export const categoryBadge = style({
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: 500,
  backgroundColor: vars.color.skin + "15",
  color: vars.color.skin,
  border: `1px solid ${vars.color.skin}`,
  transition: "all 0.3s ease",
  cursor: "default",
  ":hover": {
    backgroundColor: vars.color.skin,
    color: "white",
    transform: "scale(1.05)",
  },
})
