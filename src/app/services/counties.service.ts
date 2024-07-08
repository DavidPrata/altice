import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { Country } from '../models/country.model';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private httpClient = inject(HttpClient);
  private countries = signal<Country[]>([]);

  loadCountries = this.countries.asReadonly();

  getAllCountries() {
    return this.fetchPlaces(
      'http://localhost:3000/countries',
      'Something went wrong fetching the available places. Please try again later.'
    );
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ countries: Country[] }>(url).pipe(
      map((resData) => resData.countries),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
