import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Country } from '../models/country.model';
import { CountryService } from '../services/counties.service';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { FormService } from '../services/form.service';
import { Form } from '../models/form.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  private countryService = inject(CountryService);
  private formService = inject(FormService);
  private destroyRef = inject(DestroyRef);

  countries$: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  statesList: any = [];
  citiesList: any = [];

  selectedCountry: any = '';
  selectedState: any = '';
  selectedCity: any = '';

  form = new FormGroup({
    country: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),

    state: new FormControl('', [Validators.required, Validators.minLength(3)]),
    city: new FormControl('', [
      Validators.required,
      Validators.min(-100),
      Validators.max(100),
    ]),
    temperature: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    rainStatus: new FormControl(false, [Validators.required]),
    date: new FormControl('', [Validators.required]),
    networkPower: new FormControl('', [Validators.required]),
    highAltitude: new FormControl('', [
      Validators.required,
      Validators.minLength(0),
    ]),
  });

  activeLanguage: string = 'pt';

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.isLoading$.next(true);
    const subscription = this.countryService.getAllCountries().subscribe({
      next: (countries) => {
        this.countries$.next(countries);
        console.log(this.countries$.value);
      },
      complete: () => {
        this.isLoading$.next(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

    // Initialize form with current date
    const currentDate = new Date().toString();
    this.form.controls.date.setValue(currentDate);

    // Format date
    const localDateTime = this.formatDateForInput(currentDate);
    console.log(localDateTime);
  }

  formatDateForInput(date: string | Date | null): string {
    if (!date) {
      return ''; // Return an empty string if value is null
    } else if (typeof date === 'string') {
      return date; // If value is a string
    } else {
      // Formate data and hour to locale format
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false, // not use 24 hour format
      };
      return new Intl.DateTimeFormat(navigator.language, options).format(date);
    }
  }

  onSelectCountry(event: any) {
    this.isLoading$.next(true);
    this.selectedCountry = (event.target as HTMLSelectElement).value;
    const temporary = this.countries$.value.find(
      (el) => el.name === this.selectedCountry
    )?.data;
    if (temporary) {
      this.statesList = Object.keys(temporary);
      this.isLoading$.next(false);
    }
    if (this.selectedState || this.selectedCity) {
      this.selectedState = '';
      this.selectedCity = '';
    }
  }

  onSelectState(event: any) {
    if (event && this.form.controls.state.value) {
      this.isLoading$.next(true);
      this.selectedState = this.form.controls.state.value;

      const country = this.countries$.value.find(
        (el) => el.name === this.selectedCountry
      );

      if (country?.data) {
        const states = country.data[this.selectedState];
        if (states) {
          this.citiesList = states;
        }
      } else {
        this.citiesList = [];
      }

      this.isLoading$.next(false);
      if (this.selectedCity) {
        this.selectedCity = '';
      }
    }
  }

  onSelectCity(event: any) {
    if (event && this.form.controls.city.value) {
      this.isLoading$.next(true);
      this.selectedCity = this.form.controls.city.value;
      this.isLoading$.next(false);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('INVALID FORM');
      return;
    }
    const formData: Form = {
      country: this.form.controls.country.value!,
      state: this.form.controls.state.value!,
      city: this.form.controls.city.value!,
      temperature: this.form.controls.temperature.value!,
      rainStatus: this.form.controls.rainStatus.value!,
      date: this.form.controls.date.value!,
      networkPower: this.form.controls.networkPower.value!,
      highAltitude: this.form.controls.highAltitude.value!,
    };
    console.log(formData);
    const subscription = this.formService.insertForm(formData).subscribe({
      next: (response) => {
        console.log('Form submitted successfully', response);
      },
      error: (error) => {
        console.error('Error submitting form', error);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
    this.onReset();
  }

  onReset() {
    this.form.reset();
    this.selectedCountry = '';
    this.selectedState = '';
    this.selectedCity = '';
    // Set date
    const currentDate = new Date().toString();
    this.form.controls.date.setValue(currentDate);
  }

  setActiveLanguage(language: string) {
    this.activeLanguage = language;
    this.translateService.use(this.activeLanguage);
  }

}
