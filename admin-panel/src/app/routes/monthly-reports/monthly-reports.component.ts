import { ReportService } from '@services/report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-reports',
  templateUrl: './monthly-reports.component.html',
  styleUrls: ['./monthly-reports.component.scss']
})
export class MonthlyReportsComponent implements OnInit {

  public data: any;
  public isAdminReport = null;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.getMonthlyReport();
  }

  getMonthlyReport(): void {
    const storeId = localStorage.getItem('store_id');
    const storeIdAdminView = localStorage.getItem('STORE_ID');
    if (storeId) {
      this.reportService.getMonthlyReport(storeId).subscribe((res: any) => {
        this.data = res.table_data;
        this.isAdminReport = false;
      })
    }
    else if (storeIdAdminView) {
      this.reportService.getMonthlyReport(storeIdAdminView).subscribe((res: any) => {
        this.data = res.table_data;
        this.isAdminReport = false;
      })
    }
    else {
      this.reportService.getMonthlyReport().subscribe((res: any) => {
        this.data = res.table_data;
        this.isAdminReport = true;
      })
    }
  }

}

