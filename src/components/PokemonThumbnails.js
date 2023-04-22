// file = PokemonThumbnail.js
import React, { useState, useEffect } from "react";

const PokemonThumbnail = ({ id, name, image, type }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setPokemonDetails(data);
    };
    fetchPokemonDetails();
  }, [name]);

  // Define an object that maps Pokemon types to corresponding background colors
  const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
    // Add more types and their corresponding colors as needed
  };

  // Set the background color based on the type of the Pokemon
  const backgroundColor = typeColors[type] || "gray"; // Default to gray if type is not found in typeColors object

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="pokemon-card" style={{ backgroundColor }}>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>Type: {type}</p>
      <img src={image} alt={name} onClick={handleCardClick} />

      {showModal && (
        <div className="pokemon-modal">
          <div className="pokemon-modal-content">
            <h3>{name}</h3>
            {pokemonDetails && (
              <>
                <p>ID: {id}</p>
                <p>Type: {type}</p>
                <p>Height: {pokemonDetails.height}</p>
                <p>Weight: {pokemonDetails.weight}</p>
                <p>Attack: {pokemonDetails.stats[1].base_stat}</p>
              </>
            )}
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonThumbnail;
