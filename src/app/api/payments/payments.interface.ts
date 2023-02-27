/* eslint-disable @typescript-eslint/no-namespace */

type QueryParams = '' | '';

type FiltersType = {
  [key in QueryParams]?: number | number[];
};

export namespace ApiPaymentsFriendsGroup {
  export namespace Get {
    export namespace Request {
      export type Params = FiltersType;
    }

    export namespace Response {
      export interface Body {
        id: string;
        members: Person[];
      }
      interface Person {
        id: string;
        name: string;
        payments: Payment[];
      }

      interface Payment {
        id: string;
        amount: string;
        description: string;
        date: string;
      }
    }
  }
}
