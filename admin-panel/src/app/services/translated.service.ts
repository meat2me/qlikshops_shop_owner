import { Injectable, Output } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
const LANGUAGE_KEY = 'QLIKS_LANGUAGE';

@Injectable({
  providedIn: 'root',
})
export class TranslatedService {
  @Output() languageObservable = new BehaviorSubject('he');

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['he']);
    this.translateService.onLangChange.subscribe(
      this.changeLanguage.bind(this)
    );
    this.translateService.setDefaultLang('he');
    this.translateService.use('he');
  }

  changeLanguage({ lang }: LangChangeEvent) {
    this.translateService.use(lang);
    this.languageObservable.next(lang);
    this.storedLanguage = lang;
  }

  get storedLanguage() {
    return localStorage.getItem(LANGUAGE_KEY);
  }

  set storedLanguage(value: string) {
    localStorage.setItem(LANGUAGE_KEY, value);
  }

  getCurrentLanguage() {
    return this.translateService.currentLang;
  }
}
