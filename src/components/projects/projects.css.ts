import { style } from "@vanilla-extract/css"
import { vars } from "../../styles/theme.css"

export const blogContainer = style({
  paddingBottom: "40px",
})

export const blogGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 300px))",
  justifyContent: "start",
  gap: "30px",
  "@media": {
    "(max-width: 991px)": {
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 280px))",
    },
    "(max-width: 767px)": {
      gridTemplateColumns: "1fr",
    },
  },
})

export const blogHeading = style({
  flex: "0 0 100%",
  maxWidth: "100%",
  marginBottom: "40px",
})

export const blogHeadingH2 = style({
  color: vars.color.text[900],
  fontWeight: 500,
})

export const blogItem = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "300px",
  margin: 0,
})

export const blogItemInner = style({
  backgroundColor: vars.color.background[100],
  border: `1px solid ${vars.color.background[50]}`,
  borderRadius: "10px",
  padding: "30px 10px",
  textAlign: "center",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  ":hover": {
    boxShadow: "0 0 20px rgba(48, 46, 77, 0.15)",
  },
})

export const blogImage = style({
  marginBottom: "20px",
})

export const blogImageImg = style({
  width: "100%",
  borderRadius: "10px",
  display: "block",
  margin: "0 auto 20px",
  transition: "all 0.3s ease",
})

export const blogImageImgHover = style({
  selectors: {
    [`${blogItemInner}:hover &`]: {
      transform: "scale(1.05)",
      borderRadius: "10px",
    },
  },
})

export const blogInfo = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  alignItems: "center",
  paddingBottom: "15px",
})

export const blogInfoP = style({
  fontSize: "14px",
  color: vars.color.text[700],
  margin: 0,
  display: "flex",
  alignItems: "center",
  gap: "4px",
})

export const blogInfoIcon = style({
  color: vars.color.skin,
  paddingRight: "2px",
})

export const blogTitle = style({
  fontSize: "18px",
  marginBottom: "15px",
  color: vars.color.text[900],
  fontWeight: 700,
  textTransform: "capitalize",
})

export const blogContent = style({
  fontSize: "16px",
  color: vars.color.text[700],
  lineHeight: "25px",
  marginBottom: "15px",
  flex: 1,
})

export const blogTags = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  justifyContent: "center",
  marginBottom: "18px",
})

export const blogTag = style({
  padding: "5px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 500,
  lineHeight: 1.2,
  backgroundColor: vars.color.skin + "15",
  color: vars.color.skin,
  border: `1px solid ${vars.color.skin}`,
  transition: "all 0.3s ease",
  cursor: "default",
  ":hover": {
    backgroundColor: vars.color.skin,
    color: "white",
  },
})

export const blogLink = style({
  fontSize: "16px",
  color: vars.color.skin,
  lineHeight: "25px",
  textDecoration: "none",
  cursor: "pointer",
})
