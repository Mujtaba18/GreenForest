import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"

const ParkGames = () => {
  const { parkId } = useParams()
  const [games, setGames] = useState([])
  const [parkName, setParkName] = useState("")
  const [message, setMessage] = useState("")
  const [TotalTickets, setTotalTickets] = useState(0)

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
        setTotalTickets(response.data.games.total_tickets)
      } catch (err) {
        console.error("Error:", err)
      }
    }

    fetchParkGames()
  }, [parkId])

  // delete game

  const deleteGame = async (e, gameId) => {
    e.preventDefault()

    try {
      await axios.delete(
        `http://localhost:3001/parks/${parkId}/games/${gameId}`
      )
      setGames(games.filter((game) => game._id !== gameId))
      setMessage("Game deleted successfully")
      console.log("Game deleted successfully")
    } catch (err) {
      console.log(err)
    }
  }

  setTimeout(() => {
    setMessage("")
  }, 2000)

  return (
    <>
      {message && <div className="message">{message}</div>}
      <h1>Games at Park {parkName}</h1>
      <div className="card-flex">
        {games && games.length > 0 ? (
          games.map((game) => (
            <div className="card" key={game._id}>
              <button
                className="delete-btn"
                onClick={(e) => deleteGame(e, game._id)}
                style={{ float: "right", fontWeight: "700" }}
              >
                x
              </button>
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
                <p>Total Tikets: {game.total_tickets}</p>
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

//
