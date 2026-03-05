import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ListePokemon from "../components/ListePokemon";
import type { GetPokemon } from "../types/get-pokemon.type";

export default function Liste() {
  const initialPromise = fetch(`https://pokeapi.co/api/v2/pokemon`).then(
    (res) => res.json(),
  );

  const [promise, setPromise] = useState<Promise<GetPokemon>>(initialPromise);

  const fetchPreviousNext = (url: string) => {
    setPromise(fetch(url).then((res) => res.json()));
  };

  return (
    <ErrorBoundary fallback={<div>❌ Erreur de chargement</div>}>
      <Suspense fallback={<div>⏳ Chargement...</div>}>
        <ListePokemon
          pokemonPromise={promise}
          fetchPreviousNext={fetchPreviousNext}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
