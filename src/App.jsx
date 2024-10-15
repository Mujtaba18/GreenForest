import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import About from "./pages/About"
import Nav from "./components/Nav"
import Parks from "./pages/Parks"
import ParkGames from "./components/ParkGames"
import "./App.css"
import AddPark from "./pages/AddPark"

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
          <Route path="/parks/games/:parkId" element={<ParkGames />} />
          <Route path="/addpark" element={<AddPark />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
