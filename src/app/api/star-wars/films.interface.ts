/* eslint-disable @typescript-eslint/no-namespace */

type QueryParams = '' | '';

type FiltersType = {
  [key in QueryParams]?: string | string[];
};

export namespace ApiStarWarsFilms {
  export namespace Get {
    export namespace Request {
      export type Params = FiltersType;
    }

    export namespace Response {
      export interface Body {
        count: number;
        next: string;
        previous: string;
        results: Results[];
      }
      export interface Results {
        characters: string[];
        created: string;
        director: string;
        edited: string;
        episode_id: number;
        opening_crawl: string;
        planets: string[];
        producer: string;
        release_date: string;
        species: string[];
        starships: string[];
        title: string;
        url: string;
        vehicles: string[];
      }
    }
  }
}
