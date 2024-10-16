import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Parks = () => {
  const [parks, setParks] = useState([])
  console.log(parks)

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/parks")
        setParks(response.data || [])
        // console.log("Response data:", response.data)
      } catch (err) {
        console.error("Error:", err)
      }
    }

    fetchParks()
  }, [])

  // if (parks) {
  //   console.log("yes", parks)
  // }

  return (
    <>
      <h1 className="titles">Parks</h1>
      <div className="card-flex">
        {parks.length > 0 ? (
          parks.map((park) => (
            <div className="card " key={park._id}>
              <Link to={`/parks/games/${park._id}`} key={park._id}>
                <div className="img-wrapper">
                  <img
                    src={`http://localhost:3001/uploads/${park.park_image}`}
                    alt={park.park_name}
                    style={{ width: "200px", height: "auto" }}
                  />
                </div>
                <div className="info-wrapper flex-col">
                  <h2>{park.park_name}</h2>
                  <p>Location: {park.park_location}</p>
                  <p>Description: {park.park_description}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No parks available.</p>
        )}
      </div>
    </>
  )
}

export default Parks
