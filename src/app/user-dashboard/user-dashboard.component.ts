import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormService } from '../services/form.service';
import { Form } from '../models/form.model';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  private formService = inject(FormService);
  private destroyRef = inject(DestroyRef);

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  data$: BehaviorSubject<Form[]> = new BehaviorSubject<Form[]>([]);

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['en', 'pt']);
    this.translateService.setDefaultLang('en');

    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang?.match(/en|pt/) ? browserLang : 'en');
  }

  ngOnInit(): void {
    this.isLoading$.next(true);
    const subscription = this.formService.getAllForms().subscribe({
      next: (data) => {
        this.data$.next(data);
        console.log(this.data$.value);
      },
      complete: () => {
        this.isLoading$.next(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
