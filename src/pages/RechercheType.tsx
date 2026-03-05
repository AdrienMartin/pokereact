import { useState } from "react";
import RechercheNom from "../components/RechercheNom";
import RechercheNumero from "../components/RechercheNumero";

export default function RechercheType() {
  const [typeRecherche, setTypeRecherche] = useState<string>("num");

  return (
    <>
      <label>Recherche par : </label>
      <select
        name="typeRecherche"
        onChange={(e) => setTypeRecherche(e.target.value)}
      >
        <option value="num">Numéro</option>
        <option value="nom">Nom</option>
        <option value="avancee">Recherche Avancée</option>
      </select>

      {typeRecherche === "num" && <RechercheNumero></RechercheNumero>}
      {typeRecherche === "nom" && <RechercheNom></RechercheNom>}
      {typeRecherche === "avancee" && <p>Recherche avancée</p>}
    </>
  );
}
