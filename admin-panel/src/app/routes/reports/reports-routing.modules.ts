import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'monthly-report/:location',
    loadChildren: () => import('@routes/monthly-reports/monthly-reports.module').then(mod => mod.MonthlyReportsModule),
    data: {
      breadcrumb: 'navigation.monthly_report'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
