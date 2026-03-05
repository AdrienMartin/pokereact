import AffichagePokemon from "../components/AffichagePokemon";
import RechercheNumero from "../components/RechercheNumero";
import { usePokemonsPreferes } from "../contexts/PokemonsPreferesContext";

export default function PokemonsPreferesComposant() {
  const { pokemonsPreferes, actif, onAjout, onSuppression } =
    usePokemonsPreferes();

  return (
    <>
      <RechercheNumero />

      <h1>Pokémons préférés : </h1>
      {pokemonsPreferes.length === 0 && <p>Aucun</p>}
      {pokemonsPreferes.length > 0 && (
        <table>
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pokemonsPreferes.map((pokemon) => (
              <AffichagePokemon key={pokemon.name} pokemon={pokemon} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
