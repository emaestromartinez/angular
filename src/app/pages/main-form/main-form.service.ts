import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiQuotesService } from 'src/app/api/quotes/qod.service';

@Injectable({
  providedIn: 'root',
})
export class MainFormService {
  constructor(private _httpClient: HttpClient) {}
}
