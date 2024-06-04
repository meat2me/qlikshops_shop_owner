import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('@routes/account-setting/account-setting.module').then(mod => mod.AccountSettingModule),
    data: {
      breadcrumb: 'navigation.account_setting'
    }
  },
  {
    path: 'store/:location',
    loadChildren: () => import('@routes/store-setting-m2m/store-setting-m2m.module').then(mod => mod.StoreSettingM2mModule),
    data: {
      breadcrumb: 'navigation.store_setting'
    }
  },
  {
    path: '',
    redirectTo: 'store'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
