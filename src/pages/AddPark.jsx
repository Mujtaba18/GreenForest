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
    event.preventDefault();
  
    const formData = new FormData();
  
    // Add text fields to formData
    for (const key in parkData) {
      if (key === "park_image") {
        formData.append("park_image", parkData[key]);
      } else {
        formData.append(key, parkData[key]);
      }
    }
  
    try {
      const response = await axios.post("http://localhost:3001/parks", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Park created successfully:", response.data);
      setParkData(initialParkState);
      navigate("/parks");
    } catch (error) {
      console.error("Error creating park:", error.response ? error.response.data : error.message);
    }
  };
  

  const handleChange = (event) => {
    setParkData({
      ...parkData,
      [event.target.name]: event.target.value,
    })
  }

  const handleImageChange = (event) => {
    setParkData({
      ...parkData,
      park_image: event.target.files[0],
    })
  }

  return (
    <div>
    <h2 className="titles">Add a New Park</h2>
      <div className="addpark">
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
            type="file"
            className="form-control"
            id="park_image"
            name="park_image"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="formButton">
          Add Park
        </button>
      </form>
      </div>
    </div>
  )
}

export default AddPark
