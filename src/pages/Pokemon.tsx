import { useCallback, useState } from "react";
import { getPokemons } from "../services/pokemon-api";
import type { GetPokemon } from "../types/get-pokemon.type";
import { useFetch } from "../hooks/useFetch";

export default function Pokemon() {
  const [page, setPage] = useState<number>(0);

  const fetchPokemons = useCallback(() => getPokemons(page), [page]);

  const {
    data: getPokemon,
    loading,
    error,
    refetch,
  } = useFetch<GetPokemon>(fetchPokemons);

  const handleClickPrecedente = () => {
    setPage(page - 1);
  };

  const handleClickSuivante = () => {
    setPage(page + 1);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Erreur: {error}</p>
        <button onClick={() => refetch()}>Réessayer</button>
      </div>
    );
  }

  return (
    <>
      <h1>Liste des utilisateurs</h1>

      <ul>
        {getPokemon!.results.map((pokemon) => (
          <li key={pokemon.name}>
            <h3>{pokemon.name}</h3>
          </li>
        ))}
      </ul>

      <button onClick={handleClickPrecedente} disabled={page == 0}>
        {"<"}
      </button>
      <button
        onClick={handleClickSuivante}
        disabled={page == getPokemon!.count / 20 - 1}
      >
        {">"}
      </button>
    </>
  );
}
