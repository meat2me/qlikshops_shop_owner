import { Injectable, EventEmitter } from '@angular/core';
import { BaseService } from './base.service';
import { AccountInfo } from '@models/account-info.model';
import { tap } from 'rxjs/operators';
import { fromObj } from 'app/utils/from-object';
import { ReplaySubject, Observable } from 'rxjs';
import { mapDash } from 'app/utils/map-dash-data';
import { Resp } from '@models/resp.model';
import { StoreInfo } from '@models/store-info.model';
import { Store } from '@models/store.model';
import { StoreDetail } from '@models/store-detail.model';
import { GetStore } from '@core/redux/actions/store.action';

@Injectable({
  providedIn: 'root',
})
export class StoreService extends BaseService {

  accountInfo$: Observable<AccountInfo>;
  accountInfoSub = new ReplaySubject<AccountInfo>(1);
  updateNavbar: EventEmitter<any> = new EventEmitter();
  updateSidebar: EventEmitter<any> = new EventEmitter();
  updateDashboard: EventEmitter<any> = new EventEmitter();

  getAllStore() {
    return this.post<Store>({ request: 'admin_get_all_stores' });
  }

  fetchDashboard() {
    this.updateDashboard.emit(true);
  }

  getNavChange(event) {
    this.updateNavbar.emit(event);
  }

  getSidebarChange(event) {
    this.updateSidebar.emit(event);
  }

  addStore(req: StoreDetail) {
    return this.post<Resp>({ ...req, request: 'add_store' });
  }

  getAccountInfo() {
    this.post<AccountInfo>({ request: 'get_account_info' }).subscribe((v) => this.accountInfoSub.next(v));
    return this.accountInfo$ || (this.accountInfo$ = this.accountInfoSub.asObservable());
  }

  updateAccountInfo(req: IUpdateAccountReq) {
    return this.post<Resp>({ ...req, request: 'update_account_info' });
  }

  getStoreInfo(store_id) {
    return this.post<StoreInfo>({ request: 'get_store', store_id }).pipe(
      tap(this.mapSelects)
    );
  }

  getStoreMetadata() {
    return this.post<AccountInfo>({ request: 'get_store_metadata' });
  }

  getDashboard(id?: string): Observable<any> {
    return this.post({ request: 'get_dashboard_data', store_id: id })
      .pipe(tap(this.mapDashboardData))
  }

  private mapDashboardData(res: any) {
    res.clients_per_month = mapDash(res.clients_per_month);
    res.orders_per_month = mapDash(res.orders_per_month);
  }

  private mapSelects(res: StoreInfo) {
    res.languages = fromObj(res.languages);
    res.countries = fromObj(res.countries);
    res.store_categories = fromObj(res.store_categories);
    res.themes = fromObj(res.themes);
  }

  updateStore(req, store_id, user_type) {
    if (user_type == 1) {
      return this.post({ request: 'update_store', store_id, ...req });
    }

    if (user_type == 3) {
      return this.post({ request: 'owner_update_store', store_id, ...req });
    }
  }

  setStatus(store_id, is_online) {
    return this.post({ request: 'set_store_online', store_id, is_online });
  }
}

export interface IUpdateAccountReq {
  contact_first_name: string;
  contact_last_name: string;
  contact_email: string;
  is_pro_account: boolean;
  is_monthly_payment_plan: boolean;
}
