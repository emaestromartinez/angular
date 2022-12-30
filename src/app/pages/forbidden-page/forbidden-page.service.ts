import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ForbiddenPageService {
  constructor(private _httpClient: HttpClient) {}
}
