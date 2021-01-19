import React, { useEffect } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemon } from "../actions/PokemonActions";

const Pokemon = (props) => {
  const pokemonName = props.match.params.pokemon;
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.Pokemon);

  // console.log(pokemonState);
  const errorMessage = pokemonState.errMsg;
  console.log(errorMessage, "errMsg from action");

  useEffect(() => {
    dispatch(GetPokemon(pokemonName));
  }, []);

  const showData = () => {
    const pokeData = pokemonState.data[pokemonName];

    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      return (
        <div className="pokemon_wrapper">
          <div className="item">
            <h1>Sprits</h1>
            <img src={pokeData.sprites.front_default} alt="..." />
            <img src={pokeData.sprites.back_default} alt="..." />
            <img src={pokeData.sprites.front_shiny} alt="..." />
            <img src={pokeData.sprites.back_shiny} alt="..." />
          </div>
          <div className="item">
            <h1>Stats</h1>
            {pokeData.stats.map((el) => {
              return (
                <p>
                  {el.stat.name} {el.base_stat}
                </p>
              );
            })}
          </div>
          <div className="item">
            <h1>Abilities</h1>
            {pokeData.abilities.map((el) => {
              return <p>{el.ability.name}</p>;
            })}
          </div>
        </div>
      );
    }

    if (pokemonState.loading) {
      return <p>Loading...</p>;
    }

    if (pokemonState.errMsg !== "") {
      return (
        <>
          <p>{pokemonState.errMsg}</p>
          <button
            type="button-err"
            onClick={() => {
              window.history.back();
            }}
          >
            Go Back
          </button>
        </>
      );
    }

    return <p>error getting the pokemon</p>;
  };

  return (
    <>
      <div className="poke_screen">
        <p>{pokemonName}</p>
      </div>
      {showData()}
    </>
  );
};

export default Pokemon;
