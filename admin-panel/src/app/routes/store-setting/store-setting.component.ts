import { AlertModalComponent } from '@modals/alert-modal/alert-modal.component';
import { Resp } from '@models/resp.model';
import { NotifyModalComponent } from '@modals/notify-modal/notify-modal.component';
import { StoreService } from '@services/store.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@modals/confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-setting',
  templateUrl: './store-setting.component.html',
  styleUrls: ['./store-setting.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StoreSettingComponent implements OnInit {
  @ViewChild('upFile', { static: false }) upFile: ElementRef;
  store_id;
  languages: any;
  countries: any;
  themes: any;
  storeCategories: any;
  units: any;
  paymentOptions: any;
  customUnits: any;
  storeForm: FormGroup;
  storeStatus;
  originData;
  fileName;
  currentTime;
  tomorrowTime;
  isDateValid: boolean;

  get logo_image() {
    return this.storeForm.value.logo_image;
  }

  logoPreview = '';
  imgRaw = '';

  buildStoreForm() {
    this.storeForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      about: new FormControl(null, Validators.required),
      language: new FormControl(null, Validators.required),
      currency: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      theme: new FormControl(null, Validators.required),
      msg_prefix: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      province: new FormControl(null, Validators.required),
      country_code: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      open_hours: new FormControl(null, Validators.required),
      has_take_away: new FormControl(0, Validators.required),
      has_delivery: new FormControl(0, Validators.required),
      delivery_hours: new FormControl(null, Validators.required),
      payment_opts: new FormArray([]),
      units: new FormArray([]),
      custom_units: new FormArray([]),
      logo_image: new FormControl(null, Validators.required),
      delivery_cost: new FormControl(null, Validators.required),
      min_order_for_free_delivery: new FormControl(null, Validators.required),
      distribution_area: new FormControl(null, Validators.required),
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

  get logo() {
    return this.storeForm.value.logo;
  }

  get currency() {
    return this.storeForm.value.currency;
  }

  get theme() {
    return this.storeForm.value.theme;
  }

  get category() {
    return this.storeForm.value.category;
  }

  get language() {
    return this.storeForm.value.language;
  }

  get country_code() {
    return this.storeForm.value.country_code;
  }

  get unitControls() {
    return this.storeForm.get('units') as FormArray;
  }

  get customUnitControls() {
    return this.storeForm.get('custom_units') as FormArray;
  }

  get paymentOptsControls() {
    return this.storeForm.get('payment_opts') as FormArray;
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

  get is_set_discount() {
    return this.storeForm.get('general_discount_active');
  }

  constructor(
    private storeService: StoreService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.buildStoreForm();
  }

  ngOnInit(): void {
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

    this.storeService.getStoreInfo(this.store_id).subscribe((res) => {
      this.originData = res;
      this.storeStatus = res.is_online;
      this.countries = res.countries;
      this.languages = res.languages;
      this.paymentOptions = res.payment_opts;
      this.themes = res.themes;
      this.storeCategories = res.store_categories;
      this.units = res.units;
      this.customUnits = res.custom_units;
      this.logoPreview = res.logo_image;
      this.units.forEach((el) => {
        this.unitControls.push(this.creatUnitForm());
      });
      this.customUnits.forEach((el) => {
        this.customUnitControls.push(this.creatUnitForm());
      });
      this.paymentOptions.forEach((el) => {
        this.paymentOptsControls.push(this.createPaymentOptsForm());
      });
      this.storeForm.patchValue({
        ...res,
        category: this.storeCategories.find((x) => x.value == res.category),
        language: this.languages.find((x) => x.value == res.language),
        theme: this.themes.find((x) => x.value == res.theme),
        country_code: this.countries.find((x) => x.value == res.country_code),
        units: this.units,
        custom_units: this.customUnits,
        payment_opts: this.paymentOptions,
        general_discount_from: this.currentTime,
        general_discount_from_time: hour,
        general_discount_to: this.tomorrowTime,
        general_discount_to_time: hour,
      });
      this.allowSetDiscount();
    });
  }

  onCancelUpdate() {
    this.storeForm.patchValue({
      ...this.originData,
      category: this.storeCategories.find(
        (x) => x.value == this.originData.category
      ),
      language: this.languages.find((x) => x.value == this.originData.language),
      theme: this.themes.find((x) => x.value == this.originData.theme),
      country_code: this.countries.find(
        (x) => x.value == this.originData.country_code
      ),
      units: this.units,
      custom_units: this.customUnits,
      payment_opts: this.paymentOptions,
    });
    this.router.navigate(['/home']);
  }

  goOffline() {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'modal.go_offline_title';
    modalRef.componentInstance.content = 'modal.go_offline_content';
    modalRef.result.then((result) => {
      this.storeService
        .setStatus(this.store_id, false)
        .subscribe((res: Resp) => {
          if (res.rc == 0) {
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
    modalRef.result.then((result) => {
      this.storeService
        .setStatus(this.store_id, true)
        .subscribe((res: Resp) => {
          if (res.rc == 0) {
            this.successNotify();
            this.storeStatus = 1;
          }
        });
    });
  }

  changeLogo() {
    this.upFile.nativeElement.click();
  }

  readFile(fileEvent: any) {
    const file = fileEvent.target.files[0];
    this.fileName = file.name;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.imgRaw = e.target.result;
      this.logoPreview = e.target.result;
      this.storeForm.patchValue({
        logo_image: this.imgRaw,
      });
    };
  }

  creatUnitForm() {
    return new FormGroup({
      is_active: new FormControl(0),
      unit_name: new FormControl(null),
      id: new FormControl(null),
    });
  }

  createPaymentOptsForm() {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      is_active: new FormControl(0),
    });
  }

  getUnitControls(index: number) {
    return this.unitControls.at(index) as FormGroup;
  }

  getCustomUnitControls(index: number) {
    return this.customUnitControls.at(index) as FormGroup;
  }

  get formattedUnits() {
    return this.unitControls.value
      .filter((x) => x.is_active == true)
      .map((x) => x.id)
      .join(',');
  }

  get formattedPaymentOpts() {
    return this.paymentOptsControls.value
      .filter((x) => x.is_active == true)
      .map((x) => x.id)
      .join(',');
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
    const strDate = new Date(date.year, date.month, date.day);
    const milliseconds = strDate.valueOf();
    const tempDate = moment(milliseconds).format('YYYY[-]MM[-]DD');

    if (time.minute.toString().length == 1) {
      time.minute = '0' + time.minute;
    }

    return `${tempDate} ${time.hour}:${time.minute}:${time.second}0`;
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
    } else return false;
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
