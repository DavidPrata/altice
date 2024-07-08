import { RouterModule, Routes } from '@angular/router';

import { UserFormComponent } from './user-form/user-form.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NgModule } from '@angular/core';
import { PreviewComponent } from './user-dashboard/preview/preview.component';

export const routes: Routes = [
  {
    path: '',
    component: UserFormComponent,
  },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
  },
  {
    path: 'preview/:city',
    component: PreviewComponent,
    children: [
      {
        path: 'dashboard',
        component: UserDashboardComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}