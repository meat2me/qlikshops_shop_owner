import { RouterModule } from '@angular/router';
import { SafeModule } from './../../core/pipes/safe.pipe/safe.module';
import { ImgBase64Module } from './../../core/pipes/img-base64.pipe/img-base64.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryAccordionComponent } from './category-accordion.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';



@NgModule({
  declarations: [CategoryAccordionComponent],
  imports: [
    RouterModule,
    CommonModule,
    AccordionModule,
    ImgBase64Module,
    SafeModule,
  ],
  exports: [CategoryAccordionComponent]
})
export class CategoryAccordionModule { }
