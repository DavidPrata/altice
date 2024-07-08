import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'altice_labs_challenge';

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['en', 'pt']);
    this.translateService.setDefaultLang('en');

    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang?.match(/en|pt/) ? browserLang : 'en');
  }
}
