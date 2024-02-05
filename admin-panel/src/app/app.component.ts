import { Component } from '@angular/core';
import { TranslatedService } from '@services/translated.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'admin-panel';

    constructor(private translate: TranslatedService) {

    }
}
