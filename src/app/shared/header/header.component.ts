import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  activeLanguage: string = 'en';

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.activeLanguage = this.translateService.currentLang;
  }

  setActiveLanguage(language: string) {
    this.activeLanguage = language;
    this.translateService.use(this.activeLanguage);
  }
}
