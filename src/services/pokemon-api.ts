import type { GetPokemon } from "../types/get-pokemon.type";

const API_BASE_URL = 'https://pokeapi.co/api/v2';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const getPokemons = async (page = 0): Promise<GetPokemon> => {
  const offset = page * 20;
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=20&offset=${offset}`, {
    method: 'GET',
    headers: defaultHeaders,
  });
  
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }
  
  return response.json();
};