import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TableFooterModule } from '@components/table-footer/table-footer.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { OrderDetailComponent } from '@routes/order-detail/order-detail.component';
import { OrderDetailModule } from '@routes/order-detail/order-detail.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HistoryComponent } from './history.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryComponent
  },

  {
    path: 'detail/:order_id',
    component: OrderDetailComponent,
    data: {
      breadcrumb: 'navigation.details',
      unclickable: true,
    }
  }
];

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    TableFooterModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
    TranslateModule,
    OrderDetailModule
  ]
})
export class HistoryModule { }
