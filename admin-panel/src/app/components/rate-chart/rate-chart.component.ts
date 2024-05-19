import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-rate-chart',
  templateUrl: './rate-chart.component.html',
  styleUrls: ['./rate-chart.component.scss'],
})
export class RateChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  @Input() clients: any;
  @Input() orders: any;
  clientsData = [];
  ordersData = [];
  month = [];
  public chartOptions: Partial<ChartOptions>;

  constructor(private translateService: TranslateService) {
    this.chartOptions = {
      series: [
        {
          name: 'Clients per month',
          data: this.clientsData,
        },
        {
          name: 'Orders per month',
          data: this.ordersData,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: this.month,
      },
      fill: {
        opacity: 1,
      }
    };
  }

  ngOnInit(): void {
    if (this.clients) {
      this.month = this.clients.map((x) => x.month);
      this.clientsData = this.clients.map((x) => x.amount);
    }
    if (this.orders) {
      this.ordersData = this.orders.map((x) => x.amount);
    }
    this.chartOptions.series = [
      {
        name: this.translateService.instant('dashboard.client_per_month'),
        data: this.clientsData,
      },
      {
        name: this.translateService.instant('dashboard.order_per_month'),
        data: this.ordersData,
      },
    ];
    this.chartOptions.xaxis = {
      categories: this.month,
    };
  }
}
