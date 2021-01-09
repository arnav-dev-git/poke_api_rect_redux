import { combineReducers } from "redux";
import PokemonListReducer from "../reducer/PokemonListReducer";
import PokemonMultipleReducer from "../reducer/PokemonMultipleReducer";

const RootReducer = combineReducers({
  PokemonList: PokemonListReducer,
  Pokemon: PokemonMultipleReducer,
});

export default RootReducer;
