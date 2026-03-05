import type { Pokemon } from "./pokemon.type";

export interface GetPokemon {
    count: number;
    next: string | null;
    previous: string | null;
    results : Pokemon[];
}