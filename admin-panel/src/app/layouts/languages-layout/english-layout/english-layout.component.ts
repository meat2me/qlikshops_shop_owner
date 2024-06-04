import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-english-layout',
  templateUrl: './english-layout.component.html',
  styleUrls: ['./english-layout.component.scss']
})
export class EnglishLayoutComponent implements OnInit {

    constructor(private translateService: TranslateService, private renderer: Renderer2) { }

    ngOnInit() {
        this.renderer.setAttribute(document.querySelector('html'), 'lang', 'en');
        this.translateService.use('en');
    }

}
