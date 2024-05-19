import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'open-orders/:location',
    loadChildren: () => import('@routes/open-purchase/open-purchase.module').then(mod => mod.OpenPurchaseModule),
    data: {
      breadcrumb: 'navigation.open_order'
    }
  },
  {
    path: 'ready-orders-delivery/:location',
    loadChildren: () => import('@routes/ready-orders-delivery/ready-orders-delivery.module').then(mod => mod.ReadyOrdersDeliveryModule),
    data: {
      breadcrumb: 'navigation.ready_order_delivery'
    }
  },
  {
    path: 'ready-orders-pickup/:location',
    loadChildren: () => import('@routes/ready-orders/ready-orders.module').then(mod => mod.ReadyOrdersModule),
    data: {
      breadcrumb: 'navigation.ready_order_pickup'
    }
  },
  {
    path: 'clients/:location',
    loadChildren: () => import('@routes/client/client.module').then(mod => mod.ClientModule),
    data: {
      breadcrumb: 'navigation.client'
    }
  },
  {
    path: 'history/:location',
    loadChildren: () => import('@routes/history/history.module').then(mod => mod.HistoryModule),
    data: {
      breadcrumb: 'navigation.history'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
