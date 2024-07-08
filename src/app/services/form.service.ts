import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Form } from '../models/form.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private httpClient = inject(HttpClient);

  constructor() {}

  insertForm(formData: Form) {
    return this.httpClient
      .post<Form>('http://localhost:3000/forms', formData)
      .pipe(
        catchError((error) => {
          console.error('Error inserting form:', error);
          return throwError(
            () =>
              new Error(
                'Something went wrong while inserting the form. Please try again later.'
              )
          );
        })
      );
  }

  getAllForms() {
    return this.httpClient.get<Form[]>('http://localhost:3000/forms').pipe(
      catchError((error) => {
        console.error('Error getting forms:', error);
        return throwError(
          () =>
            new Error(
              'Something went wrong while fetching forms data. Please try again later.'
            )
        );
      })
    );
  }
}
