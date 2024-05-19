import { TableFooterModule } from '@components/table-footer/table-footer.module';
import { FormsModule } from '@angular/forms';
import { OrderDetailModule } from './../order-detail/order-detail.module';
import { OrderDetailComponent } from './../order-detail/order-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenPurchaseComponent } from './open-purchase.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { DateTimePipe } from 'app/pipes/date-time.pipe';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: OpenPurchaseComponent,
  },
  {
    path: 'detail/:order_id',
    component: OrderDetailComponent,
    data: {
      breadcrumb: 'navigation.details',
      unclickable: true,
    },
  },
];

@NgModule({
  declarations: [OpenPurchaseComponent, DateTimePipe],
  imports: [
    CommonModule,
    TranslateModule,
    NgxPaginationModule,
    FormsModule,
    TableFooterModule,
    OrderDetailModule,
    RouterModule.forChild(routes),
    NgbDatepickerModule,
  ],
})
export class OpenPurchaseModule {}
