const DefaultState = {
  loading: false,
  data: [],
  errMsg: "",
  count: 0,
};

const PokemonListReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case "POKEMON_LIST_LOADING":
      return {
        ...state,
        loading: true,
      };

    case "POKEMON_LIST_FAIL":
      return {
        ...state,
        loading: false,
        errMsg: "Unable to get the data ",
      };

    case "POKEMON_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload.results,
        errMsg: "",
        count: action.payload.count,
      };

    default:
      return state;
  }
};

export default PokemonListReducer;
