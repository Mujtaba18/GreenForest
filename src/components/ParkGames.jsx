import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const ParkGames = () => {
  const { parkId } = useParams()
  const [games, setGames] = useState([])

  useEffect(() => {
    const fetchParkGames = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/parks/games/${parkId}`
        )
        setGames(response.data.games || []) // Assuming the response structure has a 'games' array
        console.log("Park games:", response.data.games)
      } catch (err) {
        console.error("Error:", err)
      }
    }

    fetchParkGames()
  }, [parkId])

  return (
    <>
      <h1>Games at Park {parkId}</h1>
      <div className="card-flex">
        {games.length > 0 ? (
          games.map((game) => (
            <div className="card" key={game._id}>
              <div className="img-wrapper">
                <img
                  src={game.game_image}
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
    </>
  )
}

export default ParkGames
