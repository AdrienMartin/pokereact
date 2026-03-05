import { useEffect, useState } from "react";
import type { Pokemon } from "../types/pokemon.type";
import AffichagePokemon from "./AffichagePokemon";

export default function RechercheNumero() {
  const [inputValue, setInputValue] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!numero) {
      setPokemon(undefined);
      return;
    }

    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${numero}`,
        );
        if (!response.ok) {
          setPokemon(undefined);
          setError("Pokémon introuvable");
          return;
        }
        const data = await response.json();
        setPokemon(data);
        setError("");
      } catch (err) {
        setPokemon(undefined);
        setError("Erreur lors de la recherche du Pokémon");
      }
    };

    fetchPokemon();
  }, [numero]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setNumero(inputValue);
      }}
    >
      <label htmlFor="numero">Numéro du Pokémon : </label>
      <input
        type="text"
        pattern="\d*"
        inputMode="numeric"
        name="numero"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <input type="submit" />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {pokemon && (
        <table>
          <tbody>
            <AffichagePokemon pokemon={pokemon} />
          </tbody>
        </table>
      )}
    </form>
  );
}
