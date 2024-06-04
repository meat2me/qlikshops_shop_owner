import { ModalModule } from './../../modals/modal.module';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent, CustomNgbDatepicker } from './notification.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableFooterModule } from '@components/table-footer/table-footer.module';

const routes: Routes = [
  {
    path: '',
    component: NotificationComponent
  }
];

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    FormsModule,
    ModalModule,
    NgxPaginationModule,
    TableFooterModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [{provide: NgbDateParserFormatter, useClass: CustomNgbDatepicker}]
})
export class NotificationModule { }
