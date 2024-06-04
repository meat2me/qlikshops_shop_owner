import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyReportsComponent } from './monthly-reports.component';

const routes: Routes = [
  {
    path: '',
    component: MonthlyReportsComponent
  }
];

@NgModule({
  declarations: [MonthlyReportsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ]
})
export class MonthlyReportsModule { }
