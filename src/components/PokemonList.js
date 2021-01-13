import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { GetPokemonList } from "../actions/PokemonActions";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const PokemonList = (props) => {
  const [search, setSearch] = useState();

  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);

  let getPageNo = props.match.params.page;
  const [pageNo, setPageNo] = useState(
    getPageNo === undefined ? 1 : Number(getPageNo)
  );

  const classes = useStyles();

  useEffect(() => {
    fetchData(pageNo);
    console.log(getPageNo);
  }, [pageNo]);

  const fetchData = (page = pageNo) => {
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
        <p className="pageNo">Page No: {pageNo}</p>
      </div>
      {showData()}
      {!_.isEmpty(pokemonList.data) && (
        <div className="pagination_container">
          <div className={classes.root}>
            <Pagination
              count={Math.ceil(pokemonList.count / 15)}
              variant="outlined"
              color="secondary"
              page={pageNo}
              onChange={(e, val) => {
                setPageNo(Number(val));
                props.history.push(`/${val}`);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
