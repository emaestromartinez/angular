import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiQuotesService } from 'src/app/api/quotes/qod.service';

export interface Quote {
  author: string;
  quote: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccessibilityPageService {
  constructor() {}
}
