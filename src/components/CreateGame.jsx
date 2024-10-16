import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateGame = () => {
  const [formData, setFormData] = useState({
    game_name: '',
    game_description: '',
    game_price: '',
    game_image: '',
    total_tickets: ''
  })

  const [parks, setParks] = useState([])
  const [selectedPark, setSelectedPark] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/parks')
        setParks(response.data)
      } catch (error) {
        console.error('Error fetching parks', error)
      }
    }
    fetchParks()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedPark) {
      setMessage('Please select a park')
      return
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/games/${selectedPark}`,
        formData
      )
      setMessage('Game created successfully!')
      navigate(`/parks/games/${selectedPark}`)
    } catch (error) {
      if (error.response) {
        setMessage(
          `Error creating game: ${
            error.response.data.message || 'Unknown error'
          }`
        )
      } else if (error.request) {
        setMessage('Error creating game: No response received from server')
      } else {
        setMessage(`Error creating game: ${error.message}`)
      }
      console.error('Error details:', error)
    }
  }

  return (
    <div>
      <h2>Create a New Game</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Game Name</label>
          <input
            type="text"
            name="game_name"
            value={formData.game_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Game Description</label>
          <textarea
            name="game_description"
            value={formData.game_description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Game Price</label>
          <input
            type="number"
            name="game_price"
            value={formData.game_price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Game Image URL</label>
          <input
            type="text"
            name="game_image"
            value={formData.game_image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Total Tickets</label>
          <input
            type="number"
            name="total_tickets"
            value={formData.total_tickets}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Select Park</label>
          <select
            value={selectedPark}
            onChange={(e) => setSelectedPark(e.target.value)}
            required
          >
            <option value="">-- Select a Park --</option>
            {parks.length > 0 ? (
              parks.map((park) => (
                <option key={park._id} value={park._id}>
                  {park.park_name}
                </option>
              ))
            ) : (
              <option disabled>No parks available</option>
            )}
          </select>
        </div>

        <button type="submit">Create Game</button>
      </form>
    </div>
  )
}

export default CreateGame
