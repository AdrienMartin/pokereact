import PokemonsPreferesComposant from "../components/PokemonsPrefereComposant";
import { PokemonsPreferesProvider } from "../contexts/PokemonsPreferesContext";

export default function PokemonsPreferes() {
  return (
    <PokemonsPreferesProvider actif>
      <PokemonsPreferesComposant />
    </PokemonsPreferesProvider>
  );
}
