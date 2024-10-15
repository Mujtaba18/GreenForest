import { useNavigate } from "react-router-dom"

const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="home-container col">
      <h1>Hello</h1>
    </div>
  )
}

export default Home
