import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormService } from '../../services/form.service';
import { BehaviorSubject } from 'rxjs';
import { Form } from '../../models/form.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
})
export class PreviewComponent implements OnInit {
  private formService = inject(FormService);
  private destroyRef = inject(DestroyRef);

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  data$: BehaviorSubject<Form[]> = new BehaviorSubject<Form[]>([]);

  city?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.city = params['city'];
    });
    this.isLoading$.next(true);
    const subscription = this.formService.getAllForms().subscribe({
      next: (data) => {
        const finalData: Form[] = data.filter((el) => el.city === this.city);
        console.log(finalData);
        this.data$.next(finalData);
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
