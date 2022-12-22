/* eslint-disable @typescript-eslint/no-namespace */

type QueryParams = '' | '';

type FiltersType = {
  [key in QueryParams]?: string | string[];
};

export namespace ApiStarWarsPlanets {
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
        climate: string;
        created: string;
        diameter: string;
        edited: string;
        films: string[];
        gravity: string;
        name: string;
        orbital_period: string;
        population: string;
        residents: string[];
        rotation_period: string;
        surface_water: string;
        terrain: string;
        url: string;
      }
    }
  }
}

export namespace ApiStarWarsPlanetDetails {
  export namespace Get {
    export namespace Request {
      export type Params = FiltersType;
    }

    export namespace Response {
      export interface Body {
        climate: string;
        created: string;
        diameter: string;
        edited: string;
        films: string[];
        gravity: string;
        name: string;
        orbital_period: string;
        population: string;
        residents: string[];
        rotation_period: string;
        surface_water: string;
        terrain: string;
        url: string;
      }
    }
  }
}
