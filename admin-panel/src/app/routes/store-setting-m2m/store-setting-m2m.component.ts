import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalComponent } from '@modals/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from '@modals/confirm-modal/confirm-modal.component';
import { NotifyModalComponent } from '@modals/notify-modal/notify-modal.component';
import { Resp } from '@models/resp.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@services/auth.service';
import { StoreService } from '@services/store.service';
import * as moment from 'moment';

@Component({
  selector: 'app-store-setting-m2m',
  templateUrl: './store-setting-m2m.component.html',
  styleUrls: ['./store-setting-m2m.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StoreSettingM2mComponent implements OnInit {
  public canUploadFile = true;

  user_type = 3;
  store_id = '';
  storeForm: FormGroup;
  storeStatus;
  originData;
  fileName;
  currency;
  currentTime;
  tomorrowTime;
  isDateValid: boolean;

  buildStoreForm() {
    this.storeForm = new FormGroup({
      owner_first_name: new FormControl(null, Validators.required),
      owner_last_name: new FormControl(null, Validators.required),
      owner_phone: new FormControl(null, Validators.required),
      owner_email: new FormControl(null, Validators.required),
      store_code: new FormControl(null, Validators.required),
      store_name: new FormControl(null, Validators.required),
      about: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      store_phone: new FormControl(null, Validators.required),
      store_email: new FormControl(null, Validators.required),
      open_hours: new FormControl(null, Validators.required),
      has_take_away: new FormControl(false, Validators.required),
      take_away_hours: new FormControl(null, Validators.required),
      distribution_hours: new FormControl(null, Validators.required),
      extra_notification_phones: new FormControl(null, Validators.required),
      branches: new FormControl(null, Validators.required),
      has_delivery: new FormControl(false, Validators.required),
      has_distribution_array: new FormControl(false, Validators.required),
      has_creditcard_pay: new FormControl(false),
      has_cash_pay: new FormControl(false),
      delivery_hours: new FormControl(null, Validators.required),
      delivery_slot_size_hours: new FormControl(null, Validators.required),
      delivery_cost: new FormControl(null, Validators.required),
      delivery_terms: new FormControl(null, Validators.required),
      min_order_for_free_delivery: new FormControl(null, Validators.required),
      distribution_area: new FormControl(null, Validators.required),
      distribution_array: this.fb.array([]),
      image_logo_white: new FormControl(null),
      image_logo_white_name: new FormControl(null),
      image_logo_black: new FormControl(null),
      image_logo_black_name: new FormControl(null),
      general_discount_active: new FormControl(null, Validators.required),
      general_discount_from: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      general_discount_from_time: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      general_discount_to: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      general_discount_to_time: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      general_discount_min_order: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      general_discount_percent: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
    });
  }

  get distributionArrCtrl() {
    return this.storeForm.get('distribution_array') as FormArray;
  }

  get deliveryTerms() {
    return this.storeForm.get('delivery_terms');
  }

  get firstName() {
    return this.storeForm.get('owner_first_name');
  }

  get deliverySlotSizeHours() {
    return this.storeForm.get('delivery_slot_size_hours');
  }

  get lastName() {
    return this.storeForm.get('owner_last_name');
  }

  get ownerPhone() {
    return this.storeForm.get('owner_phone');
  }

  get ownerEmail() {
    return this.storeForm.get('owner_email');
  }

  get storeCode() {
    return this.storeForm.get('store_code');
  }

  get storeName() {
    return this.storeForm.get('store_name');
  }

  get about() {
    return this.storeForm.get('about');
  }

  get street() {
    return this.storeForm.get('street');
  }
  get city() {
    return this.storeForm.get('city');
  }

  get storePhone() {
    return this.storeForm.get('store_phone');
  }

  get storeEmail() {
    return this.storeForm.get('store_email');
  }

  get from_date() {
    return this.storeForm.get('general_discount_from');
  }

  get from_date_time() {
    return this.storeForm.get('general_discount_from_time');
  }

  get to_date() {
    return this.storeForm.get('general_discount_to');
  }

  get to_date_time() {
    return this.storeForm.get('general_discount_to_time');
  }

  get min_order() {
    return this.storeForm.get('general_discount_min_order');
  }

  get discount_percent() {
    return this.storeForm.get('general_discount_percent');
  }
  get branches() {
    return this.storeForm.get('branches');
  }

  get is_set_discount() {
    return this.storeForm.get('general_discount_active');
  }

  get has_credit_pay() {
    return this.storeForm.get('has_creditcard_pay');
  }

  get has_take_away() {
    return this.storeForm.get('has_take_away');
  }

  get has_delivery() {
    return this.storeForm.get('has_delivery');
  }

  get has_distribution_array() {
    return this.storeForm.get('has_distribution_array');
  }

  get has_cash_pay() {
    return this.storeForm.get('has_cash_pay');
  }

  get min_order_for_free_delivery() {
    return this.storeForm.get('min_order_for_free_delivery');
  }
  get delivery_cost() {
    return this.storeForm.get('delivery_cost');
  }
  get delivery_hours() {
    return this.storeForm.get('delivery_hours');
  }
  get isAdmin(): boolean {
    return this.user_type === 1;
  }

  constructor(
    private storeService: StoreService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.buildStoreForm();
  }

  ngOnInit(): void {
    this.store_id = localStorage.getItem('STORE_ID');
    this.currency = localStorage.getItem('CURRENCY');

    this.route.paramMap.subscribe((params) => {
      const location = params.get('location');
      if (location === 'shop-page') {
        this.storeService.getSidebarChange(true);
      }
    });

    // this.has_distribution_array.valueChanges.subscribe((val) => {
    //   if (val) {
    //     this.delivery_hours.disable();
    //     this.deliverySlotSizeHours.disable();
    //     this.delivery_cost.disable();
    //     this.min_order_for_free_delivery.disable();
    //   } else {
    //     this.delivery_hours.enable();
    //     this.deliverySlotSizeHours.enable();
    //     this.delivery_cost.enable();
    //     this.min_order_for_free_delivery.enable();
    //   }
    // });

    this.user_type = this.authService.getUserType();
    if (this.user_type === 3) {
      this.disableInfoChange();
      this.canUploadFile = false;
    }
    const now = moment().valueOf();
    const tomorrow = now + 86400000;

    this.currentTime = {
      year: moment(now).get('year'),
      month: moment(now).get('month'),
      day: moment(now).get('date'),
    };

    this.tomorrowTime = {
      year: moment(tomorrow).get('year'),
      month: moment(tomorrow).get('month'),
      day: moment(tomorrow).get('date'),
    };

    const hour = {
      hour: moment(now).get('hour'),
      minute: moment(now).get('minute'),
      second: 0,
    };

    this.storeService.getStoreInfo(this.store_id).subscribe(async (res: any) => {
      await (res !== undefined);
      console.log(res.delivery_terms.length);
      console.log(res);
      // const m = res.delivery_terms.split('\t-\t');
      this.originData = res;
      this.storeStatus = res.is_online;
      this.storeForm.patchValue({
        ...res,
        has_delivery: res.has_delivery === 1 ? true : false,
        delivery_terms: res.delivery_terms,
        image_logo_white: res.white_logo,
        image_logo_black: res.black_logo,
        general_discount_from: res.general_discount_active
          ? this.convertTime(res.general_discount_from, 0)
          : this.currentTime,
        general_discount_from_time: res.general_discount_active
          ? this.convertTime(res.general_discount_from, 1)
          : hour,
        general_discount_to: res.general_discount_active
          ? this.convertTime(res.general_discount_to, 0)
          : this.tomorrowTime,
        general_discount_to_time: res.general_discount_active
          ? this.convertTime(res.general_discount_to, 1)
          : hour,
      });
      this.patchDistributionArray(res.distribution_array);
      // console.log(m[1]);
      // console.log(JSON.parse(m[1]));
      // this.patchDistributionArray(JSON.parse(m[1]));
      this.allowSetDiscount();
    });
  }

  createDistributionArrayItem(value: any) {
    return this.fb.group({
      distribution_cities: [value?.distribution_cities, [Validators.required]],
      distribution_hours: [value?.distribution_hours, [Validators.required]],
      distribution_slot_size_hours: [
        value?.distribution_slot_size_hours,
        [Validators.required],
      ],
      distribution_cost: [value?.distribution_cost, [Validators.required]],
      min_order_for_distribution: [
        value?.min_order_for_distribution,
        [Validators.required],
      ],
      min_order_for_free_distribution: [
        value?.min_order_for_free_distribution,
        [Validators.required],
      ],
    });
  }

  deleteDistribution(i: number) {
    this.distributionArrCtrl.removeAt(i);
  }

  pushDistribution() {
    this.distributionArrCtrl.push(this.createDistributionArrayItem(null));
  }

  patchDistributionArray(array) {
    const distributionArrCtrl = this.distributionArrCtrl;
    distributionArrCtrl.clear();
    array.forEach((d, i) => {
        distributionArrCtrl.setControl(i, this.createDistributionArrayItem(d));
      });
  }

  convertTime(timeStr, type) {
    const localDate = moment(timeStr).utc(true);
    const mils = moment(localDate).local().valueOf();
    const date = {
      year: moment(mils).get('year'),
      month: moment(mils).get('month') + 1,
      day: moment(mils).get('date'),
    };
    const time = {
      hour: moment(mils).get('hour'),
      minute: moment(mils).get('minute'),
      second: 0,
    };

    if (type === 0) {
      return date;
    }
    if (type === 1) {
      return time;
    }
  }

  onUpdateStore = async () => {
    // console.log( JSON.parse(JSON.stringify(this.distributionArrCtrl.value)));
    console.log( this.distributionArrCtrl.value);
    console.log( JSON.stringify( this.distributionArrCtrl.value ));
    console.log( this.has_delivery.value);
    if (
      this.compareDate(
        this.from_date.value,
        this.to_date.value,
        this.from_date_time.value,
        this.to_date_time.value
      )
    ) {
      const req = {
        ...this.storeForm.value,
        distribution_array: this.distributionArrCtrl.value,
        has_delivery: this.has_delivery.value ? 1 : 0,
        // delivery_terms: this.deliveryTerms.value + '\t-\t' + JSON.stringify(this.distributionArrCtrl.value),
        delivery_terms: this.deliveryTerms.value,
        image_logo_white:
          this.originData.image_logo_white ===
          this.storeForm.value.image_logo_white
            ? null
            : this.storeForm.value.image_logo_white,
        image_logo_black:
          this.originData.image_logo_black ===
          this.storeForm.value.image_logo_black
            ? null
            : this.storeForm.value.image_logo_black,
        general_discount_percent: parseInt(this.discount_percent.value),
        general_discount_from: this.is_set_discount.value
          ? this.modifyDate(this.from_date.value, this.from_date_time.value)
          : null,
        general_discount_to: this.is_set_discount.value
          ? this.modifyDate(this.to_date.value, this.to_date_time.value)
          : null,
      };
      this.originData.white_logo === this.storeForm.value.image_logo_white &&
        delete req.image_logo_white;
      this.originData.black_logo === this.storeForm.value.image_logo_black &&
        delete req.image_logo_black;
      console.log(req.distribution_area);
      this.storeService
        .updateStore(req, this.store_id, this.user_type)
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res.rc === 0) {
              this.changeSavedModal();
              this.storeService.getNavChange(true);
            }
          },
          (err) => {
            if (err.rc === 507) {
              this.removeUnitError();
              this.router.navigate(['/home']);
            }
          }
        );
    } else {
      this.dateValidateError();
    }
  }

  onCancelUpdate() {
    this.storeForm.patchValue({
      ...this.originData,
    });
    this.router.navigate(['/home']);
  }

  goOffline() {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.go_offline_title';
    modalRef.componentInstance.content = 'modal.go_offline_content';
    modalRef.result.then(() => {
      this.storeService
        .setStatus(this.store_id, false)
        .subscribe((res: Resp) => {
          if (res.rc === 0) {
            this.successNotify();
            this.storeStatus = 0;
          }
        });
    });
  }

  goOnline() {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.go_online_title';
    modalRef.componentInstance.content = 'modal.go_online_content';
    modalRef.componentInstance.type = true;
    modalRef.result.then(() => {
      this.storeService
        .setStatus(this.store_id, true)
        .subscribe((res: Resp) => {
          if (res.rc === 0) {
            this.successNotify();
            this.storeStatus = 1;
          }
        });
    });
  }

  allowSetDiscount() {
    if (this.is_set_discount.value) {
      this.from_date.enable();
      this.from_date_time.enable();
      this.min_order.enable();
      this.discount_percent.enable();
      this.to_date.enable();
      this.to_date_time.enable();
    } else {
      this.from_date.disable();
      this.from_date_time.disable();
      this.to_date.disable();
      this.to_date_time.disable();
      this.min_order.disable();
      this.discount_percent.disable();
    }
  }

  allowChooseToDate() {
    this.to_date.enable();
    this.to_date_time.enable();
  }

  modifyDate(date: any, time: any) {
    const strDate = new Date(
      date.year,
      date.month - 1,
      date.day,
      time.hour,
      time.minute
    );
    const utc = moment(strDate).utc();
    const tempDate = moment(utc).format('YYYY[-]MM[-]DD');
    let utcMins = utc.get('minute').toString();
    if (utcMins.length === 1) {
      utcMins = '0' + utcMins;
    }
    return `${tempDate} ${utc.get('hour')}:${utcMins}:00`;
  }

  compareDate(fromDate: any, toDate: any, formTime: any, toTime: any) {
    const stDate = new Date(
      fromDate.year,
      fromDate.month,
      fromDate.day,
      formTime.hour,
      formTime.minute
    );
    const ndDate = new Date(
      toDate.year,
      toDate.month,
      toDate.day,
      toTime.hour,
      toTime.minute
    );
    const stMilliseconds = stDate.valueOf();
    const ndMilliseconds = ndDate.valueOf();

    if (stMilliseconds < ndMilliseconds) {
      return true;
    } else { return false; }
  }

  disableInfoChange() {
    this.firstName.disable();
    this.lastName.disable();
    // this.ownerPhone.disable();
    this.ownerEmail.disable();
    this.storeCode.disable();
    this.storeName.disable();
    this.about.disable();
    this.street.disable();
    this.city.disable();
    this.storePhone.disable();
    this.storeEmail.disable();
    this.has_cash_pay.disable();
    this.has_credit_pay.disable();
    this.branches.disable();
    this.deliverySlotSizeHours.disable();
    this.has_distribution_array.disable();
  }

  changeSavedModal() {
    const modalRef = this.modalService.open(NotifyModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.changed_save_title';
    modalRef.componentInstance.content = 'modal.changed_save_content';
    modalRef.componentInstance.setting = true;
  }

  removeUnitError() {
    const modalRef = this.modalService.open(AlertModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.remove_unit_err_title';
    modalRef.componentInstance.content = 'modal.remove_unit_err_content';
  }

  confirmCancel() {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.cancel_change_title';
    modalRef.componentInstance.content = 'modal.cancel_change_content';

    modalRef.result.then((result) => {
      result ? this.onCancelUpdate() : null;
    });
  }

  successNotify() {
    const modalRef = this.modalService.open(NotifyModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.notify';
    modalRef.componentInstance.content = 'modal.success';
  }

  dateValidateError() {
    const modalRef = this.modalService.open(AlertModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.date_validate_title';
    modalRef.componentInstance.content = 'modal.date_validate_content';
  }
}
