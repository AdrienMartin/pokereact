import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AffichagePromisePokemon from "../components/AffichagePromisePokemon";
import type { Pokemon } from "../types/pokemon.type";

export default function DetailsPokemon() {
  const location = useLocation();
  const [pokemonPromise, setPokemonPromise] = useState<Promise<Pokemon>>();

  const detailsUrl = location.state?.urlDetailsPokemon;

  if (!detailsUrl) return <p>Aucun Pokémon sélectionné.</p>;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(detailsUrl);
        if (!response.ok) {
          setPokemonPromise(undefined);
          return;
        }
        const data = await response.json();
        setPokemonPromise(Promise.resolve(data));
      } catch (err) {
        setPokemonPromise(undefined);
      }
    };

    fetchPokemon();
  }, [detailsUrl]);

  if (!pokemonPromise) return <p>Aucun Pokémon sélectionné.</p>;

  return <AffichagePromisePokemon pokemonPromise={pokemonPromise} />;
}
