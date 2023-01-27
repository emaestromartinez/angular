export interface PokemonList {
  pokemon: Pokemon[];
}

export interface Pokemon {
  pokemonId: string;
  url: string;
  title: string;
  gender: string;
  homeworld: string;
  height: string;
}
export interface PokemonTypes {
  name: string;
}
