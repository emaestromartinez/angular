/* eslint-disable @typescript-eslint/no-namespace */

type QueryParams = '' | '';

type FiltersType = {
  [key in QueryParams]?: number | number[];
};

export namespace ApiTicketingList {
  export namespace Get {
    export namespace Request {
      export type Params = FiltersType;
    }

    export namespace Response {
      export interface Body {
        id: string;
        title: string;
        subtitle: string;
        image: string;
        place: string;
        startDate: string;
        endDate: string;
        description: string;
      }
    }
  }
}
