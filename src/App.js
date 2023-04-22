import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import PokemonThumbnail from "./components/PokemonThumbnails";
import "./app.css";
import AboutPage from "./components/AboutPage";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();
    setLoadMore(data.next);

    const createPokemonObject = async (result) => {
      // Use Promise.all to wait for all fetch requests to complete
      await Promise.all(
        result.map(async (pokemon) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          const data = await res.json();
          setAllPokemons((currentList) => [...currentList, data]);
        })
      );
    };

    createPokemonObject(data.results);
  };

  const handleLoadMore = () => {
    getAllPokemons();
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="app-container">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Pokedex</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home allPokemons={allPokemons} handleLoadMore={handleLoadMore} />} />
          <Route path="/about" element={<AboutPage />} />
      
        </Routes>
      </Router>
    </div>
  );
}

const Home = ({ allPokemons, handleLoadMore }) => {
  return (
    <>
      <h1>Pokemon</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {/* Render the list of pokemons */}
          {allPokemons.map((pokemon, index) => 
            <PokemonThumbnail
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.front_default}  
              type={pokemon.types[0].type.name}
              key={index}
            />
          )}
        </div>
        <button className="load-more" onClick={handleLoadMore}>
          Load More
        </button>
      </div>
    </>
  );
}

export default App;
