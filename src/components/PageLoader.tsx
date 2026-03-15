import { Bars } from 'react-loader-spinner'
import { useThemeStore } from '../stores/themeStore'

const colorThemes = {
  'color-1': '#ec1839',
  'color-2': '#fa5b0f',
  'color-3': '#37b182',
  'color-5': '#f021b2',
  'color-7': '#daa520',
  'color-9': '#00bfff',
}

export const PageLoader = () => {
  const currentColor = useThemeStore((state) => state.currentColor)

  return (
    <div className="page-loader">
      <div className="loading">
        <Bars
          height="80"
          width="80"
          color={colorThemes[currentColor as keyof typeof colorThemes]}
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  )
}
