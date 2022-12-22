export interface Film {
  filmId: number;
  title: string;
  director: string;
}
export interface FilmDetails {
  filmId: number;
  title: string;
  director: string;
  producer: string;
  release_date: string;
  opening_crawl: string;
}

export interface People {
  title: string;
  gender: string;
  homeworld: string;
  height: string;
}

export interface PlanetDetails {
  title: string;
  population: string;
  terrain: string;
  climate: string;
  diameter: string;
}
