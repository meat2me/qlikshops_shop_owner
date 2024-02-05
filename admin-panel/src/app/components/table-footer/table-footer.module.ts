import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFooterComponent } from './table-footer.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [TableFooterComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    TranslateModule,
  ],
  exports: [TableFooterComponent],
})
export class TableFooterModule { }
