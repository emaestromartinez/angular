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
export namespace ApiTicketingEvent {
  export namespace Get {
    export namespace Request {
      export type Params = FiltersType;
    }

    export namespace Response {
      export interface Body {
        event: Event;
        sessions: Session[];
      }

      export interface Event {
        id: string;
        title: string;
        subtitle: string;
        image: string;
      }

      export interface Session {
        date: string;
        availability: string;
      }
    }
  }
}
