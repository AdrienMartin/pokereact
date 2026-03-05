import type { Pokemon } from "../types/pokemon.type";

export const PokemonsFavorisActionType = {
  AJOUTER_POKEMON: "AJOUTER_POKEMON" as const,
  SUPPRIMER_POKEMON: "SUPPRIMER_POKEMON" as const,
};

export type PokemonsFavorisActionType =
  (typeof PokemonsFavorisActionType)[keyof typeof PokemonsFavorisActionType];

type Action =
  | { type: typeof PokemonsFavorisActionType.AJOUTER_POKEMON; payload: Pokemon }
  | {
      type: typeof PokemonsFavorisActionType.SUPPRIMER_POKEMON;
      payload: string;
    };

export default function PokemonsFavorisReducer(
  state: Pokemon[],
  action: Action,
): Pokemon[] {
  switch (action.type) {
    case PokemonsFavorisActionType.AJOUTER_POKEMON:
      return [...state, action.payload];
    case PokemonsFavorisActionType.SUPPRIMER_POKEMON:
      return state.filter((pokemon) => pokemon.name !== action.payload);
    default:
      return state;
  }
}
