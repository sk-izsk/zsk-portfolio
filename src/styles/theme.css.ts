import { createThemeContract } from "@vanilla-extract/css"

export const vars = createThemeContract({
  color: {
    background: {
      900: null,
      100: null,
      50: null,
    },
    text: {
      900: null,
      700: null,
    },
    skin: null,
  },
  font: {
    family: {
      primary: null,
      script: null,
    },
  },
})
