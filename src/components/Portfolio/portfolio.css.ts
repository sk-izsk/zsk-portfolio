import { style } from "@vanilla-extract/css"
import { vars } from "../../styles/theme.css"

export const portfolioContainer = style({
  paddingBottom: "40px",
})

export const portfolioHeading = style({
  flex: "0 0 100%",
  maxWidth: "100%",
  marginBottom: "40px",
})

export const portfolioHeadingH2 = style({
  color: vars.color.text[900],
  fontWeight: 500,
})

export const portfolioItem = style({
  flex: "0 0 33.33%",
  maxWidth: "33.33%",
  marginBottom: "30px",
  "@media": {
    "(max-width: 991px)": {
      flex: "0 0 50%",
      maxWidth: "50%",
    },
    "(max-width: 767px)": {
      flex: "0 0 100%",
      maxWidth: "100%",
    },
  },
})

export const portfolioItemInner = style({
  border: `6px solid ${vars.color.background[100]}`,
  borderRadius: "10px",
  overflow: "hidden",
  cursor: "pointer",
  position: "relative",
})

export const portfolioImg = style({
  display: "block",
  overflow: "hidden",
  height: "250px", // Fixed height to prevent stretching
})

export const portfolioImgImg = style({
  width: "100%",
  height: "100%",
  display: "block",
  objectFit: "cover", // Maintain aspect ratio and fill container
  transition: "all 0.3s ease",
})
