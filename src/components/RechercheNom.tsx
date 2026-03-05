import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { Pokemon } from "../types/pokemon.type";
import AffichagePromisePokemon from "./AffichagePromisePokemon";

export default function RechercheNom() {
  const [inputValue, setInputValue] = useState<string>("");
  const [pokemonPromise, setPokemonPromise] = useState<Promise<Pokemon>>();
  const [nom, setNom] = useState<string>("");

  const fetchPokemon = (nom: string) => {
    setNom(nom);
    const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${nom}`).then(
      (res) => res.json(),
    );
    setPokemonPromise(promise);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetchPokemon(inputValue);
      }}
    >
      <label htmlFor="numero">Nom du Pokémon : </label>
      <input
        type="text"
        name="numero"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <input type="submit" />

      {pokemonPromise && (
        <ErrorBoundary
          fallback={<div>❌ Erreur de chargement</div>}
          resetKeys={[nom]}
        >
          <Suspense fallback={<div>⏳ Chargement...</div>}>
            <AffichagePromisePokemon pokemonPromise={pokemonPromise} />
          </Suspense>
        </ErrorBoundary>
      )}
    </form>
  );
}
