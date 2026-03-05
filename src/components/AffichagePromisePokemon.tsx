import { use } from "react";
import type { Pokemon } from "../types/pokemon.type";
import AffichagePokemon from "./AffichagePokemon";

export default function AffichagePromisePokemon({
  pokemonPromise,
}: {
  pokemonPromise: Promise<Pokemon>;
}) {
  const pokemon = use(pokemonPromise);

  return (
    <table>
      <tbody>
        <AffichagePokemon pokemon={pokemon} />
      </tbody>
    </table>
  );
}
