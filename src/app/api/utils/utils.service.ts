import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // Función que recibe un array de URLs y el límite de concurrencia
  fetchUrls(urls: string[], maxConcurrency: number): Observable<any[]> {
    return from(urls).pipe(
      mergeMap((url) => this.http.get(url), maxConcurrency)
    );
  }
}
