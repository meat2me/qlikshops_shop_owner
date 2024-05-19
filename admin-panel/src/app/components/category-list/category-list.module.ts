import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list.component';
import { CategoryAccordionModule } from '@components/category-accordion/category-accordion.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';



@NgModule({
  declarations: [CategoryListComponent],
  imports: [
    CommonModule,
    CategoryAccordionModule,
    AccordionModule.forRoot(),
  ],
  exports: [CategoryListComponent]
})
export class CategoryListModule { }
