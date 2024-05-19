import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSideNavbarComponent } from './left-side-navbar.component';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [LeftSideNavbarComponent],
  imports: [
    CommonModule,
    NgbAccordionModule,
    RouterModule,
    NgbModule,
    TranslateModule
  ],
  exports: [LeftSideNavbarComponent]
})
export class LeftSideNavbarModule { }
