type ThemeConfig = {
  color: {
    background: {
      900: string
      100: string
      50: string
    }
    text: {
      900: string
      700: string
    }
    skin: string
  }
  font: {
    family: {
      primary: string
      script: string
    }
  }
}

const sharedFont = {
  family: {
    primary: '"JetBrains Mono", monospace',
    script: '"Clicker Script", cursive',
  },
}

const lightPalette = {
  background: {
    900: '#f2f2fc',
    100: '#fdf9ff',
    50: '#e8dfec',
  },
  text: {
    900: '#302e4d',
    700: '#504e70',
  },
}

const darkPalette = {
  background: {
    900: '#151515',
    100: '#222222',
    50: '#393939',
  },
  text: {
    900: '#ffffff',
    700: '#e9e9e9',
  },
}

export const createLightThemeConfig = (skin: string): ThemeConfig => {
  return {
    color: {
      ...lightPalette,
      skin,
    },
    font: sharedFont,
  }
}

export const createDarkThemeConfig = (skin: string): ThemeConfig => {
  return {
    color: {
      ...darkPalette,
      skin,
    },
    font: sharedFont,
  }
}
