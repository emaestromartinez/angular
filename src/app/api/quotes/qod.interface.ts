/* eslint-disable @typescript-eslint/no-namespace */

type QueryParams = 'category' | 'language';

type FiltersType = {
  [key in QueryParams]?: string | string[];
};

export namespace ApiQuotesQOD {
  export namespace Get {
    export namespace Request {
      export type Params = FiltersType;
    }

    export namespace Response {
      export interface Body {
        success: string;
        contents: Contents;
      }

      export interface Contents {
        quotes: Quote[];
      }

      export interface Quote {
        author: string;
        quote: string;
        tags: string[];
        id: string;
        image: string;
        length: number;
      }
    }
  }
}
