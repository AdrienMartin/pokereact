import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { PokemonsPreferesProvider } from "./contexts/PokemonsPreferesContext";
import DetailsPokemon from "./pages/DetailsPokemon";
import FormResult from "./pages/FormResult";
import Liste from "./pages/Liste";
import NotFound from "./pages/NotFound";
import Pokemon from "./pages/Pokemon";
import PokemonsPreferes from "./pages/PokemonsPreferes";
import RechercheType from "./pages/RechercheType";

function App() {
  return (
    <PokemonsPreferesProvider>
      <BrowserRouter>
        <nav>
          <Link to="/list">Pokemon</Link> |{" "}
          <Link to="/preferes">Pokémons préférés</Link>{" "}
        </nav>

        <Routes>
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/form" element={<RechercheType />} />
          <Route path="/result" element={<FormResult />} />
          <Route path="/list" element={<Liste />} />
          <Route path="/details" element={<DetailsPokemon />} />
          <Route path="/preferes" element={<PokemonsPreferes />} />

          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </PokemonsPreferesProvider>
  );
}

export default App;
