import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadyOrdersDeliveryComponent } from './ready-orders-delivery.component';
import { Routes, RouterModule } from '@angular/router';
import { OrderDetailComponent } from '@routes/order-detail/order-detail.component';
import { FormsModule } from '@angular/forms';
import { TableFooterModule } from '@components/table-footer/table-footer.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {
    path: '',
    component: ReadyOrdersDeliveryComponent,
  },
  {
    path: 'detail/:order_id',
    component: OrderDetailComponent,
    data: {
      breadcrumb: 'navigation.details',
      usePrevUrl: true,
    }
  },
];

@NgModule({
  declarations: [ReadyOrdersDeliveryComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableFooterModule,
    NgxPaginationModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ]
})
export class ReadyOrdersDeliveryModule { }
