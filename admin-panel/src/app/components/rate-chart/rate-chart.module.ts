import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateChartComponent } from './rate-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts'



@NgModule({
  declarations: [RateChartComponent],
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  exports: [
    RateChartComponent
  ]
})
export class RateChartModule { }
