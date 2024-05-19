import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@services/language.service';
import { TranslatedService } from '@services/translated.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private renderer: Renderer2, private tranServ: TranslateService, private translatedServ: TranslatedService) { }

  ngOnInit(): void {
    this.changeLayout();
    this.tranServ.onLangChange.subscribe(this.changeLayout.bind(this));
  }

  private changeLayout() {
    const currLang = this.translatedServ.storedLanguage;
    this.renderer.setAttribute(document.querySelector('html'), 'lang', currLang);
    this.tranServ.use(this.translatedServ.storedLanguage);
  }
}
