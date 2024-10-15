import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import About from "./pages/About"
import Nav from "./components/Nav"
import Parks from "./pages/Parks"
import "./App.css"

const App = () => {
  return (
    <div className="App">
      <div>
        <Nav />
      </div>
      <main>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/parks" element={<Parks />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
