import { use } from "react";
import { Link } from "react-router-dom";
import type { GetPokemon } from "../types/get-pokemon.type";
import type { Pokemon } from "../types/pokemon.type";

export default function ListePokemon({
  pokemonPromise,
  fetchPreviousNext,
}: {
  pokemonPromise: Promise<GetPokemon>;
  fetchPreviousNext: (url: string) => void;
}) {
  const pokemons = use(pokemonPromise);

  return (
    <>
      {pokemons.results.map((pokemon: Pokemon) => (
        <li key={pokemon.name}>
          <Link to="/details" state={{ urlDetailsPokemon: pokemon.url }}>
            {pokemon.name}
          </Link>
        </li>
      ))}
      <button
        disabled={pokemons.previous === null}
        onClick={() => fetchPreviousNext(pokemons.previous!)}
      >
        {"<"}
      </button>
      <button
        disabled={pokemons.next === null}
        onClick={() => fetchPreviousNext(pokemons.next!)}
      >
        {">"}
      </button>
    </>
  );
}
