import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

const ParkGames = () => {
let navigate = useNavigate()

  const { parkId } = useParams()
  const [games, setGames] = useState([])
  const [parkName, setParkName] = useState("")
  const [park, setPark] = useState({})

  useEffect(() => {
    const fetchParkGames = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/parks/games/${parkId}`
        )
        // get park name
        setParkName(response.data.park_name)
        console.log(response.data.games)
        setGames(response.data.games)
        setPark(response.data)
      } catch (err) {
        console.error("Error:", err)
      }
    }

    fetchParkGames()
  }, [parkId])

  return (
    <>
      <h1>{park.park_name}</h1>
      <div className="park-details">
        <img src={`http://localhost:3001/uploads/${park.park_image}`} alt={park.park_name} width="400px" />
        <h4>Location</h4>
        <p>{park.park_location}</p>
        <h4>Description</h4>
        <p>{park.park_description}</p>
      </div>
      <h1>Games at {parkName}</h1>
      <div className="card-flex">
        {games && games.length > 0 ? (
          games.map((game) => (
            <div className="card" key={game._id}>
              <div className="img-wrapper">
                <img
                  src={`http://localhost:3001/uploads/${game.game_image}`}
                  alt={game.game_name}
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
              <div className="info-wrapper flex-col">
                <h2>{game.game_name}</h2>
                <p>Description: {game.game_description}</p>
                <p>Price: ${game.game_price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No games available for this park.</p>
        )}
      </div>
      <button id="viewPark" onClick={() => navigate(`/updatepark/${park._id}`)}>Update Park</button>
    </>
  )
}

export default ParkGames
