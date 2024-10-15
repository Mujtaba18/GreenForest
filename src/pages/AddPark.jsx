import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

const AddPark = () => {
  let navigate = useNavigate()

  const initialParkState = {
    park_name: "",
    park_location: "",
    park_description: "",
    park_image: "",
    games: [],
  }

  const [parkData, setParkData] = useState(initialParkState)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post("http://localhost:3001/parks", parkData)
      console.log("Park created successfully:", response.data)
    } catch (error) {
      console.error("Error creating park:", error)
    }
    navigate("/parks")
  }

  const handleChange = (event) => {
    setParkData({
      ...parkData,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div>
      <h2 className="titles">Add a New Park</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="park_name">Park Name:</label>
          <input
            type="text"
            className="form-control"
            id="park_name"
            name="park_name"
            value={parkData.park_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="park_location">Park Location:</label>
          <input
            type="text"
            className="form-control"
            id="park_location"
            name="park_location"
            value={parkData.park_location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="park_description">Park Description:</label>
          <textarea
            className="form-control"
            id="park_description"
            name="park_description"
            value={parkData.park_description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="park_image">Park Image URL:</label>
          <input
            type="text"
            className="form-control"
            id="park_image"
            name="park_image"
            value={parkData.park_image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="formButton">
          Create Park
        </button>
      </form>
    </div>
  )
}

export default AddPark
