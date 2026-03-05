import { usePokemonsPreferes } from "../contexts/PokemonsPreferesContext";
import type { Pokemon } from "../types/pokemon.type";

export default function AffichagePokemon({ pokemon }: { pokemon: Pokemon }) {
  if (!pokemon) return <p>Aucun Pokémon correspondant</p>;

  const { pokemonsPreferes, actif, onAjout, onSuppression } =
    usePokemonsPreferes();

  const isPrefere = pokemonsPreferes.some((p) => p.name === pokemon.name);

  return (
    <tr>
      <td>{pokemon.name}</td>
      <td>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width="80"
          height="auto"
        />
      </td>
      {actif && (
        <td>
          {isPrefere && (
            <button
              disabled={!isPrefere}
              onClick={() => onSuppression(pokemon.name)}
            >
              Supprimer
            </button>
          )}
          {!isPrefere && (
            <button disabled={isPrefere} onClick={() => onAjout(pokemon)}>
              Ajouter
            </button>
          )}
        </td>
      )}
    </tr>
  );
}
