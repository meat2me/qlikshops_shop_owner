import { AlertService } from '@services/alert.service';
import { StoreService } from '@services/store.service';
import { CanDeactivate, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountInfo } from '@models/account-info.model';
import { BaseComponent } from '@components/base/base.component';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Logout } from '@core/redux/actions/auth.action';
@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss'],
})
export class AccountSettingComponent
  extends BaseComponent
  implements OnInit, CanDeactivate<AccountSettingComponent>
{
  accountForm: FormGroup;
  accountInfo: AccountInfo;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storeServ: StoreService,
    private alertServ: AlertService,
    private store: Store<any>
  ) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
    this.fetchValues();
  }

  canDeactivate(): boolean {
    return this.accountForm.pristine;
  }

  private buildForm() {
    this.accountForm = this.fb.group({
      contact_first_name: ['', [Validators.requiredTrue]],
      contact_last_name: ['', [Validators.required]],
      contact_email: ['', [Validators.required]],
      phone_num: [{ value: '', disabled: true }],
      is_pro_account: [null],
      is_monthly_payment_plan: [null],
      accept_credit_card: [{ value: null, disabled: true }],
      has_private_domain: [{ value: null, disabled: true }],
      private_domain: [{ value: null, disabled: true }],
      has_integration_with_inventory: [{ value: null, disabled: true }],
    });
  }

  private fetchValues() {
    this.storeServ
      .getAccountInfo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.accountInfo = res;
        this.accountForm.patchValue(res);
      });
  }

  public onCancel() {
    this.alertServ.showDiscardChanges().then(() => {
      this.router.navigate(['/home']);
    });
  }

  public onSubmit() {
    this.storeServ.updateAccountInfo(this.accountForm.value).subscribe(
      () => {
        this.accountForm.markAsPristine();
        this.alertServ.showChangedSuccess();
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  public logout() {
    this.store.dispatch(new Logout());
  }
}
