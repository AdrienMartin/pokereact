import { createContext, useContext, useReducer, type ReactNode } from "react";
import PokemonsFavorisReducer, {
  PokemonsFavorisActionType,
} from "../reducers/PokemonsFavorisReducer";
import type { Pokemon } from "../types/pokemon.type";

type PokemonsPreferesActions = {
  pokemonsPreferes: Pokemon[];
  actif: boolean;
  onAjout: (pokemon: Pokemon) => void;
  onSuppression: (nom: string) => void;
};

const PokemonsPreferesContext = createContext<PokemonsPreferesActions | null>(
  null,
);

export function PokemonsPreferesProvider({
  children,
  actif = false,
}: {
  children: ReactNode;
  actif?: boolean;
}) {
  const [state, dispatch] = useReducer(PokemonsFavorisReducer, []);

  const ajouterPokemon = (pokemon: Pokemon) =>
    dispatch({
      type: PokemonsFavorisActionType.AJOUTER_POKEMON,
      payload: pokemon,
    });
  const supprimerPokemon = (nom: string) =>
    dispatch({
      type: PokemonsFavorisActionType.SUPPRIMER_POKEMON,
      payload: nom,
    });

  return (
    <PokemonsPreferesContext.Provider
      value={{
        pokemonsPreferes: state,
        actif,
        onAjout: ajouterPokemon,
        onSuppression: supprimerPokemon,
      }}
    >
      {children}
    </PokemonsPreferesContext.Provider>
  );
}

export function usePokemonsPreferes() {
  const context = useContext(PokemonsPreferesContext);
  if (!context)
    throw new Error("useFavorites doit être utilisé dans un FavoritesProvider");
  return context;
}
