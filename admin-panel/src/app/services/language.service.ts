import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private rtls = ['he'];
  public isRtl = false;

  constructor(private tranServ: TranslateService) {
    this.updateCurrentLang();
    this.tranServ.onLangChange.subscribe(() => {
      this.updateCurrentLang();
    });
  }

  updateCurrentLang() {
    this.isRtl = this.rtls.includes(this.tranServ.currentLang);
  }
}
