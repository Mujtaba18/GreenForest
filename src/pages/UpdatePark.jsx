import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdatePark = () => {
let navigate = useNavigate()

  const { parkId } = useParams();
  const initialParkState = {
    park_name: "",
    park_location: "",
    park_description: "",
    park_image: "",
    games: [], // Ensure this is an empty array
  };

  const [parkData, setParkData] = useState(initialParkState);
  const [newGame, setNewGame] = useState({
    game_name: "",
    game_description: "",
    game_price: 0,
    game_image: "",
    total_tickets: 0,
  });

  useEffect(() => {
    const fetchPark = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/parks/${parkId}`);
        console.log("Fetched park data:", response.data); // Check the fetched data
        setParkData(response.data || initialParkState); // Set initial state if data is empty
      } catch (error) {
        console.error("Error fetching park data:", error);
      }
    };
    fetchPark();
  }, [parkId]);

  const handleParkChange = (event) => {
    setParkData({
      ...parkData,
      [event.target.name]: event.target.value,
    });
  };

  const handleGameChange = (event) => {
    setNewGame({
      ...newGame,
      [event.target.name]: event.target.value,
    });
  };

  const addGame = () => {
    // Ensure games is an array before pushing new game
    if (Array.isArray(parkData.games)) {
      setParkData({
        ...parkData,
        games: [...parkData.games, newGame],
      });
    }
    
    // Reset the new game state
    setNewGame({
      game_name: "",
      game_description: "",
      game_price: 0,
      game_image: "",
      total_tickets: 0,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting park data:", parkData);
    
    try {
      const response = await axios.put(`http://localhost:3001/parks/${parkId}`, parkData); // Changed to PUT
      console.log("Park updated successfully:", response.data);
      navigate(`/parks/games/${parkId}`)
    } catch (error) {
      console.error("Error updating park:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Update Park</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="park_name">Park Name:</label>
          <input
            type="text"
            id="park_name"
            name="park_name"
            value={parkData.park_name || ""} // Ensure it's always a string
            onChange={handleParkChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="park_location">Park Location:</label>
          <input
            type="text"
            id="park_location"
            name="park_location"
            value={parkData.park_location || ""}
            onChange={handleParkChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="park_description">Park Description:</label>
          <textarea
            id="park_description"
            name="park_description"
            value={parkData.park_description || ""}
            onChange={handleParkChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="park_image">Park Image URL:</label>
          <input
            type="text"
            id="park_image"
            name="park_image"
            value={parkData.park_image || ""}
            onChange={handleParkChange}
          />
        </div>

        <h3>Add a Game</h3>
        <div className="form-group">
          <label htmlFor="game_name">Game Name:</label>
          <input
            type="text"
            id="game_name"
            name="game_name"
            value={newGame.game_name || ""}
            onChange={handleGameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="game_description">Game Description:</label>
          <textarea
            id="game_description"
            name="game_description"
            value={newGame.game_description || ""}
            onChange={handleGameChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="game_price">Game Price:</label>
          <input
            type="number"
            id="game_price"
            name="game_price"
            value={newGame.game_price || ""}
            onChange={handleGameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="game_image">Game Image URL:</label>
          <input
            type="text"
            id="game_image"
            name="game_image"
            value={newGame.game_image || ""}
            onChange={handleGameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="total_tickets">Total Tickets:</label>
          <input
            type="number"
            id="total_tickets"
            name="total_tickets"
            value={newGame.total_tickets || ""}
            onChange={handleGameChange}
          />
        </div>
        <button type="button" className="btn btn-secondary" onClick={addGame}>
          Add Game
        </button>

        <h3>Games</h3>
        {/* Check if parkData.games is defined and an array */}
        {Array.isArray(parkData.games) && parkData.games.length > 0 ? (
          parkData.games.map((game, index) => (
            <div key={index} className="game-item">
              <h4>{game.game_name}</h4>
              <p>Description: {game.game_description}</p>
              <p>Price: ${game.game_price}</p>
              <p>Total Tickets: {game.total_tickets}</p>
              <img src={game.game_image} alt={game.game_name} style={{ width: '100px' }} />
            </div>
          ))
        ) : (
          <p>No games available</p>
        )}

        <button type="submit" className="btn btn-primary">
          Update Park
        </button>
      </form>
    </div>
  );
};

export default UpdatePark;
