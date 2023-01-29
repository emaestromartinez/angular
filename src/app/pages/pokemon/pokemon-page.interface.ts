export interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  pokemon: Pokemon[];
}

export interface Pokemon {
  pokemonId: string;
  url?: string;
  name: string;
  weight: number;
  types: string[];
  sprite?: string;
}
export interface PokemonTypes {
  name: string;
}
