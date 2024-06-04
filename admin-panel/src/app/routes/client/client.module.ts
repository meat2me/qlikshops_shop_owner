import { FormsModule } from '@angular/forms';
import { ClientDetailResolver } from './../../core/resolvers/client-detail.resolver';
// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';

// app
import { ClientComponent } from './client.component';
import { ClientDetailComponent } from '@routes/client-detail/client-detail.component';
import { ClientDetailModule } from '@routes/client-detail/client-detail.module';
import { ClientsResolver } from '@core/resolvers/clients.resolver';
import { TableFooterModule } from '@components/table-footer/table-footer.module';

const routes: Route[] = [
  {
    path: '', component: ClientComponent,
    resolve: {
      clients: ClientsResolver
    }
  },
  {
    path: 'details/:id', component: ClientDetailComponent,
    resolve: {
      clientDetail: ClientDetailResolver,
    },
    data: {
      breadcrumb: 'navigation.details',
      usePrevUrl: true,
    }
  }
];

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ClientDetailModule,
    FormsModule,
    NgxPaginationModule,
    TableFooterModule,
    RouterModule.forChild(routes),
  ]
})
export class ClientModule { }
