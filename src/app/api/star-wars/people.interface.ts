/* eslint-disable @typescript-eslint/no-namespace */

type QueryParams = 'page' | 'count';

type FiltersType = {
  [key in QueryParams]?: number | number[];
};

export namespace ApiStarWarsPeople {
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
        birth_year: string;
        eye_color: string;
        films: string[];
        gender: string;
        hair_color: string;
        height: string;
        homeworld: string;
        mass: string;
        name: string;
        skin_color: string;
        created: string;
        edited: string;
        species: string[];
        starships: string[];
        url: string;
        vehicles: string[];
      }
    }
  }
}

export namespace ApiStarWarsPeopleDetails {
  export namespace Get {
    export namespace Request {
      export type Params = FiltersType;
    }

    export namespace Response {
      export interface Body {
        birth_year: string;
        eye_color: string;
        films: string[];
        gender: string;
        hair_color: string;
        height: string;
        homeworld: string;
        mass: string;
        name: string;
        skin_color: string;
        created: string;
        edited: string;
        species: string[];
        starships: string[];
        url: string;
        vehicles: string[];
      }
    }
  }
}
