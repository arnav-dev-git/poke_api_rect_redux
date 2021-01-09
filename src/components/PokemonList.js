import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { GetPokemonList } from "../actions/PokemonActions";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const PokemonList = (props) => {
  const [search, setSearch] = useState();

  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = (page = 1) => {
    dispatch(GetPokemonList(page));
  };

  const showData = () => {
    if (pokemonList.loading) {
      return <p>Loading...</p>;
    }

    if (!_.isEmpty(pokemonList.data)) {
      return (
        <div className="list-wrapper">
          {pokemonList.data.map((el, k) => {
            return (
              <div className="pokemon_item" key={k}>
                <p>{el.name}</p>
                <Link to={`/pokemon/${el.name}`}>View</Link>
              </div>
            );
          })}
        </div>
      );
    }

    if (pokemonList.errMsg !== "") {
      return <p>Error ... </p>;
    }

    return <p>Unable to load</p>;
  };
  return (
    <div>
      <div className="search_wrapper">
        <p style={{ marginRight: "10px" }}>Search: </p>
        <input
          type="text"
          name="search"
          id="search-text"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => props.history.push(`/pokemon/${search}`)}>
          Search
        </button>
      </div>
      {showData()}
      {!_.isEmpty(pokemonList.data) && (
        <ReactPaginate
          pageCount={Math.ceil(pokemonList.count / 15)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={(data) => fetchData(data.selected + 1)}
          containerClassName={"pagination_app"}
          activeClassName="active_page"
        />
      )}
    </div>
  );
};

export default PokemonList;
