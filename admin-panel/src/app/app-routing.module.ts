import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '@layouts/main-layout/main-layout.component';
import { EnglishLayoutComponent } from '@layouts/languages-layout/english-layout/english-layout.component';
import { HebrewLayoutComponent } from '@layouts/languages-layout/hebrew-layout/hebrew-layout.component';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home/:role',
    loadChildren: () => import('@routes/home/home.module').then(mod => mod.HomeModule),
  },
  {
    path: 'order',
    loadChildren: () => import('@routes/order/order.module').then(mod => mod.OrderModule),
    data: {
      breadcrumb: 'navigation.order',
      unclickable: true,
    }
  },
  {
    path: 'store/:location',
    loadChildren: () => import('@routes/store/store.module').then(mod => mod.StoreModule),
    data: {
      breadcrumb: 'navigation.store',
      unclickable: false,
    }
  },
  {
    path: 'content',
    loadChildren: () => import('@routes/content/content.module').then(mod => mod.ContentModule),
    data: {
      breadcrumb: 'navigation.content',
      unclickable: true,
    }
  },
  {
    path: 'settings',
    loadChildren: () => import('@routes/setting/setting.module').then(m => m.SettingModule),
    data: {
      breadcrumb: 'navigation.setting',
      unclickable: true,
    }
  },
  {
    path: 'reports',
    loadChildren: () => import('@routes/reports/reports.module').then(m => m.ReportsModule),
    data: {
      breadcrumb: 'navigation.report',
      unclickable: true,
    }
  },
  {

    path: '**',
    redirectTo: 'home/shop-owner'
  }
];

const mainLayoutRoute = [
  {
    path: 'auth',
    loadChildren: () => import('@routes/auth/auth.module').then(mod => mod.AuthModule),
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: routes,
    canActivate: [AuthGuard]
  }
];

const routesLang: Routes = [
  {
    path: 'en',
    component: EnglishLayoutComponent,
    children: mainLayoutRoute
  },
  {
    path: 'he',
    component: HebrewLayoutComponent,
    children: mainLayoutRoute
  },
  {
    path: '',
    children: mainLayoutRoute
  },
  {

    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routesLang, {
    scrollPositionRestoration: 'enabled', initialNavigation: 'enabled',
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
