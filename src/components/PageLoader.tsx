import { useLocalStorageState } from "ahooks"
import { Bars } from "react-loader-spinner"

const colorThemes = {
  "color-1": "#ec1839",
  "color-2": "#fa5b0f",
  "color-3": "#37b182",
  "color-4": "#1854b4",
  "color-5": "#f021b2",
  "color-6": "#8a2be2",
  "color-7": "#daa520",
  "color-8": "#00ced1",
  "color-9": "#00bfff",
  "color-10": "#2e8b57",
}

export const PageLoader = () => {
  const [currentColor] = useLocalStorageState("portfolio-color-theme", {
    defaultValue: "color-1",
  })

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
