import { TableFooterModule } from '@components/table-footer/table-footer.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadyOrdersComponent } from './ready-orders.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderDetailComponent } from '@routes/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ReadyOrdersComponent,
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
  declarations: [ReadyOrdersComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableFooterModule,
    NgxPaginationModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
})
export class ReadyOrdersModule { }
