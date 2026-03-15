import { AppWrapper } from "./components/AppWrapper"
import "./lib/fontawesome"
import { AppRoutes } from "./routes/AppRoutes"

const App = () => {
  return (
    <AppWrapper>
      <AppRoutes />
    </AppWrapper>
  )
}

export default App
