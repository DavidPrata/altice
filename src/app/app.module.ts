import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { TableComponent } from './user-dashboard/table/table.component';
import { FormService } from './services/form.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PreviewComponent } from './user-dashboard/preview/preview.component';
import { MatIconModule } from '@angular/material/icon';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UserDashboardComponent,
    TableComponent,
    PreviewComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [FormService, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
