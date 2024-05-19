import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService {

  public getMonthlyReport(id?: string): Observable<any> {
    return this.post({ request: 'get_monthly_report', store_id: id });
  }
}
