import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { AccountInfo } from '@models/account-info.model';
import { StoreService } from '@services/store.service';
@Injectable({
  providedIn: 'root',
})
export class AccountInfoResolver implements Resolve<AccountInfo> {
  constructor(private storeServ: StoreService) { }

  resolve() {
    return this.storeServ.getAccountInfo();
  }
}
