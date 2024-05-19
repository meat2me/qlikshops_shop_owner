import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableFooterModule } from '@components/table-footer/table-footer.module';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent
  },
  {
    path: 'add-store',
    loadChildren: () => import('@routes/add-store/add-store.module').then(mod => mod.AddStoreModule),
    data: {
      breadcrumb: 'navigation.add_store',
      usePrevUrl: false,
    }
  },
];

@NgModule({
  declarations: [StoreComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableFooterModule,
    NgxPaginationModule,
    TranslateModule,
    NgbAccordionModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    StoreComponent
  ]
})
export class StoreModule { }
