import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hebrew-layout',
  templateUrl: './hebrew-layout.component.html',
  styleUrls: ['./hebrew-layout.component.scss']
})
export class HebrewLayoutComponent implements OnInit {

    constructor(private translateService: TranslateService, private renderer: Renderer2) { }

    ngOnInit() {
        this.renderer.setAttribute(document.querySelector('html'), 'lang', 'he');
        this.translateService.use('he');
    }
}
