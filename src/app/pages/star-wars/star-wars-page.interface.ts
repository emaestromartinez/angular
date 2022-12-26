export interface Film {
  filmId: string;
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
  personId: string;
  url: string;
  title: string;
  gender: string;
  homeworld: string;
  height: string;
}
export interface PeopleDetails {
  personId: string;
  title: string;
  gender: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
  height: string;
  skin_color: string;
  homeworld: string;
}

export interface PlanetDetails {
  title: string;
  population: string;
  terrain: string;
  climate: string;
  diameter: string;
}
